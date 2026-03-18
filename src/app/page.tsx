"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Menu,
  Upload,
  Sparkles,
  BarChart3,
  MessageSquare,
  Check,
} from "lucide-react";
import gsap from "gsap";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { TextReveal } from "@/components/TextReveal";
import { MagneticButton } from "@/components/MagneticButton";
import { Badge } from "@/components/Badge";
import { Score } from "@/components/Score";
import { Divider } from "@/components/Divider";
import { Avatar } from "@/components/Avatar";
import { Drawer } from "@/components/Drawer";
import { Particles } from "@/components/Particles";
import { useReveal } from "@/hooks/useReveal";

/* ─────────────────────────────────────────────
   1. Navigation Bar
   ───────────────────────────────────────────── */

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, { opacity: 0, duration: 0.6, delay: 0.3 });
    }
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-30 bg-surface-base/90 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-full px-6 md:px-10 lg:px-16">
          <div className="max-w-wide mx-auto flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-tight text-ink-primary">
                Portfolio Review
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>
                How It Works
              </Button>
              <Link href="/dashboard/new">
                <Button variant="primary">Get Your Review</Button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-ink-secondary hover:text-ink-primary transition-colors duration-fast"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="flex flex-col gap-4 mt-4">
          <button
            className="text-sm font-body text-ink-secondary hover:text-ink-primary text-left"
            onClick={() => {
              setDrawerOpen(false);
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            How It Works
          </button>
          <Link href="/dashboard/new" onClick={() => setDrawerOpen(false)}>
            <Button variant="primary" className="w-full">
              Get Your Review
            </Button>
          </Link>
        </div>
      </Drawer>
    </>
  );
}

/* ─────────────────────────────────────────────
   2. Hero
   ───────────────────────────────────────────── */

