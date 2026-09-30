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
  { label: "Контакты", href: "#contact" },
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
  liveUrl?: string;
  liveLabel?: string;
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
  // Replace with real KVENTA case
  {
    title: "Автоматизация обработки заявок",
    industry: "High-ticket services",
    challenge: "Кейс готовится к публикации",
    solution: "Структура решения будет добавлена после согласования материалов.",
    results: "Проверенные показатели появятся здесь.",
    image: "",
    isPlaceholder: true,
    slug: "lead-processing-automation",
  },
  // Replace with real KVENTA case
  {
    title: "Performance-система для B2B",
    industry: "B2B",
    challenge: "Кейс готовится к публикации",
    solution: "Структура решения будет добавлена после согласования материалов.",
    results: "Проверенные показатели появятся здесь.",
    image: "",
    isPlaceholder: true,
    slug: "b2b-performance-system",
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

export const contact = {
  email: "hello@kventa.ru",
  phone: "+7 (___) ___-__-__",
  legal: "Реквизиты компании будут добавлены",
};
