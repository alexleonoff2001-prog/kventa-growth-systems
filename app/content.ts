import {
  Activity,
  Bot,
  ChartNoAxesCombined,
  Code2,
  Construction,
  GraduationCap,
  House,
  Landmark,
  Scale,
  Sparkles,
  Stethoscope,
  Workflow,
} from "lucide-react";

export const navigation = [
  { label: "Решения", href: "#solutions" },
  { label: "Как работаем", href: "#method" },
  { label: "Кейсы", href: "#cases" },
  { label: "О KVENTA", href: "#about" },
];

export const technologyRow = [
  "Яндекс Директ",
  "Telegram Ads",
  "AI Agents",
  "CRM",
  "n8n",
  "Websites",
  "Content",
  "Analytics",
];

export const solutions = [
  {
    name: "KVENTA Growth",
    eyebrow: "Привлечение",
    description: "Performance-маркетинг, который связан с экономикой и продажами бизнеса.",
    icon: ChartNoAxesCombined,
    items: ["Яндекс Директ", "Telegram Ads", "Рекламные воронки", "Стратегия и CRO"],
  },
  {
    name: "KVENTA Studio",
    eyebrow: "Digital production",
    description: "Точки контакта, которые ясно объясняют ценность и ведут к заявке.",
    icon: Code2,
    items: ["Сайты и лендинги", "Рекламные креативы", "AI-видео", "Контент и digital products"],
  },
  {
    name: "KVENTA AI",
    eyebrow: "AI-решения",
    description: "Интеллектуальные помощники для клиентов, продаж и внутренних процессов.",
    icon: Bot,
    items: ["AI-консультанты", "Sales и voice agents", "AI-ассистенты", "Внутренние AI-инструменты"],
  },
  {
    name: "KVENTA Automate",
    eyebrow: "Автоматизация",
    description: "Связываем заявки, CRM и команду в управляемый процесс без рутины.",
    icon: Workflow,
    items: ["n8n и CRM", "Lead routing", "Авто follow-up", "Telegram и уведомления"],
  },
  {
    name: "KVENTA Analytics",
    eyebrow: "Измеримость",
    description: "Показываем, где теряются деньги и какие решения стоит масштабировать.",
    icon: Activity,
    items: ["Сквозная аналитика", "Conversion tracking", "CAC / CPL / ROMI", "Анализ воронки"],
  },
];

export const methodology = [
  { number: "01", name: "ATTRACT", text: "Привлекаем целевую аудиторию." },
  { number: "02", name: "CONVERT", text: "Превращаем внимание в заявку." },
  { number: "03", name: "QUALIFY", text: "Определяем ценных клиентов." },
  { number: "04", name: "AUTOMATE", text: "Убираем повторяющиеся процессы." },
  { number: "05", name: "SELL", text: "Ускоряем путь заявки к продаже." },
  { number: "06", name: "SCALE", text: "Масштабируем то, что работает." },
];

export type CaseStudy = {
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  image: string;
  gallery?: { src: string; alt: string; width: number; height: number }[];
  videos?: { src: string; poster: string; alt: string }[];
  liveUrl?: string;
  liveLabel?: string;
  liveLinks?: { url: string; label: string }[];
  isPlaceholder?: boolean;
  slug: string;
};

