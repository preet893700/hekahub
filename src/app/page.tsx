import "./globals.css";

import { SplineScene } from "./components/SplineScene";
import RadialOrbitalTimelineDemo from "@/components/demo";
import StaggerTestimonialsDemo from "@/components/stagger-demo";
import PricingDemo from "@/components/pricing-demo";
import FAQDemo from "@/components/faq-demo";
import ContactDemo from "@/components/contact-demo";
import RegisterDemo from "@/components/register-demo";

export default function Home() {
  return (
    <main>
      {/* 100vh HERO SECTION - NO SCROLL NEEDED */}
      <section className="hero-section" style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#050505'
      }}>
        {/* CENTER SPLINE BACKGROUND/MODEL */}
        <div className="hero-spline-wrap" style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1.3)',
          width: '100vw',
          height: '100vh',
          zIndex: 1,
        }}>
          <SplineScene
            scene="https://prod.spline.design/fRUhXMoB7t6Gp0XU/scene.splinecode"
            // scene="https://prod.spline.design/LcsSjMIZM3J2SJtR/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* TOP LAYER (TEXT & UI) */}
        <div className="hero-ui-layer" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '4rem 5%',
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>

          {/* (1) & (2) TOP ROW: Wordmark (top-left) and Status/CTA (top-right) */}
          <div className="hero-top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <h1 style={{
                fontFamily: 'var(--font-bebas-neue)',
                fontSize: '7vw',
                lineHeight: 0.8,
                margin: 0,
                color: '#dedede',
                letterSpacing: '-1px',
                pointerEvents: 'auto'
              }}>
                HEKAHUB<sup style={{ fontSize: '0.2em', verticalAlign: 'super' }}></sup>
              </h1>

              <div style={{
                marginTop: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 69, 0, 0.08)',
                border: '1px solid rgba(255, 69, 0, 0.2)',
                padding: '0.35rem 0.85rem',
                borderRadius: '2rem',
                pointerEvents: 'auto'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ff4500' }} />
                <span style={{ fontSize: '0.65rem', color: '#ff4500', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-inter)' }}>
                  Free Trial Slots Available
                </span>
              </div>
            </div>

            <div className="hero-pill" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: 'rgba(255,255,255,0.05)',
              padding: '0.6rem 1.25rem',
              borderRadius: '99px',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-inter)',
              color: '#888',
              letterSpacing: '0.05em',
              pointerEvents: 'auto'
            }}>
              <span style={{ color: '#4ade80' }}>●</span> ENROLLING NOW<span className="hero-pill-extra"> · WEEKDAY & WEEKEND BATCHES · 2026</span>
              {/* <span style={{ color: '#444' }}>•</span> */}
              {/* <a href={`https://wa.me/919235327048?text=${encodeURIComponent("Hi HekaHub! I'm interested in the Summer 2026 AI Internship for my child. I'd like to enroll him in the 8 week program. Can we chat?")}`} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>LET'S TALK →</a> */}
            </div>
          </div>

          {/* (3) & (4) MIDDLE ROW: Secondary Hook (mid-left) and Main Tagline (mid-right) */}
          <div className="hero-middle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto' }}>
            {/* Secondary Hook */}
            <div className="hero-secondary-hook" style={{ maxWidth: '240px' }}>
              <div className="hero-stats-labels" style={{ display: 'flex', flexDirection: 'column', gap: '0rem' }}>
                <span className="hero-stats-label" style={{ fontSize: '0.7rem', color: '#fff', opacity: 0.8, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0rem' }}>Flexible Batches </span>
                <span className="hero-stats-label" style={{ fontSize: '0.7rem', color: '#fff', opacity: 0.8, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0rem' }}>160+ hours of learning </span>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', fontFamily: 'var(--font-inter)', fontWeight: 600, marginTop: '0.75rem', marginBottom: 0, marginLeft: 0, marginRight: 0, lineHeight: 1.2 }}>
                For Kids to Professionals
              </h3>
              <p style={{ color: '#888', fontSize: '0.875rem', marginTop: '1.1rem', marginBottom: 0, marginLeft: 0, marginRight: 0, lineHeight: 1.4 }}>
                Build 20+ real-world AI projects<br />
                From fundamentals to engineered intelligence
              </p>
            </div>

            {/* Main Tagline (Stacked vertical fade) */}
            <div style={{ textAlign: 'right' }}>
              <h2 className="hero-tagline" style={{
                fontFamily: 'var(--font-bebas-neue)',
                fontSize: 'clamp(3.6rem, 7.4vw, 7.7rem)',
                lineHeight: 0.9,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                color: '#fff',
                textAlign: 'right'
              }}>
                <span style={{ opacity: 0.25 }}>MASTER AI</span><br />
                <span style={{ opacity: 0.5 }}>GO BEYOND</span><br />
                <span style={{ opacity: 0.75 }}>LEAD</span><br />
                <span style={{ opacity: 1 }}>BOLD<span style={{ color: '#ff4500' }}>.</span></span>
              </h2>
            </div>
          </div>

          {/* (5) & (6) BOTTOM ROW: Short Descriptor (bottom-left) and Primary CTA (bottom-right) */}
          <div className="hero-bottom-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'auto' }}>
            <div style={{ maxWidth: '320px' }}>
              <span style={{ fontSize: '0.7rem', color: '#666', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>LIMITED SEATS</span>
              <p style={{
                color: '#888',
                fontSize: '1.125rem',
                lineHeight: 1.3,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
                fontFamily: 'var(--font-inter)'
              }}>
                Turn ideas into AI products.<br />
                The next generation of innovators starts here.<br />
                <span style={{ fontSize: '0.95rem', color: '#666' }}>
                  Your <span style={{ color: '#ff4500', fontWeight: 600 }}>year-round</span> launchpad.
                </span>
              </p>
            </div>

            <a href="#register" className="btn btn-primary hover-lift hero-enroll-btn" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1.25rem 3.5rem',
              borderRadius: '999px',
              gap: '1rem',
              fontFamily: 'var(--font-inter)',
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textDecoration: 'none',
            }}>
              ENROLL NOW ↗
            </a>
          </div>

        </div>
      </section>

      {/* OTHER SECTIONS (Unchanged structurally, just ensuring they flow below 100vh) */}

      {/* 8-WEEK CURRICULUM TIMELINE */}
      <section id="curriculum" className="container" style={{ paddingTop: '1rem', paddingBottom: '2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem' }}>

        <div style={{ flex: '1 1 40%', minWidth: '300px' }}>
          <span style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}>(THE ROADMAP)</span>
          <h2 className="title-section" style={{ margin: '1rem 0 0 0', fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(4rem, 6vw, 6rem)', lineHeight: 1 }}>MASTER<br />CURRICULUM</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginTop: '1.5rem', maxWidth: '500px', fontFamily: 'var(--font-inter)' }}>
            Each module, a new AI superpower. From crafting your first prompt to architecting your own AI ecosystem — we don't just teach AI. We engineer intelligence.
          </p>
        </div>

        <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
          <RadialOrbitalTimelineDemo />
        </div>
      </section>

      {/* NUMBERS SECTION */}
      {/* <section style={{
        paddingTop: '9rem',
        paddingBottom: '10rem',
        position: 'relative',
        width: '100%',
        backgroundImage: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%), linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.02) 35%, transparent 40%)'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem', position: 'relative', zIndex: 1 }}>
            <div>
              <span style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}>(WHY US)</span>
              <h2 className="title-section" style={{ margin: '1rem 0 0 0', fontFamily: 'var(--font-bebas-neue)', fontSize: '6rem' }}>NUMBERS <br />DON'T LIE</h2>
            </div>
            <div style={{ maxWidth: '400px', color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
              With a unique hands-on approach, we craft bold thinkers and high-impact digital experiences that get results.
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}>
            {[
              { value: "40+", label: "AI Projects Completed" },
              { value: "8", label: "Weeks of intensive learning" },
              { value: "99%", label: "Student satisfaction rate", accent: true },
              { value: "100%", label: "Hands-on coding", accent: true }
            ].map((stat, i) => (
              <div key={i} style={{
                padding: '3rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }} className="hover-lift">
                <h3 style={{ margin: 0, fontFamily: 'var(--font-inter)', fontSize: '3.5rem', fontWeight: 600, color: stat.accent ? 'var(--color-accent)' : '#fff', letterSpacing: '-0.03em' }}>
                  {stat.value}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: 0 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* TESTIMONIALS (STAGGERED) */}
      {/* <section className="container" style={{ paddingTop: '2rem', paddingBottom: '10rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}>(WHAT PARENTS SAY)</span>
          <h2 className="title-section" style={{ margin: '1rem 0 0 0', fontFamily: 'var(--font-bebas-neue)', fontSize: '6rem' }}>THE IMPACT</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0 auto', fontFamily: 'var(--font-inter)' }}>
            Hear from the parents and educators who have watched their students transform into confident AI developers.
          </p>
        </div>

        <StaggerTestimonialsDemo />
      </section> */}

      {/* PRICING SECTION */}
      <section id="pricing" className="container" style={{ paddingTop: '5rem', paddingBottom: '8rem' }}>
        <PricingDemo />
      </section>

      {/* REGISTER SECTION */}
      <section id="register" className="container" style={{ paddingTop: '5rem', paddingBottom: '8rem' }}>
        <RegisterDemo />
      </section>

      {/* FAQ SECTION */}
      <section id="faq" style={{
        paddingTop: '2rem',
        paddingBottom: '2rem',
        position: 'relative',
        width: '100%',
        backgroundImage: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%), linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.02) 35%, transparent 40%)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <FAQDemo />
        </div>
      </section>

      {/* CONTACT SECTION */}
      {/* <section id="contact" className="container" style={{ paddingTop: '5rem', paddingBottom: '8rem' }}>
        <ContactDemo />
      </section> */}

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#000', color: '#fff', paddingTop: '6rem', fontFamily: 'var(--font-inter)' }}>
        <div className="container footer-grid">

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.65rem', color: '#666', letterSpacing: '0.1em' }}>(EMAIL)</span>
              <a href="mailto:register@hekahub.com" style={{ fontSize: '1.25rem', color: '#ff4500', textDecoration: 'none', fontWeight: 500 }}>register@hekahub.com</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.65rem', color: '#666', letterSpacing: '0.1em' }}>(PHONE)</span>
              <span style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 500 }}>+91 9235327048</span>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>© 2026 HEKAHUB. All rights reserved</span>
              <div style={{ fontSize: '0.65rem', color: '#666', display: 'flex', gap: '1rem' }}>
                {/* <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
                <span>•</span>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a> */}
              </div>
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.65rem', color: '#666', letterSpacing: '0.1em' }}>(LINKS)</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1.125rem' }}>
              <a href="#" style={{ color: '#fff', textDecoration: 'none' }} className="hover:opacity-70">Home</a>
              <a href="#curriculum" style={{ color: '#fff', textDecoration: 'none' }} className="hover:opacity-70">Curriculum</a>
              <a href="#pricing" style={{ color: '#fff', textDecoration: 'none' }} className="hover:opacity-70">Pricing</a>
              <a href="#register" style={{ color: '#fff', textDecoration: 'none' }} className="hover:opacity-70">Registration</a>
              <a href="#faq" style={{ color: '#fff', textDecoration: 'none' }} className="hover:opacity-70">FAQ</a>
            </div>


          </div>

          {/* Socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.65rem', color: '#666', letterSpacing: '0.1em' }}>(SOCIALS)</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '1.125rem' }}>
              <a href="https://x.com/hekahub/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hover:opacity-70">X/Twitter <span style={{ fontSize: '0.75rem' }}>↗</span></a>
              <a href="https://www.instagram.com/heka_hub/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hover:opacity-70">Instagram <span style={{ fontSize: '0.75rem' }}>↗</span></a>
              <a href="https://www.linkedin.com/showcase/hekahub/about/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hover:opacity-70">LinkedIn <span style={{ fontSize: '0.75rem' }}>↗</span></a>
              <a href="https://www.facebook.com/hekahub/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hover:opacity-70">Facebook <span style={{ fontSize: '0.75rem' }}>↗</span></a>
            </div>

          </div>

          {/* Hekaos Brand Block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Hekaos Logo */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src="/Hekaos_Fav_Icon.png"
                alt="Hekaos"
                width={48}
                height={48}
                style={{ objectFit: 'contain' }}
              />
            </div>

            {/* Brand description text */}
            <p style={{
              fontSize: '0.875rem',
              color: '#aaa',
              fontFamily: 'var(--font-inter)',
              lineHeight: 1.75,
              textAlign: 'center',
              margin: 0,
            }}>
              <a href="https://hekaos.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ff4500', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.05em' }}>HEKAOS</a>
              {' '}is where{' '}
              <span style={{ color: '#fff' }}>cutting-edge technology</span>
              {' '}awakens{' '}
              <span style={{ color: '#ff4500' }}>Ancient Lore.</span>
            </p>
            <p style={{
              fontSize: '0.875rem',
              color: '#aaa',
              fontFamily: 'var(--font-inter)',
              lineHeight: 1.75,
              textAlign: 'center',
              margin: 0,
            }}>
              We engineer{' '}
              <span style={{ color: '#fff' }}>order, intelligence &amp; value</span>
              {' '}from{' '}
              <span style={{ color: '#fff' }}>complex systems</span>
              —turning raw potential into{' '}
              <span style={{ color: '#ff4500' }}>engineered intelligence.</span>
            </p>
            <p style={{
              fontSize: '0.875rem',
              color: '#aaa',
              fontFamily: 'var(--font-inter)',
              lineHeight: 1.75,
              textAlign: 'center',
              margin: 0,
            }}>
              Fusing{' '}
              <span style={{ color: '#fff' }}>Advanced AI &amp; Data Science</span>
              {' '}with visionary thinking,{' '}we build the{' '}
              <span style={{ color: '#ff4500' }}>future</span>
              {' '}from{' '}
              <span style={{ color: '#fff' }}>chaos.</span>
            </p>

            <div style={{ marginTop: 'auto', textAlign: 'center' }}>
              <a href="https://hekaos.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.65rem', color: '#444', letterSpacing: '0.1em', textDecoration: 'none' }} className="hover:text-[#ff4500] transition-colors">
                POWERED BY{' '}
                <span style={{ color: '#ff4500' }}>HEKAOS</span>
              </a>
            </div>
          </div>
        </div>

        {/* Big Branding Strip */}
        <div style={{ backgroundColor: '#ff4500', color: '#000', padding: '4rem 0' }}>
          <div className="container branding-strip">
            <h2 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(4rem, 15vw, 20rem)', margin: 0, lineHeight: 0.7, letterSpacing: '-0.02em' }}>
              HekaHub<sup style={{ fontSize: '0.2em', verticalAlign: 'super' }}></sup>
            </h2>
            <div style={{ textAlign: 'right', paddingBottom: '1rem' }}>
              <p style={{ margin: 0, fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 700, lineHeight: 1, fontFamily: 'var(--font-inter)', letterSpacing: '-0.02em' }}>
                Beyond Coding.<br />For Everyone.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
