// static/app.js

const I18N = {
  en: {
    post_task: "Post Task",
    logout: "Logout",
    about: "About",
    contact: "Contact",
    terms: "Terms",
    privacy: "Privacy",
    view_task: "View Task",
    help_until_label: "When you need help:",
    no_tasks: "No tasks yet. Post the first one.",
    create_task: "Create Task",
    task_title: "Title",
    task_desc: "Description",
    location: "Location",
    payment: "Payment",
    amount: "Amount ($)",
    comments: "Comments",
    send: "Send",
    no_comments: "No comments yet.",
    email: "Email",
    password: "Set password",
    full_name: "Full name",
    register: "Register",
    login: "Login",
    login_sub: "Login to continue",
    register_sub: "Create your account",
    no_account: "No account?",
    have_account: "Already have an account?",
    avatar_optional: "Profile picture (optional)",
    delete_task: "Delete",

    about_nav: "About",

    about_title: "About TaskiGE",
    about_intro:
      "TaskiGE is a simple community website where people can post tasks and get help from others. Posting tasks is free, and using the website is free.",
    about_free: "✅ 100% free to post tasks — no fees, no subscriptions.",
    about_goal:
      "🎯 Our goal is to make everyday help fast and easy — one clean place to ask and respond.",
    about_simple: "🖤 Minimal design, simple pages, no complicated steps.",
    about_how_title: "How it works",
    about_step1:
      "Create an account (email + name + password). Optional profile photo.",
    about_step2:
      "Post a task: write what you need, when you need help, and choose Paid or Free.",
    about_step3:
      "Other users can comment. Non-authors only see their own comments. The task author can see all comments.",
    about_rules_title: "Basic rules",
    about_rule1: "Be respectful. No harassment, hate, or spam.",
    about_rule2:
      "Do not share private information (bank cards, passwords, etc.).",
    about_rule3:
      "Tasks should be clear: what you need, where, when, and (optional) payment.",
    about_privacy_title: "Privacy & safety",
    about_privacy:
      "We keep things minimal. Comments are private to the commenter (others can't see them) and visible to the task author. Avoid sharing sensitive personal data.",
    about_delete_title: "Auto-delete (72 hours)",
    about_delete:
      "To keep the website clean and fresh, tasks automatically delete after 72 hours. Task authors can also delete their own tasks anytime.",
    about_disclaimer_title: "Disclaimer",
    about_disclaimer:
      "TaskiGE is a community platform. Users are responsible for agreements, payments, and outcomes. Be careful when meeting in real life — prefer public places and clear communication.",

    // Install
    install_app: "Install App",
    install_title: "Install TaskiGE",
    install_android_text:
      "Tap “Install” to add TaskiGE to your home screen like an app.",
    install_ios_text:
      "To install on iPhone/iPad:\n1) Open in Safari\n2) Tap Share\n3) Tap “Add to Home Screen”",
  },

  ka: {
    post_task: "დავალების დამატება",
    logout: "გასვლა",
    about: "ჩვენ შესახებ",
    contact: "კონტაქტი",
    terms: "წესები",
    privacy: "კონფიდენციალურობა",
    view_task: "დავალების ნახვა",
    help_until_label: "როდის გჭირდება დახმარება:",
    no_tasks: "დავალებები ჯერ არ არის. დაამატე პირველი.",
    create_task: "დავალების შექმნა",
    task_title: "სათაური",
    task_desc: "აღწერა",
    location: "ლოკაცია",
    payment: "ანაზღაურება",
    amount: "თანხა ($)",
    comments: "კომენტარები",
    send: "გაგზავნა",
    no_comments: "კომენტარი ჯერ არ არის.",
    email: "ელ-ფოსტა",
    password: "პაროლი",
    full_name: "სრული სახელი",
    register: "რეგისტრაცია",
    login: "შესვლა",
    login_sub: "გაგრძელებისთვის შედი",
    register_sub: "შექმენი ანგარიში",
    no_account: "არ გაქვს ანგარიში?",
    have_account: "უკვე გაქვს ანგარიში?",
    avatar_optional: "პროფილის ფოტო (სურვილისამებრ)",
    delete_task: "წაშლა",

    about_nav: "ჩვენ შესახებ",

    about_title: "TaskiGE — ჩვენ შესახებ",
    about_intro:
      "TaskiGE არის მარტივი საზოგადოებრივი ვებგვერდი, სადაც ადამიანები აქვეყნებენ დავალებებს და იღებენ დახმარებას სხვებისგან. დავალების დადებაც უფასოა და საიტის გამოყენებაც უფასოა.",
    about_free:
      "✅ 100% უფასოა დავალების დამატება — არანაირი საფასური და გამოწერა.",
    about_goal:
      "🎯 მიზანი: ყოველდღიური დახმარება იყოს სწრაფი და მარტივი — ერთ სუფთა ადგილზე.",
    about_simple:
      "🖤 მინიმალისტური დიზაინი, მარტივი გვერდები, ზედმეტი ნაბიჯების გარეშე.",
    about_how_title: "როგორ მუშაობს",
    about_step1:
      "შექმენი ანგარიში (ელ-ფოსტა + სახელი + პაროლი). პროფილის ფოტო სურვილისამებრ.",
    about_step2:
      "დაამატე დავალება: დაწერე რა გჭირდება, როდის გჭირდება დახმარება და აირჩიე ფასიანი ან უფასო.",
    about_step3:
      "სხვა მომხმარებლებს შეუძლიათ დაკომენტარება. ავტორი არ არის? დაინახავ მხოლოდ საკუთარ კომენტარებს. დავალების ავტორი ხედავს ყველას.",
    about_rules_title: "ძირითადი წესები",
    about_rule1:
      "იყავი ზრდილობიანი. არანაირი შეურაცხყოფა, სიძულვილი ან სპამი.",
    about_rule2:
      "არ გააზიაროთ პირადი სენსიტიური ინფორმაცია (ბარათები, პაროლები და ა.შ.).",
    about_rule3:
      "დავალება იყოს გასაგები: რა გჭირდება, სად, როდის და (სურვილისამებრ) ანაზღაურება.",
    about_privacy_title: "კონფიდენციალურობა და უსაფრთხოება",
    about_privacy:
      "ვტოვებთ ყველაფერს მარტივად. კომენტარები კონფიდენციალურია კომენტარის ავტორისთვის (სხვები ვერ ხედავენ) და ჩანს დავალების ავტორთან. არ გააზიაროთ სენსიტიური მონაცემები.",
    about_delete_title: "ავტომატური წაშლა (72 საათი)",
    about_delete:
      "საიტის სისუფთავისთვის დავალებები ავტომატურად იშლება 72 საათში. ავტორს შეუძლია თავისი დავალების წაშლა ნებისმიერ დროს.",
    about_disclaimer_title: "გაფრთხილება",
    about_disclaimer:
      "TaskiGE არის საზოგადოებრივი პლატფორმა. შეთანხმებები, ანაზღაურება და შედეგები მომხმარებლების პასუხისმგებლობაა. რეალურ შეხვედრაზე იყავით ფრთხილად — სჯობს საჯარო ადგილი და მკაფიო კომუნიკაცია.",

    // Install
    install_app: "აპის დაყენება",
    install_title: "TaskiGE-ის დაყენება",
    install_android_text:
      "დააჭირე “Install”-ს და TaskiGE დაემატება მთავარ ეკრანზე აპივით.",
    install_ios_text:
      "iPhone/iPad-ზე დასაყენებლად:\n1) გახსენი Safari-ში\n2) დააჭირე Share-ს\n3) აირჩიე “Add to Home Screen”",
  },

  ru: {
    post_task: "Создать задачу",
    logout: "Выйти",
    about: "О нас",
    contact: "Контакты",
    terms: "Условия",
    privacy: "Конфиденциальность",
    view_task: "Открыть",
    help_until_label: "Когда нужна помощь:",
    no_tasks: "Задач пока нет. Создайте первую.",
    create_task: "Создать задачу",
    task_title: "Заголовок",
    task_desc: "Описание",
    location: "Локация",
    payment: "Оплата",
    amount: "Сумма ($)",
    comments: "Комментарии",
    send: "Отправить",
    no_comments: "Комментариев пока нет.",
    email: "Email",
    password: "Пароль",
    full_name: "Полное имя",
    register: "Регистрация",
    login: "Вход",
    login_sub: "Войдите, чтобы продолжить",
    register_sub: "Создайте аккаунт",
    no_account: "Нет аккаунта?",
    have_account: "Уже есть аккаунт?",
    avatar_optional: "Фото профиля (необязательно)",
    delete_task: "Удалить",

    about_nav: "О нас",

    about_title: "О TaskiGE",
    about_intro:
      "TaskiGE — это простой сайт сообщества, где люди публикуют задачи и получают помощь от других. Публикация задач бесплатна, и использование сайта бесплатно.",
    about_free: "✅ 100% бесплатно публиковать задачи — без комиссий и подписок.",
    about_goal:
      "🎯 Цель: сделать бытовую помощь быстрой и простой — в одном чистом месте.",
    about_simple: "🖤 Минималистичный дизайн, простые страницы, без лишних шагов.",
    about_how_title: "Как это работает",
    about_step1:
      "Создайте аккаунт (email + имя + пароль). Фото профиля — по желанию.",
    about_step2:
      "Опубликуйте задачу: что нужно, когда нужна помощь, и выберите Paid или Free.",
    about_step3:
      "Другие пользователи могут оставлять комментарии. Не автор? Вы видите только свои комментарии. Автор задачи видит все.",
    about_rules_title: "Основные правила",
    about_rule1: "Будьте вежливы. Без оскорблений, ненависти и спама.",
    about_rule2: "Не публикуйте личные данные (карты, пароли и т.д.).",
    about_rule3:
      "Задачи должны быть понятными: что нужно, где, когда и (при желании) оплата.",
    about_privacy_title: "Приватность и безопасность",
    about_privacy:
      "Мы держим всё минимальным. Комментарии приватны для автора комментария (другие их не видят) и видны автору задачи. Не делитесь чувствительными данными.",
    about_delete_title: "Автоудаление (72 часа)",
    about_delete:
      "Чтобы лента оставалась свежей, задачи автоматически удаляются через 72 часа. Автор может удалить свою задачу в любой момент.",
    about_disclaimer_title: "Отказ от ответственности",
    about_disclaimer:
      "TaskiGE — платформа сообщества. Пользователи сами отвечают за договоренности, оплату и результат. При встречах офлайн будьте осторожны — лучше публичные места и ясная коммуникация.",

    // Install
    install_app: "Установить",
    install_title: "Установить TaskiGE",
    install_android_text:
      "Нажмите “Install”, чтобы добавить TaskiGE на главный экран как приложение.",
    install_ios_text:
      "Чтобы установить на iPhone/iPad:\n1) Откройте в Safari\n2) Нажмите Share\n3) Выберите “Add to Home Screen”",
  },
};

