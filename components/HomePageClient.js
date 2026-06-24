"use client";

import { useEffect, useState, useRef } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const PHONE = "+917808770072";
const PHONE_DISPLAY = "+91 78087 70072";
const WA_URL = `https://wa.me/${PHONE}`;
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwK298L1drW8iPfl5xgGfHpHBr5MHb7E1WTK3BSrWHwzgE6i6xmyEgu0DxkEudF_g8/exec";

// ─── Reusable hook: intersection reveal ───────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Reveal wrapper ────────────────────────────────────────────────────────────
function Reveal({ children, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ children, variant = "green" }) {
  const styles = {
    green: { background: "rgba(13,107,80,0.08)", color: "#0D6B50" },
    gold:  { background: "rgba(232,169,24,0.12)", color: "#C4890A" },
    white: { background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.4rem 1.2rem",
        borderRadius: "50px",
        fontSize: "0.8rem",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: "1rem",
        ...styles[variant],
      }}
    >
      {children}
    </span>
  );
}

// ─── Nav ───────────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["#services", "Services"],
    ["#process", "How It Works"],
    ["#conditions", "Conditions"],
    ["#doctors", "For Doctors"],
  ];
  const scroll = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <nav
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(13,107,80,0.10)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <img
              src="/easymovementlogo.jpg"
              alt="Easy Movement Logo"
              style={{ height: 56, width: "auto", maxWidth: 220, objectFit: "contain" }}
              onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
            />
            <div
              style={{
                display: "none",
                background: "linear-gradient(135deg,#0D6B50,#4FA88A)",
                width: 40, height: 40,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 2C8 2 4 6 4 10c0 5 8 12 8 12s8-7 8-12c0-4-4-8-8-8z" />
              </svg>
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontFamily:"var(--font-playfair),Georgia,serif", color:"#0A1628", fontWeight:700, fontSize:"1rem", letterSpacing:"0.02em" }}>
                Easy Movement
              </div>
              <div style={{ color: "#0D6B50", fontWeight: 600, letterSpacing: "0.08em", fontSize: "0.75rem" }}>
                HOME PHYSIOTHERAPY
              </div>
            </div>
          </div>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="desktop-nav">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={(e) => scroll(e, href)}
                style={{ fontSize: "0.875rem", color: "#374151", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = "#0D6B50")}
                onMouseLeave={(e) => (e.target.style.color = "#374151")}
              >
                {label}
              </a>
            ))}
            <a href="#booking" onClick={(e) => scroll(e, "#booking")} style={btnStyles.primary} onMouseEnter={btnHover.primaryIn} onMouseLeave={btnHover.primaryOut}>
              📞 Book Now
            </a>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
            className="mobile-menu-btn"
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#0D6B50">
              <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ borderTop: "1px solid #e5e7eb", background: "white", paddingBottom: 16 }}>
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={(e) => scroll(e, href)}
                style={{ display: "block", padding: "12px 16px", color: "#374151", textDecoration: "none" }}
              >
                {label}
              </a>
            ))}
            <div style={{ padding: "12px 16px" }}>
              <a href="#booking" onClick={(e) => scroll(e, "#booking")} style={btnStyles.primary}>
                📞 Book Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };
  const checks = ["Certified Therapists", "100% Home Visit", "Doctor-Approved Plans", "24×7, 365 Days"];
  return (
    <section
      id="hero"
      style={{
        background: "linear-gradient(135deg,#0A1628 0%,#0F2545 40%,#093830 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 64,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orbs */}
      <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", filter:"blur(80px)", opacity:0.15, background:"#0D6B50", top:-200, right:-200 }} />
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", filter:"blur(80px)", opacity:0.15, background:"#E8A918", bottom:-100, left:-100 }} />

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"5rem 1.5rem", position:"relative", zIndex:10, width:"100%" }}>
        <div className="hero-grid">
          {/* Left */}
          <div style={{ animation:"fadeUp 0.8s ease forwards" }}>
            <SectionLabel variant="white">🇮🇳 India&apos;s Most Trusted Home Physiotherapy</SectionLabel>
            <h1 style={{ fontFamily:"var(--font-playfair),Georgia,serif", color:"white", lineHeight:1.15, marginBottom:"1.5rem", fontSize:"clamp(2.2rem,5vw,3.8rem)" }}>
              Easy Movement — Expert Home Physiotherapy<br />
              <span style={{ color:"#E8A918" }}>Right at Your Door.</span><br />
              <span style={{ color:"#4FA88A" }}>Real Relief. Fast Recovery.</span>
            </h1>
            <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"1.125rem", marginBottom:"2rem", lineHeight:1.7, maxWidth:480 }}>
              No more painful trips to clinics. Get certified physiotherapists at your home anywhere in India — with expert care, trust, and the most advanced equipment.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:16, marginBottom:"2.5rem" }}>
              <a href="#booking" onClick={(e) => scrollTo(e,"#booking")} style={btnStyles.gold} onMouseEnter={btnHover.goldIn} onMouseLeave={btnHover.goldOut}>
                📞 Book a Free Consultation
              </a>
              <a href="#process" onClick={(e) => scrollTo(e,"#process")} style={btnStyles.outline} onMouseEnter={btnHover.outlineIn} onMouseLeave={btnHover.outlineOut}>
                See How It Works →
              </a>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:24 }}>
              {checks.map((c) => (
                <div key={c} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:"rgba(13,107,80,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4FA88A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span style={{ color:"rgba(255,255,255,0.8)", fontSize:"0.875rem", fontWeight:500 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ display:"flex", flexDirection:"column", gap:16, animation:"fadeUp 0.8s 0.2s ease forwards", opacity:0 }}>
            <div
              style={{
                borderRadius:24, overflow:"hidden", position:"relative", width:"100%", minHeight:320,
                background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)",
                backdropFilter:"blur(10px)", display:"flex", alignItems:"center", justifyContent:"center",
                animation:"float 4s ease-in-out infinite",
              }}
            >
              <img
                src="/easy_movement_heroimage_home_physiotherapy_female.jpg"
                alt="Easy Movement home physiotherapy session"
                style={{ width:"100%", height:"auto", objectFit:"contain", display:"block" }}
                onError={(e) => { e.target.parentElement.style.background = "linear-gradient(135deg,#0D6B50,#4FA88A)"; e.target.style.display = "none"; }}
              />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(to top,rgba(10,22,40,0.85) 0%,transparent 100%)", padding:"1.5rem" }}>
                <div style={{ color:"white", fontWeight:600, fontSize:"0.875rem" }}>Professional Session in Progress</div>
                <div style={{ color:"rgba(255,255,255,0.6)", fontSize:"0.75rem" }}>BPT + MPT Qualified Therapist</div>
              </div>
            </div>
            <div className="hero-stats">
              {[
                { val:"5000+", label:"Happy Patients", bg:"rgba(13,107,80,0.25)", border:"rgba(79,168,138,0.3)", color:"#E8A918" },
                { val:"100%", label:"Satisfaction", bg:"rgba(232,169,24,0.15)", border:"rgba(232,169,24,0.3)", color:"white" },
                { val:"24×7", label:"Always Available", bg:"rgba(255,255,255,0.08)", border:"rgba(255,255,255,0.2)", color:"#4FA88A" },
              ].map(({ val, label, bg, border, color }) => (
                <div key={label} style={{ borderRadius:16, padding:"1rem", textAlign:"center", background:bg, border:`1px solid ${border}` }}>
                  <div style={{ fontFamily:"var(--font-playfair),serif", fontSize:"1.875rem", fontWeight:700, color }}>{val}</div>
                  <div style={{ color:"rgba(255,255,255,0.7)", fontSize:"0.75rem", marginTop:4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, lineHeight:0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display:"block" }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FAFAF7" />
        </svg>
      </div>
    </section>
  );
}

// ─── Why Section ───────────────────────────────────────────────────────────────
function Why() {
  return (
    <section id="why" style={{ padding:"4rem 0", background:"#FAFAF7" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 1.5rem" }}>
        <Reveal>
          <div style={{ maxWidth:768, margin:"0 auto", textAlign:"center" }}>
            <SectionLabel>Why Easy Movement Exists</SectionLabel>
            <h2 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(1.8rem,4vw,2.5rem)", fontWeight:700, color:"#0A1628", marginBottom:"1.5rem" }}>
              Physiotherapy in India is Broken.<br />
              <span style={{ color:"#0D6B50" }}>We Fixed It — For You.</span>
            </h2>
            <p style={{ color:"#4b5563", fontSize:"1.125rem", lineHeight:1.7 }}>
              Thousands of patients across India skip physiotherapy — not because they don&apos;t need it — but because going to a clinic is painful, expensive, and inconvenient.{" "}
              <strong>We bring the clinic to your doorstep, anywhere in India.</strong>
            </p>
          </div>
        </Reveal>

        <div className="why-grid" style={{ marginTop:"3rem" }}>
          <Reveal>
            <div style={{ borderRadius:16, padding:"1.5rem", background:"#FEF4F4", borderLeft:"4px solid #E24B4A" }}>
              <div style={{ fontSize:"1.875rem", marginBottom:12 }}>😣</div>
              <h3 style={{ fontWeight:700, fontSize:"1.125rem", marginBottom:8, color:"#0A1628" }}>The Old Way</h3>
              <ul style={{ listStyle:"none", padding:0, fontSize:"0.875rem", color:"#4b5563", display:"flex", flexDirection:"column", gap:8 }}>
                {["Painful travel to clinic daily","Long waiting queues","Inconsistent therapists","No relief after several sessions","Family has to take leave to escort"].map(t => <li key={t}>✗ {t}</li>)}
              </ul>
            </div>
          </Reveal>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"var(--font-playfair),serif", fontSize:"3.75rem", fontWeight:700, color:"#0D6B50" }}>VS</div>
              <div style={{ marginTop:16, color:"#6b7280", fontSize:"0.875rem" }}>The difference<br />is life-changing</div>
            </div>
          </div>
          <Reveal>
            <div style={{ borderRadius:16, padding:"1.5rem", background:"#E8F4F0", borderLeft:"4px solid #0D6B50" }}>
              <div style={{ fontSize:"1.875rem", marginBottom:12 }}>🏠</div>
              <h3 style={{ fontWeight:700, fontSize:"1.125rem", marginBottom:8, color:"#0A1628" }}>The Easy Movement Way</h3>
              <ul style={{ listStyle:"none", padding:0, fontSize:"0.875rem", color:"#4b5563", display:"flex", flexDirection:"column", gap:8 }}>
                {["Expert visits your home, on time","Trusted and secured session","Doctor-prescribed treatment plans","Progress reports after every visit","Family can relax — we handle it"].map(t => <li key={t}>✓ {t}</li>)}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Process ───────────────────────────────────────────────────────────────────
function Process() {
  const scrollTo = (e) => { e.preventDefault(); document.querySelector("#booking")?.scrollIntoView({ behavior:"smooth" }); };
  const steps = [
    { icon:<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.41 7.5a16 16 0 006 6l.86-.86a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>, bg:"linear-gradient(135deg,#0D6B50,#4FA88A)", label:"Call Us", desc:"One call. We understand your problem." },
    { icon:<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>, bg:"linear-gradient(135deg,#0D6B50,#4FA88A)", label:"Consultation", desc:"Expert assessment of your condition." },
    { icon:<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>, bg:"linear-gradient(135deg,#E8A918,#F2C44E)", label:"Prescription", desc:"Personalized treatment plan made." },
    { icon:<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>, bg:"linear-gradient(135deg,#0D6B50,#4FA88A)", label:"Physio at Home", desc:"Expert visits your home, on time." },
    { icon:<><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></>, bg:"linear-gradient(135deg,#E8A918,#F2C44E)", label:"Session Report", desc:"Detailed report after every session." },
    { icon:<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>, bg:"linear-gradient(135deg,#0D6B50,#4FA88A)", label:"Progress Tracking", desc:"Live recovery monitoring & updates." },
  ];
  return (
    <section id="process" style={{ padding:"5rem 0", background:"#FAFAF7" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 1.5rem" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
            <SectionLabel>Our Process</SectionLabel>
            <h2 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(1.8rem,4vw,2.5rem)", fontWeight:700, color:"#0A1628" }}>
              6 Simple Steps to<br /><span style={{ color:"#0D6B50" }}>Complete Recovery</span>
            </h2>
            <p style={{ color:"#6b7280", marginTop:16, maxWidth:480, margin:"16px auto 0" }}>From your first call to your last report — every step is managed by professionals.</p>
          </div>
        </Reveal>
        <div className="steps-grid">
          {steps.map(({ icon, bg, label, desc }, i) => (
            <Reveal key={label}>
              <div style={{ textAlign:"center" }}>
                <div style={{ width:64, height:64, borderRadius:16, background:bg, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">{icon}</svg>
                </div>
                <div style={{ width:28, height:28, borderRadius:"50%", background:"#0A1628", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 8px", color:"white", fontSize:"0.75rem", fontWeight:700 }}>{i+1}</div>
                <h4 style={{ fontWeight:700, fontSize:"0.875rem", color:"#0A1628" }}>{label}</h4>
                <p style={{ color:"#6b7280", fontSize:"0.75rem", marginTop:4, lineHeight:1.6 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ textAlign:"center", marginTop:"3rem" }}>
            <a href="#booking" onClick={scrollTo} style={btnStyles.primary} onMouseEnter={btnHover.primaryIn} onMouseLeave={btnHover.primaryOut}>
              Start Your Recovery Today →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Services ──────────────────────────────────────────────────────────────────
function Services() {
  const cards = [
    {
      icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
      iconBg:"#E8F4F0", iconColor:"#0D6B50",
      title:"Orthopaedic Physiotherapy",
      desc:"Post-surgery rehab, knee pain, hip replacement, fracture recovery, joint stiffness, spine problems. Specialized manual therapy & strengthening.",
      tags:[["Knee Pain","#E8F4F0","#0D6B50"],["Post Surgery","#E8F4F0","#0D6B50"],["Spine","#E8F4F0","#0D6B50"]],
    },
    {
      icon:<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
      iconBg:"#E8F4F0", iconColor:"#0D6B50",
      title:"Neurological Physiotherapy",
      desc:"Stroke rehab, Parkinson's disease, spinal cord injury, paralysis, neurological weakness. Regain movement, balance, and independence.",
      tags:[["Stroke","#E8F4F0","#0D6B50"],["Paralysis","#E8F4F0","#0D6B50"],["Parkinson's","#E8F4F0","#0D6B50"]],
    },
    {
      icon:<><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></>,
      iconBg:"#FDF3DC", iconColor:"#C4890A",
      title:"Geriatric Physiotherapy",
      desc:"Specially designed for elderly patients. Balance training, fall prevention, arthritis management, improving mobility and quality of life.",
      tags:[["Arthritis","#FDF3DC","#C4890A"],["Balance","#FDF3DC","#C4890A"],["Elderly Care","#FDF3DC","#C4890A"]],
    },
    {
      icon:<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>,
      iconBg:"#E8F4F0", iconColor:"#0D6B50",
      title:"Cardiac & Pulmonary Rehab",
      desc:"Post heart attack/surgery recovery, COPD management, breathing exercises, improving cardiac endurance under expert supervision.",
      tags:[["Heart Rehab","#E8F4F0","#0D6B50"],["Breathing","#E8F4F0","#0D6B50"],["COPD","#E8F4F0","#0D6B50"]],
    },
    {
      icon:<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
      iconBg:"#E8F4F0", iconColor:"#0D6B50",
      title:"Paediatric Physiotherapy",
      desc:"For children with developmental delays, cerebral palsy, muscle weakness, coordination issues. Child-friendly, fun-based therapeutic sessions.",
      tags:[["Cerebral Palsy","#E8F4F0","#0D6B50"],["Child Dev.","#E8F4F0","#0D6B50"]],
    },
    {
      icon:<><circle cx="12" cy="12" r="5"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>,
      iconBg:"#FDF3DC", iconColor:"#C4890A",
      title:"Sports & Pain Management",
      desc:"Back pain, neck pain, sciatica, sports injuries, muscle spasms. Advanced electrotherapy, dry needling, deep tissue massage, stretching protocols.",
      tags:[["Back Pain","#FDF3DC","#C4890A"],["Sciatica","#FDF3DC","#C4890A"],["Sports","#FDF3DC","#C4890A"]],
    },
  ];
  return (
    <section id="services" style={{ padding:"5rem 0", background:"white" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 1.5rem" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
            <SectionLabel>Our Services</SectionLabel>
            <h2 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(1.8rem,4vw,2.5rem)", fontWeight:700, color:"#0A1628" }}>
              Every Type of Physiotherapy,<br /><span style={{ color:"#0D6B50" }}>Delivered at Home</span>
            </h2>
          </div>
        </Reveal>
        <div className="cards-grid">
          {cards.map(({ icon, iconBg, iconColor, title, desc, tags }) => (
            <Reveal key={title}>
              <ServiceCard icon={icon} iconBg={iconBg} iconColor={iconColor} title={title} desc={desc} tags={tags} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, iconBg, iconColor, title, desc, tags }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:"white", borderRadius:20, padding:"2rem",
        border:`1px solid ${hovered ? "rgba(13,107,80,0.3)" : "rgba(13,107,80,0.12)"}`,
        transition:"all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)",
        position:"relative", overflow:"hidden",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 30px 60px rgba(13,107,80,0.15)" : "none",
      }}
    >
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#0D6B50,#4FA88A,#E8A918)", transform: hovered ? "scaleX(1)" : "scaleX(0)", transition:"transform 0.4s ease", transformOrigin:"left" }} />
      <div style={{ width:64, height:64, borderRadius:"50%", background:iconBg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">{icon}</svg>
      </div>
      <h3 style={{ fontWeight:700, fontSize:"1.125rem", marginBottom:8, color:"#0A1628" }}>{title}</h3>
      <p style={{ color:"#6b7280", fontSize:"0.875rem", lineHeight:1.7, marginBottom:16 }}>{desc}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {tags.map(([label, bg, color]) => (
          <span key={label} style={{ fontSize:"0.75rem", padding:"4px 10px", borderRadius:"50px", background:bg, color }}>{label}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Conditions ────────────────────────────────────────────────────────────────
function Conditions() {
  const pills = ["🦴 Knee Pain","🧠 Stroke Recovery","💪 Back Pain","🦶 Foot Drop","🤕 Cervical Pain","🦵 Hip Replacement Rehab","🏋️ Frozen Shoulder","⚡ Sciatica","🧓 Parkinson's Disease","🔧 Post-Surgery Rehab","👶 Cerebral Palsy","❤️ Post-Heart Surgery","🦴 Osteoporosis","🏃 Sports Injuries","🤸 Spondylitis","💨 COPD / Breathing","🦾 Muscle Weakness","🧘 Arthritis","🫀 Paralysis","🤦 Headache & Migraine"];
  return (
    <section id="conditions" style={{ padding:"4rem 0", background:"#FAFAF7" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 1.5rem" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <SectionLabel>Conditions We Treat</SectionLabel>
            <h2 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(1.8rem,4vw,2.5rem)", fontWeight:700, color:"#0A1628" }}>
              If You Feel This Pain, <span style={{ color:"#0D6B50" }}>We Have the Answer</span>
            </h2>
          </div>
        </Reveal>
        <Reveal>
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
            {pills.map((p) => <ConditionPill key={p}>{p}</ConditionPill>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function ConditionPill({ children }) {
  const [h, setH] = useState(false);
  return (
    <span
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? "#0D6B50" : "white",
        border: `1.5px solid ${h ? "#0D6B50" : "rgba(13,107,80,0.2)"}`,
        color: h ? "white" : "#095038",
        padding:"0.6rem 1.4rem", borderRadius:"50px",
        fontSize:"0.9rem", fontWeight:500,
        transition:"all 0.3s",
        transform: h ? "translateY(-3px)" : "translateY(0)",
        cursor:"default",
      }}
    >
      {children}
    </span>
  );
}

// ─── Results (Before/After) ────────────────────────────────────────────────────
function Results() {
  const cases = [
    { before:"Unable to walk\nwithout support", after:"Walking freely\nin 21 days!", name:"Mr. Ramesh, 64", cond:"Knee Replacement Rehab",
      beforeSvg: <><path d="M 50 30 Q 45 50 40 70" stroke="rgba(240,200,160,0.7)" strokeWidth="6" fill="none" strokeLinecap="round"/><path d="M 50 40 L 35 55" stroke="rgba(240,200,160,0.7)" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M 50 40 L 62 50" stroke="rgba(240,200,160,0.7)" strokeWidth="5" fill="none" strokeLinecap="round"/><text x="25" y="48" fontSize="12">💢</text><text x="60" y="35" fontSize="10">😣</text></>,
      afterSvg: <><path d="M 50 28 L 50 60" stroke="rgba(240,200,160,0.8)" strokeWidth="7" fill="none" strokeLinecap="round"/><path d="M 50 38 L 35 50" stroke="rgba(240,200,160,0.8)" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M 50 38 L 65 50" stroke="rgba(240,200,160,0.8)" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M 50 60 L 42 80" stroke="rgba(240,200,160,0.8)" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M 50 60 L 58 80" stroke="rgba(240,200,160,0.8)" strokeWidth="5" fill="none" strokeLinecap="round"/><text x="55" y="15" fontSize="14">😊</text></> },
    { before:"Left side paralysis\npost stroke", after:"Regained movement\nin 45 days!", name:"Mr. Suresh, 58", cond:"Stroke Rehabilitation",
      beforeSvg:<><path d="M 50 30 L 50 65" stroke="rgba(240,200,160,0.7)" strokeWidth="6" fill="none"/><path d="M 50 40 L 42 54" stroke="rgba(240,200,160,0.4)" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M 50 65 L 42 82" stroke="rgba(240,200,160,0.7)" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M 50 65 L 58 82" stroke="rgba(240,200,160,0.7)" strokeWidth="5" fill="none" strokeLinecap="round"/><text x="22" y="40" fontSize="11">⚡</text><text x="55" y="35" fontSize="10">😰</text></>,
      afterSvg:<><path d="M 50 28 L 50 60" stroke="rgba(240,200,160,0.8)" strokeWidth="7" fill="none" strokeLinecap="round"/><path d="M 50 38 L 34 48" stroke="rgba(240,200,160,0.8)" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M 50 38 L 66 48" stroke="rgba(240,200,160,0.8)" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M 50 60 L 42 80" stroke="rgba(240,200,160,0.8)" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M 50 60 L 58 80" stroke="rgba(240,200,160,0.8)" strokeWidth="5" fill="none" strokeLinecap="round"/><text x="30" y="32" fontSize="12">💪</text></> },
    { before:"Severe back pain\ncould not sit", after:"Pain free,\nback to work!", name:"Mrs. Priya, 42", cond:"Severe Sciatica & Back Pain",
      beforeSvg:<><path d="M 50 30 Q 60 45 55 65" stroke="rgba(240,200,160,0.7)" strokeWidth="6" fill="none"/><path d="M 50 40 L 62 50" stroke="rgba(240,200,160,0.7)" strokeWidth="5" fill="none"/><path d="M 50 40 L 38 52" stroke="rgba(240,200,160,0.7)" strokeWidth="5" fill="none"/><text x="20" y="55" fontSize="14">💢</text><text x="55" y="32" fontSize="9">😖</text></>,
      afterSvg:<><path d="M 50 28 L 50 60" stroke="rgba(240,200,160,0.8)" strokeWidth="7" fill="none" strokeLinecap="round"/><path d="M 50 38 L 34 50" stroke="rgba(240,200,160,0.8)" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M 50 38 L 66 50" stroke="rgba(240,200,160,0.8)" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M 50 60 L 42 80" stroke="rgba(240,200,160,0.8)" strokeWidth="5" fill="none" strokeLinecap="round"/><path d="M 50 60 L 58 80" stroke="rgba(240,200,160,0.8)" strokeWidth="5" fill="none" strokeLinecap="round"/><text x="58" y="16" fontSize="12">🏃</text></> },
  ];
  return (
    <section id="results" style={{ padding:"5rem 0", background:"#0A1628" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 1.5rem" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
            <SectionLabel variant="white">Real Results</SectionLabel>
            <h2 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(1.8rem,4vw,2.5rem)", fontWeight:700, color:"white" }}>
              Before & After: <span style={{ color:"#E8A918" }}>Real Patients,</span><br />Real Transformations
            </h2>
            <p style={{ color:"rgba(255,255,255,0.5)", marginTop:16 }}>Real outcomes from our patients across India.</p>
          </div>
        </Reveal>
        <div className="cards-grid">
          {cases.map(({ before, after, name, cond, beforeSvg, afterSvg }) => (
            <Reveal key={name}>
              <div style={{ borderRadius:20, overflow:"hidden", background:"#0A1628" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
                  <div style={{ padding:"1.5rem", display:"flex", flexDirection:"column", alignItems:"center", background:"rgba(226,75,74,0.1)", borderRight:"1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#f87171", marginBottom:12, letterSpacing:"0.1em" }}>BEFORE</div>
                    <svg viewBox="0 0 100 100" width="80" height="80"><circle cx="50" cy="20" r="10" fill="rgba(240,200,160,0.9)"/>{beforeSvg}</svg>
                    <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.75rem", textAlign:"center", marginTop:12 }}>{before.split("\n").map((l,i) => <span key={i}>{l}<br/></span>)}</div>
                  </div>
                  <div style={{ padding:"1.5rem", display:"flex", flexDirection:"column", alignItems:"center", background:"rgba(13,107,80,0.15)" }}>
                    <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#4ade80", marginBottom:12, letterSpacing:"0.1em" }}>AFTER</div>
                    <svg viewBox="0 0 100 100" width="80" height="80"><circle cx="50" cy="18" r="10" fill="rgba(240,200,160,0.9)"/>{afterSvg}</svg>
                    <div style={{ color:"#4ade80", fontSize:"0.75rem", textAlign:"center", marginTop:12, fontWeight:600 }}>{after.split("\n").map((l,i) => <span key={i}>{l}<br/></span>)}</div>
                  </div>
                </div>
                <div style={{ padding:16, background:"rgba(255,255,255,0.05)" }}>
                  <div style={{ color:"white", fontWeight:600, fontSize:"0.875rem" }}>{name}</div>
                  <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.75rem" }}>{cond}</div>
                  <div style={{ color:"#E8A918", fontSize:"0.875rem", marginTop:4 }}>★★★★★</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  const items = [
    { initials:"RK", name:"Rajesh Kumar", location:"Dehri on Sone", bg:"#0D6B50", color:"white", text:`"Mere ghar par hi itni acchi physiotherapy milegi, maine socha nahi tha. Knee replacement ke baad main chalna band ho gaya tha. Sirf 3 hafte mein mein apne aap chal raha hoon. Easy Movement ne zindagi badal di!"`, note:"Knee Replacement Rehab • 3 weeks" },
    { initials:"SP", name:"Savita Pandey", location:"Aurangabad, Bihar", bg:"#E8A918", color:"#0A1628", text:`"My mother had a stroke and was completely bedridden. Easy Movement's therapist came home, explained everything clearly, and in 6 weeks my mother can move her arm again. Truly a miracle team."`, note:"Stroke Rehabilitation • 6 weeks" },
    { initials:"AM", name:"Arun Mishra", location:"Bangalore", bg:"#0F2545", color:"white", text:`"I had severe back pain for 2 years. Easy Movement's therapist came home, assessed properly, and gave me a plan. In 4 weeks I was pain-free. The progress reports after each session are very reassuring."`, note:"Chronic Back Pain • 4 weeks" },
  ];
  return (
    <section id="testimonials" style={{ padding:"5rem 0", background:"#FAFAF7" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 1.5rem" }}>
        <Reveal><div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
          <SectionLabel>Patient Stories</SectionLabel>
          <h2 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(1.8rem,4vw,2.5rem)", fontWeight:700, color:"#0A1628" }}>What Our Patients Say</h2>
        </div></Reveal>
        <div className="cards-grid">
          {items.map(({ initials, name, location, bg, color, text, note }) => (
            <Reveal key={name}>
              <div style={{ background:"white", borderRadius:20, padding:"2rem", border:"1px solid rgba(13,107,80,0.1)", position:"relative" }}>
                <div style={{ position:"absolute", top:16, left:24, fontFamily:"var(--font-playfair),serif", fontSize:"5rem", color:"rgba(13,107,80,0.12)", lineHeight:1 }}>&ldquo;</div>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16, marginTop:24 }}>
                  <div style={{ width:48, height:48, borderRadius:"50%", background:bg, color, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:"0.875rem" }}>{initials}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:"0.875rem", color:"#0A1628" }}>{name}</div>
                    <div style={{ color:"#9ca3af", fontSize:"0.75rem" }}>{location}</div>
                    <div style={{ color:"#E8A918", fontSize:"0.875rem" }}>★★★★★</div>
                  </div>
                </div>
                <p style={{ color:"#4b5563", fontSize:"0.875rem", lineHeight:1.7 }}>{text}</p>
                <div style={{ marginTop:16, fontSize:"0.75rem", color:"#9ca3af" }}>{note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust ─────────────────────────────────────────────────────────────────────
function Trust() {
  const trustPoints = [
    { icon:<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, bg:"#E8F4F0", color:"#0D6B50", title:"Verified & Background-Checked Therapists", desc:"Every therapist undergoes police verification and credential check. You get their full profile before they arrive." },
    { icon:<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>, bg:"#E8F4F0", color:"#0D6B50", title:"Doctor-Prescribed Treatment Plans", desc:"We work with your orthopaedic or neurologist. Every treatment plan is medically supervised and documented." },
    { icon:<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>, bg:"#E8F4F0", color:"#0D6B50", title:"Live Progress Reports After Every Session", desc:"You and your family get a detailed session report on WhatsApp after every visit." },
    { icon:<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, bg:"#E8F4F0", color:"#0D6B50", title:"Available 24×7, 365 Days a Year", desc:"We never close. Therapists confirm appointments 30 min before arrival — any time, any day." },
    { icon:<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>, bg:"#FDF3DC", color:"#C4890A", title:"Satisfaction Guarantee", desc:"Not happy with the first session? We'll send a different therapist or give you a full refund. Zero risk." },
  ];
  const badges = [
    { emoji:"🏥", title:"BPT Certified", sub:"Bachelor of Physiotherapy", bg:"linear-gradient(135deg,#0D6B50,#095038)" },
    { emoji:"🎓", title:"MPT Qualified", sub:"Masters in Physiotherapy", bg:"linear-gradient(135deg,#C4890A,#E8A918)" },
    { emoji:"🔒", title:"100% Safe", sub:"Police Verified Staff", bg:"linear-gradient(135deg,#0F2545,#1a3a5c)" },
    { emoji:"🌍", title:"Pan India", sub:"Serving Across India", bg:"linear-gradient(135deg,#3B6D11,#639922)" },
  ];
  return (
    <section style={{ padding:"5rem 0", background:"white" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 1.5rem" }}>
        <div className="trust-layout">
          <Reveal>
            <div>
              <SectionLabel>Trust & Safety</SectionLabel>
              <h2 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(1.8rem,4vw,2.5rem)", fontWeight:700, color:"#0A1628", margin:"1.5rem 0 2rem" }}>
                Your Safety is Our<br /><span style={{ color:"#0D6B50" }}>Highest Priority</span>
              </h2>
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {trustPoints.map(({ icon, bg, color, title, desc }) => (
                  <div key={title} style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                    <div style={{ width:40, height:40, borderRadius:12, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">{icon}</svg>
                    </div>
                    <div>
                      <div style={{ fontWeight:700, marginBottom:4, color:"#0A1628" }}>{title}</div>
                      <div style={{ color:"#6b7280", fontSize:"0.875rem" }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
                {badges.map(({ emoji, title, sub, bg }) => (
                  <div key={title} style={{ background:bg, borderRadius:16, color:"white", padding:"1.5rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
                    <div style={{ fontSize:"2.5rem", marginBottom:8 }}>{emoji}</div>
                    <div style={{ fontWeight:700, fontSize:"1.125rem" }}>{title}</div>
                    <div style={{ color:"rgba(255,255,255,0.7)", fontSize:"0.875rem", marginTop:4 }}>{sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding:"1.5rem", borderRadius:16, background:"#E8F4F0", border:"1px solid rgba(13,107,80,0.2)", display:"flex", alignItems:"center", gap:24 }}>
                <div style={{ width:110, height:110, border:"2px solid #0D6B50", borderRadius:"50%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", flexShrink:0, background:"white", boxShadow:"0 8px 24px rgba(13,107,80,0.15)" }}>
                  <div style={{ fontFamily:"var(--font-playfair),serif", fontSize:"1.5rem", fontWeight:700, color:"#0D6B50" }}>100%</div>
                  <div style={{ fontSize:"0.625rem", fontWeight:700, color:"#0D6B50" }}>SATIS-<br />FACTION</div>
                  <div style={{ fontSize:"0.625rem", color:"#9ca3af" }}>GUARANTEE</div>
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:"1.125rem", color:"#0A1628", marginBottom:4 }}>Our Promise to You</div>
                  <div style={{ color:"#4b5563", fontSize:"0.875rem", lineHeight:1.7 }}>If you&apos;re not completely satisfied after your first session — we&apos;ll make it right. No questions asked.</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Doctors ───────────────────────────────────────────────────────────────────
function Doctors() {
  const scrollTo = (e) => { e.preventDefault(); document.querySelector("#booking")?.scrollIntoView({ behavior:"smooth" }); };
  const specialties = ["🦴 Orthopaedic Surgeons","🧠 Neurologists","❤️ Cardiologists","👨‍⚕️ General Physicians","🏥 Hospitals & Clinics"];
  return (
    <section id="doctors" style={{ padding:"5rem 0", background:"linear-gradient(135deg,#0A1628 0%,#0F2545 100%)" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 1.5rem" }}>
        <Reveal><div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
          <SectionLabel variant="gold">🤝 For Medical Professionals</SectionLabel>
          <h2 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(1.8rem,4vw,2.5rem)", fontWeight:700, color:"white", margin:"1rem 0" }}>
            Partner With Us — <span style={{ color:"#E8A918" }}>Refer Your Patients,</span><br />We Deliver World-Class Outcomes
          </h2>
          <p style={{ color:"rgba(255,255,255,0.6)", maxWidth:672, margin:"0 auto", fontSize:"1.125rem" }}>Orthopaedic Surgeons, Neurologists, General Physicians — your reputation is your most valuable asset. We protect it.</p>
        </div></Reveal>

        <div className="cards-grid">
          {[
            { emoji:"🏆", title:"Your Reputation,\nOur Responsibility", content:<div style={{ color:"rgba(255,255,255,0.6)", fontSize:"0.875rem", lineHeight:1.7 }}>When you send a patient to us, it&apos;s your name on the line. Every patient you refer gets our <strong style={{ color:"#E8A918" }}>most experienced therapist</strong>, a detailed treatment plan, and documented weekly progress reports.<div style={{ marginTop:24, padding:12, borderRadius:12, background:"rgba(232,169,24,0.1)", border:"1px solid rgba(232,169,24,0.2)", fontSize:"0.875rem", fontWeight:600, color:"#E8A918" }}>Your patient recovers and comes back to thank you.</div></div> },
            { emoji:"📋", title:"What You Get\nas Our Partner", featured:true, content:<ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:12, fontSize:"0.875rem", color:"rgba(255,255,255,0.7)" }}>{[["Weekly recovery reports for every referred patient"],["Priority support — next-day appointments guaranteed"],["Direct line to our chief physiotherapist"],["Excellent patient outcomes — the best reward"],["Pan India coverage for all your patients"]].map(([t])=><li key={t} style={{ display:"flex", gap:12 }}><span style={{ color:"#E8A918", flexShrink:0 }}>✓</span>{t}</li>)}</ul> },
            { emoji:"💬", title:"Our Promise\nto Partner Doctors", content:<><blockquote style={{ color:"rgba(255,255,255,0.7)", fontSize:"0.875rem", lineHeight:1.7, fontStyle:"italic", borderLeft:"2px solid #E8A918", paddingLeft:16, marginBottom:16 }}>&ldquo;You send us your patient. From that moment, it is our full responsibility to give them the best physiotherapy outcome using our most experienced therapists, latest equipment, and evidence-based protocols.&rdquo;</blockquote><div style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.75rem", marginBottom:24 }}>— Easy Movement Medical Team</div><a href="#booking" onClick={scrollTo} style={{ ...btnStyles.gold, display:"flex", justifyContent:"center" }}>Partner With Us →</a></> },
          ].map(({ emoji, title, content, featured }) => (
            <Reveal key={title}>
              <div style={{ background:"linear-gradient(135deg,#0A1628 0%,#0F2545 100%)", borderRadius:24, border:`1px solid ${featured ? "rgba(232,169,24,0.4)" : "rgba(232,169,24,0.2)"}`, color:"white", padding:"2.5rem", position:"relative", overflow:"hidden" }}>
                {featured && <div style={{ position:"absolute", top:16, right:-30, background:"#E8A918", color:"#0A1628", fontSize:"0.7rem", fontWeight:700, padding:"4px 40px", transform:"rotate(45deg)", letterSpacing:"0.05em" }}>FEATURED</div>}
                <div style={{ fontSize:"2.5rem", marginBottom:16 }}>{emoji}</div>
                <h3 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"1.25rem", fontWeight:700, color:"white", marginBottom:12 }}>{title.split("\n").map((l,i)=><span key={i}>{l}{i<1&&<br/>}</span>)}</h3>
                {content}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal><div style={{ marginTop:48, textAlign:"center" }}>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.875rem", marginBottom:24, textTransform:"uppercase", letterSpacing:"0.1em" }}>We Actively Work With</p>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:16 }}>
            {specialties.map((s) => (
              <div key={s} style={{ padding:"12px 24px", borderRadius:"50px", background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.7)", border:"1px solid rgba(255,255,255,0.1)", fontSize:"0.875rem", fontWeight:500 }}>{s}</div>
            ))}
          </div>
        </div></Reveal>
      </div>
    </section>
  );
}

// ─── Booking ───────────────────────────────────────────────────────────────────
function Booking() {
  const [form, setForm] = useState({ name:"", phone:"", location:"", condition:"", notes:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submit = async () => {
    if (!form.name.trim() || !form.phone.trim()) { setError(true); return; }
    setError(false);
    setLoading(true);
    const payload = { Timestamp: new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"}), Name:form.name, Phone:form.phone, Location:form.location, Condition:form.condition, Notes:form.notes };
    try {
      await fetch(SHEET_URL, { method:"POST", mode:"no-cors", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) });
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  const reset = () => { setForm({ name:"", phone:"", location:"", condition:"", notes:"" }); setSubmitted(false); };

  return (
    <section id="booking" style={{ padding:"5rem 0", background:"#FAFAF7" }}>
      <div style={{ maxWidth:1024, margin:"0 auto", padding:"0 1.5rem" }}>
        <Reveal><div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <SectionLabel>Book Now</SectionLabel>
          <h2 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(1.8rem,4vw,2.5rem)", fontWeight:700, color:"#0A1628" }}>
            Start Your Recovery Today —<br /><span style={{ color:"#0D6B50" }}>Free First Consultation</span>
          </h2>
          <p style={{ color:"#6b7280", marginTop:16 }}>No commitment. Expert advice. We come to you anywhere in India.</p>
        </div></Reveal>

        <div className="booking-grid">
          {/* Contact */}
          <Reveal>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <h3 style={{ fontWeight:700, fontSize:"1.25rem", color:"#0A1628", marginBottom:8 }}>Contact Us Directly</h3>
              <ContactCard href={`tel:${PHONE}`} iconBg="#E8F4F0" iconColor="#0D6B50" border="rgba(13,107,80,0.2)" iconPath="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.41 7.5a16 16 0 006 6l.86-.86a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" title="Call Us Now" sub={PHONE_DISPLAY} note="Available 24×7, 365 days a year" noteColor="#0D6B50" />
              <ContactCard href={WA_URL} target="_blank" iconBg="#dcfce7" border="rgba(37,211,102,0.3)" iconPath="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" isWhatsapp title="WhatsApp Us" sub={PHONE_DISPLAY} note="Fastest response — reply in minutes!" noteColor="#16a34a" />
              <div style={{ borderRadius:16, padding:"1.5rem", background:"linear-gradient(135deg,#0A1628,#0F2545)" }}>
                <div style={{ color:"white", fontWeight:700, marginBottom:12 }}>Why call us right now?</div>
                {[["✓","#4FA88A","Free first consultation — no charges"],["✓","#4FA88A","Same-day or next-day appointment"],["✓","#4FA88A","Therapist comes to your home — anywhere in India"],["★","#E8A918","4.9/5 rating from 5000+ patients"]].map(([icon, color, text]) => (
                  <div key={text} style={{ display:"flex", alignItems:"center", gap:8, fontSize:"0.875rem", color:"rgba(255,255,255,0.8)", marginBottom:8 }}>
                    <span style={{ color }}>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal>
            <div style={{ borderRadius:24, padding:"2rem", background:"white", boxShadow:"0 20px 60px rgba(13,107,80,0.1)", border:"1px solid rgba(13,107,80,0.1)" }}>
              <h3 style={{ fontWeight:700, fontSize:"1.125rem", color:"#0A1628", marginBottom:24 }}>Book Free Consultation</h3>
              {submitted ? (
                <div style={{ textAlign:"center", padding:"2rem 0" }}>
                  <div style={{ fontSize:"3rem", marginBottom:16 }}>🎉</div>
                  <h4 style={{ fontFamily:"var(--font-playfair),serif", fontWeight:700, fontSize:"1.25rem", color:"#0D6B50", marginBottom:8 }}>Appointment Booked!</h4>
                  <p style={{ color:"#6b7280", fontSize:"0.875rem" }}>Our team will call you within 30 minutes to confirm.</p>
                  <button onClick={reset} style={{ ...btnStyles.primary, marginTop:24 }}>Book Another →</button>
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  {[["name","Your Name *","Enter your full name","text"],["phone","Phone Number *","+91 00000 00000","tel"],["location","Your City / Location *","e.g. Bangalore, Mumbai, Patna...","text"]].map(([field, label, placeholder, type]) => (
                    <div key={field}>
                      <label style={{ fontSize:"0.85rem", fontWeight:600, color:"#0A1628", display:"block", marginBottom:6 }}>{label}</label>
                      <input type={type} value={form[field]} onChange={(e) => setForm({ ...form, [field]:e.target.value })} placeholder={placeholder} style={inputStyle} onFocus={(e) => { e.target.style.borderColor="#0D6B50"; e.target.style.boxShadow="0 0 0 4px rgba(13,107,80,0.1)"; }} onBlur={(e) => { e.target.style.borderColor="rgba(13,107,80,0.2)"; e.target.style.boxShadow="none"; }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize:"0.85rem", fontWeight:600, color:"#0A1628", display:"block", marginBottom:6 }}>What&apos;s Your Problem?</label>
                    <select value={form.condition} onChange={(e) => setForm({ ...form, condition:e.target.value })} style={inputStyle}>
                      <option value="">Select condition</option>
                      {["Knee / Joint Pain","Back / Neck Pain","Stroke Rehabilitation","Post Surgery Recovery","Paralysis / Neurological","Sports Injury","Elderly Care","Other"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:"0.85rem", fontWeight:600, color:"#0A1628", display:"block", marginBottom:6 }}>Additional Notes</label>
                    <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes:e.target.value })} rows={3} placeholder="Brief description of your condition..." style={{ ...inputStyle, resize:"vertical" }} onFocus={(e) => { e.target.style.borderColor="#0D6B50"; }} onBlur={(e) => { e.target.style.borderColor="rgba(13,107,80,0.2)"; }} />
                  </div>
                  {error && <div style={{ color:"#e24b4a", fontSize:"0.82rem" }}>⚠️ Please fill in your name and phone number.</div>}
                  <button onClick={submit} disabled={loading} style={{ ...btnStyles.primary, width:"100%", justifyContent:"center", padding:"1.1rem", fontSize:"1rem", opacity: loading ? 0.7 : 1 }}>
                    {loading ? "Submitting…" : "Book Free Consultation →"}
                  </button>
                  <p style={{ textAlign:"center", fontSize:"0.75rem", color:"#9ca3af" }}>Our team will call you within 30 minutes ⚡</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ href, target, iconBg, border, iconPath, isWhatsapp, title, sub, note, noteColor, iconColor }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target={target} rel={target ? "noopener noreferrer" : undefined} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display:"flex", alignItems:"center", gap:16, padding:"1.25rem", borderRadius:16, background:"white", border:`1.5px solid ${border}`, textDecoration:"none", boxShadow: h ? "0 8px 24px rgba(0,0,0,0.08)" : "none", transition:"all 0.3s" }}>
      <div style={{ width:56, height:56, borderRadius:12, background:iconBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        {isWhatsapp ? <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366"><path d={iconPath}/></svg> : <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={iconColor||"#0D6B50"} strokeWidth="2"><path d={iconPath}/></svg>}
      </div>
      <div>
        <div style={{ fontWeight:700, color:"#0A1628" }}>{title}</div>
        <div style={{ color:"#6b7280", fontSize:"0.875rem" }}>{sub}</div>
        <div style={{ fontSize:"0.75rem", color:noteColor, fontWeight:500 }}>{note}</div>
      </div>
    </a>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    ["Is home physiotherapy as effective as clinic physiotherapy?","Yes — in many cases, home physiotherapy is MORE effective. Research shows patients recover faster in familiar home environments. You get 100% focused one-on-one attention with zero waiting time."],
    ["How qualified are your physiotherapists?","All our therapists hold a minimum BPT (Bachelor of Physiotherapy) degree, with many holding MPT (Masters) as well. Each has minimum 2 years of clinical experience, is police-verified, and undergoes regular training updates."],
    ["Are you really available 24×7?","Yes! Easy Movement operates 24 hours a day, 7 days a week, 365 days a year. You can reach us by phone or WhatsApp any time. Session scheduling depends on therapist availability in your area, but we always have someone on call."],
    ["What if I'm not happy with my therapist?","Simply call us or WhatsApp, and we'll assign a different therapist within 24 hours — no questions asked. We also offer a full refund if you're not satisfied after the first session."],
    ["Do you serve my city?","Easy Movement is a pan-India service. We cover all major cities and towns across India. If you're in a smaller town or village, call us and we'll do our best to assign a therapist near you."],
    ["Do you work with my existing doctor's prescription?","Absolutely. Share your existing prescription and our therapist will align the home therapy plan with your doctor's recommendations. We can also send weekly updates directly to your doctor."],
  ];
  return (
    <section style={{ padding:"5rem 0", background:"white" }}>
      <div style={{ maxWidth:768, margin:"0 auto", padding:"0 1.5rem" }}>
        <Reveal><div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <SectionLabel>Common Questions</SectionLabel>
          <h2 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(1.8rem,4vw,2.5rem)", fontWeight:700, color:"#0A1628" }}>Frequently Asked Questions</h2>
        </div></Reveal>
        <Reveal>
          {items.map(([q, a], i) => (
            <div key={i} style={{ borderBottom:"1px solid rgba(13,107,80,0.1)" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.25rem 0", fontWeight:600, color:"#0A1628", fontSize:"1rem", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
                <span>{q}</span>
                <span style={{ color:"#0D6B50", fontSize:"1.5rem", lineHeight:1, flexShrink:0, marginLeft:16 }}>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <div style={{ paddingBottom:"1.25rem", color:"#4a6157", lineHeight:1.7, fontSize:"0.95rem" }}>{a}</div>}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section style={{ padding:"5rem 0", background:"linear-gradient(135deg,#0A1628 0%,#063626 100%)", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", filter:"blur(80px)", opacity:0.15, background:"#0D6B50", top:-200, right:-150 }} />
      <Reveal>
        <div style={{ maxWidth:896, margin:"0 auto", padding:"0 1.5rem", textAlign:"center", position:"relative", zIndex:10 }}>
          <div style={{ fontSize:"3rem", marginBottom:24 }}>🏠</div>
          <h2 style={{ fontFamily:"var(--font-playfair),serif", fontSize:"clamp(2rem,5vw,3rem)", fontWeight:700, color:"white", marginBottom:24, lineHeight:1.2 }}>
            Don&apos;t Let Pain<br />Stop Your Life.
            <span style={{ color:"#E8A918" }}> Call Now.</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"1.25rem", marginBottom:40, maxWidth:672, margin:"0 auto 40px" }}>
            Expert home physiotherapy across India. Free consultation. Same-day appointment. Real results.
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:16 }}>
            <a href={`tel:${PHONE}`} style={{ ...btnStyles.gold, padding:"1.2rem 3rem", fontSize:"1.1rem" }}>📞 Call: {PHONE_DISPLAY}</a>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ ...btnStyles.outline, padding:"1.2rem 3rem", fontSize:"1.1rem" }}>💬 WhatsApp Us</a>
          </div>
          <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.875rem", marginTop:32 }}>Available 24×7, 365 Days • Pan India • Free First Consultation</p>
        </div>
      </Reveal>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer({ onTerms }) {
  const services = ["Orthopaedic Physio","Neurological Physio","Geriatric Care","Cardiac Rehab","Sports & Pain","Paediatric Physio"];
  const links = [["#process","How It Works"],["#conditions","Conditions Treated"],["#results","Patient Results"],["#doctors","Partner with Us"],["#booking","Book Appointment"]];
  const scrollTo = (e, href) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior:"smooth" }); };
  return (
    <footer style={{ background:"#04110A", color:"rgba(255,255,255,0.6)" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"3rem 1.5rem" }}>
        <div className="footer-grid" style={{ marginBottom:32 }}>
          <div style={{ gridColumn:"span 2" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <img src="/easymovementlogo.jpg" alt="Easy Movement" style={{ height:56, width:"auto", maxWidth:220, objectFit:"contain" }} onError={(e) => { e.target.style.display="none"; }} />
              <div>
                <div style={{ fontFamily:"var(--font-playfair),serif", fontWeight:700, color:"white", fontSize:"1.125rem" }}>Easy Movement</div>
                <div style={{ fontSize:"0.75rem", color:"#4FA88A" }}>HOME PHYSIOTHERAPY</div>
              </div>
            </div>
            <p style={{ fontSize:"0.875rem", color:"rgba(255,255,255,0.5)", lineHeight:1.7, marginBottom:8 }}>Expert physiotherapy at your home, anywhere in India. Available 24×7, 365 days a year.</p>
            <p style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.35)", marginBottom:16 }}>3rd Floor, Folk, Whitefield, Bangalore – 560066</p>
            <div style={{ display:"flex", gap:12 }}>
              <a href={`tel:${PHONE}`} style={{ padding:"8px 16px", borderRadius:8, background:"rgba(13,107,80,0.3)", color:"#4FA88A", textDecoration:"none", fontSize:"0.875rem", fontWeight:600 }}>📞 Call Now</a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{ padding:"8px 16px", borderRadius:8, background:"rgba(37,211,102,0.2)", color:"#25D366", textDecoration:"none", fontSize:"0.875rem", fontWeight:600 }}>💬 WhatsApp</a>
            </div>
          </div>
          <div>
            <h4 style={{ fontWeight:700, color:"white", fontSize:"0.875rem", marginBottom:16 }}>Services</h4>
            <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:8 }}>
              {services.map(s => <li key={s}><a href="#services" onClick={(e) => scrollTo(e,"#services")} style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.875rem", textDecoration:"none" }}>{s}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight:700, color:"white", fontSize:"0.875rem", marginBottom:16 }}>Quick Links</h4>
            <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:8 }}>
              {links.map(([href, label]) => <li key={href}><a href={href} onClick={(e) => scrollTo(e,href)} style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.875rem", textDecoration:"none" }}>{label}</a></li>)}
              <li><button onClick={onTerms} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:"0.875rem", padding:0 }}>Terms & Conditions</button></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:24, display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:16 }}>
          <p style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.3)" }}>© 2026 Easy Movement. All rights reserved.</p>
          <p style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.3)" }}>
            Made with ❤️ for patients across India &nbsp;|&nbsp;
            <button onClick={onTerms} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.3)", cursor:"pointer", fontSize:"0.75rem", textDecoration:"underline" }}>Terms & Conditions</button>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Terms Modal ───────────────────────────────────────────────────────────────
function TermsModal({ open, onClose }) {
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  if (!open) return null;
  const sections = [
    ["1. Services","Easy Movement provides professional home physiotherapy services across India. All services are delivered by certified physiotherapists (BPT/MPT qualified) who have undergone background verification. Services are subject to therapist availability in your area."],
    ["2. Appointments & Cancellations","Appointments can be booked via our website form, phone, or WhatsApp. Cancellations must be made at least 2 hours before the scheduled session. Repeated last-minute cancellations may affect future booking priority."],
    ["3. Free Consultation","The free first consultation is a telephonic/online assessment only and does not include a home visit. Post assessment, our team will recommend a suitable treatment plan. Limited to one per patient."],
    ["4. Payments & Refunds","Session fees are payable before or at the time of the session. If you are unsatisfied after your first paid session, you may request a full refund within 24 hours. Refunds processed within 5–7 business days."],
    ["5. Patient Responsibilities","Patients must disclose all relevant medical history, current medications, and conditions to the therapist. Easy Movement is not liable for outcomes resulting from incomplete disclosures."],
    ["6. Privacy & Data","Personal information provided is used solely for appointment management and follow-up. We do not sell or share your data with third parties."],
    ["7. Medical Disclaimer","Physiotherapy services are complementary to, and not a replacement for, physician-prescribed medical treatment. Always consult your doctor before starting physiotherapy."],
    ["8. Availability","We operate 24 hours a day, 7 days a week, 365 days a year. Emergency sessions are subject to therapist availability."],
    ["9. Liability","Easy Movement shall not be liable for any direct, indirect, or consequential damages beyond the session fee paid."],
    ["10. Governing Law","These terms are governed by the laws of India. Disputes subject to the exclusive jurisdiction of courts in Bangalore, Karnataka."],
  ];
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(10,22,40,0.85)", backdropFilter:"blur(6px)", zIndex:10000, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background:"white", borderRadius:24, maxWidth:640, width:"100%", maxHeight:"80vh", display:"flex", flexDirection:"column", boxShadow:"0 40px 80px rgba(0,0,0,0.3)", overflow:"hidden" }}>
        <div style={{ padding:"1.5rem 2rem", borderBottom:"1px solid rgba(13,107,80,0.1)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <h2 style={{ fontFamily:"var(--font-playfair),serif", fontWeight:700, fontSize:"1.25rem", color:"#0A1628" }}>Terms & Conditions</h2>
            <p style={{ fontSize:"0.75rem", color:"#9ca3af", marginTop:4 }}>Easy Movement Home Physiotherapy</p>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"1.5rem", color:"#6b7280", lineHeight:1 }}>✕</button>
        </div>
        <div style={{ padding:"1.5rem 2rem", overflowY:"auto", flex:1, color:"#374151", fontSize:"0.9rem", lineHeight:1.8 }}>
          {sections.map(([title, text]) => <div key={title}><h3 style={{ fontWeight:700, color:"#0A1628", margin:"1.2rem 0 0.5rem", fontSize:"1rem" }}>{title}</h3><p>{text}</p></div>)}
          <p style={{ fontSize:"0.75rem", color:"#9ca3af", marginTop:24 }}>Last updated: June 2025.</p>
        </div>
        <div style={{ padding:"1.25rem 2rem", borderTop:"1px solid rgba(13,107,80,0.1)", display:"flex", justifyContent:"flex-end", gap:12 }}>
          <button onClick={onClose} style={{ background:"none", border:"1.5px solid rgba(13,107,80,0.3)", color:"#0D6B50", padding:"0.6rem 1.5rem", borderRadius:"50px", fontWeight:600, cursor:"pointer" }}>Close</button>
          <button onClick={onClose} style={{ ...btnStyles.primary, padding:"0.6rem 1.8rem", fontSize:"0.9rem" }}>I Understand</button>
        </div>
      </div>
    </div>
  );
}

// ─── WhatsApp Float ────────────────────────────────────────────────────────────
function WhatsAppFloat() {
  return (
    <a href={WA_URL} target="_blank" rel="noopener noreferrer"
      style={{ position:"fixed", bottom:32, right:32, background:"#25D366", borderRadius:"50%", width:60, height:60, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 25px rgba(37,211,102,0.4)", zIndex:999, textDecoration:"none", animation:"pulseRing 2s infinite" }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

// ─── Shared styles ─────────────────────────────────────────────────────────────
const btnBase = { borderRadius:50, fontWeight:600, fontSize:"1rem", border:"none", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:8, textDecoration:"none", transition:"all 0.3s ease" };
const btnStyles = {
  primary: { ...btnBase, background:"linear-gradient(135deg,#0D6B50,#4FA88A)", color:"white", padding:"1rem 2.5rem" },
  gold:    { ...btnBase, background:"linear-gradient(135deg,#E8A918,#F2C44E)", color:"#0A1628", padding:"1rem 2.5rem", fontWeight:700 },
  outline: { ...btnBase, background:"transparent", color:"white", padding:"1rem 2.5rem", border:"2px solid rgba(255,255,255,0.4)" },
};
const btnHover = {
  primaryIn:  (e) => { e.target.style.transform="translateY(-3px)"; e.target.style.boxShadow="0 15px 35px rgba(13,107,80,0.35)"; e.target.style.filter="brightness(1.1)"; },
  primaryOut: (e) => { e.target.style.transform=""; e.target.style.boxShadow=""; e.target.style.filter=""; },
  goldIn:     (e) => { e.target.style.transform="translateY(-3px)"; e.target.style.boxShadow="0 15px 35px rgba(232,169,24,0.4)"; },
  goldOut:    (e) => { e.target.style.transform=""; e.target.style.boxShadow=""; },
  outlineIn:  (e) => { e.target.style.borderColor="white"; e.target.style.background="rgba(255,255,255,0.1)"; },
  outlineOut: (e) => { e.target.style.borderColor="rgba(255,255,255,0.4)"; e.target.style.background="transparent"; },
};
const inputStyle = {
  width:"100%", padding:"0.875rem 1.25rem", border:"1.5px solid rgba(13,107,80,0.2)", borderRadius:12,
  fontFamily:"inherit", fontSize:"0.95rem", outline:"none", transition:"border-color 0.3s", background:"white", color:"#0A1628",
};

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function HomePageClient() {
  const [termsOpen, setTermsOpen] = useState(false);
  return (
    <>
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { font-family:var(--font-dm-sans),system-ui,sans-serif; background:#FAFAF7; color:#1a2e1a; overflow-x:hidden; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(37,211,102,0.4)} 70%{box-shadow:0 0 0 20px rgba(37,211,102,0)} 100%{box-shadow:0 0 0 0 rgba(37,211,102,0)} }

        .hero-grid { display:grid; gap:3rem; align-items:center; }
        .hero-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
        .why-grid   { display:grid; gap:1.5rem; }
        .steps-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; }
        .cards-grid { display:grid; gap:1.5rem; }
        .trust-layout { display:grid; gap:4rem; }
        .booking-grid { display:grid; gap:2rem; }
        .footer-grid  { display:grid; gap:2rem; }

        @media(min-width:640px) {
          .steps-grid { grid-template-columns:repeat(3,1fr); }
        }
        @media(min-width:768px) {
          .why-grid    { grid-template-columns:1fr auto 1fr; align-items:center; }
          .cards-grid  { grid-template-columns:repeat(2,1fr); }
          .steps-grid  { grid-template-columns:repeat(3,1fr); }
          .footer-grid { grid-template-columns:2fr 1fr 1fr; }
        }
        @media(min-width:1024px) {
          .hero-grid    { grid-template-columns:1fr 1fr; }
          .cards-grid   { grid-template-columns:repeat(3,1fr); }
          .steps-grid   { grid-template-columns:repeat(6,1fr); }
          .trust-layout { grid-template-columns:1fr 1fr; }
          .booking-grid { grid-template-columns:1fr 1fr; }
          .footer-grid  { grid-template-columns:2fr 1fr 1fr; }
          .desktop-nav  { display:flex !important; }
          .mobile-menu-btn { display:none !important; }
        }

        @media(max-width:1023px) {
          .desktop-nav { display:none !important; }
        }

        a { text-decoration:none; }
        button { font-family:inherit; }
        select { appearance:auto; }
      `}</style>

      <Navbar />
      <Hero />
      <Why />
      <Process />
      <Services />
      <Conditions />
      <Results />
      <Testimonials />
      <Trust />
      <Doctors />
      <Booking />
      <FAQ />
      <FinalCTA />
      <Footer onTerms={() => setTermsOpen(true)} />
      <WhatsAppFloat />
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
}