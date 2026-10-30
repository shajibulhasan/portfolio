import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { P, skills, projects, services, work, education } from "./data";

const ease = [0.22, 1, 0.36, 1];
const links = [["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["services", "Services"], ["journey", "Journey"], ["contact", "Contact"]];

function useActive(ids) {
  const [a, setA] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setA(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach((i) => { const el = document.getElementById(i); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  return a;
}

function Theme() {
  const [t, setT] = useState(document.documentElement.dataset.theme);
  const flip = () => {
    const n = t === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = n;
    try { localStorage.setItem("theme", n); } catch (e) {}
    setT(n);
  };
  return <button className="icon" onClick={flip} aria-label={`Switch to ${t === "dark" ? "light" : "dark"} theme`}>{t === "dark" ? "☀" : "☾"}</button>;
}

function Nav() {
  const active = useActive(links.map((l) => l[0]));
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <header className="nav">
      <motion.div className="progress" style={{ scaleX: bar }} />
      <div className="wrap nav-in">
        <a href="#top" className="logo">Soaib.</a>
        <nav className={open ? "links open" : "links"}>
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className={active === id ? "on" : ""}>
              {active === id && <motion.span layoutId="pill" className="pill" transition={{ duration: 0.4, ease }} />}
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="nav-r">
          <Theme />
          <button className="icon burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
        </div>
      </div>
    </header>
  );
}

function Clock() {
  const f = () => new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Dhaka" }).format(new Date());
  const [t, setT] = useState(f);
  useEffect(() => { const i = setInterval(() => setT(f()), 20000); return () => clearInterval(i); }, []);
  return t;
}

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };
const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.7, ease } };

function Hero() {
  return (
    <section className="hero wrap" id="top">
      <motion.div className="hero-text" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
        <motion.p variants={fade} className="badge"><i className="dot" /> Open to freelance and full-time work</motion.p>
        <motion.h1 variants={fade}>Hi, I'm {P.first}.<br />I build <span className="grad">scalable web apps</span> with Laravel and React.</motion.h1>
        <motion.p variants={fade} className="lead">{P.intro}</motion.p>
        <motion.div variants={fade} className="acts">
          <a className="btn pri" href="#projects">View projects</a>
          <a className="btn" href={P.cv} download>Download CV</a>
        </motion.div>
        <motion.p variants={fade} className="mu small">Chittagong, Bangladesh · <Clock /> local time</motion.p>
      </motion.div>
      <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease, delay: 0.2 }}>
        <div className="ring"><img src={P.photo} alt={P.name} /></div>
        <span className="chip c1">Laravel</span><span className="chip c2">React.js</span><span className="chip c3">Flutter</span><span className="chip c4">MySQL</span>
      </motion.div>
    </section>
  );
}

const Head = ({ title, sub }) => (<div className="head"><h2>{title}</h2>{sub && <p className="mu">{sub}</p>}</div>);

