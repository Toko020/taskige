import os
from datetime import datetime, timedelta
from pathlib import Path

from flask import (
    Flask, render_template, request, redirect, url_for,
    session, flash, abort
)
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

from models import db, User, Task, Comment

UPLOAD_DIR = Path("static/uploads")
ALLOWED_EXT = {"png", "jpg", "jpeg", "webp"}

def create_app():
    app = Flask(__name__)
    app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-change-me")

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///taskige.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024  # 5MB
    db.init_app(app)

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    with app.app_context():
        db.create_all()

    def cleanup_expired_tasks():
        cutoff = datetime.utcnow() - timedelta(hours=72)
        expired = Task.query.filter(Task.created_at < cutoff).all()
        if not expired:
            return
        for t in expired:
            Comment.query.filter_by(task_id=t.id).delete()
            db.session.delete(t)
        db.session.commit()

    def current_user():
        uid = session.get("user_id")
        if not uid:
            return None
        return User.query.get(uid)

    def login_required():
        return bool(session.get("user_id"))

    @app.before_request
    def protect_pages():
        cleanup_expired_tasks()
        public = {"/login", "/register"}
        if request.path.startswith("/static/"):
            return
        if request.path in public:
            return
        if not login_required():
            return redirect(url_for("login"))

    def time_ago(dt: datetime) -> str:
        now = datetime.utcnow()
        diff = now - dt
        seconds = int(diff.total_seconds())
        if seconds < 60:
            return f"{seconds}s ago"
        minutes = seconds // 60
        if minutes < 60:
            return f"{minutes}m ago"
        hours = minutes // 60
        if hours < 24:
            return f"{hours}h ago"
        days = hours // 24
        return f"{days}d ago"

    app.jinja_env.globals.update(time_ago=time_ago)

    def save_avatar(file_storage):
        if not file_storage or file_storage.filename.strip() == "":
            return None
        filename = secure_filename(file_storage.filename)
        ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
        if ext not in ALLOWED_EXT:
            return None
        safe_name = f"avatar_{int(datetime.utcnow().timestamp())}_{filename}"
        path = UPLOAD_DIR / safe_name
        file_storage.save(path)
        # IMPORTANT: store relative path (no "static/")
        return f"uploads/{safe_name}"

    # ---------- AUTH ----------
    @app.get("/register")
    def register():
        return render_template("register.html")

    @app.post("/register")
    def register_post():
        full_name = request.form.get("full_name", "").strip()
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")

        if not full_name or not email or not password:
            flash("Please fill all required fields.", "error")
            return redirect(url_for("register"))

        if User.query.filter_by(email=email).first():
            flash("Email already registered.", "error")
            return redirect(url_for("register"))

        avatar_path = save_avatar(request.files.get("avatar"))

        user = User(
            full_name=full_name,
            email=email,
            password_hash=generate_password_hash(password),
            avatar_path=avatar_path,
        )
        db.session.add(user)
        db.session.commit()

        session["user_id"] = user.id
        return redirect(url_for("index"))

    @app.get("/login")
    def login():
        return render_template("login.html")

    @app.post("/login")
    def login_post():
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")

        user = User.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password_hash, password):
            flash("Invalid credentials.", "error")
            return redirect(url_for("login"))

        session["user_id"] = user.id
        return redirect(url_for("index"))

    @app.get("/logout")
    def logout():
        session.clear()
        return redirect(url_for("login"))

    # ---------- TASKS ----------
    @app.get("/")
    def index():
        user = current_user()
        tasks = Task.query.order_by(Task.created_at.desc()).all()
        return render_template("index.html", user=user, tasks=tasks)

    @app.get("/tasks/new")
    def post_task():
        user = current_user()
        return render_template("post_task.html", user=user)
    @app.get("/about")
    def about():
        user = current_user()   # ✅ define user
        return render_template("about.html", user=user)


    @app.post("/tasks/new")
    def post_task_post():
        user = current_user()
        title = request.form.get("title", "").strip()
        description = request.form.get("description", "").strip()
        location = request.form.get("location", "Remote").strip()
        help_until = request.form.get("help_until", "").strip()
        payment_type = request.form.get("payment_type", "Free").strip()
        payment_amount_raw = request.form.get("payment_amount", "").strip()

        if not title or not description or not help_until:
            flash("Please fill title, description and 'when you need help'.", "error")
            return redirect(url_for("post_task"))

        payment_amount = None
        if payment_type == "Paid":
            try:
                payment_amount = int(payment_amount_raw) if payment_amount_raw else None
            except ValueError:
                payment_amount = None

        t = Task(
            author_id=user.id,
            title=title,
            description=description,
            location=location,
            help_until=help_until,
            payment_type=payment_type,
            payment_amount=payment_amount,
        )
        db.session.add(t)
        db.session.commit()
        return redirect(url_for("index"))

    @app.get("/tasks/<int:task_id>")
    def task_detail(task_id: int):
        user = current_user()
        task = Task.query.get_or_404(task_id)
        is_author = (task.author_id == user.id)

        # ✅ Author sees all comments, others see only THEIR OWN
        if is_author:
            comments = Comment.query.filter_by(task_id=task_id).order_by(Comment.created_at.asc()).all()
        else:
            comments = Comment.query.filter_by(task_id=task_id, author_id=user.id).order_by(Comment.created_at.asc()).all()

        return render_template(
            "task_detail.html",
            user=user,
            task=task,
            comments=comments,
            is_author=is_author
        )
    
    @app.post("/tasks/<int:task_id>/comment")
    def add_comment(task_id: int):
        user = current_user()
        task = Task.query.get_or_404(task_id)
        content = request.form.get("content", "").strip()

        if not content:
            return redirect(url_for("task_detail", task_id=task.id))

        c = Comment(task_id=task.id, author_id=user.id, content=content)
        db.session.add(c)
        db.session.commit()
        return redirect(url_for("task_detail", task_id=task.id))

    @app.post("/tasks/<int:task_id>/delete")
    def delete_task(task_id: int):
        user = current_user()
        task = Task.query.get_or_404(task_id)
        if task.author_id != user.id:
            abort(403)

        Comment.query.filter_by(task_id=task.id).delete()
        db.session.delete(task)
        db.session.commit()
        return redirect(url_for("index"))

    # ---------- COMMENT EDIT/DELETE (only by commenter) ----------
    @app.post("/comments/<int:comment_id>/edit")
    def edit_comment(comment_id: int):
        user = current_user()
        comment = Comment.query.get_or_404(comment_id)

        # ✅ Only the comment author can edit
        if comment.author_id != user.id:
            abort(403)

        new_text = request.form.get("content", "").strip()
        if not new_text:
            return redirect(url_for("task_detail", task_id=comment.task_id))

        comment.content = new_text
        db.session.commit()
        return redirect(url_for("task_detail", task_id=comment.task_id))

    @app.post("/comments/<int:comment_id>/delete")
    def delete_comment(comment_id: int):
        user = current_user()
        comment = Comment.query.get_or_404(comment_id)

        # ✅ Only the comment author can delete
        if comment.author_id != user.id:
            abort(403)

        task_id = comment.task_id
        db.session.delete(comment)
        db.session.commit()
        return redirect(url_for("task_detail", task_id=task_id))

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
