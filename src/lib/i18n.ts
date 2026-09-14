export type Locale = "ru" | "en";

export const defaultLocale: Locale = "ru";

const dictionaries = {
  ru: {
    nav: {
      works: "Работы",
      about: "Обо мне",
      contact: "Контакты",
    },

    home: {
      description:
        "IT-специалист и Full-Stack разработчик с опытом коммерческой разработки более 5 лет (FL, Kwork). Специализируюсь на веб-разработке, мобильных и десктопных приложениях, проектировании баз данных и SEO-оптимизации сайтов. Ориентация на результат, погружение в задачу клиента и соблюдение сроков.",
      skills: {
        web: {
          title: "Web Development",
          text: "Front-end: HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Framer Motion. Back-end: Python (Django, FastAPI, Flask), PHP (Laravel), Node.js (NestJS). CMS: WordPress, Tilda.",
        },
        backend: {
          title: "Разработка ПО и мобильных приложений",
          text: "Десктопные приложения на C++, C#, Python. Кроссплатформенные мобильные приложения (React Native, Flutter). Парсеры и скрипты автоматизации бизнес-процессов.",
        },
        db: {
          title: "Базы данных и 1C",
          text: "1C: создание и настройка баз данных «под ключ». Реляционное проектирование (PostgreSQL, MySQL, SQL). MS Access: полноценная разработка, макросы, VBA, интеграция ботов.",
        },
        data: {
          title: "Парсинг и автоматизация",
          text: "Автоматический и ручной сбор данных любой сложности (Python: BeautifulSoup, Scrapy, Selenium). Разработка скриптов для автоматизации рутинных задач.",
        },
        seo: {
          title: "SEO и контент",
          text: "Сбор семантического ядра и комплексная SEO-оптимизация сайтов. Написание SEO-текстов для блогов и карточек маркетплейсов. Учебные работы: лабораторные и курсовые по программированию, БД и IT-дисциплинам.",
        },
      },
      selectedWorks: "Недавние работы",
    },

    about: {
      title: "Обо мне",
      name: "Кузилов Максим",
      role: "Full-Stack Developer · Software Engineer · SEO Specialist",
      bio: "IT-специалист и Full-Stack разработчик с опытом коммерческой разработки более 5 лет (FL, Kwork). Специализируюсь на комплексной веб-разработке, создании десктопных и мобильных приложений, проектировании баз данных и SEO-оптимизации. Помогаю с лабораторными и курсовыми работами.",
      apkNote:
        "В портфолио доступен прототип мобильного приложения Virtus Planner (APK) — интеллектуальный планировщик с AI-ассистентом.",
      portfolioNote:
        "Данный сайт находится в активной разработке: раздел портфолио и технические материалы будут регулярно пополняться новыми проектами и деталями реализации.",
      fullPortfolio: "Полное портфолио",
      fullPortfolioDesc:
        "Все работы, включая проекты, не представленные на этом сайте, доступны на Kwork и в Google Drive.",
      competencies: "Компетенции",
      experience: "Опыт",
      freelance: "Фриланс (FL / Kwork)",
      freelanceYears: "5+ лет",
      education: "IT-направление, 3 курс",
      educationRole: "Студент",
    },

    contact: {
      title: "Контакты",
      subtitle:
        "Открыт к сотрудничеству и новым проектам. Свяжитесь удобным способом.",
      cta: "Предпочитаю проводить сделки на платформах FL и Kwork ввиду наличия безопасных сделок на данных платформах. В иных случаях сделки с предоплатой или сдельные — обговариваются.",
    },

    works: {
      title: "Все работы",
      subtitle:
        "Избранные проекты: веб-разработка, мобильные приложения, SEO, десктопное ПО и учебные работы.",
      backToWorks: "← Назад к работам",
      role: "Роль",
      stack: "Стек",
      year: "Год",
    },

    notFound: {
      code: "Ошибка 404",
      message: "Запрошенная страница не существует или была перемещена.",
      home: "На главную",
      works: "К работам",
    },

    categories: {
      "Web Development": "Веб-разработка",
      "Десктоп программирование": "Десктоп-программирование",
      "1C / Базы данных": "1C / Базы данных",
      "SEO-копирайтинг": "SEO-копирайтинг",
      "Парсинг данных": "Парсинг данных",
      "Мобильная разработка": "Мобильная разработка",
      "Учебные работы": "Учебные работы",
      Другое: "Другое",
    } as Record<string, string>,

    workTitles: {
      vyruchay: "Выручай! — Студенческая биржа",
      "truck-tracker": "Truck Tracker Pro",
      "graduation-thesis": "Цифровая трансформация закупочной логистики",
      "virtus-planner": "Virtus — интеллектуальный планировщик",
      "biosviaz-seo": "Biosvyaz — SEO-оптимизация",
    } as Record<string, string>,
  },

  en: {
    nav: {
      works: "Works",
      about: "About",
      contact: "Contact",
    },

    home: {
      description:
        "IT specialist and Full-Stack developer with over 5 years of freelance experience (FL, Kwork). Specializing in web development, mobile and desktop applications, database design, and website SEO optimization. Results-oriented approach, deep client focus, strict adherence to deadlines.",
      skills: {
        web: {
          title: "Web Development",
          text: "Front-end: HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Framer Motion. Back-end: Python (Django, FastAPI, Flask), PHP (Laravel), Node.js (NestJS). CMS: WordPress, Tilda.",
        },
        backend: {
          title: "Software and Mobile Apps",
          text: "Desktop software (C++, C#, Python). Cross-platform mobile apps (React Native, Flutter). Parsers and business automation scripts.",
        },
        db: {
          title: "Databases and 1C",
          text: "1C: turnkey database creation and configuration. Relational design (PostgreSQL, MySQL, SQL). MS Access: full development, macros, VBA, bot integration.",
        },
        data: {
          title: "Data Mining and Automation",
          text: "Automated and manual data collection of any complexity (Python: BeautifulSoup, Scrapy, Selenium). Business process automation scripts.",
        },
        seo: {
          title: "SEO and Content",
          text: "Semantic core collection and full SEO optimization. SEO copywriting for blogs and marketplace listings. Academic work: coursework and labs in programming, databases, and IT.",
        },
      },
      selectedWorks: "Recent Works",
    },

    about: {
      title: "About",
      name: "Maxim Kuzilov",
      role: "Full-Stack Developer · Software Engineer · SEO Specialist",
      bio: "IT specialist and Full-Stack developer with over 5 years of commercial freelance experience (FL, Kwork). Specializing in comprehensive web development, desktop and mobile applications, database design, and SEO optimization. I also assist with academic coursework and lab assignments.",
      apkNote:
        "The portfolio includes a Virtus Planner mobile app prototype (APK) — an intelligent planner with an AI assistant.",
      portfolioNote:
        "This website is actively under development: the portfolio section and technical materials will be regularly updated with new projects and implementation details.",
      fullPortfolio: "Full Portfolio",
      fullPortfolioDesc:
        "All works, including projects not featured on this site, are available on Kwork and Google Drive.",
      competencies: "Competencies",
      experience: "Experience",
      freelance: "Freelance (FL / Kwork)",
      freelanceYears: "5+ years",
      education: "IT Major, 3rd year",
      educationRole: "Student",
    },

    contact: {
      title: "Contact",
      subtitle:
        "Open to collaboration and new projects. Get in touch via any convenient method.",
      cta: "I prefer to conduct transactions on the FL and Kwork platforms due to the availability of trusted escrow transactions. Otherwise, prepayment or milestone-based arrangements can be discussed.",
    },

    works: {
      title: "All Works",
      subtitle:
        "Selected projects: web development, mobile apps, SEO, desktop software, and academic work.",
      backToWorks: "← Back to Works",
      role: "Role",
      stack: "Stack",
      year: "Year",
    },

    notFound: {
      code: "Error 404",
      message: "The page you're looking for doesn't exist or has been moved.",
      home: "Back to Home",
      works: "View Works",
    },

    categories: {
      "Web Development": "Web Development",
      "Десктоп программирование": "Desktop Programming",
      "1C / Базы данных": "1C / Databases",
      "SEO-копирайтинг": "SEO Copywriting",
      "Парсинг данных": "Data Parsing",
      "Мобильная разработка": "Mobile Development",
      "Учебные работы": "Academic Work",
      Другое: "Other",
    } as Record<string, string>,

    workTitles: {
      vyruchay: "Vyruchay! — Student Marketplace",
      "truck-tracker": "Truck Tracker Pro",
      "graduation-thesis": "Procurement Logistics Digital Transformation",
      "virtus-planner": "Virtus — Intelligent Planner",
      "biosviaz-seo": "Biosvyaz — SEO Optimization",
    } as Record<string, string>,
  },
};

export interface Dictionary {
  nav: { works: string; about: string; contact: string };
  home: {
    description: string;
    skills: {
      web: { title: string; text: string };
      backend: { title: string; text: string };
      db: { title: string; text: string };
      data: { title: string; text: string };
      seo: { title: string; text: string };
    };
    selectedWorks: string;
  };
  about: {
    title: string;
    name: string;
    role: string;
    bio: string;
    apkNote: string;
    portfolioNote: string;
    fullPortfolio: string;
    fullPortfolioDesc: string;
    competencies: string;
    experience: string;
    freelance: string;
    freelanceYears: string;
    education: string;
    educationRole: string;
  };
  contact: {
    title: string;
    subtitle: string;
    cta: string;
  };
  works: {
    title: string;
    subtitle: string;
    backToWorks: string;
    role: string;
    stack: string;
    year: string;
  };
  notFound: {
    code: string;
    message: string;
    home: string;
    works: string;
  };
  categories: Record<string, string>;
  workTitles: Record<string, string>;
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