function getLang() {
  return localStorage.getItem("taskige_lang") || "en";
}

function setLang(lang) {
  localStorage.setItem("taskige_lang", lang);
}

function applyI18n(lang) {
  const dict = I18N[lang] || I18N.en;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  const lbl = document.getElementById("langLabel");
  if (lbl) lbl.textContent = lang === "en" ? "EN" : lang === "ka" ? "GEO" : "RUS";
}

function setupLangMenu() {
  const btn = document.getElementById("langBtn");
  const menu = document.getElementById("langMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => menu.classList.toggle("open"));

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove("open");
    }
  });

  menu.querySelectorAll(".lang-item").forEach((item) => {
    item.addEventListener("click", () => {
      const lang = item.getAttribute("data-lang");
      setLang(lang);
      applyI18n(lang);
      menu.classList.remove("open");
      // refresh modal text if open
      updateInstallModalText();
    });
  });
}

// -------------------- PWA INSTALL --------------------
let deferredPrompt = null;

function isIos() {
  const ua = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(ua);
}

function isInStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function showInstallButton() {
  const btn = document.getElementById("installBtn");
  if (btn) btn.style.display = "inline-flex";
}

function hideInstallButton() {
  const btn = document.getElementById("installBtn");
  if (btn) btn.style.display = "none";
}