function About() {
  return (
    <section id="about" className="wrap">
      <Head title="Backend depth, frontend polish." />
      <div className="two">
        <div>{P.about.map((t, i) => <p key={i}>{t}</p>)}
          <dl className="facts">{P.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </div>
        <ul className="points">{P.points.map(([t, d]) => <li className="card" key={t}><strong>{t}</strong><span className="mu">{d}</span></li>)}</ul>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="wrap">
      <Head title="The tools I work with" />
      <div className="grid-k">{skills.map(([k, items]) => (
        <motion.div className="card" key={k} {...reveal}><h3>{k}</h3><div className="tags">{items.map((s) => <span key={s}>{s}</span>)}</div></motion.div>
      ))}</div>
    </section>
  );
}

function Cover({ p }) {
  const [bad, setBad] = useState(false);
  return (
    <div className="cover" style={{ "--h": p.hue }}>
      {bad ? <span>{p.name}</span> : <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" onError={() => setBad(true)} />}
    </div>
  );
}

function Detail({ p }) {
  return (
    <div className="detail">
      <Cover p={p} />
      <p>{p.desc}</p>
      <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
      <div className="acts">
        <a className="btn pri" href={p.live} target="_blank" rel="noopener">Open live site</a>
        {p.source && <a className="btn" href={p.source} target="_blank" rel="noopener">View source</a>}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="wrap">
      <Head title="Selected projects" sub="Real products built for real businesses." />
      <div className="grid-p">
        {projects.map((p, i) => (
          <motion.article className="card proj-card" key={p.name} {...reveal} transition={{ duration: 0.7, ease, delay: (i % 3) * 0.08 }}>
            <Cover p={p} />
            <div className="pc-body">
              <span className="mu small">{p.type}</span>
              <h3>{p.name}</h3>
              <p className="mu">{p.desc}</p>
              <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="acts">
                <a className="btn pri sm" href={p.live} target="_blank" rel="noopener">Live site</a>
                {p.source && <a className="btn sm" href={p.source} target="_blank" rel="noopener">Source</a>}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="wrap">
      <Head title="What I can build for you" />
      <div className="grid-s">{services.map(([t, i, d]) => <motion.div className="card svc" key={t} {...reveal}><span className="ico">{i}</span><h3>{t}</h3><p className="mu">{d}</p></motion.div>)}</div>
    </section>
  );
}

function Timeline({ title, items }) {
  const r = useRef(null);
  const { scrollYProgress } = useScroll({ target: r, offset: ["start 75%", "end 55%"] });
  return (
    <div>
      <h3 className="tl-title">{title}</h3>
      <div className="tl" ref={r}>
        <motion.i className="fill" style={{ scaleY: scrollYProgress }} />
        {items.map(([d, t, o, x]) => (
          <div className="tl-item" key={t}><span className="mu">{d}</span><h4>{t}</h4><strong>{o}</strong><p className="mu">{x}</p></div>
        ))}
      </div>
    </div>
  );
}

function Journey() {
  return (
    <section id="journey" className="wrap">
      <Head title="Experience and education" />
      <div className="two"><Timeline title="Work" items={work} /><Timeline title="Education" items={education} /></div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [state, setState] = useState("idle");
  const copy = async () => {
    try { await navigator.clipboard.writeText(P.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch (e) { window.location.href = `mailto:${P.email}`; }
  };
  const send = async (e) => {
    e.preventDefault();
    const form = e.target, f = new FormData(form);
    if (!P.formEndpoint) {
      window.location.href = `mailto:${P.email}?subject=${encodeURIComponent("Portfolio contact from " + f.get("name"))}&body=${encodeURIComponent(f.get("message") + "\n\nFrom: " + f.get("email"))}`;
      return;
    }
    setState("sending");
    try {
      const r = await fetch(P.formEndpoint, { method: "POST", body: f, headers: { Accept: "application/json" } });
      if (!r.ok) throw new Error();
      setState("sent"); form.reset();
    } catch (err) { setState("error"); }
  };
  const rows = [
    ["✉️", "Email", P.email, copy, copied ? "Copied!" : "Tap to copy"],
    ["📞", "Phone", P.phone, `tel:${P.phone}`, "Call now"],
    ["💬", "WhatsApp", "Chat with me", `https://wa.me/${P.whatsapp}`, "Usually replies fast"],
    ["📍", "Location", P.facts[0][1], null, "Available remotely"],
  ];
  return (
    <section id="contact" className="wrap">
      <motion.div className="cta" {...reveal}>
        <h2 className="big">Have a project in mind? <span className="grad">Let's talk.</span></h2>
        <p className="lead">Tell me what you need. I'll reply with a clear plan, timeline and price.</p>
      </motion.div>
      <div className="two c-two">
        <motion.div className="c-list" {...reveal}>
          {rows.map(([i, l, v, act, hint]) => {
            const inner = (<><span className="ico">{i}</span><span className="c-txt"><span className="mu small">{l}</span><strong>{v}</strong></span><span className="mu small c-hint" role={act === copy ? "status" : undefined}>{hint}</span></>);
            if (!act) return <div className="card c-row" key={l}>{inner}</div>;
            if (typeof act === "function") return <button className="card c-row" key={l} onClick={act}>{inner}</button>;
            return <a className="card c-row" key={l} href={act} target={act.startsWith("http") ? "_blank" : undefined} rel="noopener">{inner}</a>;
          })}
          <div className="acts"><a className="btn" href={P.linkedin} target="_blank" rel="noopener">LinkedIn</a><a className="btn" href={P.github} target="_blank" rel="noopener">GitHub</a></div>
        </motion.div>
        <motion.form className="card form" onSubmit={send} {...reveal}>
          <h3>Send a message</h3>
          <label htmlFor="n">Your name</label><input id="n" name="name" autoComplete="name" required placeholder="Your name" />
          <label htmlFor="e">Your email</label><input id="e" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
          <label htmlFor="m">Message</label><textarea id="m" name="message" rows="5" required placeholder="Tell me about your project" />
          <button className="btn pri" disabled={state === "sending"}>{state === "sending" ? "Sending..." : "Send message"}</button>
          <p className={`note ${state}`} role="status">{state === "sent" && "Message sent. I'll get back to you soon."}{state === "error" && "Couldn't send your message. Please email me directly."}</p>
        </motion.form>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main><Hero /><About /><Skills /><Projects /><Services /><Journey /><Contact /></main>
      <footer className="wrap">© {new Date().getFullYear()} {P.name}. All rights reserved.</footer>
      <a className="wa" href={`https://wa.me/${P.whatsapp}`} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">WhatsApp</a>
    </>
  );
}
