import EmailCapture from "./components/EmailCapture";
import CandleCursor from "./components/CandleCursor";
import BlurReveal from "./components/BlurReveal";
import Wordmark from "./components/Wordmark";
import "./page.css";

export default function Page() {
  return (
    <main>
      <CandleCursor />
      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <Wordmark text="BLANKSECT" />
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow emerge">A society, not a store</p>
          <h1 className="hero-headline">
            Most people don&rsquo;t know
            <br />
            who they really are.
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
        <div className="container">
          <p className="eyebrow">The manifesto</p>
          <BlurReveal className="manifesto-line">
            There is no membership fee for the truth. Only readiness.
          </BlurReveal>
          <BlurReveal className="manifesto-line">
            Blanksect doesn&rsquo;t sell clothing. It marks those who&rsquo;ve already
            decided who they are &mdash; before the world agreed.
          </BlurReveal>
          <BlurReveal className="manifesto-line">
            The delta on your back isn&rsquo;t decoration. It&rsquo;s change &mdash; the
            symbol of what becomes possible once you stop asking permission to be it.
          </BlurReveal>
          <BlurReveal className="manifesto-line accent-line">
            <strong>I AM.</strong> isn&rsquo;t a slogan. It&rsquo;s a declaration. Wear it
            when you mean it.
          </BlurReveal>
        </div>
      </section>

      {/* DROP TEASER */}
      <section className="drop">
        <div className="container drop-inner">
          <p className="eyebrow drop-eyebrow">The first drop &mdash; coming soon</p>
          <h2 className="drop-headline">I AM.</h2>
          <p className="drop-sub">
            Front and center. The delta &mdash; quiet, on your back, for those who
            already know what it means.
          </p>
          <div className="tshirt-static">
            <img src="/tshirt.png" alt="Blanksect I AM. t-shirt" />
          </div>
          <div className="product-meta">
            <span className="product-name">I AM. Tee</span>
            <span className="product-status">Coming Soon</span>
          </div>
          <div className="drop-copy">
            <p>This isn&rsquo;t scarcity. It&rsquo;s selection.</p>
            <p>
              The ones who find this were already looking. The ones who understand it
              were already becoming.
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
