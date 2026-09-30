"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Bot,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  ExternalLink,
  Gauge,
  Menu,
  MessageSquareText,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Brand } from "@/components/brand";
import { cases, contact, faqs, industries, methodology, navigation, solutions, technologyRow } from "@/app/content";

const scrollToAudit = () => document.querySelector("#audit")?.scrollIntoView({ behavior: "smooth", block: "start" });

function SectionHeading({ eyebrow, title, description, centered = false }: { eyebrow: string; title: string; description?: string; centered?: boolean }) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <Button onClick={scrollToAudit} className="lime-button header-cta">Получить аудит</Button>
        <button className="menu-button" aria-label={open ? "Закрыть меню" : "Открыть меню"} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Мобильная навигация">
          {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
          <Button onClick={() => { setOpen(false); scrollToAudit(); }} className="lime-button">Получить аудит</Button>
        </nav>
      )}
    </header>
  );
}

type LeadFormProps = { compact?: boolean; buttonText?: string; formId: string };

export function LeadForm({ compact = false, buttonText = "Получить бесплатный аудит", formId }: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 ");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid", "gclid"].forEach((key) => {
      const value = params.get(key);
      if (value) sessionStorage.setItem(`kventa_${key}`, value);
    });
  }, []);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
    const normalized = digits.startsWith("7") ? digits : `7${digits}`;
    const p = normalized.slice(1);
    let result = "+7";
    if (p.length) result += ` (${p.slice(0, 3)}`;
    if (p.length >= 3) result += ")";
    if (p.length > 3) result += ` ${p.slice(3, 6)}`;
    if (p.length > 6) result += `-${p.slice(6, 8)}`;
    if (p.length > 8) result += `-${p.slice(8, 10)}`;
    return result;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");
    const phoneDigits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) { setState("error"); setMessage("Укажите ваше имя."); return; }
    if (phoneDigits.length !== 11) { setState("error"); setMessage("Проверьте номер телефона — нужно 10 цифр после +7."); return; }
    setState("loading");
    const tracking = Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid", "gclid"].map((key) => [key, sessionStorage.getItem(`kventa_${key}`) || ""]));
    const payload = {
      name: name.trim(), phone, ...tracking,
      page_url: window.location.href,
      referrer: document.referrer,
      created_at: new Date().toISOString(),
      form_id: formId,
    };
    const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;
    try {
      if (endpoint) {
        const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error("Lead endpoint error");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 450));
        console.info("KVENTA lead demo", payload);
      }
      window.dispatchEvent(new CustomEvent("kventa_lead_success", { detail: { form_id: formId } }));
      setState("success");
    } catch {
      setState("error");
      setMessage("Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами напрямую.");
    }
  };

  if (state === "success") return (
    <div className={`form-success ${compact ? "compact" : ""}`} role="status">
      <CircleCheck />
      <div><strong>Спасибо. Заявка получена.</strong><p>Мы свяжемся с вами и уточним детали бизнеса.</p></div>
    </div>
  );

  return (
    <form className={`lead-form ${compact ? "compact" : ""}`} onSubmit={submit} noValidate>
      <div className="field"><label htmlFor={`${formId}-name`}>Имя</label><Input id={`${formId}-name`} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться?" aria-invalid={state === "error" && name.trim().length < 2} /></div>
      <div className="field"><label htmlFor={`${formId}-phone`}>Телефон</label><Input id={`${formId}-phone`} inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} onFocus={() => !phone && setPhone("+7 ")} placeholder="+7 (999) 000-00-00" aria-invalid={state === "error" && phone.replace(/\D/g, "").length !== 11} /></div>
      <Button className="lime-button form-button" disabled={state === "loading"}>{state === "loading" ? "Отправляем…" : buttonText}<ArrowRight /></Button>
      {message && <p className="form-error" role="alert">{message}</p>}
      <p className="form-legal">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</p>
    </form>
  );
}

export function HeroLeadForm() {
  return (
    <aside className="hero-form-card">
      <div className="form-card-top"><span><Sparkles /> Бесплатный разбор</span><small>20–30 минут</small></div>
      <h2>Найдём точки роста в вашей системе привлечения</h2>
      <p>Уточним задачу и покажем, где бизнес может терять клиентов.</p>
      <LeadForm compact formId="hero" buttonText="Получить разбор" />
    </aside>
  );
}

