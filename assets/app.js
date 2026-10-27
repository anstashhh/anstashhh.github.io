(function () {
  "use strict";

  const content = window.PORTFOLIO_CONTENT;
  const page = document.body.dataset.page || "home";
  const savedLanguage = localStorage.getItem("portfolio-language");
  let language = savedLanguage || ((navigator.language || "en").toLowerCase().startsWith("ru") ? "ru" : "en");

  const dictionary = {
    ru: {
      nav: { cv: "CV", color: "COLOR GRADING", compositing: "COMPOSITING", motion: "MOTION DESIGN + AI", software: "SOFTWARE", contacts: "CONTACT" },
      skip: { home: "Перейти к разделам", cv: "Перейти к CV", color: "Перейти к работам по цветокоррекции", compositing: "Перейти к композитингу", motion: "Перейти к Motion Design и AI", software: "Перейти к разработкам", contacts: "Перейти к контактам" },
      labels: {
        menu: "Меню", close: "Закрыть меню", language: "Выбор языка", portrait: "ПОРТРЕТ / ДОБАВЬТЕ ФАЙЛ",
        about: "О СЕБЕ", work: "ОПЫТ", skills: "НАВЫКИ", education: "ОБРАЗОВАНИЕ",
        download: "СКАЧАТЬ CV", showreel: "SHOWREEL", addVideo: "ДОБАВЬТЕ ССЫЛКУ НА ВИДЕО", watchVimeo: "ОТКРЫТЬ НА VIMEO",
        projects: "ПРОЕКТЫ", optional: "ОПЦИОНАЛЬНО", watch: "СМОТРЕТЬ", project: "[НАЗВАНИЕ ПРОЕКТА]",
        projectMeta: "[РОЛЬ / ИНСТРУМЕНТЫ / ГОД]", email: "EMAIL", telegram: "TELEGRAM",
        nextProject: "Давайте обсудим ваш следующий проект", emptyEmail: "[ВАШ EMAIL]", emptyTelegram: "[ВАШ TELEGRAM]"
      }
    },
    en: {
      nav: { cv: "CV", color: "COLOR GRADING", compositing: "COMPOSITING", motion: "MOTION DESIGN + AI", software: "SOFTWARE", contacts: "CONTACT" },
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
    ["cv", "cv.html"], ["motion", "motion-ai.html"], ["color", "color.html"],
    ["compositing", "compositing.html"], ["software", "software.html"], ["contacts", "contacts.html"]
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
      <a class="brand brand--desktop" href="index.html">${content.identity.name.en}</a>
      <a class="brand brand--mobile" href="index.html">${content.identity.name.en}</a>
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
    if (target === "[data-home-portrait]" && window.matchMedia("(max-width: 42rem)").matches) {
      element.replaceChildren();
      return;
    }
    if (content.identity.portrait) {
      element.innerHTML = responsiveImage(content.identity.portrait, {
        width: 893, height: 1600, alt: localized(content.identity.name), loading: "eager", priority: "high",
        sizes: target === "[data-home-portrait]" ? "(max-width: 64rem) 50vw, 26vw" : "(max-width: 42rem) 30vw, 288px"
      });
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

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }

  // Use the smallest suitable high-quality image, retaining the original WebP fallback.
  function responsiveImage(src, options = {}) {
    const { width = 1280, height = 720, alt = "", loading = "lazy", priority = "auto", sizes = "100vw" } = options;
    const fullWidth = src.endsWith("/portrait.webp") ? 893 : /-poster\.webp$/.test(src) ? 1280 : 1920;
    const widths = [480, 960, 1440, fullWidth].filter((value, index, values) => value <= fullWidth && values.indexOf(value) === index).sort((a, b) => a - b);
    const base = src.replace(/\.webp$/, "");
    const source = src.endsWith(".webp") ? `<source type="image/avif" srcset="${widths.map(w => `${base}-i26-${w}.avif ${w}w`).join(", ")}" sizes="${escapeHtml(sizes)}">` : "";
    return `<picture>${source}<img src="${escapeHtml(src)}" width="${width}" height="${height}" alt="${escapeHtml(alt)}" loading="${loading}" decoding="async" fetchpriority="${priority}"></picture>`;
  }

  function renderVideo(element, media, label, duration, index = 0) {
    if (!element) return;
    const config = typeof media === "string" ? { source: media } : (media || {});
    const providers = ["youtube", "vimeo", "source"].filter((key) => config[key] && (key !== "vimeo" || config.vimeoEnabled !== false));
    if (!providers.length) {
      element.innerHTML = `<div class="video-placeholder"><span class="video-placeholder__play" aria-hidden="true"></span><strong>${label}</strong><small>${t("labels.addVideo")}</small></div>`;
      element.classList.add("is-empty");
      return;
    }
    element.classList.remove("is-empty");
    let provider = providers[0];
    let frame;
    // A local poster appears immediately; third-party code is loaded only on play.
    element.innerHTML = `<div class="video-stage"></div>${providers.length > 1 ? `<div class="video-providers" role="group" aria-label="${language === "ru" ? "Видеохостинг" : "Video provider"}">${providers.map((key) => `<button type="button" data-provider="${key}" aria-pressed="${key === provider}">${key === "youtube" ? "YouTube" : "Vimeo"}</button>`).join("")}</div>` : ""}`;
    const stage = element.querySelector(".video-stage");
    function showPoster() {
      const playLabel = `${language === "ru" ? "Воспроизвести" : "Play"}: ${label}`;
      stage.innerHTML = `<button class="video-poster" type="button" aria-label="${escapeHtml(playLabel)}">${config.poster ? responsiveImage(config.poster, { loading: index === 0 ? "eager" : "lazy", priority: index === 0 ? "high" : "low", sizes: "(max-width: 100rem) calc(100vw - 3rem), 1600px" }) : ""}<span class="video-play" aria-hidden="true"></span><span class="video-poster__label">${language === "ru" ? "СМОТРЕТЬ" : "PLAY"}</span></button>`;
      stage.querySelector("button").addEventListener("click", mountPlayer);
    }
    function mountPlayer() {
      const source = videoId(config[provider]);
      if (!source) return;
      if (source.type === "video") {
        frame = document.createElement("video");
        frame.src = source.id;
        frame.controls = true;
        frame.playsInline = true;
      } else if (source.type === "youtube" || source.type === "vimeo") {
        frame = document.createElement("iframe");
        frame.src = source.type === "youtube"
          ? `https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&playsinline=1&rel=0`
          : `https://player.vimeo.com/video/${source.id}?autoplay=1&title=0&byline=0&portrait=0&badge=0&vimeo_logo=0&dnt=1&playsinline=1`;
        frame.title = label;
        frame.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
        frame.allowFullscreen = true;
        frame.referrerPolicy = "strict-origin-when-cross-origin";
      } else return;
      stage.replaceChildren(frame);
      frame.focus();
      if (source.type === "video") frame.play().catch(() => {});
    }
    element.querySelectorAll("[data-provider]").forEach((button) => button.addEventListener("click", () => {
      if (provider === button.dataset.provider) return;
      provider = button.dataset.provider;
      element.querySelectorAll("[data-provider]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      frame = null;
      showPoster();
    }));
    showPoster();
  }

  function renderProfessionalTitle(element) {
    if (!element) return;
    element.innerHTML = '<span>VIDEO POST PRODUCTION /</span><span>MOTION + AI <small>SPECIALIST</small></span>';
  }

  function renderHome() {
    renderPortrait("[data-home-portrait]");
    document.querySelectorAll("[data-name]").forEach((el) => { el.textContent = localized(content.identity.name); });
    document.querySelectorAll("[data-title]").forEach(renderProfessionalTitle);
    document.querySelectorAll("[data-home-contacts]").forEach((el) => { el.textContent = t("nav.contacts"); });
  }

  function renderCv() {
    renderPortrait("[data-cv-portrait]");
    const name = document.querySelector("[data-cv-name]");
    const title = document.querySelector("[data-cv-title]");
    if (name) name.textContent = localized(content.identity.name);
    renderProfessionalTitle(title);
    document.querySelectorAll("[data-cv-about]").forEach((element) => {
      element.textContent = localized(content.cv.about);
    });
    document.querySelectorAll("[data-cv-label]").forEach((el) => { el.textContent = t(`labels.${el.dataset.cvLabel}`); });

    const work = document.querySelector("[data-cv-work]");
    if (work) work.innerHTML = content.cv.work.map((entry) => `<article class="cv-entry"><p class="cv-entry__meta">${localized(entry.period)}</p><h2>${localized(entry.title)}</h2><p>${localized(entry.text)}</p>${entry.bullets ? `<ul class="cv-bullets">${localized(entry.bullets).map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}</article>`).join("");
    const skills = document.querySelector("[data-cv-skills]");
    if (skills) skills.innerHTML = `<ul class="skill-list">${content.cv.skills.map((skill) => `<li><strong>${localized(skill.title)}</strong><span>${localized(skill.text)}</span></li>`).join("")}</ul><div class="software-grid">${content.cv.software.map((software) => `<div class="software-badge"><span class="software-badge__icon">${softwareIcon(software)}</span><span>${software}</span></div>`).join("")}</div>`;
    const education = document.querySelector("[data-cv-education]");
    if (education) education.textContent = localized(content.cv.education);
  }

  function softwareIcon(name) {
    const icons = {
      "DaVinci Resolve": "davinci-resolve-white.svg",
      "After Effects": "after-effects-white-outline.svg",
      "Fusion": "fusion-white.svg",
      "Nuke": "foundry-nuke-white.svg",
      "Blender": "blender-white.svg",
      "ComfyUI": "comfyui-white-outline.svg"
    };
    return icons[name] ? `<img src="assets/images/${icons[name]}" width="64" height="64" alt="" loading="lazy">` : "";
  }

  function renderColor() {
    renderVideo(document.querySelector("[data-color-showreel]"), content.color.showreel, `COLOR GRADING ${t("labels.showreel")}`, content.color.showreelDuration);
    const list = document.querySelector("[data-color-projects]");
    if (!list) return;
    list.innerHTML = content.color.projects.map((project) => `
      <article class="project-block">
        <header class="project-header"><h1>${localized(project.title)}</h1>${project.kinopoisk ? `<a class="project-kinopoisk" href="${escapeHtml(project.kinopoisk)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(localized(project.title))} — ${language === "ru" ? "КИНОПОИСК" : "KINOPOISK"}">${language === "ru" ? "КИНОПОИСК" : "KINOPOISK"} <span aria-hidden="true">↗</span></a>` : ""}<p>${localized(project.meta)}</p></header>
        <div class="stills-grid">${project.images.map((image, imageIndex) => `
          <figure class="still">${responsiveImage(image, { width: (project.imageSize || [1920, 1080])[0], height: (project.imageSize || [1920, 1080])[1], alt: `${localized(project.title)}, ${language === "ru" ? "кадр" : "still"} ${imageIndex + 1}`, sizes: "(max-width: 42rem) calc(100vw - 1.4rem), (max-width: 100rem) calc(50vw - 3rem), 770px" })}</figure>
        `).join("")}</div>
      </article>`).join("");
  }

  function renderCompositing() {
    renderVideo(document.querySelector("[data-compositing-showreel]"), content.compositing.showreel, `COMPOSITING ${t("labels.showreel")}`, content.compositing.showreelDuration);
    const notes = document.querySelector("[data-compositing-notes]");
    if (notes) notes.innerHTML = `<h2>${escapeHtml(localized(content.compositing.heading))}</h2><div><p>${escapeHtml(localized(content.compositing.intro))}</p><ul>${localized(content.compositing.tasks).map((task) => `<li>${escapeHtml(task)}</li>`).join("")}</ul><p class="discipline-notes__tools">${content.cv.software.map(escapeHtml).join(" · ")}</p></div>`;
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
    list.innerHTML = projects.map((project, index) => `<article class="motion-project"><header class="project-header"><h1>${escapeHtml(localized(project.title))}</h1><p>${escapeHtml(localized(project.meta))}</p></header><div class="video-shell" data-motion-video="${index}"></div>${project.role ? `<dl class="project-credits"><div><dt>${language === "ru" ? "Моя роль" : "My role"}</dt><dd>${escapeHtml(localized(project.role))}</dd></div><div><dt>${language === "ru" ? "Инструменты" : "Tools"}</dt><dd>${project.tools.map(escapeHtml).join(" · ")}</dd></div></dl>` : ""}</article>`).join("");
    projects.forEach((project, index) => renderVideo(list.querySelector(`[data-motion-video="${index}"]`), project.video, localized(project.title), project.duration, index));
  }

  function renderSoftware() {
    const intro = document.querySelector("[data-software-intro]");
    const list = document.querySelector("[data-software-projects]");
    if (intro) intro.textContent = localized(content.software.intro);
    if (!list) return;
    list.innerHTML = content.software.projects.filter((project) => project.url).map((project) => {
      const tag = project.url ? "a" : "div";
      const attributes = `href="${project.url}" target="_blank" rel="noopener noreferrer"`;
      return `<article class="software-entry"><${tag} class="software-row" ${attributes}>
        <span class="software-row__identity">${project.icon ? `<span class="software-row__logo" aria-hidden="true">${softwareIcon(project.icon)}</span>` : ""}<span><strong>${escapeHtml(localized(project.title))}</strong><small>${escapeHtml(localized(project.meta))}</small></span></span>
        <span class="software-row__arrow" aria-hidden="true">${project.url ? "↗" : "—"}</span>
      </${tag}>${project.description ? `<div class="software-details"><p>${escapeHtml(localized(project.description))}</p>${project.features ? `<ul>${localized(project.features).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}</div>` : ""}</article>`;
    }).join("");
  }

  function renderContacts() {
    const heading = document.querySelector("[data-contact-heading]");
    if (heading) heading.textContent = t("labels.nextProject");
    const email = document.querySelector("[data-contact-email]");
    const telegram = document.querySelector("[data-contact-telegram]");
    const emailValue = content.contacts.email || t("labels.emptyEmail");
    const telegramValue = content.contacts.telegram || t("labels.emptyTelegram");
    if (email) {
      email.hidden = !content.contacts.email;
      email.href = content.contacts.email ? `mailto:${content.contacts.email}` : "#";
      email.target = "_blank";
      email.rel = "noopener noreferrer";
      email.innerHTML = `<span>${t("labels.email")}</span><span>/</span><span>${emailValue}</span><span aria-hidden="true">↗</span>`;
      email.setAttribute("aria-disabled", String(!content.contacts.email));
    }
    if (telegram) {
      telegram.hidden = !content.contacts.telegram;
      telegram.classList.toggle("contact-link--primary", !content.contacts.email && Boolean(content.contacts.telegram));
      const telegramUrl = content.contacts.telegram ? (content.contacts.telegram.startsWith("http") ? content.contacts.telegram : `https://t.me/${content.contacts.telegram.replace(/^@/, "")}`) : "#";
      telegram.href = telegramUrl;
      telegram.target = "_blank";
      telegram.rel = "noopener noreferrer";
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

  window.matchMedia("(max-width: 42rem)").addEventListener("change", () => {
    if (page === "home") renderPortrait("[data-home-portrait]");
  });

  render();
})();
