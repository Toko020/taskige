import os
import sqlite3
from functools import wraps
from datetime import datetime

from flask import (
    Flask, render_template, request, redirect, url_for,
    session, jsonify, abort, flash
)
from werkzeug.security import generate_password_hash, check_password_hash

APP_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(APP_DIR, "taskige.db")

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY", "dev-secret-change-me")


def db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with db() as conn:
        conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            full_name TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """)
        conn.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            location TEXT NOT NULL,
            is_paid INTEGER NOT NULL DEFAULT 0,
            payment_amount TEXT,
            created_at TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
        """)
        conn.execute("""
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            content TEXT NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY(task_id) REFERENCES tasks(id),
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
        """)


def login_required(view_func):
    @wraps(view_func)
    def wrapper(*args, **kwargs):
        if "user_id" not in session:
            return redirect(url_for("login"))
        return view_func(*args, **kwargs)
    return wrapper


def current_user():
    if "user_id" not in session:
        return None
    with db() as conn:
        user = conn.execute("SELECT * FROM users WHERE id = ?", (session["user_id"],)).fetchone()
    return user


@app.route("/")
@login_required
def index():
    with db() as conn:
        tasks = conn.execute("""
            SELECT t.*, u.full_name
            FROM tasks t
            JOIN users u ON u.id = t.user_id
            ORDER BY t.id DESC
        """).fetchall()
    return render_template("index.html", user=current_user(), tasks=tasks)


@app.route("/register", methods=["GET", "POST"])
def register():
    if "user_id" in session:
        return redirect(url_for("index"))

    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        full_name = request.form.get("full_name", "").strip()
        password = request.form.get("password", "")

        if not email or not full_name or not password:
            flash("All fields are required.")
            return render_template("register.html")

        if len(password) < 6:
            flash("Password must be at least 6 characters.")
            return render_template("register.html")

        pw_hash = generate_password_hash(password)
        try:
            with db() as conn:
                conn.execute(
                    "INSERT INTO users (email, full_name, password_hash, created_at) VALUES (?, ?, ?, ?)",
                    (email, full_name, pw_hash, datetime.utcnow().isoformat())
                )
                user_id = conn.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone()["id"]
        except sqlite3.IntegrityError:
            flash("Email already registered. Please log in.")
            return redirect(url_for("login"))

        session["user_id"] = user_id
        return redirect(url_for("index"))

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if "user_id" in session:
        return redirect(url_for("index"))

    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")

        with db() as conn:
            user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()

        if not user or not check_password_hash(user["password_hash"], password):
            flash("Invalid email or password.")
            return render_template("login.html")

        session["user_id"] = user["id"]
        return redirect(url_for("index"))

    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


@app.route("/post-task", methods=["GET", "POST"])
@login_required
def post_task():
    if request.method == "POST":
        title = request.form.get("title", "").strip()
        description = request.form.get("description", "").strip()
        location = request.form.get("location", "").strip()
        is_paid = 1 if request.form.get("is_paid") == "on" else 0
        payment_amount = request.form.get("payment_amount", "").strip() if is_paid else None

        if not title or not description or not location:
            flash("Title, help details and location are required.")
            return render_template("post_task.html", user=current_user())

        with db() as conn:
            conn.execute("""
                INSERT INTO tasks (user_id, title, description, location, is_paid, payment_amount, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                session["user_id"],
                title,
                description,
                location,
                is_paid,
                payment_amount,
                datetime.utcnow().isoformat()
            ))

        return redirect(url_for("index"))

    return render_template("post_task.html", user=current_user())


@app.route("/tasks/<int:task_id>")
@login_required
def task_detail(task_id: int):
    with db() as conn:
        task = conn.execute("""
            SELECT t.*, u.full_name
            FROM tasks t
            JOIN users u ON u.id = t.user_id
            WHERE t.id = ?
        """, (task_id,)).fetchone()
        if not task:
            abort(404)

        comments = conn.execute("""
            SELECT c.*, u.full_name
            FROM comments c
            JOIN users u ON u.id = c.user_id
            WHERE c.task_id = ?
            ORDER BY c.id ASC
        """, (task_id,)).fetchall()

    return render_template("task_detail.html", user=current_user(), task=task, comments=comments)


# --- JSON API for comments ---
@app.route("/api/tasks/<int:task_id>/comments", methods=["POST"])
@login_required
def api_add_comment(task_id: int):
    data = request.get_json(silent=True) or {}
    content = (data.get("content") or "").strip()

    if not content:
        return jsonify({"ok": False, "error": "Comment can't be empty."}), 400
    if len(content) > 1000:
        return jsonify({"ok": False, "error": "Comment too long."}), 400

    with db() as conn:
        exists = conn.execute("SELECT 1 FROM tasks WHERE id = ?", (task_id,)).fetchone()
        if not exists:
            return jsonify({"ok": False, "error": "Task not found."}), 404

        conn.execute("""
            INSERT INTO comments (task_id, user_id, content, created_at)
            VALUES (?, ?, ?, ?)
        """, (task_id, session["user_id"], content, datetime.utcnow().isoformat()))

        row = conn.execute("""
            SELECT c.*, u.full_name
            FROM comments c
            JOIN users u ON u.id = c.user_id
            WHERE c.id = last_insert_rowid()
        """).fetchone()

    return jsonify({
        "ok": True,
        "comment": {
            "id": row["id"],
            "full_name": row["full_name"],
            "content": row["content"],
            "created_at": row["created_at"],
        }
    })


init_db()

if __name__ == "__main__":
    app.run()