export const cases: CaseStudy[] = [
  {
    title: "NutriBot — AI-сервис подсчёта КБЖУ",
    industry: "Colombia · Telegram · AI",
    challenge: "Сделать ежедневный контроль питания простым: без ручного поиска продуктов, сложных таблиц и долгого заполнения дневника.",
    solution: "Разработали Telegram-сервис для колумбийского рынка. Пользователь отправляет фото блюда или описывает его текстом, а AI оценивает калории, белки, жиры и углеводы с учётом всей порции.",
    results: "Запущен работающий продукт с дневными целями, историей записей, ежедневной сводкой и локализацией под привычные продукты и порции Колумбии.",
    image: "/cases/nutribot-telegram.jpg",
    gallery: [
      { src: "/cases/nutribot-telegram.jpg", alt: "Интерфейс NutriFoto в Telegram для подсчёта калорий и макронутриентов", width: 552, height: 1200 },
      { src: "/cases/nutribot-workflow.png", alt: "Схема автоматизации NutriBot: Telegram, AI-анализ, база данных и подписки", width: 1800, height: 979 },
    ],
    liveUrl: "https://telegram.me/NutriFotoAI_bot",
    liveLabel: "Открыть NutriBot",
    slug: "nutribot-colombia",
  },
  {
    title: "Don Alejandro — AI-персонажи для Habanos",
    industry: "LATAM · Russia · AI Creative",
    challenge: "Создать узнаваемых героев и систему контента для продвижения кубинских сигар на рынках Латинской Америки и России, сохранив премиальный характер и культурный контекст продукта.",
    solution: "Разработали цифровых персонажей Don Alejandro и Sergey Volkov, их визуальные роли, локализованные видео и статичные креативы, а также конверсионный лендинг для рекламных кампаний.",
    results: "Собрана масштабируемая creative-система для испаноязычной и русскоязычной аудитории: персонажи связывают рекламные сообщения, контент и посадочную страницу в единый образ бренда.",
    image: "/cases/habanos/russia-havana.jpg",
    gallery: [
      { src: "/cases/habanos/russia-havana.jpg", alt: "Don Alejandro и Sergey Volkov в креативе Habanos для России", width: 800, height: 1200 },
      { src: "/cases/habanos/don-alejandro-gift.jpg", alt: "Don Alejandro в испаноязычном креативе о кубинских сигарах", width: 675, height: 1200 },
      { src: "/cases/habanos/don-alejandro-guide.jpg", alt: "Образовательный рекламный креатив с Don Alejandro", width: 675, height: 1200 },
      { src: "/cases/habanos/don-alejandro-authentic.jpg", alt: "Имиджевый креатив Habanos для рынка Латинской Америки", width: 800, height: 1200 },
      { src: "/cases/habanos/moscow-campaign.jpg", alt: "Зимний рекламный креатив Habanos для российского рынка", width: 800, height: 1200 },
    ],
    videos: [
      { src: "/cases/habanos/character-creative-01.m4v", poster: "/cases/habanos/don-alejandro-authentic.jpg", alt: "Видеокреатив с AI-персонажем Don Alejandro" },
      { src: "/cases/habanos/character-creative-02.m4v", poster: "/cases/habanos/russia-havana.jpg", alt: "Видеокреатив с персонажами кампании Habanos" },
    ],
    liveUrl: "https://alexleonoff2001-prog.github.io/don-alejandro-landing/",
    liveLabel: "Посмотреть лендинг",
    slug: "habanos-ai-characters",
  },
  {
    title: "Lavital & NovaStrong — digital-запуск для LATAM",
    industry: "LATAM · Supplements · Performance Creative",
    challenge: "Подготовить два локальных бренда пищевых добавок к продвижению в Латинской Америке: ясно разделить позиционирование продуктов и собрать материалы под performance-трафик.",
    solution: "Создали конверсионные лендинги, визуальные системы Lavital и NovaStrong, локализованные офферы, видео, статичные креативы и рекламные материалы на испанском языке.",
    results: "Собран цельный digital-комплект для запуска и тестирования рекламных гипотез: от первого контакта с креативом до продуктовой страницы каждого бренда.",
    image: "/cases/latam-supplements/novastrong-hero.jpg",
    gallery: [
      { src: "/cases/latam-supplements/novastrong-hero.jpg", alt: "Горизонтальный рекламный креатив NovaStrong", width: 1200, height: 675 },
      { src: "/cases/latam-supplements/lavital-offer.jpg", alt: "Рекламный креатив Lavital с локализованным предложением для Колумбии", width: 960, height: 1200 },
      { src: "/cases/latam-supplements/lavital-longform.jpg", alt: "Информационный рекламный материал Lavital", width: 800, height: 1200 },
      { src: "/cases/latam-supplements/novastrong-energy.jpg", alt: "Вертикальный рекламный креатив NovaStrong", width: 768, height: 1200 },
    ],
    videos: [
      { src: "/cases/latam-supplements/lavital-creative.m4v", poster: "/cases/latam-supplements/lavital-offer.jpg", alt: "Видеокреатив Lavital для рынка Латинской Америки" },
      { src: "/cases/latam-supplements/novastrong-creative.m4v", poster: "/cases/latam-supplements/novastrong-hero.jpg", alt: "Видеокреатив NovaStrong с субтитрами" },
    ],
    liveLinks: [
      { url: "http://lavital.org", label: "Лендинг Lavital" },
      { url: "https://novastrong.win", label: "Лендинг NovaStrong" },
    ],
    slug: "lavital-novastrong-latam",
  },
];

export const industries = [
  { name: "Медицина", icon: Stethoscope },
  { name: "Стоматология", icon: Sparkles },
  { name: "Строительство и ремонт", icon: Construction },
  { name: "Недвижимость", icon: House },
  { name: "Образование", icon: GraduationCap },
  { name: "Юридические услуги", icon: Scale },
  { name: "B2B", icon: Landmark },
  { name: "High-ticket services", icon: ChartNoAxesCombined },
];

export const faqs = [
  {
    question: "Сколько стоят услуги KVENTA?",
    answer: "Стоимость зависит от текущей инфраструктуры, задачи и объёма работ. После первичной диагностики предложим конкретный формат работы и бюджет.",
  },
  {
    question: "Можно заказать только одну услугу?",
    answer: "Да. Можно начать с сайта, рекламы, автоматизации или AI-решения. Если задача требует связки, объединим нужные элементы в одну систему.",
  },
  {
    question: "Работаете ли вы с небольшими компаниями?",
    answer: "Да, если бизнес имеет работающую модель, понятную экономику и готов инвестировать в рост.",
  },
  {
    question: "Можно ли сначала провести аудит?",
    answer: "Да. Первичная диагностика — основной способ начать работу с KVENTA.",
  },
  {
    question: "Какие рекламные каналы вы используете?",
    answer: "Основные направления — Яндекс Директ и Telegram Ads. Конкретный канал подбираем под задачу и целевую аудиторию.",
  },
];