function HeroSystemVisual() {
  const nodes = ["Трафик", "Сайт", "AI", "CRM", "Продажи"];
  return (
    <div className="hero-visual" aria-label="Демонстрация системы роста">
      <div className="visual-head"><div><span className="pulse-dot" />KVENTA SYSTEM</div><small>АРХИТЕКТУРА РОСТА</small></div>
      <div className="growth-line"><svg viewBox="0 0 520 150" role="img" aria-label="Линия последовательного роста"><defs><linearGradient id="line" x1="0" x2="1"><stop stopColor="#42503d"/><stop offset="1" stopColor="#a3ff12"/></linearGradient></defs><path d="M8 126 C85 126 99 101 160 108 S238 82 284 88 S360 54 400 62 S470 20 512 25" fill="none" stroke="url(#line)" strokeWidth="4"/><path d="M8 126 C85 126 99 101 160 108 S238 82 284 88 S360 54 400 62 S470 20 512 25 L512 150 L8 150Z" fill="url(#glow)" opacity=".15"/></svg></div>
      <div className="system-nodes">{nodes.map((node, index) => <div key={node} className="system-node"><span>{index + 1}</span><strong>{node}</strong>{index < nodes.length - 1 && <ChevronRight />}</div>)}</div>
      <div className="visual-foot"><span><BadgeCheck /> Система связана</span><span>Данные → решения → продажи</span></div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg" />
      <div className="container hero-main">
        <div className="hero-copy">
          <span className="eyebrow">MARKETING × AI × AUTOMATION</span>
          <h1>Строим системы, которые <em>приводят клиентов</em> и помогают превращать их <em>в продажи.</em></h1>
          <p>Реклама, сайты, CRM, AI и автоматизация — объединённые в одну инфраструктуру роста бизнеса.</p>
          <div className="hero-actions"><Button onClick={scrollToAudit} className="lime-button">Получить бесплатный Growth Audit</Button><Button asChild variant="outline" className="ghost-button"><a href="#solutions">Посмотреть решения</a></Button></div>
          <div className="trust-note"><ShieldCheck /><span>Без навязчивых продаж. Сначала — диагностика и конкретные точки роста.</span></div>
        </div>
        <div className="hero-side"><HeroSystemVisual /><HeroLeadForm /></div>
      </div>
      <div className="tech-row"><div className="container">{technologyRow.map((item) => <span key={item}>{item}</span>)}</div></div>
    </section>
  );
}

const brokenFlow = ["Реклама", "Сайт", "Заявка", "Поздний ответ", "Нет follow-up", "Клиент потерян"];
const systemFlow = ["Traffic", "Website", "AI", "CRM", "Sales", "Analytics"];

export function ProblemFlow() {
  return (
    <section className="section problem-section">
      <div className="container">
        <SectionHeading eyebrow="ПРОБЛЕМА" title="Больше рекламы не решает проблему, если система теряет клиентов." description="Бизнес может платить за качественный трафик — и всё равно терять заявки между сайтом, менеджером и CRM." />
        <div className="compare-flow">
          <div className="flow-panel broken"><div className="flow-label"><span>Фрагментированный путь</span><small>ПОТЕРИ</small></div><div className="flow-chain">{brokenFlow.map((item, index) => <div className="flow-node" key={item}><span>{item}</span>{index < brokenFlow.length - 1 && <ArrowRight />}</div>)}</div></div>
          <div className="flow-panel connected"><div className="flow-label"><span>KVENTA Growth System</span><small>СВЯЗАНО</small></div><div className="flow-chain">{systemFlow.map((item, index) => <div className="flow-node" key={item}><span>{item}</span>{index < systemFlow.length - 1 && <ArrowRight />}</div>)}</div></div>
        </div>
        <p className="section-quote">Работаем не с одним этапом воронки, а со всей системой — от первого контакта с рекламой до продажи и повторного обращения.</p>
      </div>
    </section>
  );
}

export function GrowthSystemFlow() {
  return (
    <section className="system-statement">
      <div className="container statement-grid"><div><span className="eyebrow">SYSTEM OVER SERVICES</span><h2>Каждый элемент усиливает следующий.</h2></div><div className="statement-points"><span><Target /> Точнее привлечение</span><span><Zap /> Быстрее обработка</span><span><Gauge /> Выше конверсия</span></div><Button onClick={scrollToAudit} variant="outline" className="ghost-button">Разобрать мою систему</Button></div>
    </section>
  );
}

