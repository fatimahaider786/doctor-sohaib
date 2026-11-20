import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

/* ————— Real content, referenced from drsohaib.com and the doctor's public listings ————— */

const PHONES = ["+92 321 488 1054", "+92 300 801 6669"];
const PHONE_TEL = ["+923214881054", "+923008016669"];
const EMAIL = "eyedoc786@gmail.com";

const NAV = [
  ["The sub-specialty", "#uveitis"],
  ["Treatments", "#treatments"],
  ["Profile", "#profile"],
  ["Patients", "#testimonials"],
  ["Questions", "#faq"],
  ["Contact", "#contact"],
];

const SERVICES = [
  {
    name: "Uveitis & Ocular Inflammation",
    desc: "Diagnosis and long-term control of inflammation inside the eye — the sub-specialty Dr. Sohaib is formally trained in, and the only such consultant in Pakistan.",
    lead: true,
  },
  { name: "Cataract Surgery", desc: "The clouded lens is removed and replaced with a clear implant, including cataracts caused by uveitis and its treatment." },
  { name: "Refractive Surgery & LASIK", desc: "Laser correction of spectacle number, so everyday life needs fewer glasses." },
  { name: "Diabetic Eye Surgery", desc: "Laser and vitreoretinal treatment that protects sight when diabetes has damaged the retina." },
  { name: "Retinal Detachment Surgery", desc: "Urgent vitreoretinal repair to put the retina back in place before sight is lost." },
  { name: "Glaucoma Care", desc: "Detection and control of eye pressure with medicine, laser or surgery." },
  { name: "Cornea Transplant", desc: "Replacement of a scarred or swollen cornea with clear donor tissue." },
  { name: "Squint Correction", desc: "Realigning the eyes so they work — and look — together again." },
  { name: "Laser Procedures", desc: "Precision laser treatment for after-cataract membranes, angle closure and retinal disease." },
  { name: "Blepharoplasty", desc: "Eyelid surgery that restores comfort and field of vision when lids droop or bag." },
  { name: "Ptosis Repair", desc: "Lifting a lid that hangs low, in children and adults." },
];

const QUALIFICATIONS = [
  ["MBBS", "Pakistan"],
  ["FCPS, Ophthalmology", "College of Physicians & Surgeons, Pakistan"],
  ["FCPS, Vitreoretina", "College of Physicians & Surgeons, Pakistan"],
  ["MRCS", "United Kingdom"],
  ["FRCS", "United Kingdom"],
  ["Fellowship, Uveitis & Ocular Inflammation", "United States"],
];

const TESTIMONIALS = [
  {
    text: "Dr. Sohaib has all the qualities one looks for in a doctor, but rarely finds. For the two months that I was under his care, I was struck by his personal attention and the sincerity with which he followed my recovery.",
    by: "Uveitis patient, under his care for two months",
    lead: true,
  },
  {
    text: "I am fortunate to be one of Dr. Sohaib\u2019s patients. He is the fifth doctor I saw on my journey to getting properly diagnosed and treated — there will not be a sixth.",
    by: "Patient who finally received the right diagnosis",
  },
  {
    text: "Dr. Sohaib and his clinic have set the bar very high in patient care and the treatment of uveitis. He was the first doctor I met who took the time to explain what was happening in my eye and how the treatment would work.",
    by: "Patient of the uveitis clinic",
  },
];

const FAQS = [
  {
    q: "What is a cataract?",
    a: "A cataract is a clouding of the lens of the eye, which is normally clear and transparent. When a cataract develops, the lens becomes foggy, like looking through frosted glass, and vision gradually dims. Surgery replaces the clouded lens with a clear implant — a short, routine procedure that restores the eye's own clarity.",
  },
  {
    q: "What is uveitis, and why does it need a specialist?",
    a: "Uveitis is the inflammation of the uvea — the pigmented layer that lies between the inner retina and the outer fibrous coat of sclera and cornea. Because it can hide behind an ordinary-looking \u2018red eye\u2019, it is often treated late or incompletely. Uncontrolled inflammation scars the retina, raises eye pressure and clouds the lens, so a formally trained uveitis specialist treats both the inflammation and the complications it leaves behind.",
  },
  {
    q: "Is refractive surgery safe?",
    a: "Modern laser refractive surgery is highly precise, and the overwhelming majority of patients see comfortably without glasses afterwards. Safety begins before the laser: a careful examination decides whether your cornea, prescription and eye health make you a good candidate. Dr. Sohaib performs the assessment himself and will tell you plainly if glasses remain the better option.",
  },
  {
    q: "What is retinal detachment, and how urgent is it?",
    a: "The retina is the light-sensing lining at the back of the eye; when it lifts away from its wall, vision is lost in the affected area — often described as a curtain or shadow. Flashes, a sudden shower of floaters or a spreading shadow need same-week assessment, because detachment surgery works best before the centre of the retina is involved.",
  },
  {
    q: "What happens at a first appointment?",
    a: "Bring your previous prescriptions, reports and eye drops. The visit includes a vision check, a slit-lamp examination and, when needed, a dilated fundus examination so the retina can be seen properly. The diagnosis and a written plan are discussed the same day; bring a companion, since vision may be blurred for a few hours after dilation.",
  },
];