function Hero() {
  return (
    <section className="min-h-screen flex items-center relative pt-14">
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={150}
          particleSpread={10}
          speed={0.05}
          moveParticlesOnHover={true}
          particleHoverFactor={1.5}
          alphaParticles={false}
          particleBaseSize={120}
          sizeRandomness={1.5}
          cameraDistance={25}
          disableRotation={false}
          particleColors={["#fafafa", "#d4d4d4", "#a3a3a3"]}
        />
      </div>

      <div className="relative z-10 max-w-full px-6 md:px-10 lg:px-16 w-full">
        <div className="max-w-wide mx-auto">
          <TextReveal>
            <p className="text-xs font-body font-medium tracking-widest uppercase text-acid mb-6">
              AI PORTFOLIO REVIEW
            </p>
          </TextReveal>

          <div className="overflow-hidden">
            <TextReveal>
              <h1 className="font-display font-black text-5xl md:text-8xl tracking-tightest text-ink-primary">
                Your portfolio,
              </h1>
            </TextReveal>
          </div>
          <div className="overflow-hidden">
            <TextReveal delay={0.08}>
              <h1 className="font-display font-black text-5xl md:text-8xl tracking-tightest text-ink-primary">
                reviewed by AI.
              </h1>
            </TextReveal>
          </div>

          <TextReveal delay={0.15}>
            <p className="text-lg md:text-xl text-ink-secondary max-w-content mt-6 leading-relaxed">
              Upload your design portfolio and get structured, actionable
              feedback on layout, hierarchy, storytelling, and presentation
              — in seconds.
            </p>
          </TextReveal>

          <TextReveal delay={0.3}>
            <div className="flex items-center gap-4 mt-10">
              <MagneticButton>
                <Link href="/dashboard/new">
                  <Button variant="primary">Get Your Review</Button>
                </Link>
              </MagneticButton>
              <Button
                variant="ghost"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              >
                See how it works
              </Button>
            </div>
          </TextReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   3. Trust Strip
   ───────────────────────────────────────────── */

function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  const companies = ["Spotify", "Figma", "Vercel", "Linear", "Stripe"];

  return (
    <div ref={ref} className="py-8 border-y border-border">
      <div className="max-w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-wide mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <span className="text-xs text-ink-muted tracking-widest uppercase">
            Trusted by designers from
          </span>
          {companies.map((name) => (
            <span
              key={name}
              className="text-xs text-ink-muted tracking-widest uppercase opacity-40"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   4. How It Works
   ───────────────────────────────────────────── */

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description:
      "Drop your portfolio — PDF, PNG, or paste a URL. No account needed.",
  },
  {
    icon: Sparkles,
    title: "Analyze",
    description:
      "AI reviews layout, typography, hierarchy, and storytelling in seconds.",
  },
  {
    icon: BarChart3,
    title: "Score",
    description:
      "Get a detailed score breakdown across four design dimensions.",
  },
  {
    icon: MessageSquare,
    title: "Improve",
    description:
      "Receive specific, actionable feedback with prioritized next steps.",
  },
];

function HowItWorks() {
  const refs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useReveal(refs[0], { delay: 0 });
  useReveal(refs[1], { delay: 0.1 });
  useReveal(refs[2], { delay: 0.2 });
  useReveal(refs[3], { delay: 0.3 });

  return (
    <Section id="how-it-works" eyebrow="HOW IT WORKS" heading="Four steps to a stronger portfolio.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} ref={refs[i]}>
              <Card variant="interactive">
                <Icon className="w-5 h-5 text-acid mb-4" strokeWidth={1.5} />
                <h3 className="font-display font-semibold text-lg tracking-tight text-ink-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {step.description}
                </p>
              </Card>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   5. Sample Review Preview
   ───────────────────────────────────────────── */

function SampleReview() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useReveal(leftRef);
  useReveal(rightRef, { delay: 0.15 });

  const features = [
    "Page-by-page analysis",
    "Visual hierarchy scoring",
    "Typography audit",
    "Storytelling assessment",
    "Actionable next steps",
  ];

  return (
    <Section eyebrow="SEE IT IN ACTION" heading="What your review looks like.">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left — 60% */}
        <div ref={leftRef} className="md:col-span-3 flex flex-col gap-4">
          <Card variant="featured">
            <div className="flex items-center gap-4 mb-4">
              <Score value={7.8} variant="ring" />
              <div className="flex flex-wrap gap-2">
                <Badge variant="acid">Layout</Badge>
                <Badge variant="mist">Typography</Badge>
                <Badge>Hierarchy</Badge>
              </div>
            </div>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Strong spatial rhythm with consistent 8px grid. Typography hierarchy
              is clear but could benefit from tighter heading scale.
            </p>
          </Card>

          <Card>
            <Score value={8.1} variant="bar" label="Layout" className="mb-3" />
            <p className="text-sm text-ink-secondary">
              Clean grid system with intentional whitespace. Alignment is
              consistent across all breakpoints.
            </p>
          </Card>

          <Card>
            <Score value={6.4} variant="bar" label="Typography" className="mb-3" />
            <p className="text-sm text-ink-secondary">
              Too many competing type styles. Consider consolidating to two
              typefaces with a clearer scale.
            </p>
          </Card>
        </div>

        {/* Right — 40% */}
        <div ref={rightRef} className="md:col-span-2">
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-lg tracking-tight text-ink-primary">
              What&apos;s included
            </h3>
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-success shrink-0" strokeWidth={2} />
                <span className="text-sm text-ink-secondary">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   6. Testimonials
   ───────────────────────────────────────────── */

const testimonials = [
  {
    quote:
      "I uploaded my portfolio expecting generic tips. Instead I got feedback so specific it felt like a senior designer sat next to me for an hour.",
    name: "Sarah Chen",
    role: "Product Designer",
    initials: "SC",
  },
  {
    quote:
      "The hierarchy scoring alone was worth it. I restructured my case studies based on the feedback and landed three interviews that week.",
    name: "Marcus Rivera",
    role: "UX Designer",
    initials: "MR",
  },
  {
    quote:
      "Finally, honest critique without the fluff. It caught spacing issues and typography problems I had been blind to for months.",
    name: "Aisha Patel",
    role: "Visual Designer",
    initials: "AP",
  },
];

function Testimonials() {
  const refs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useReveal(refs[0], { delay: 0 });
  useReveal(refs[1], { delay: 0.1 });
  useReveal(refs[2], { delay: 0.2 });

  return (
    <Section
      eyebrow="WHAT DESIGNERS SAY"
      heading="Real feedback on real feedback."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={t.name} ref={refs[i]}>
            <Card className="flex flex-col h-full">
              <p className="text-sm text-ink-secondary italic leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <Divider className="my-4" />
              <div className="flex items-center gap-3">
                <Avatar initials={t.initials} size="sm" />
                <div>
                  <p className="text-sm text-ink-primary font-medium font-body">
                    {t.name}
                  </p>
                  <p className="text-xs text-ink-muted">{t.role}</p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   7. Pricing / Value
   ───────────────────────────────────────────── */

function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  const features = [
    "Overall portfolio score",
    "Four-dimension breakdown",
    "Page-by-page analysis",
    "Prioritized recommendations",
    "Exportable report",
    "No account required",
  ];

  return (
    <Section narrow eyebrow="PRICING" heading="Start for free.">
      <div ref={ref} className="max-w-2xl mx-auto">
        <Card variant="featured">
          <div className="text-center mb-6">
            <span className="font-display font-bold text-4xl tracking-tight text-ink-primary">
              Free
            </span>
            <span className="text-sm text-ink-muted ml-2">
              for your first review
            </span>
          </div>

          <Divider label="INCLUDES" className="mb-6" />

          <div className="flex flex-col gap-3 mb-8">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-success shrink-0" strokeWidth={2} />
                <span className="text-sm text-ink-secondary">{f}</span>
              </div>
            ))}
          </div>

          <Link href="/dashboard/new" className="block">
            <Button variant="primary" className="w-full">
              Get Your Free Review
            </Button>
          </Link>
        </Card>

        <p className="text-xs text-ink-muted text-center mt-4">
          No account required. Your portfolio is never stored.
        </p>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   8. Final CTA
   ───────────────────────────────────────────── */

function FinalCTA() {
  return (
    <Section narrow className="text-center">
      <TextReveal>
        <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-ink-primary mb-4">
          Ready to level up?
        </h2>
      </TextReveal>
      <TextReveal delay={0.1}>
        <p className="text-ink-secondary text-lg mb-10">
          Get your portfolio reviewed in under a minute.
        </p>
      </TextReveal>
      <TextReveal delay={0.2}>
        <MagneticButton>
          <Link href="/dashboard/new">
            <Button variant="primary">Review My Portfolio</Button>
          </Link>
        </MagneticButton>
      </TextReveal>
    </Section>
  );
}

/* ─────────────────────────────────────────────
   9. Footer
   ───────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-full px-6 md:px-10 lg:px-16">
        <div className="max-w-wide mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-muted">
            Portfolio Review Tool — Built for designers.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-ink-muted">
              {new Date().getFullYear()}
            </span>
            <span className="text-xs text-ink-muted hover:text-ink-secondary transition-colors duration-fast cursor-pointer">
              Privacy
            </span>
            <span className="text-xs text-ink-muted hover:text-ink-secondary transition-colors duration-fast cursor-pointer">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <SampleReview />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  );
}
