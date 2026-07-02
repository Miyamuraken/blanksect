import DeltaMotif from "./components/DeltaMotif";
import EmailCapture from "./components/EmailCapture";
import "./page.css";

export default function Page() {
  return (
    <main>
      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <span className="wordmark">BLANKSECT</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <DeltaMotif completion={0.2} size={260} className="hero-delta" />
        <div className="container hero-content">
          <p className="eyebrow">A society, not a store</p>
          <h1 className="hero-headline">
            Most people are sleepwalking
            <br />
            through someone else&rsquo;s life.
          </h1>
          <p className="hero-sub">
            Blanksect is for the ones who woke up. A society for those who understand:
            reality bends to belief. What you hold as true &mdash; <em>I am</em> &mdash;
            becomes what you live.
          </p>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <DeltaMotif completion={0.45} size={200} className="section-delta" />
        <div className="container">
          <p className="eyebrow">The manifesto</p>
          <p className="manifesto-line">
            There is no membership fee for the truth. Only readiness.
          </p>
          <p className="manifesto-line">
            Blanksect doesn&rsquo;t sell clothing. It marks those who&rsquo;ve already
            decided who they are &mdash; before the world agreed.
          </p>
          <p className="manifesto-line">
            The delta on your back isn&rsquo;t decoration. It&rsquo;s change &mdash; the
            symbol of what becomes possible once you stop asking permission to be it.
          </p>
          <p className="manifesto-line accent-line">
            <strong>I AM.</strong> isn&rsquo;t a slogan. It&rsquo;s a declaration. Wear it
            when you mean it.
          </p>
        </div>
      </section>

      {/* ABOUT / ORIGIN */}
      <section className="about">
        <div className="container about-grid">
          <p className="eyebrow">Origin</p>
          <div className="about-text">
            <p>
              Blanksect started as a thought between two people who got tired of asking
              the world for permission.
            </p>
            <p>
              We didn&rsquo;t build a brand. We built a mirror &mdash; for anyone
              who&rsquo;s ever felt like they were meant for more than what they were
              told to settle for.
            </p>
            <p className="about-emphasis">
              This isn&rsquo;t influencer merch. It&rsquo;s a belief system you can wear.
            </p>
          </div>
        </div>
      </section>

      {/* DROP TEASER */}
      <section className="drop">
        <DeltaMotif completion={1} size={240} className="section-delta" />
        <div className="container drop-inner">
          <p className="eyebrow">The first drop &mdash; coming soon</p>
          <h2 className="drop-headline">I AM.</h2>
          <p className="drop-sub">
            Front and center. The delta &mdash; quiet, on your back, for those who
            already know what it means.
          </p>
          <div className="drop-copy">
            <p>This isn&rsquo;t scarcity. It&rsquo;s selection.</p>
            <p>
              The ones who find this were already looking. The ones who understand it
              were already becoming. Most people will scroll past &mdash; not because we
              hid it, but because they weren&rsquo;t seeking it yet.
            </p>
            <p>
              If everyone who saw this actually believed it &mdash; really believed
              reality bends to conviction &mdash; there&rsquo;d be no fear left in the
              world. No settling. No asking permission.
            </p>
            <p className="accent-line">
              Most won&rsquo;t. That&rsquo;s not exclusivity. That&rsquo;s just how
              readiness works.
            </p>
          </div>
          <div className="drop-form">
            <EmailCapture ctaLabel="Notify me" id="drop" />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="social">
        <div className="container">
          <p className="eyebrow">Inside the society</p>
          <p className="social-sub">Glimpses from the other side.</p>
          <div className="social-grid">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="social-tile"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="social-tile"
            >
              YouTube
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER / FINAL CTA */}
      <footer className="footer">
        <div className="container footer-inner">
          <p className="footer-tagline">Blanksect. Not a brand. A frequency.</p>
          <EmailCapture ctaLabel="Join the Society" id="footer" />
          <div className="footer-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
