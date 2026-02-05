// --- Simple i18n dictionary ---
const I18N = {
  ENG: {
    "nav.postTask": "Post Task",
    "nav.logout": "Logout",

    "auth.registerTitle": "Create account",
    "auth.registerSubtitle": "Register to access TaskiGE.",
    "auth.fullName": "Full name",
    "auth.email": "Email",
    "auth.password": "Set password",
    "auth.registerBtn": "Register",
    "auth.haveAccount": "Already have an account? Log in",

    "auth.loginTitle": "Log in",
    "auth.loginSubtitle": "Access TaskiGE tasks and post your own.",
    "auth.loginBtn": "Log in",
    "auth.noAccount": "No account? Register",

    "main.title": "Available tasks",
    "main.subtitle": "Pick a task and comment to communicate.",
    "main.emptyTitle": "No tasks yet",
    "main.emptySubtitle": "Be the first to post a task.",

    "post.title": "Post a task",
    "post.subtitle": "Minimal form: what you need, where you need it, paid or free.",
    "post.taskTitle": "Task title",
    "post.where": "Where do you need help?",
    "post.details": "What do you need help with?",
    "post.paidToggle": "Paid task",
    "post.payment": "Payment (optional)",
    "post.submit": "Publish",

    "task.paid": "Paid",
    "task.free": "Free",
    "task.by": "by",
    "task.back": "Back",

    "comments.title": "Comments",
    "comments.empty": "No comments yet. Start the conversation.",
    "comments.write": "Write a comment",
    "comments.send": "Send"
  },

  GEO: {
    "nav.postTask": "დავალების დადება",
    "nav.logout": "გასვლა",

    "auth.registerTitle": "ანგარიშის შექმნა",
    "auth.registerSubtitle": "რეგისტრაციის გარეშე წვდომა არ გაქვს.",
    "auth.fullName": "სახელი და გვარი",
    "auth.email": "ელ-ფოსტა",
    "auth.password": "პაროლის დაყენება",
    "auth.registerBtn": "რეგისტრაცია",
    "auth.haveAccount": "უკვე გაქვს ანგარიში? შესვლა",

    "auth.loginTitle": "შესვლა",
    "auth.loginSubtitle": "ნახე დავალებები და დადე შენი.",
    "auth.loginBtn": "შესვლა",
    "auth.noAccount": "არ გაქვს ანგარიში? რეგისტრაცია",

    "main.title": "დავალებები",
    "main.subtitle": "აირჩიე დავალება და დაწერე კომენტარი კომუნიკაციისთვის.",
    "main.emptyTitle": "ჯერ დავალებები არ არის",
    "main.emptySubtitle": "პირველმა დადე დავალება.",

    "post.title": "დავალების დადება",
    "post.subtitle": "მინიმალური ფორმა: რა გჭირდება, სად, ფასიანი თუ უფასო.",
    "post.taskTitle": "დავალების სათაური",
    "post.where": "სად გჭირდება დახმარება?",
    "post.details": "რას ეხება დახმარება?",
    "post.paidToggle": "ფასიანი დავალება",
    "post.payment": "ანაზღაურება (სურვილისამებრ)",
    "post.submit": "გამოქვეყნება",

    "task.paid": "ფასიანი",
    "task.free": "უფასო",
    "task.by": "ავტორი",
    "task.back": "უკან",

    "comments.title": "კომენტარები",
    "comments.empty": "კომენტარი ჯერ არ არის. დაიწყე საუბარი.",
    "comments.write": "დაწერე კომენტარი",
    "comments.send": "გაგზავნა"
  },

  RUS: {
    "nav.postTask": "Создать задачу",
    "nav.logout": "Выйти",

    "auth.registerTitle": "Создать аккаунт",
    "auth.registerSubtitle": "Без регистрации доступа нет.",
    "auth.fullName": "Имя и фамилия",
    "auth.email": "Email",
    "auth.password": "Придумайте пароль",
    "auth.registerBtn": "Регистрация",
    "auth.haveAccount": "Уже есть аккаунт? Войти",

    "auth.loginTitle": "Вход",
    "auth.loginSubtitle": "Смотрите задачи и публикуйте свои.",
    "auth.loginBtn": "Войти",
    "auth.noAccount": "Нет аккаунта? Регистрация",

    "main.title": "Задачи",
    "main.subtitle": "Откройте задачу и общайтесь в комментариях.",
    "main.emptyTitle": "Пока задач нет",
    "main.emptySubtitle": "Опубликуйте первую задачу.",

    "post.title": "Создать задачу",
    "post.subtitle": "Минимальная форма: что нужно, где, платно или бесплатно.",
    "post.taskTitle": "Название задачи",
    "post.where": "Где нужна помощь?",
    "post.details": "Что нужно сделать?",
    "post.paidToggle": "Платная задача",
    "post.payment": "Оплата (необязательно)",
    "post.submit": "Опубликовать",

    "task.paid": "Платно",
    "task.free": "Бесплатно",
    "task.by": "автор",
    "task.back": "Назад",

    "comments.title": "Комментарии",
    "comments.empty": "Комментариев нет. Начните общение.",
    "comments.write": "Напишите комментарий",
    "comments.send": "Отправить"
  }
};

function applyLang(lang) {
  const dict = I18N[lang] || I18N.ENG;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
}

(function initLanguage() {
  const select = document.getElementById("langSelect");
  if (!select) return;

  const saved = localStorage.getItem("TASKIGE_LANG") || "ENG";
  select.value = saved;
  applyLang(saved);

  select.addEventListener("change", () => {
    localStorage.setItem("TASKIGE_LANG", select.value);
    applyLang(select.value);
  });
})();


// --- Comments: async post without reloading ---
(async function initComments() {
  if (typeof window.TASK_ID === "undefined") return;

  const form = document.getElementById("commentForm");
  const input = document.getElementById("commentInput");
  const list = document.getElementById("commentList");
  const errorEl = document.getElementById("commentError");

  if (!form || !input || !list) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.textContent = "";

    const content = input.value.trim();
    if (!content) {
      errorEl.textContent = "Empty comment.";
      return;
    }

    try {
      const res = await fetch(`/api/tasks/${window.TASK_ID}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        errorEl.textContent = data.error || "Failed to send.";
        return;
      }

      // Add comment to DOM
      const c = data.comment;
      const item = document.createElement("div");
      item.className = "comment";
      item.innerHTML = `
        <div class="comment-head">
          <strong>${escapeHtml(c.full_name)}</strong>
          <span class="muted small">${formatDate(c.created_at)}</span>
        </div>
        <div class="comment-body">${escapeHtml(c.content)}</div>
      `;
      list.appendChild(item);
      input.value = "";
    } catch (err) {
      errorEl.textContent = "Network error.";
    }
  });

  function formatDate(iso) {
    return (iso || "").slice(0, 19).replace("T", " ");
  }
  function escapeHtml(s) {
    return (s || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