export function Solutions() {
  return (
    <section className="section light-section" id="solutions">
      <div className="container"><div className="section-top"><SectionHeading eyebrow="РЕШЕНИЯ" title="Одна команда. Вся система роста." description="Подключаем отдельный блок или собираем из них единую инфраструктуру под вашу бизнес-задачу." /><Button onClick={scrollToAudit} variant="outline" className="dark-outline">Обсудить задачу</Button></div>
        <div className="solutions-grid">{solutions.map((solution, index) => { const Icon = solution.icon; return <article className={`solution-card solution-${index + 1}`} key={solution.name}><div className="solution-top"><Icon /><span>0{index + 1}</span></div><small>{solution.eyebrow}</small><h3>{solution.name}</h3><p>{solution.description}</p><ul>{solution.items.map((item) => <li key={item}><Check />{item}</li>)}</ul><button onClick={scrollToAudit}>Обсудить решение <ArrowRight /></button></article>; })}</div>
      </div>
    </section>
  );
}

export function AISalesAgent() {
  return (
    <section className="section ai-section">
      <div className="container ai-grid"><div className="ai-copy"><SectionHeading eyebrow="AI SALES AGENT" title="Ваш бизнес может отвечать клиентам 24/7." description="AI-агент отвечает на типовые вопросы, квалифицирует клиента, записывает на встречу и передаёт контекст менеджеру." /><div className="ai-route"><span>Qualification</span><ArrowRight /><span>Booking</span><ArrowRight /><span>CRM</span><ArrowRight /><span>Manager</span></div><Button onClick={scrollToAudit} className="lime-button">Обсудить AI-агента</Button></div>
        <div className="chat-demo"><div className="chat-head"><div className="agent-avatar"><Bot /></div><div><strong>AI-консультант</strong><span><i /> отвечает сейчас</span></div><small>DEMO</small></div><div className="messages"><div className="message client"><small>Клиент · 14:32</small><p>Здравствуйте. Можно записаться на консультацию завтра?</p></div><div className="message agent"><small>KVENTA AI · 14:32</small><p>Здравствуйте, Алексей. Да, свободны 12:00, 15:30 и 18:00. Какое время будет удобно?</p></div><div className="message system"><CircleCheck /> Время выбрано · данные переданы в CRM</div></div><div className="chat-input"><span>Сообщение…</span><Send /></div></div></div>
    </section>
  );
}

const automationSteps = ["Заявка с сайта", "CRM", "AI анализ", "Telegram менеджеру", "Сообщение клиенту", "Follow-up", "Отчёт"];

export function AutomationFlow() {
  return (
    <section className="section automation-section"><div className="container"><SectionHeading eyebrow="AUTOMATION" title="Убираем ручную работу из повторяющихся процессов." description="Система реагирует на заявку сразу, распределяет данные и не даёт следующему шагу потеряться." centered />
      <div className="automation-flow">{automationSteps.map((step, index) => <div key={step} className="automation-item"><div><span>{String(index + 1).padStart(2, "0")}</span>{index === 0 ? <MessageSquareText /> : index === 2 ? <Bot /> : index === 3 ? <Send /> : index === 5 ? <Clock3 /> : <Zap />}</div><strong>{step}</strong>{index < automationSteps.length - 1 && <ArrowDown className="automation-arrow" />}</div>)}</div>
      <div className="automation-result"><Check /> Менеджер получает контекст, клиент — быстрый ответ, собственник — прозрачный результат.</div></div>
    </section>
  );
}

export function PerformanceBackground() {
  const skills = ["Marketing", "Creative", "Funnels", "Automation", "Analytics", "AI"];
  return (
    <section className="section performance-section" id="about"><div className="container performance-grid"><div className="performance-stat"><strong>3+</strong><span>YEARS OF<br/>PERFORMANCE<br/>EXPERIENCE</span><div className="market-tags"><b>LATAM</b><b>ENGLISH-SPEAKING MARKETS</b></div></div><div className="performance-copy"><SectionHeading eyebrow="НАШ ФУНДАМЕНТ" title="Из performance marketing — в системный рост бизнеса" /><p>В основе KVENTA — команда с трёхлетним опытом performance и affiliate marketing на рынках Латинской Америки и англоязычных стран.</p><p>В этой среде невозможно спрятаться за красивыми отчётами: каждая гипотеза измеряется стоимостью трафика, конверсией, выручкой и масштабируемостью.</p><p>Мы самостоятельно закрывали весь цикл — от анализа рынка и рекламных связок до лендингов, креативов, аналитики и автоматизации. Сегодня этот подход используем для развития российских компаний.</p><div className="skill-tags">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></div>
    </section>
  );
}