function openInstallModal() {
  const modal = document.getElementById("installModal");
  if (!modal) return;
  updateInstallModalText();
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeInstallModal() {
  const modal = document.getElementById("installModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function updateInstallModalText() {
  const lang = getLang();
  const dict = I18N[lang] || I18N.en;
  const textBox = document.getElementById("installText");
  if (!textBox) return;

  const text = isIos() ? dict.install_ios_text : dict.install_android_text;

  // Render with newlines as <br> and numbered lines as <ol> if possible
  if (text.includes("\n1)") || text.includes("\n1)")) {
    const lines = text.split("\n");
    const first = lines.shift();
    const steps = lines.map(l => l.replace(/^\d\)\s*/, ""));
    textBox.innerHTML =
      `<p>${escapeHtml(first)}</p>` +
      `<ol>${steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ol>`;
  } else {
    textBox.textContent = text;
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setupInstall() {
  const installBtn = document.getElementById("installBtn");
  const closeBtn = document.getElementById("installClose");
  const modal = document.getElementById("installModal");

  if (closeBtn) closeBtn.addEventListener("click", closeInstallModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeInstallModal(); // click outside closes
    });
  }

  // If already installed → hide
  if (isInStandaloneMode()) {
    hideInstallButton();
    return;
  }

  // iOS: no install prompt → show button that opens instructions
  if (isIos()) {
    showInstallButton();
    if (installBtn) {
      installBtn.addEventListener("click", () => openInstallModal());
    }
    return;
  }

  // Android/Chrome: wait for beforeinstallprompt
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
  });

  if (installBtn) {
    installBtn.addEventListener("click", async () => {
      if (!deferredPrompt) {
        // if not available yet, show instructions modal
        openInstallModal();
        return;
      }
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      deferredPrompt = null;
      if (choice && choice.outcome === "accepted") {
        hideInstallButton();
      }
    });
  }

  // If installed later
  window.addEventListener("appinstalled", () => {
    hideInstallButton();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = getLang();
  applyI18n(lang);
  setupLangMenu();
  setupInstall();
});
