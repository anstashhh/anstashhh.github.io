(function () {
  "use strict";

  const content = window.PORTFOLIO_CONTENT;
  const page = document.body.dataset.page || "home";
  const savedLanguage = localStorage.getItem("portfolio-language");
  let language = savedLanguage || ((navigator.language || "en").toLowerCase().startsWith("ru") ? "ru" : "en");

  const dictionary = {
    ru: {
      nav: { cv: "CV", color: "COLOR GRADING", compositing: "COMPOSITING", motion: "MOTION DESIGN + AI", software: "SOFTWARE", contacts: "КОНТАКТЫ" },
      skip: { home: "Перейти к разделам", cv: "Перейти к CV", color: "Перейти к работам по цветокоррекции", compositing: "Перейти к композитингу", motion: "Перейти к Motion Design и AI", software: "Перейти к разработкам", contacts: "Перейти к контактам" },
      labels: {
        menu: "Меню", close: "Закрыть меню", language: "Выбор языка", portrait: "ПОРТРЕТ / ДОБАВЬТЕ ФАЙЛ",
        about: "О СЕБЕ", work: "ОПЫТ", skills: "НАВЫКИ", education: "ОБРАЗОВАНИЕ",
        download: "СКАЧАТЬ CV", showreel: "SHOWREEL", addVideo: "ДОБАВЬТЕ ССЫЛКУ НА ВИДЕО", watchVimeo: "ОТКРЫТЬ НА VIMEO",
        projects: "ПРОЕКТЫ", optional: "ОПЦИОНАЛЬНО", watch: "СМОТРЕТЬ", project: "[НАЗВАНИЕ ПРОЕКТА]",
        projectMeta: "[РОЛЬ / ИНСТРУМЕНТЫ / ГОД]", email: "EMAIL", telegram: "TELEGRAM",
        nextProject: "ОБСУДИТЬ СЛЕДУЮЩИЙ ПРОЕКТ", emptyEmail: "[ВАШ EMAIL]", emptyTelegram: "[ВАШ TELEGRAM]"
      }
    },
    en: {
      nav: { cv: "CV", color: "COLOR GRADING", compositing: "COMPOSITING", motion: "MOTION DESIGN + AI", software: "SOFTWARE", contacts: "CONTACTS" },
      skip: { home: "Skip to work", cv: "Skip to CV", color: "Skip to color grading work", compositing: "Skip to compositing work", motion: "Skip to Motion Design and AI work", software: "Skip to software projects", contacts: "Skip to contacts" },
      labels: {
        menu: "Menu", close: "Close menu", language: "Language selection", portrait: "PORTRAIT / ADD FILE",
        about: "ABOUT", work: "WORK", skills: "SKILLS", education: "EDUCATION",
        download: "DOWNLOAD CV", showreel: "SHOWREEL", addVideo: "ADD VIDEO LINK", watchVimeo: "OPEN ON VIMEO",
        projects: "PROJECTS", optional: "OPTIONAL", watch: "WATCH", project: "[PROJECT TITLE]",
        projectMeta: "[ROLE / TOOLS / YEAR]", email: "EMAIL", telegram: "TELEGRAM",
        nextProject: "LET’S TALK ABOUT YOUR NEXT PROJECT", emptyEmail: "[YOUR EMAIL]", emptyTelegram: "[YOUR TELEGRAM]"
      }
    }
  };

  const pages = [
    ["cv", "cv.html"], ["motion", "motion-ai.html"], ["compositing", "compositing.html"],
    ["color", "color.html"], ["software", "software.html"], ["contacts", "contacts.html"]
  ];

  function t(path) {
    return path.split(".").reduce((value, key) => value && value[key], dictionary[language]);
  }

  function localized(value) {
    return value && typeof value === "object" ? value[language] : value;
  }

  function renderHeader() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;

    const navLinks = pages.map(([key, href]) =>
      `<a class="site-nav__link${page === key ? " is-active" : ""}" href="${href}"${page === key ? " aria-current=\"page\"" : ""}>${t(`nav.${key}`)}</a>`
    ).join("");

    const menuLinks = pages.filter(([key]) => key !== "cv").map(([key, href]) =>
      `<a class="mobile-menu__link${page === key ? " is-active" : ""}" href="${href}"${page === key ? " aria-current=\"page\"" : ""}>
        <span>${t(`nav.${key}`)}</span><span aria-hidden="true">→</span>
      </a>`
    ).join("");

    header.innerHTML = `
      <a class="brand brand--desktop" href="index.html">${localized(content.identity.name)}</a>
      <a class="brand brand--mobile" href="index.html">${localized(content.identity.shortName)}</a>
      <nav class="site-nav" aria-label="${language === "ru" ? "Основная навигация" : "Primary navigation"}">${navLinks}</nav>
      <div class="language-switch" role="group" aria-label="${t("labels.language")}">
        <button type="button" data-language="ru"${language === "ru" ? " aria-current=\"true\"" : ""}>RU</button>
        <span aria-hidden="true">/</span>
        <button type="button" data-language="en"${language === "en" ? " aria-current=\"true\"" : ""}>EN</button>
      </div>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="${t("labels.menu")}">
        <span></span><span></span><span></span>
      </button>
      <nav class="mobile-menu" id="mobile-menu" aria-label="${language === "ru" ? "Мобильная навигация" : "Mobile navigation"}">${menuLinks}</nav>`;

    header.querySelectorAll("[data-language]").forEach((button) => {
      button.addEventListener("click", () => {
        language = button.dataset.language;
        localStorage.setItem("portfolio-language", language);
        render();
      });
    });

    const toggle = header.querySelector(".menu-toggle");
    toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  }

  function setMenu(open) {
    const toggle = document.querySelector(".menu-toggle");
    if (!toggle) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", t(open ? "labels.close" : "labels.menu"));
    document.body.classList.toggle("menu-open", open);
  }

  function renderPortrait(target) {
    const element = document.querySelector(target);
    if (!element) return;
    if (content.identity.portrait) {
      element.innerHTML = `<img src="${content.identity.portrait}" alt="${localized(content.identity.name)}">`;
      element.classList.remove("is-empty");
    } else {
      element.textContent = t("labels.portrait");
      element.classList.add("is-empty");
    }
  }

  function videoId(url) {
    if (!url) return null;
    const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
    if (youtube) return { type: "youtube", id: youtube[1] };
    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) return { type: "vimeo", id: vimeo[1] };
    if (/\.(mp4|webm)(?:\?|$)/i.test(url)) return { type: "video", id: url };
    return { type: "link", id: url };
  }

  function renderVideo(element, url, label, duration) {
    if (!element) return;
    const source = videoId(url);
    if (!source) {
      element.innerHTML = `<div class="video-placeholder"><span class="video-placeholder__play" aria-hidden="true"></span><strong>${label}</strong><small>${t("labels.addVideo")}</small></div>`;
      element.classList.add("is-empty");
      return;
    }
    element.classList.remove("is-empty");
    if (source.type === "youtube") {
      element.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${source.id}" title="${label}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    } else if (source.type === "vimeo") {
      element.innerHTML = `<iframe src="https://player.vimeo.com/video/${source.id}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" title="${label}" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" allowfullscreen></iframe><a class="video-external" href="${url}" target="_blank" rel="noopener">${t("labels.watchVimeo")} ↗</a>`;
    } else if (source.type === "video") {
      element.innerHTML = `<video controls preload="metadata"><source src="${source.id}"></video>`;
    } else {
      element.innerHTML = `<a class="video-placeholder" href="${source.id}" target="_blank" rel="noopener"><span class="video-placeholder__play" aria-hidden="true"></span><strong>${label}</strong><small>${t("labels.watch")} ${duration || ""} ↗</small></a>`;
    }
  }

  function renderHome() {
    renderPortrait("[data-home-portrait]");
    document.querySelectorAll("[data-name]").forEach((el) => { el.textContent = localized(content.identity.name); });
    document.querySelectorAll("[data-title]").forEach((el) => { el.textContent = localized(content.identity.title); });
  }

  function renderCv() {
    renderPortrait("[data-cv-portrait]");
    const name = document.querySelector("[data-cv-name]");
    const title = document.querySelector("[data-cv-title]");
    if (name) name.textContent = localized(content.identity.name);
    if (title) title.textContent = localized(content.identity.title);
    document.querySelectorAll("[data-cv-about]").forEach((element) => {
      element.textContent = localized(content.cv.about);
    });
    document.querySelectorAll("[data-cv-label]").forEach((el) => { el.textContent = t(`labels.${el.dataset.cvLabel}`); });

    const work = document.querySelector("[data-cv-work]");
    if (work) work.innerHTML = content.cv.work.map((entry) => `<article class="cv-entry"><p class="cv-entry__meta">${entry.period}</p><h2>${localized(entry.title)}</h2><p>${localized(entry.text)}</p>${entry.bullets ? `<ul class="cv-bullets">${localized(entry.bullets).map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}</article>`).join("");
    const skills = document.querySelector("[data-cv-skills]");
    if (skills) skills.innerHTML = `<ul class="skill-list">${content.cv.skills.map((skill) => `<li><strong>${localized(skill.title)}</strong><span>${localized(skill.text)}</span></li>`).join("")}</ul><div class="software-grid">${content.cv.software.map((software) => `<div class="software-badge"><span class="software-badge__icon">${softwareIcon(software)}</span><span>${software}</span></div>`).join("")}</div>`;
    const education = document.querySelector("[data-cv-education]");
    if (education) education.textContent = localized(content.cv.education);
    const download = document.querySelector("[data-cv-download]");
    if (download) {
      download.textContent = `${t("labels.download")} ↘`;
      download.href = content.cv.pdf || "#";
      download.setAttribute("aria-disabled", String(!content.cv.pdf));
    }
  }

  function softwareIcon(name) {
    const icons = {
      "DaVinci Resolve": `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 8a9 9 0 0 1 7 14L24 34l-7-12A9 9 0 0 1 24 8Z"/><path d="M11 31a9 9 0 0 1 8-13l7 12-14 1Z"/><path d="M37 31a9 9 0 0 1-15 0l7-12 8 12Z"/></svg>`,
      "After Effects": `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="8" width="36" height="32"/><path d="M13 32 19 17l6 15M15 27h8M28 22h8M28 27h7M28 32h8"/></svg>`,
      "Fusion": `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="17" cy="24" r="9"/><circle cx="31" cy="24" r="9"/><path d="M17 15 31 33M31 15 17 33"/></svg>`,
      "Nuke": `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="8" width="34" height="32"/><circle cx="15" cy="16" r="2"/><circle cx="33" cy="16" r="2"/><circle cx="15" cy="32" r="2"/><circle cx="33" cy="32" r="2"/><path d="m15 16 18 16M33 16 15 32"/></svg>`,
      "Blender": `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="m8 22 16-1-8-7m8 7-3-11m3 11c11-1 16 3 16 10 0 6-6 10-14 10-9 0-15-4-15-10 0-5 5-9 13-10Z"/><circle cx="27" cy="31" r="5"/></svg>`,
      "ComfyUI": `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="11" cy="24" r="4"/><circle cx="25" cy="13" r="4"/><circle cx="37" cy="24" r="4"/><circle cx="25" cy="35" r="4"/><path d="m15 22 6-6m8 0 5 5m0 6-5 5m-8 0-6-6"/></svg>`
    };
    return icons[name] || "";
  }

  function renderColor() {
    renderVideo(document.querySelector("[data-color-showreel]"), content.color.showreel, `COLOR GRADING ${t("labels.showreel")}`, content.color.showreelDuration);
    const list = document.querySelector("[data-color-projects]");
    if (!list) return;
    list.innerHTML = content.color.projects.map((project) => `
      <article class="project-block">
        <header class="project-header"><h1>${localized(project.title)}</h1><p>${localized(project.meta)}</p></header>
        <div class="stills-grid">${project.images.map((image, imageIndex) => `
          <figure class="still"><img src="${image}" width="${(project.imageSize || [1920, 1080])[0]}" height="${(project.imageSize || [1920, 1080])[1]}" alt="${localized(project.title)}, ${language === "ru" ? "кадр" : "still"} ${imageIndex + 1}" loading="lazy" decoding="async"></figure>
        `).join("")}</div>
      </article>`).join("");
  }

  function renderCompositing() {
    renderVideo(document.querySelector("[data-compositing-showreel]"), content.compositing.showreel, `COMPOSITING ${t("labels.showreel")}`, content.compositing.showreelDuration);
    const links = document.querySelector("[data-compositing-links]");
    if (!links) return;
    if (!content.compositing.links.length) {
      links.hidden = true;
      return;
    }
    links.hidden = false;
    links.querySelector("h2").textContent = `${t("labels.projects")} / ${t("labels.optional")}`;
    links.querySelector("div").innerHTML = content.compositing.links.map((item, index) => `<a class="project-link" href="${item.url}" target="_blank" rel="noopener"><span class="signal-index">0${index + 1}</span><span>${localized(item.title)}</span><span>${t("labels.watch")} ↗</span></a>`).join("");
  }

  function renderMotion() {
    const list = document.querySelector("[data-motion-projects]");
    if (!list) return;
    const projects = content.motion.projects.length ? content.motion.projects : [{ title: { ru: t("labels.project"), en: t("labels.project") }, meta: { ru: t("labels.projectMeta"), en: t("labels.projectMeta") }, video: "" }];
    list.innerHTML = projects.map((project, index) => `<article class="motion-project"><header class="project-header"><h1>${localized(project.title)}</h1><p>${localized(project.meta)}</p></header><div class="video-shell" data-motion-video="${index}"></div></article>`).join("");
    projects.forEach((project, index) => renderVideo(list.querySelector(`[data-motion-video="${index}"]`), project.video, localized(project.title), project.duration));
  }

  function softwareMark(index) {
    if (index === 0) {
      return `<svg viewBox="0 0 64 40" aria-hidden="true"><path d="M23 9 12 20l11 11M41 9l11 11-11 11M36 5 28 35"/></svg>`;
    }
    return `<svg viewBox="0 0 64 40" aria-hidden="true"><circle cx="18" cy="20" r="6"/><circle cx="46" cy="11" r="4"/><circle cx="46" cy="29" r="4"/><path d="M24 20h9l9-9M33 20l9 9"/></svg>`;
  }

  function renderSoftware() {
    const intro = document.querySelector("[data-software-intro]");
    const list = document.querySelector("[data-software-projects]");
    if (intro) intro.textContent = localized(content.software.intro);
    if (!list) return;
    list.innerHTML = content.software.projects.map((project, index) => {
      const tag = project.url ? "a" : "div";
      const attributes = project.url ? `href="${project.url}" target="_blank" rel="noopener"` : `aria-disabled="true"`;
      return `<${tag} class="software-row" ${attributes}>
        <span class="software-row__mark">${softwareMark(index)}</span>
        <span><strong>${localized(project.title)}</strong><small>${localized(project.meta)}</small></span>
        <span class="software-row__arrow" aria-hidden="true">${project.url ? "↗" : "—"}</span>
      </${tag}>`;
    }).join("");
  }

  function renderContacts() {
    const heading = document.querySelector("[data-contact-heading]");
    if (heading) heading.textContent = `${t("labels.nextProject")}.`;
    const email = document.querySelector("[data-contact-email]");
    const telegram = document.querySelector("[data-contact-telegram]");
    const emailValue = content.contacts.email || t("labels.emptyEmail");
    const telegramValue = content.contacts.telegram || t("labels.emptyTelegram");
    if (email) {
      email.hidden = !content.contacts.email;
      email.href = content.contacts.email ? `mailto:${content.contacts.email}` : "#";
      email.innerHTML = `<span>${t("labels.email")}</span><span>/</span><span>${emailValue}</span><span aria-hidden="true">↗</span>`;
      email.setAttribute("aria-disabled", String(!content.contacts.email));
    }
    if (telegram) {
      telegram.hidden = !content.contacts.telegram;
      telegram.classList.toggle("contact-link--primary", !content.contacts.email && Boolean(content.contacts.telegram));
      const telegramUrl = content.contacts.telegram ? (content.contacts.telegram.startsWith("http") ? content.contacts.telegram : `https://t.me/${content.contacts.telegram.replace(/^@/, "")}`) : "#";
      telegram.href = telegramUrl;
      telegram.innerHTML = `<span>${t("labels.telegram")}</span><span>/</span><span>${telegramValue}</span><span aria-hidden="true">↗</span>`;
      telegram.setAttribute("aria-disabled", String(!content.contacts.telegram));
    }
  }

  function setDocumentMeta() {
    document.documentElement.lang = language;
    const pageName = page === "home" ? localized(content.identity.title) : t(`nav.${page}`);
    document.title = `${localized(content.identity.name)} — ${pageName}`;
    const skipLink = document.querySelector(".skip-link");
    if (skipLink) skipLink.textContent = t(`skip.${page}`);
  }

  function render() {
    document.body.classList.remove("menu-open");
    setDocumentMeta();
    renderHeader();
    if (page === "home") renderHome();
    if (page === "cv") renderCv();
    if (page === "color") renderColor();
    if (page === "compositing") renderCompositing();
    if (page === "motion") renderMotion();
    if (page === "software") renderSoftware();
    if (page === "contacts") renderContacts();
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  render();
})();