/* ————— Icons ————— */

const Ico = {
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
  ),
  burger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
  ),
};

/* Aperture brand mark — a small iris */
function Mark({ size = 34 }) {
  const ticks = [];
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const x1 = 17 + Math.cos(a) * 9.5, y1 = 17 + Math.sin(a) * 9.5;
    const x2 = 17 + Math.cos(a) * 14.5, y2 = 17 + Math.sin(a) * 14.5;
    ticks.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />);
  }
  return (
    <svg className="brand__mark" width={size} height={size} viewBox="0 0 34 34" aria-hidden="true">
      <circle cx="17" cy="17" r="16" fill="none" stroke="#B98A2F" strokeWidth="1.4" />
      <g stroke="#15655B" strokeWidth="1.4" strokeLinecap="round">{ticks}</g>
      <circle cx="17" cy="17" r="6.2" fill="#0A1B22" />
      <circle cx="19" cy="15" r="1.3" fill="#F1F4F3" opacity="0.85" />
    </svg>
  );
}

/* ————— The iris aperture — the page's single orchestrated moment ————— */

function IrisCanvas({ size = 420 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const S = size;
    canvas.width = S * DPR;
    canvas.height = S * DPR;
    ctx.scale(DPR, DPR);

    const N = 240;
    const fibers = Array.from({ length: N }, (_, i) => {
      const a = (i / N) * Math.PI * 2 + (Math.sin(i * 12.9898) * 0.5) * 0.02;
      const r = Math.sin(i * 78.233);
      return {
        a,
        w: 0.6 + ((i * 2654435761) % 100) / 100 * 2.1,
        teal: i % 24 === 0,
        dark: r > 0.45,
        len: 0.8 + ((i * 40503) % 100) / 100 * 0.22,
        curve: (Math.sin(i * 3.7) * 0.5) * 0.16,
        seed: (i * 134) % 628 / 100,
      };
    });

    function drawFrame(pupil) {
      const c = S / 2;
      const R = S / 2 - 2;
      ctx.clearRect(0, 0, S, S);

      // iris body
      const body = ctx.createRadialGradient(c, c, pupil * 0.6, c, c, R);
      body.addColorStop(0, "#8A6420");
      body.addColorStop(0.45, "#B98A2F");
      body.addColorStop(0.85, "#7C5A1E");
      body.addColorStop(1, "#0E242D");
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fillStyle = body;
      ctx.fill();

      // radial fibres
      for (const f of fibers) {
        const r0 = pupil;
        const r1 = R * f.len;
        const steps = 7;
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const rr = r0 + (r1 - r0) * t;
          const aa = f.a + f.curve * t * t;
          const x = c + Math.cos(aa) * rr;
          const y = c + Math.sin(aa) * rr;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineWidth = f.w * (0.6 + 0.4 * (r1 / R));
        if (f.teal) ctx.strokeStyle = "rgba(28, 104, 94, 0.75)";
        else if (f.dark) ctx.strokeStyle = "rgba(58, 38, 10, 0.55)";
        else ctx.strokeStyle = "rgba(222, 176, 84, 0.6)";
        ctx.stroke();
      }

      // collarette shimmer ring
      ctx.beginPath();
      ctx.arc(c, c, (pupil + R * 0.78) / 2, 0, Math.PI * 2);
      ctx.lineWidth = R * 0.1;
      ctx.strokeStyle = "rgba(222, 176, 84, 0.12)";
      ctx.stroke();

      // limbus (outer pigmented ring)
      ctx.beginPath();
      ctx.arc(c, c, R - 3, 0, Math.PI * 2);
      ctx.lineWidth = 6;
      ctx.strokeStyle = "rgba(10, 27, 34, 0.8)";
      ctx.stroke();

      // pupil
      const pup = ctx.createRadialGradient(c, c, 1, c, c, pupil);
      pup.addColorStop(0, "#020a0e");
      pup.addColorStop(0.9, "#04121a");
      pup.addColorStop(1, "rgba(4, 18, 26, 0)");
      ctx.beginPath();
      ctx.arc(c, c, pupil, 0, Math.PI * 2);
      ctx.fillStyle = pup;
      ctx.fill();

      // specular highlights
      const hx = c - R * 0.38, hy = c - R * 0.42;
      const hl = ctx.createRadialGradient(hx, hy, 0, hx, hy, R * 0.16);
      hl.addColorStop(0, "rgba(241, 244, 243, 0.5)");
      hl.addColorStop(1, "rgba(241, 244, 243, 0)");
      ctx.beginPath();
      ctx.arc(hx, hy, R * 0.16, 0, Math.PI * 2);
      ctx.fillStyle = hl;
      ctx.fill();
    }

    let raf = 0;
    const R = S / 2 - 2;
    if (reduce) {
      drawFrame(R * 0.5);
      return () => cancelAnimationFrame(raf);
    }
    // opening dilation, then a living loop: slow breathing + pupil that
    // reacts to scroll the way a real pupil reacts to light
    const t0 = performance.now();
    const DUR = 1700;
    let vy = 0;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      vy += Math.min(Math.abs(y - lastY) * 0.05, 10);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    function frame(t) {
      const p = Math.min((t - t0) / DUR, 1);
      const e = 1 - Math.pow(1 - p, 3);
      drawFrame(R * (0.34 + (0.52 - 0.34) * e));
      if (p < 1) raf = requestAnimationFrame(frame);
      else raf = requestAnimationFrame(loop);
    }
    let cur = R * 0.52;
    function loop(t) {
      vy *= 0.9;
      const breathe = Math.sin(t / 950) * 0.014;
      const target = R * 0.47 + breathe * R + Math.min(vy, R * 0.16);
      cur += (target - cur) * 0.09;
      drawFrame(cur);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [size]);

  return <canvas ref={ref} width={size} height={size} aria-label="Stylised iris of an eye, dilating" role="img" />;
}

/* ————— Header ————— */

function Topbar() {
  return (
    <div className="topbar">
      <div className="wrap topbar__inner">
        <a href={"tel:" + PHONE_TEL[0]}>{Ico.phone}<span>Call anytime&nbsp; {PHONES[0]}</span></a>
        <a className="topbar__email" href={"mailto:" + EMAIL}>{Ico.mail}<span>{EMAIL}</span></a>
      </div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > 160 && y > lastY + 4) setHidden(true);
      else if (y < lastY - 4 || y <= 160) setHidden(false);
      lastY = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const close = () => setOpen(false);
  return (
    <header className={"nav" + (scrolled ? " nav--scrolled" : "") + (hidden ? " nav--hidden" : "")}>
      <div className="wrap nav__inner">
        <a className="brand" href="#top" onClick={close}>
          <Mark />
          <span>
            <span className="brand__name">Dr. Sohaib Abbas Malik</span><br />
            <span className="brand__role">Consultant Uveitis Specialist</span>
          </span>
        </a>
        <ul className="nav__links">
          {NAV.map(([t, h]) => (
            <li key={h}><a href={h}>{t}</a></li>
          ))}
        </ul>
        <a className="btn btn--uvea nav__cta" href="#contact">Book an appointment</a>
        <button
          className="nav__burger"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {Ico.burger}
        </button>
      </div>
      <div className={"nav__panel" + (open ? " nav__panel--open" : "")}>
        <ul className="wrap">
          {NAV.map(([t, h]) => (
            <li key={h}><a href={h} onClick={close}>{t}</a></li>
          ))}
          <li><a href="#contact" onClick={close} style={{ color: "var(--uvea)" }}>Book an appointment</a></li>
        </ul>
      </div>
    </header>
  );
}

/* ————— Hero ————— */

function Hero({ portrait }) {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div>
          <h1 className="hero__title" data-reveal="mask">
            <span className="rv">Pakistan&rsquo;s only <em>formally trained</em> uveitis specialist.</span>
          </h1>
          <p className="hero__sub" data-reveal="fade" style={{ "--rd": "220ms" }}>
            <strong>Dr. Sohaib Abbas Malik</strong> treats the eye&rsquo;s hidden inflammations
            — and the retinas, cataracts and corneas they leave behind. Consultant
            ophthalmic surgeon at LRBT and Medeast Hospitals, Lahore.
          </p>
          <div className="hero__ctas" data-reveal="fade" style={{ "--rd": "380ms" }}>
            <a className="btn btn--uvea" href="#contact">Book an appointment</a>
            <a className="hero__phone" href={"tel:" + PHONE_TEL[0]}>{Ico.phone}{PHONES[0]}</a>
          </div>
          <p className="hero__stats" data-reveal="fade" style={{ "--rd": "520ms" }}>
            Over <strong>35,000 patients</strong> treated across <strong>a decade of ophthalmology</strong> —
            from first diagnosis to the last suture.
          </p>
        </div>
        <div className="hero__portrait" data-reveal="media" style={{ "--rd": "250ms" }}>
          <div className="hero__portrait-frame">
            <img src={portrait} alt="Portrait of Dr. Sohaib Abbas Malik, consultant uveitis specialist" />
          </div>
          <p className="hero__portrait-cap" data-reveal="fade" style={{ "--rd": "650ms" }}>
            Dr. Sohaib Abbas Malik — Consultant Uveitis Specialist, Lahore.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ————— Uveitis band ————— */

function Uveitis() {
  return (
    <section className="band band--ink" id="uveitis">
      <div className="wrap">
        <div className="uvea__grid">
          <div>
            <p className="kicker" data-reveal="fade">The sub-specialty</p>
            <p className="uvea__def" data-reveal="fade" style={{ "--rd": "150ms" }}>
              Uveitis is the inflammation of the <em>uvea</em> — the pigmented layer that lies
              between the inner retina and the outer fibrous coat of sclera and cornea.
            </p>
            <p className="uvea__body" data-reveal="fade" style={{ "--rd": "300ms" }}>
              It hides behind an ordinary-looking red eye, and it recurs quietly. Left
              uncontrolled, it scars the retina, raises pressure and clouds the lens —
              <strong> which is why Dr. Sohaib&rsquo;s theatre list also covers the complications
              uveitis leaves behind: cataract, glaucoma and retinal detachment.</strong> One
              consultant, responsible for the whole eye.
            </p>
          </div>
          <figure className="uvea__fig" data-reveal="media" style={{ "--rd": "200ms" }}>
            <IrisCanvas size={380} />
            <figcaption className="uvea__figcap">The pigmented layer, drawn live. When it inflames, the whole eye is at risk.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ————— Treatments ————— */

function Treatments() {
  const lead = SERVICES.find((s) => s.lead);
  const rest = SERVICES.filter((s) => !s.lead);
  return (
    <section className="band" id="treatments">
      <div className="wrap">
        <p className="kicker" data-reveal="fade">Treatments</p>
        <h2 className="h2" data-reveal="mask"><span className="rv">One eye deserves <em>one consultant</em>, whatever it needs.</span></h2>
        <div className="index" data-reveal="fade" style={{ "--rd": "180ms" }}>
          <div className="index__lead">
            <h3 className="index__lead-name">{lead.name}</h3>
            <p className="index__lead-desc">{lead.desc}</p>
          </div>
          <div className="index__grid" data-stagger>
            {rest.map((s) => (
              <div className="index__row" key={s.name}>
                <span className="index__name">{s.name}</span>
                <p className="index__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————— Profile ————— */

function Profile({ moran, clinic }) {
  return (
    <section className="band band--saline" id="profile">
      <div className="wrap">
        <p className="kicker" data-reveal="fade">Profile</p>
        <h2 className="h2" data-reveal="mask"><span className="rv">Consultant ophthalmic surgeon &amp; <em>laser eye surgeon.</em></span></h2>
        <div className="profile__body" data-reveal="fade" style={{ "--rd": "150ms" }}>
          <p>
            <strong>Dr. Sohaib Abbas Malik</strong> is a skilled ophthalmic surgeon and
            consultant ophthalmologist. His area of sub-specialty is <strong>uveitis and
            ocular inflammation</strong>, for which he is the only formally trained
            consultant in Pakistan.
          </p>
          <p>
            He works as an associate ophthalmologist at <strong>LRBT Hospital on Multan
            Road, Lahore</strong>, where he has served as Head of the Uveitis Division,
            and sees private patients at Medeast Hospital. In a decade of ophthalmology, more than 35,000
            patients have passed through his care — from routine cataracts to retinas
            reattached in time.
          </p>
          <p>
            Training took him from FCPS in Lahore to vitreoretinal surgery, MRCS and FRCS
            in the United Kingdom, and a fellowship in uveitis and ocular inflammation in
            the United States — the years behind the photographs below. The list that
            follows is what he answers for at the clinic.
          </p>
          <div className="ledger" data-stagger>
            {QUALIFICATIONS.map(([deg, src]) => (
              <div className="ledger__row" key={deg}>
                <span className="ledger__deg">{deg}</span>
                <span className="ledger__src">{src}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="profile__spread" data-reveal="fade">
          <p className="spread__title" data-reveal="mask"><span className="rv">The <em>fellowship</em> years</span></p>
          <p className="spread__sub" data-reveal="fade" style={{ "--rd": "120ms" }}>Sub-specialty training in uveitis &amp; ocular inflammation, United States.</p>
          <div className="spread__figs">
            <figure className="spread__fig spread__fig--wide" data-reveal="media">
              <img src={moran} alt="The fellows&rsquo; cohort at the Uveitis Fellows Forum, John A. Moran Eye Center" loading="lazy" />
              <figcaption>With the fellows&rsquo; cohort at the Uveitis Fellows Forum, John A. Moran Eye Center — Salt Lake City, February 2015.</figcaption>
            </figure>
            <figure className="spread__fig" data-reveal="media" style={{ "--rd": "180ms" }}>
              <img src={clinic} alt="Dr. Sohaib Abbas Malik in clinic with colleagues during his fellowship" loading="lazy" />
              <figcaption>In clinic during fellowship training, University of Utah.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————— Testimonials ————— */

function Testimonials() {
  const lead = TESTIMONIALS.find((t) => t.lead);
  const pair = TESTIMONIALS.filter((t) => !t.lead);
  return (
    <section className="band band--ink" id="testimonials">
      <div className="wrap">
        <p className="kicker" data-reveal="fade">Patients</p>
        <h2 className="h2" data-reveal="mask"><span className="rv">In their <em>own</em> words.</span></h2>
        <div className="quotes" data-stagger>
          <blockquote className="quote quote--lead">
            <span className="quote__mark" aria-hidden="true">&ldquo;</span>
            <p className="quote__text">{lead.text}</p>
            <footer className="quote__by"><strong>{lead.by.split(",")[0]},</strong> {lead.by.split(", ").slice(1).join(", ")}</footer>
          </blockquote>
          <div className="quotes__pair" data-stagger>
            {pair.map((t) => (
              <blockquote className="quote" key={t.by}>
                <span className="quote__mark" aria-hidden="true">&ldquo;</span>
                <p className="quote__text">{t.text}</p>
                <footer className="quote__by"><strong>{t.by.split(",")[0]},</strong> {t.by.split(", ").slice(1).join(", ")}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————— FAQ ————— */

function Faq() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="band" id="faq">
      <div className="wrap">
        <p className="kicker" data-reveal="fade">Questions patients ask</p>
        <h2 className="h2" data-reveal="mask"><span className="rv">Answered <em>plainly</em>, before you call.</span></h2>
        <div className="faq" data-stagger>
          {FAQS.map((f, i) => {
            const open = openIdx === i;
            return (
              <div className="faq__item" data-open={open} key={f.q}>
                <button
                  className="faq__q"
                  aria-expanded={open}
                  onClick={() => setOpenIdx(open ? -1 : i)}
                >
                  {f.q}
                  <span className="faq__chev">{Ico.plus}</span>
                </button>
                <div className="faq__a">
                  <div className="faq__a-inner"><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ————— Contact ————— */

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", concern: SERVICES[0].name, message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function submit(e) {
    e.preventDefault();
    const msg =
      `Appointment request — Dr. Sohaib Abbas Malik\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\nConcern: ${form.concern}\n` +
      (form.message ? `Note: ${form.message}` : "");
    window.open("https://wa.me/" + PHONE_TEL[0].replace("+", "") + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    setSent(true);
  }

  return (
    <section className="band" id="contact">
      <div className="wrap">
        <p className="kicker" data-reveal="fade">Contact</p>
        <h2 className="h2" data-reveal="mask"><span className="rv">Book an <em>appointment.</em></span></h2>
        <div className="contact__grid">
          <div className="contact__lines" data-stagger>
            <div className="cline">
              <span className="cline__ico">{Ico.phone}</span>
              <div>
                <div className="cline__label">Call anytime</div>
                <a className="cline__val" href={"tel:" + PHONE_TEL[0]}>{PHONES[0]}</a>
                <br />
                <a className="cline__val" href={"tel:" + PHONE_TEL[1]}>{PHONES[1]}</a>
              </div>
            </div>
            <div className="cline">
              <span className="cline__ico">{Ico.mail}</span>
              <div>
                <div className="cline__label">Email</div>
                <a className="cline__val" href={"mailto:" + EMAIL}>{EMAIL}</a>
              </div>
            </div>
            <div className="cline">
              <span className="cline__ico">{Ico.pin}</span>
              <div>
                <div className="cline__label">Clinics</div>
                <span className="cline__val">LRBT Hospital, Multan Road, Lahore</span>
                <div className="cline__note">Uveitis Division — associate ophthalmologist</div>
                <span className="cline__val" style={{ display: "block", marginTop: "0.5rem" }}>Medeast Hospital, Lahore</span>
                <div className="cline__note">Private clinics — call to confirm timings</div>
              </div>
            </div>
          </div>
          <form className="form" onSubmit={submit} data-reveal="fade" style={{ "--rd": "200ms" }}>
            <div className="form__row">
              <div className="field">
                <label htmlFor="f-name">Your name</label>
                <input id="f-name" required value={form.name} onChange={set("name")} placeholder="Full name" />
              </div>
              <div className="field">
                <label htmlFor="f-phone">Your phone</label>
                <input id="f-phone" required type="tel" value={form.phone} onChange={set("phone")} placeholder="03xx xxxxxxx" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-concern">What is the appointment for?</label>
              <select id="f-concern" value={form.concern} onChange={set("concern")}>
                {SERVICES.map((s) => <option key={s.name}>{s.name}</option>)}
                <option>Second opinion</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-msg">Anything the clinic should know? <span style={{ fontWeight: 400, color: "var(--mist)" }}>(optional)</span></label>
              <textarea id="f-msg" value={form.message} onChange={set("message")} placeholder="Symptoms, how long, previous reports…" />
            </div>
            <button className="btn btn--macula" type="submit">{Ico.whatsapp} Send request on WhatsApp</button>
            {sent && (
              <p className="form__ok">WhatsApp is opening with your details filled in — press send there, and the clinic will confirm your time by phone.</p>
            )}
            <p className="form__note">
              Prefer to talk first? Either number above reaches the clinic directly. Requests are confirmed by phone, not treated as bookings on their own.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ————— Footer ————— */

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <a className="brand" href="#top">
              <Mark />
              <span>
                <span className="brand__name">Dr. Sohaib Abbas Malik</span><br />
                <span className="brand__role">Consultant Uveitis Specialist</span>
              </span>
            </a>
            <p className="footer__blurb">
              Uveitis, retina and cataract care in Lahore — the only formally trained
              uveitis consultant in Pakistan.
            </p>
          </div>
          <div>
            <h3 className="footer__h">The clinic</h3>
            <ul className="footer__links">
              {NAV.map(([t, h]) => <li key={h}><a href={h}>{t}</a></li>)}
            </ul>
          </div>
          <div>
            <h3 className="footer__h">Appointments</h3>
            <div className="footer__contact">
              <a href={"tel:" + PHONE_TEL[0]}>{PHONES[0]}</a>
              <a href={"tel:" + PHONE_TEL[1]}>{PHONES[1]}</a>
              <a href={"mailto:" + EMAIL}>{EMAIL}</a>
              <span>LRBT Hospital, Multan Road, Lahore</span>
            </div>
          </div>
        </div>
        <div className="footer__base">
          <span>&copy; {new Date().getFullYear()} Dr. Sohaib Abbas Malik. All rights reserved.</span>
          <span>In an emergency — sudden vision loss, injury or a painful red eye — go to the nearest eye emergency, not the form above.</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  // one observer drives the whole page's choreography; each element carries
  // data-reveal (variant) and an optional --rd delay so entrances feel timed,
  // not uniform
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal], [data-stagger]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Topbar />
      <Header />
      <main>
        <Hero portrait={window.__IMG_PORTRAIT__} />
        <Uveitis />
        <Treatments />
        <Profile moran={window.__IMG_MORAN__} clinic={window.__IMG_CLINIC__} />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
