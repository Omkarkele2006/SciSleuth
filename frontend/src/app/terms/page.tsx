"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, FileText, AlertTriangle, User, Lock, Lightbulb, RefreshCw, Mail } from "lucide-react";

const LAST_UPDATED = "June 2026";

const sections = [
  {
    icon: FileText,
    title: "Welcome to SciSleuth",
    content: `SciSleuth is an AI-powered misconception diagnostic platform built by Team SkyHi at Vishwakarma Institute of Technology. We help students identify conceptual misunderstandings in physics, visualize knowledge gaps through interactive knowledge graphs, and follow personalized recovery missions powered by the Gemini API.

By using SciSleuth - whether through our web app, diagnostic assessments, or AI-generated content - you agree to these Terms of Service. If you don't agree, please don't use the platform.`,
  },
  {
    icon: Shield,
    title: "Acceptance of Terms",
    content: `By accessing or using SciSleuth, you confirm that you are at least 13 years old and have the legal capacity to enter into this agreement. If you are under 18, you represent that your parent or guardian has reviewed and accepted these terms on your behalf.

These terms apply to all users - students, teachers, and anyone exploring the platform. Using SciSleuth means you accept these terms in full.`,
  },
  {
    icon: Lightbulb,
    title: "Educational Use",
    content: `SciSleuth is designed exclusively for educational purposes. The platform helps students understand misconceptions in science subjects, currently focused on Newton's Laws of Motion.

The AI-generated explanations and recovery missions are meant to support learning - not replace teachers, textbooks, or formal instruction. SciSleuth's diagnostic results should not be used for official academic grading, admissions, or assessments. We are a learning companion, not an evaluation authority.`,
  },
  {
    icon: User,
    title: "User Responsibilities",
    content: `You agree to use SciSleuth honestly and in good faith. This means:

• Answering diagnostic questions to the best of your knowledge - not gaming the system for specific results.
• Not attempting to reverse-engineer, scrape, or replicate SciSleuth's AI prompts, data, or codebase without permission.
• Not using the platform for any purpose that could harm other users or the integrity of the educational content.
• Not submitting harmful, offensive, or misleading content through any input fields.

We reserve the right to suspend access for any user who violates these responsibilities.`,
  },
  {
    icon: Lock,
    title: "Account Security",
    content: `If SciSleuth offers account creation, you are responsible for maintaining the security of your credentials. Do not share your password with others. If you suspect unauthorized access to your account, contact us immediately at omtechservices.dev@gmail.com.

SciSleuth is not liable for any loss or damage resulting from unauthorized access to your account due to your failure to keep credentials secure.`,
  },
  {
    icon: Shield,
    title: "Intellectual Property",
    content: `All content on SciSleuth - including the platform design, misconception catalog, question bank, knowledge graph structure, and AI prompt architecture - is the intellectual property of Team SkyHi unless otherwise stated.

You may not copy, redistribute, or commercialize SciSleuth's content without explicit written permission. The open-source portions of the project (if any) are governed by their respective licenses. Gemini API outputs are subject to Google's terms of use.`,
  },
  {
    icon: AlertTriangle,
    title: "Limitation of Liability",
    content: `SciSleuth is provided "as is" without warranties of any kind. We do not guarantee that the platform will be error-free, uninterrupted, or perfectly accurate. AI-generated explanations may occasionally be incomplete or imprecise - always verify important concepts with qualified educators.

To the maximum extent permitted by law, Team SkyHi and its members shall not be liable for any indirect, incidental, or consequential damages arising from your use of SciSleuth.`,
  },
  {
    icon: RefreshCw,
    title: "Changes to These Terms",
    content: `We may update these Terms of Service from time to time. When we do, we'll update the "Last Updated" date at the top of this page. Continued use of SciSleuth after changes are posted constitutes acceptance of the updated terms.

We'll try to give reasonable notice for significant changes - but for a student-built hackathon project, this may simply mean updating this page.`,
  },
  {
    icon: Mail,
    title: "Contact Us",
    content: `Have questions about these terms? We're a student team and genuinely happy to hear from you.

Team SkyHi - Vishwakarma Institute of Technology
Project Lead: Om Vivekanand Karkele
Email: omtechservices.dev@gmail.com

This platform was built as part of a hackathon. For partnerships, collaboration, or licensing inquiries, reach out via email.`,
  },
];

export default function TermsPage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#020817] text-white antialiased">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[140px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-[140px]" />
        <div className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-emerald-700/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-[#020817]/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="SciSleuth" width={32} height={32} className="rounded-md" />
            <span className="font-bold">SciSleuth</span>
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs text-emerald-300 md:flex">
            <FileText className="h-3.5 w-3.5" />
            Terms of Service
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-6 py-16">
        {/* Hero */}
        <div className="mb-14 text-center">
          
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Terms of{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #6ee7b7, #2dd4bf)" }}>
              Service
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Please read these terms carefully before using SciSleuth. They govern your access to and use of the platform.
          </p>
          <div className="mt-4 text-xs text-white/30">Last Updated: {LAST_UPDATED}</div>
        </div>

        {/* Quick nav */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/40">Quick Navigation</p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.title}
                href={`#${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/60 transition hover:border-emerald-400/30 hover:text-emerald-300"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                id={section.title.toLowerCase().replace(/\s+/g, "-")}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition hover:border-emerald-400/20"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/30">
                    <Icon className="h-4 w-4 text-emerald-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-mono text-white/30">{String(i + 1).padStart(2, "0")}</span>
                      <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
                    </div>
                    <p className="text-sm leading-relaxed text-white/60 whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Privacy */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-6 text-center backdrop-blur-xl">
          <p className="text-sm text-white/60">
            Also read our{" "}
            <Link href="/privacy" className="font-medium text-emerald-400 transition hover:text-emerald-300">
              Privacy Policy
            </Link>{" "}
            to understand how we handle your data.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-white/50 md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/logo.jpg" alt="SciSleuth" width={32} height={32} className="rounded-md" />
            <span>SciSleuth · Built by Team SkyHi</span>
          </div>
          <p>Diagnose misconceptions, not mistakes.</p>
        </div>
      </footer>
    </div>
  );
}