export function Methodology() {
  return (
    <section className="section method-section" id="method"><div className="container"><SectionHeading eyebrow="KVENTA GROWTH SYSTEM" title="От внимания — к измеримому росту." description="Шесть связанных этапов. На каждом — своя метрика, ответственность и способ улучшения." />
      <div className="method-flow">{methodology.map((step, index) => <article key={step.number}><div className="method-number">{step.number}</div><div><span>{step.name}</span><p>{step.text}</p></div>{index < methodology.length - 1 && <ChevronRight />}</article>)}</div></div>
    </section>
  );
}

export function Cases() {
  const [featuredCase, ...placeholderCases] = cases;
  return (
    <section className="section cases-section" id="cases"><div className="container"><div className="section-top"><SectionHeading eyebrow="КЕЙСЫ" title="Результат важнее обещаний." description="Публикуем только те кейсы, где можно показать подтверждённую задачу, работу и эффект без приукрашивания." /><span className="soon-label">Материалы пополняются</span></div>
      <article className="featured-case">
        <div className="featured-case-copy">
          <div className="featured-case-label"><span>01 · УСПЕШНЫЙ КЕЙС</span><small>{featuredCase.industry}</small></div>
          <h3>{featuredCase.title}</h3>
          <p className="featured-case-intro">AI-продукт, который превращает привычный чат в персональный дневник питания.</p>
          <dl>
            <div><dt>Задача</dt><dd>{featuredCase.challenge}</dd></div>
            <div><dt>Что сделали</dt><dd>{featuredCase.solution}</dd></div>
            <div><dt>Продукт</dt><dd>{featuredCase.results}</dd></div>
          </dl>
          {featuredCase.liveUrl && <a className="case-live-link" href={featuredCase.liveUrl} target="_blank" rel="noreferrer">{featuredCase.liveLabel}<ExternalLink /></a>}
        </div>
        <div className="featured-case-gallery">
          {featuredCase.gallery?.map((image, index) => <figure className={index === 0 ? "bot-screen" : "workflow-screen"} key={image.src}><img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy"/><figcaption>{index === 0 ? "Опыт пользователя" : "Архитектура автоматизации"}</figcaption></figure>)}
          <div className="case-flow-badge"><span>PHOTO / TEXT</span><ArrowRight/><span>AI ANALYSIS</span><ArrowRight/><span>DAILY SUMMARY</span></div>
        </div>
      </article>
      <div className="cases-grid placeholder-cases">{placeholderCases.map((item, index) => <article className="case-card" key={item.slug}><div className="case-cover"><span>0{index + 2}</span><div className="case-lines"><i/><i/><i/><i/></div><small>CASE SOON</small></div><div className="case-body"><span>{item.industry}</span><h3>{item.title}</h3><dl><div><dt>Задача</dt><dd>{item.challenge}</dd></div><div><dt>Сделали</dt><dd>{item.solution}</dd></div><div><dt>Результат</dt><dd>{item.results}</dd></div></dl><span className="case-status"><Clock3 /> Кейс скоро появится</span></div></article>)}</div></div>
    </section>
  );
}

export function Industries() {
  return (
    <section className="section industries-section"><div className="container industries-grid"><SectionHeading eyebrow="ФОКУС" title="Лучше всего мы работаем с бизнесами, где один новый клиент имеет реальную ценность." description="Особенно когда уже есть спрос, но маркетинг, продажи и инфраструктура работают разрозненно." /><div className="industry-list">{industries.map((industry) => { const Icon = industry.icon; return <div key={industry.name}><Icon /><span>{industry.name}</span></div>; })}</div></div>
    </section>
  );
}

const advantages = [
  { name: "Performance approach", text: "Работаем через гипотезы, данные и измеримые показатели.", icon: Target },
  { name: "Full funnel", text: "Смотрим на путь клиента от рекламы до сделки.", icon: Gauge },
  { name: "AI & Automation", text: "Внедряем технологии там, где они дают бизнес-эффект.", icon: Bot },
  { name: "One team", text: "Маркетинг, разработка и автоматизация в одной системе.", icon: BadgeCheck },
];

export function WhyKventa() {
  return <section className="section why-section"><div className="container"><SectionHeading eyebrow="ПОЧЕМУ KVENTA" title="Системный партнёр, а не набор подрядчиков." centered /><div className="why-grid">{advantages.map((item) => { const Icon = item.icon; return <article key={item.name}><Icon/><h3>{item.name}</h3><p>{item.text}</p></article>; })}</div></div></section>;
}

const auditItems = ["Сайт и конверсию", "Рекламные каналы", "Воронку и оффер", "CRM и скорость ответа", "Автоматизацию", "Сквозную аналитику", "Возможности AI", "Путь клиента до сделки"];

export function GrowthAudit() {
  const score = [74, 58, 67, 35, 42, 51];
  const labels = ["Acquisition", "Website", "Sales", "Automation", "Analytics", "AI readiness"];
  return (
    <section className="section audit-section" id="audit"><div className="container audit-grid"><div className="audit-copy"><SectionHeading eyebrow="БЕСПЛАТНЫЙ GROWTH AUDIT" title="Узнайте, где ваш бизнес теряет клиентов." description="Проведём первичный разбор и покажем потенциальные точки роста в маркетинге, сайте, продажах и автоматизации." /><div className="audit-list">{auditItems.map((item) => <span key={item}><Check />{item}</span>)}</div><div className="score-card"><div className="score-head"><div><strong>KVENTA Growth Score</strong><span>Пример структуры отчёта</span></div><small>DEMO</small></div>{labels.map((label, index) => <div className="score-row" key={label}><span>{label}</span><div><i style={{ width: `${score[index]}%` }} /></div></div>)}</div></div><div className="audit-form-card"><span className="audit-badge"><Sparkles /> Начните с диагностики</span><h3>Получите бесплатный разбор вашей системы роста</h3><p>Оставьте имя и телефон. Свяжемся, уточним задачу и предложим формат первичного аудита.</p><LeadForm formId="audit" /><div className="privacy-line"><ShieldCheck /> Никаких массовых рассылок. Свяжемся только по вашей заявке.</div></div></div>
    </section>
  );
}

const processSteps = [
  ["01", "Заявка", "Вы оставляете контакты — без длинной анкеты."],
  ["02", "Диагностика", "Разбираем текущий маркетинг и инфраструктуру."],
  ["03", "Growth Plan", "Определяем точки роста и приоритеты."],
  ["04", "Implementation", "Запускаем, измеряем и оптимизируем систему."],
];

export function Process() {
  return <section className="section process-section"><div className="container"><SectionHeading eyebrow="СТАРТ РАБОТЫ" title="От первого разговора — к понятному плану." centered /><div className="process-grid">{processSteps.map(([num, name, text]) => <article key={num}><span>{num}</span><h3>{name}</h3><p>{text}</p></article>)}</div></div></section>;
}

export function FAQ() {
  return <section className="section faq-section"><div className="container faq-grid"><SectionHeading eyebrow="FAQ" title="Коротко о главном." description="Не нашли свой вопрос? Оставьте заявку — обсудим задачу на коротком созвоне." /><Accordion type="single" collapsible className="faq-list">{faqs.map((faq, index) => <AccordionItem value={`item-${index}`} key={faq.question}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>;
}

export function FinalCTA() {
  return <section className="final-cta" id="contact"><div className="final-glow"/><div className="container final-grid"><div><span className="eyebrow">СЛЕДУЮЩИЙ ШАГ</span><h2>Давайте найдём следующую точку роста вашего бизнеса.</h2><p>Оставьте заявку — изучим вашу текущую систему и предложим первые направления для роста.</p><div className="final-note"><Clock3 /> Ответим в рабочее время и договоримся о коротком созвоне.</div></div><div className="final-form"><LeadForm formId="final" buttonText="Получить Growth Audit" /></div></div></section>;
}

export function Footer() {
  return <footer><div className="container footer-grid"><div><Brand/><p>KVENTA — системы привлечения и автоматизации клиентов для растущего бизнеса.</p></div><div><strong>Навигация</strong>{navigation.slice(0,4).map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div><div><strong>Контакты</strong><a href={`mailto:${contact.email}`}>{contact.email}</a><span>{contact.phone}</span><small>{contact.legal}</small></div><div><strong>Документы</strong><a href="#">Политика конфиденциальности</a><a href="#">Согласие на обработку данных</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} KVENTA Growth Systems</span><span>Marketing × AI × Automation</span></div></footer>;
}

export function MobileCTA() { return <button className="mobile-sticky-cta" onClick={scrollToAudit}>Получить бесплатный аудит <ArrowRight /></button>; }

export default function KventaSite() {
  return <><Header/><main><Hero/><ProblemFlow/><GrowthSystemFlow/><Solutions/><AISalesAgent/><AutomationFlow/><PerformanceBackground/><Methodology/><Cases/><Industries/><WhyKventa/><GrowthAudit/><Process/><FAQ/><FinalCTA/></main><Footer/><MobileCTA/></>;
}
