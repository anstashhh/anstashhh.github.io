/*
  EDIT THIS FILE TO UPDATE THE SITE.
  Replace the bracketed placeholders and paste video/contact links below.
  Keep both ru and en values complete so the language switch stays consistent.
*/
window.PORTFOLIO_CONTENT = {
  identity: {
    name: { ru: "АЛЕКСАНДР НИКОЛЬСКИЙ", en: "ALEKSANDR NIKOLSKII" },
    title: {
      ru: "Video Post Production / Motion + AI Specialist",
      en: "Video Post Production / Motion + AI Specialist"
    },
    portrait: "assets/images/portrait.webp"
  },

  cv: {
    about: {
      ru: "Я специалист по видеопостпродакшену и моушн-дизайну. Работаю с видео проектами в разных направлениях: кино, реклама, контент для соцсетей. Создаю 2D и 3D-графику и анимацию, работаю с цветокоррекцией, композитингом и генеративным AI. Провожу личное обучение и менторство по освоению современных инструментов производства медиа контента.",
      en: "I am a video post-production and motion design specialist. I work on video projects across film, advertising, and social media content. I create 2D and 3D graphics and animation, and work with color grading, compositing, and generative AI. I also offer one-on-one training and mentoring in modern media production tools."
    },
    work: [
      {
        period: { ru: "", en: "" },
        title: { ru: "БОЛЕЕ ПЯТИ ЛЕТ В ВИДЕОПРОИЗВОДСТВЕ", en: "OVER FIVE YEARS IN VIDEO PRODUCTION" },
        text: {
          ru: "Свыше 200 выполненных проектов разной сложности. Работал над рекламными проектами для Сбера, Т-Банка, МТС и Кинопоиска. Среди работ по цветокоррекции и композитингу — полнометражный фильм «Палата №6» (2025), короткометражный фильм «Автостопом до мечты» (2026) и полнометражный фильм «Прелюдия» (2026).",
          en: "More than 200 completed projects of varying complexity. I have worked on advertising projects for Sber, T-Bank, MTS, and Kinopoisk. Film work in color grading and compositing includes the feature Ward No. 6 (2025), the short film Hitchhiking to the Dream (2026), and the feature Prelude (2026)."
        }
      }
    ],
    skills: [
      {
        title: { ru: "Моушн-дизайн и 3D", en: "Motion design & 3D" },
        text: { ru: "2D и 3D моушн-дизайн разной сложности. Моделирование, текстурирование, рендеринг.", en: "2D and 3D motion design of varying complexity. Modelling, texturing, and rendering." }
      },
      {
        title: { ru: "Цветокоррекция и finishing", en: "Color grading & finishing" },
        text: { ru: "Построение цветового решения, matching кадров, вторичная коррекция и подготовка финального изображения.", en: "Look development, shot matching, secondary grading, and final image preparation." }
      },
      {
        title: { ru: "Композитинг и VFX", en: "Compositing & VFX" },
        text: { ru: "Сборка многослойных кадров, clean-up, трекинг, ротоскопинг и интеграция графики.", en: "Layered shot assembly, clean-up, tracking, rotoscoping, and graphics integration." }
      },
      {
        title: { ru: "Generative AI и автоматизация", en: "Generative AI & automation" },
        text: { ru: "Разработка AI-пайплайнов, интеграция генеративных инструментов и автоматизация производства.", en: "AI pipeline development, generative-tool integration, and production automation." }
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
    showreel: {
      youtube: "https://youtu.be/9sJGP11F3fg",
      vimeo: "https://vimeo.com/1238836744",
      vimeoEnabled: false, // Vimeo currently returns "This video does not exist".
      poster: "assets/images/color-reel-poster.webp"
    },
    showreelDuration: "",
    projects: [
      {
        title: { ru: "Палата №6", en: "Ward No. 6" },
        kinopoisk: "https://www.kinopoisk.ru/film/8349782/",
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
        kinopoisk: "https://www.kinopoisk.ru/film/10852989/",
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
        meta: { ru: "ПОЛНОМЕТРАЖНЫЙ ФИЛЬМ / ЦВЕТОКОРРЕКЦИЯ / 2026", en: "FEATURE FILM / COLOR GRADING / 2026" },
        imageSize: [1920, 1080],
        images: ["assets/images/prelude-01.webp", "assets/images/prelude-02.webp", "assets/images/prelude-03.webp", "assets/images/prelude-04.webp"]
      },
      {
        title: { ru: "Это цитата!", en: "It's a Quote!" },
        kinopoisk: "https://www.kinopoisk.ru/film/10422567/",
        meta: { ru: "КОРОТКОМЕТРАЖНЫЙ ФИЛЬМ / ЦВЕТОКОРРЕКЦИЯ / 2025", en: "SHORT FILM / COLOR GRADING / 2025" },
        imageSize: [1920, 1080],
        images: ["assets/images/quote-01.webp", "assets/images/quote-02.webp", "assets/images/quote-03.webp", "assets/images/quote-04.webp"]
      }
    ]
  },

  compositing: {
    heading: { ru: "Работа с кадром", en: "Working with the shot" },
    intro: {
      ru: "Композитинг для рекламы и кино: от незаметной ретуши до интеграции графики и CG в съёмочный материал. Работаю с деталями кадра, движением, светом и фактурой, чтобы добавленные элементы выглядели частью одной сцены.",
      en: "Compositing for film and advertising, from invisible cleanup to integrating graphics and CG with live-action footage. I work with motion, light, texture, and shot detail to make added elements feel part of the same scene."
    },
    tasks: {
      ru: [
        "Clean-up кадров разной сложности: удаление объектов, проводов и нежелательных деталей с восстановлением фона.",
        "Бьюти-ретушь: коррекция кожи и локальных деталей с сохранением естественной фактуры и движения.",
        "Матт-пейнтинг: создание и доработка фонов, расширение окружения и интеграция в кадр.",
        "Кеинг: отделение объектов от фона, обработка краёв и цветовых рефлексов.",
        "Ротоскопинг: маски для персонажей и объектов, работа со сложными контурами.",
        "Трекинг и замена экранов: привязка графики к движению камеры и объектов.",
        "Интеграция CG и графики: согласование перспективы, света, цвета, резкости и зерна.",
        "AI-интеграция: подготовка генеративных элементов и их совмещение с реальным съёмочным материалом."
      ],
      en: [
        "Shot cleanup at varying levels of complexity: removing objects, wires, and unwanted details while reconstructing the background.",
        "Beauty retouching: refining skin and local details while preserving natural texture and movement.",
        "Matte painting: creating and extending environments, then integrating them into the shot.",
        "Keying: extracting subjects, refining edges, and suppressing spill.",
        "Rotoscoping: isolating subjects and objects, including complex contours.",
        "Tracking and screen replacement: anchoring graphics to camera and object motion.",
        "CG and graphics integration: matching perspective, lighting, color, sharpness, and grain.",
        "AI integration: preparing generated elements and compositing them with live-action footage."
      ]
    },
    showreel: {
      youtube: "https://youtu.be/qvVPLENkPx0",
      vimeo: "https://vimeo.com/1238841970",
      vimeoEnabled: false, // Re-enable after verifying the public embed.
      poster: "assets/images/compositing-reel-poster.webp"
    },
    showreelDuration: "",
    links: []
  },

  motion: {
    projects: [
      {
        title: { ru: "Major Intro", en: "Major Intro" },
        meta: { ru: "3D Motion Design · Анимация логотипа", en: "3D Motion Design · Logo animation" },
        role: { ru: "Процедурное моделирование и анимация.", en: "Procedural modelling and animation." },
        tools: ["Blender", "DaVinci Resolve"],
        video: { youtube: "https://youtu.be/i5APEgEk8C0", poster: "assets/images/major-poster.webp" }
      },
      {
        title: { ru: "Glow Recipe — Watermelon Glow", en: "Glow Recipe — Watermelon Glow" },
        meta: { ru: "Generative AI · Полное производство", en: "Generative AI · Full production" },
        role: { ru: "Полное производство: генерация видео, композитинг и монтаж.", en: "Full production: AI video generation, compositing, and editing." },
        tools: ["Seedance 2.5", "DaVinci Resolve", "Fusion"],
        video: { youtube: "https://youtu.be/rjnUqVpi_ks", poster: "assets/images/glow-recipe-poster.webp" }
      },
      {
        title: { ru: "Suprême", en: "Suprême" },
        meta: { ru: "Generative AI + Композитинг", en: "Generative AI + Compositing" },
        role: { ru: "Генерация AI-видео и композитинг с реальным съёмочным материалом.", en: "AI video generation and compositing generated footage with live-action material." },
        tools: ["Kling", "Nuke", "DaVinci Resolve"],
        video: { youtube: "https://youtu.be/mgNyew4q5WI", poster: "assets/images/supreme-poster.webp" }
      },
      {
        title: { ru: "Заставка игры / Логотип", en: "Game intro / Logo" },
        meta: { ru: "Motion Design & Modelling", en: "Motion Design & Modelling" },
        role: { ru: "Дизайн логотипа, моделирование, текстурирование, анимация и композитинг.", en: "Logo design, modelling, texturing, animation, and compositing." },
        tools: ["Photoshop", "Blender", "After Effects", "DaVinci Resolve"],
        video: { youtube: "https://youtu.be/WEV8Zjbln98", poster: "assets/images/ident-poster.webp" }
      },
      {
        title: { ru: "Финуслуги", en: "Finuslugi" },
        meta: { ru: "Generative AI + Композитинг с реальным видео", en: "Generative AI + Live-action compositing" },
        role: { ru: "Генеративное видео, композитинг и моушн-графика.", en: "AI video generation, compositing, and motion graphics." },
        tools: ["Seedance 2.0", "Nuke", "After Effects", "DaVinci Resolve"],
        video: { youtube: "https://youtu.be/SFppPFqIfaI", poster: "assets/images/finuslugi-poster.webp" }
      }
    ]
  },

  software: {
    intro: {
      ru: "Инструменты и приложения для задач видеопроизводства, автоматизации и AI-пайплайнов.",
      en: "Tools and applications for video production, automation, and AI workflows."
    },
    projects: [
      {
        title: { ru: "ComfyUI Smart Face Crop", en: "ComfyUI Smart Face Crop" },
        icon: "ComfyUI",
        meta: { ru: "Нода для автоматического обнаружения и кадрирования лиц · GitHub", en: "Automatic face detection and cropping node · GitHub" },
        description: {
          ru: "Нода для ComfyUI, которая находит лица и подготавливает изображения для дальнейшей работы: кадрирует, меняет масштаб и добавляет отступы. Обработка выполняется локально на YuNet. Подходит для подготовки датасетов и автоматизации повторяющихся операций с изображениями.",
          en: "A ComfyUI node that detects faces and prepares images for the next stage: cropping, zooming, and adding padding. Processing runs locally using YuNet. Built for dataset preparation and automating repetitive image-preprocessing tasks."
        },
        features: {
          ru: ["Одиночные изображения и пакетная обработка папок.", "Квадратный кроп, портретное приближение и добавление полей без растяжения лица.", "Выделение нескольких лиц из группового снимка."],
          en: ["Single-image and batch-folder processing.", "Square crops, portrait close-ups, and padding without stretching facial proportions.", "Extraction of multiple faces from group images."]
        },
        url: "https://github.com/anstashhh/ComfyUI-Smart-Face-Crop"
      }
    ]
  },

  contacts: {
    email: "",
    telegram: "@anstashhh"
  }
};
