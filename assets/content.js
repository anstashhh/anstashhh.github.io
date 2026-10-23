/*
  EDIT THIS FILE TO UPDATE THE SITE.
  Replace the bracketed placeholders and paste video/contact links below.
  Keep both ru and en values complete so the language switch stays consistent.
*/
window.PORTFOLIO_CONTENT = {
  identity: {
    name: { ru: "АЛЕКСАНДР НИКОЛЬСКИЙ", en: "ALEKSANDR NIKOLSKII" },
    shortName: { ru: "А. НИКОЛЬСКИЙ", en: "A. NIKOLSKII" },
    title: {
      ru: "Video Post Production / Motion + AI Specialist",
      en: "Video Post Production / Motion + AI Specialist"
    },
    portrait: "assets/images/portrait.webp"
  },

  cv: {
    about: {
      ru: "Более пяти лет в видеопостпродакшене, свыше 200 проектов разной сложности. Моушн-дизайн, композитинг и цветокоррекция для рекламы и кино. В портфолио — работа над проектами для Сбера, Т-Банка, МТС и Кинопоиска.",
      en: "Video post-production specialist with over five years of experience and more than 200 completed projects. Motion design, compositing, and color grading for film and advertising, with projects across financial services, telecommunications, and entertainment."
    },
    work: [
      {
        period: "5+ YEARS / БОЛЕЕ 5 ЛЕТ",
        title: { ru: "ВИДЕОПОСТПРОДАКШЕН", en: "VIDEO POST PRODUCTION" },
        text: {
          ru: "Работаю с цветом, изображением и анимацией: выполняю cleanup и ретушь, замену экранов, трекинг и интеграцию элементов в съёмочный материал. Разрабатываю цветовое решение и согласовываю кадры. Среди работ по цветокоррекции — полнометражный фильм «Палата №6» (2025) и короткометражный фильм «Автостопом до мечты» (2026).",
          en: "My work spans color, compositing, and animation, including cleanup, retouching, screen replacement, tracking, element integration, look development, and shot matching. Color-grading work includes the feature film Ward No. 6 (2025) and the short film Hitchhiking to the Dream (2026)."
        }
      }
    ],
    skills: [
      {
        title: { ru: "Цветокоррекция и finishing", en: "Color grading & finishing" },
        text: { ru: "Построение цветового решения, matching кадров, вторичная коррекция и подготовка финального изображения.", en: "Look development, shot matching, secondary grading, and final image preparation." }
      },
      {
        title: { ru: "Композитинг и VFX", en: "Compositing & VFX" },
        text: { ru: "Сборка многослойных кадров, clean-up, трекинг, ротоскопинг и интеграция графики.", en: "Layered shot assembly, clean-up, tracking, rotoscoping, and graphics integration." }
      },
      {
        title: { ru: "Моушн-дизайн и 3D", en: "Motion design & 3D" },
        text: { ru: "Анимация типографики и графических систем, построение простых 3D-сцен и рендер-пайплайна.", en: "Typographic and graphic-system animation, lightweight 3D scenes, and render pipelines." }
      },
      {
        title: { ru: "Generative AI и автоматизация", en: "Generative AI & automation" },
        text: { ru: "Разработка ComfyUI-пайплайнов, интеграция генеративных инструментов и автоматизация производства.", en: "ComfyUI pipeline development, generative-tool integration, and production automation." }
      }
    ],
    software: ["DaVinci Resolve", "After Effects", "Fusion", "Nuke", "Blender", "ComfyUI"],
    education: {
      ru: "Архитектурное образование. В работе с изображением использую знания композиции, пространственных отношений, пропорций и цвета.",
      en: "Architectural education, with a foundation in composition, spatial relationships, proportion, and color that informs my image-making practice."
    },
    pdf: ""
  },

  color: {
    showreel: "https://vimeo.com/1221122708?fl=ip&fe=ec",
    showreelDuration: "",
    projects: [
      {
        title: { ru: "Палата №6", en: "Ward No. 6" },
        meta: { ru: "ПОЛНОМЕТРАЖНЫЙ ФИЛЬМ / COLOR GRADING / 2025", en: "FEATURE FILM / COLOR GRADING / 2025" },
        imageSize: [1920, 804],
        images: [
          "assets/images/ward-6-01.webp",
          "assets/images/ward-6-02.webp",
          "assets/images/ward-6-03.webp",
          "assets/images/ward-6-04.webp"
        ]
      },
      {
        title: { ru: "Автостопом до мечты", en: "Hitchhiking to the Dream" },
        meta: { ru: "КОРОТКОМЕТРАЖНЫЙ ФИЛЬМ / COLOR GRADING / 2026", en: "SHORT FILM / COLOR GRADING / 2026" },
        imageSize: [1920, 804],
        images: [
          "assets/images/autostop-01.webp",
          "assets/images/autostop-02.webp",
          "assets/images/autostop-03.webp",
          "assets/images/autostop-04.webp"
        ]
      },
      {
        title: { ru: "Прелюдия", en: "Prelude" },
        meta: { ru: "ЦВЕТОКОРРЕКЦИЯ", en: "COLOR GRADING" },
        imageSize: [1920, 1080],
        images: ["assets/images/prelude-01.webp", "assets/images/prelude-02.webp", "assets/images/prelude-03.webp", "assets/images/prelude-04.webp"]
      },
      {
        title: { ru: "Это цитата!", en: "It's a Quote!" },
        meta: { ru: "ЦВЕТОКОРРЕКЦИЯ", en: "COLOR GRADING" },
        imageSize: [1920, 1080],
        images: ["assets/images/quote-01.webp", "assets/images/quote-02.webp", "assets/images/quote-03.webp", "assets/images/quote-04.webp"]
      }
    ]
  },

  compositing: {
    showreel: "",
    showreelDuration: "",
    links: []
  },

  motion: {
    projects: []
  },

  software: {
    intro: {
      ru: "Инструменты и приложения для задач видеопроизводства, автоматизации и AI-пайплайнов.",
      en: "Tools and applications for video production, automation, and AI workflows."
    },
    projects: [
      {
        title: { ru: "GITHUB", en: "GITHUB" },
        meta: { ru: "КОД / ИНСТРУМЕНТЫ / ЭКСПЕРИМЕНТЫ", en: "CODE / TOOLS / EXPERIMENTS" },
        url: "https://github.com/anstashhh"
      },
      {
        title: { ru: "ПРИЛОЖЕНИЕ В РАЗРАБОТКЕ", en: "APPLICATION IN DEVELOPMENT" },
        meta: { ru: "ПОДРОБНОСТИ БУДУТ ПОЗЖЕ", en: "DETAILS COMING SOON" },
        url: ""
      }
    ]
  },

  contacts: {
    email: "",
    telegram: "@anstashhh"
  }
};
