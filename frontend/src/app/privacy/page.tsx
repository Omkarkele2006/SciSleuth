"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, Database, Eye, Lock, Globe, HardDrive, UserCheck, Mail } from "lucide-react";

const LAST_UPDATED = "June 2026";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: `SciSleuth collects only what's necessary to deliver a meaningful diagnostic experience. Here's what that includes:

• Diagnostic responses: The answers you submit during assessments, which we use to detect misconceptions and compute your knowledge graph health score.
• Session data: Temporary identifiers stored in your browser's local storage to maintain your progress across pages (diagnostic → results → graph).
• Account data (if applicable): If you create an account, we collect your name and email address.
• Usage data: Basic analytics on how features are used - pages visited, buttons clicked - to help us improve the platform.

We do not collect sensitive personal information, payment details, or any data unrelated to your learning experience.`,
  },
  {
    icon: Eye,
    title: "Diagnostic & Learning Data",
    content: `Your diagnostic responses are the core of what SciSleuth does. When you answer questions, we analyze your responses to identify misconceptions and map them to a knowledge graph.

This data is processed in real time and - in the current version - stored primarily in your browser's local storage. It is not permanently linked to a persistent user profile unless you've created an account.

If you clear your browser storage, your diagnostic history is erased. We do not sell, rent, or share your diagnostic data with third parties for advertising or profiling purposes.`,
  },
  {
    icon: Shield,
    title: "How We Use Your Data",
    content: `We use the data we collect to:

• Run the diagnostic assessment and detect misconceptions in your answers.
• Generate personalized AI explanations and recovery missions via the Gemini API.
• Display your knowledge graph and health scores in real time.
• Improve the platform - understanding which features are used helps us build better tools.
• (If accounts are enabled) Allow you to track your diagnostic history over time.

We do not use your data for targeted advertising. We do not build behavioral profiles. Your learning data exists to help you learn - nothing else.`,
  },
  {
    icon: Lock,
    title: "Data Security",
    content: `We take reasonable steps to protect your data. Diagnostic responses sent to our API routes are processed server-side and are not logged permanently beyond what's needed for the session.

That said, SciSleuth is a student-built project developed during a hackathon. While we follow good engineering practices, we cannot guarantee enterprise-grade security. We recommend not entering any sensitive personal information beyond what's needed for the diagnostic.

If you discover a security vulnerability, please contact us at omtechservices.dev@gmail.com so we can address it promptly.`,
  },
  {
    icon: Globe,
    title: "Third-Party Services",
    content: `SciSleuth uses the following third-party services:

• Google Gemini API: Your misconception data (name, broken concept, description) is sent to Gemini to generate AI explanations and recovery missions. This is subject to Google's privacy policy and terms of service.
• Supabase (if enabled): Used for database storage of diagnostic results and user accounts. Data stored in Supabase is subject to Supabase's privacy policy.
• Vercel: SciSleuth is deployed on Vercel, which may collect standard server logs (IP address, request metadata) as part of its hosting infrastructure.

We do not use Google Analytics, Facebook Pixel, or any advertising-related tracking.`,
  },
  {
    icon: HardDrive,
    title: "Cookies & Local Storage",
    content: `SciSleuth does not use tracking cookies. We use browser local storage to:

• Store your diagnostic results temporarily so they persist as you move from the diagnostic page to the results and graph pages.
• Remember your session state within a single browser session.

This data never leaves your device unless you explicitly trigger an AI explanation request. You can clear it at any time by clearing your browser's local storage or site data. We do not use this for cross-site tracking.`,
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: `You have the right to:

• Access the data we hold about you - email us and we'll tell you what we have.
• Request deletion of your data - we'll remove it from our systems within a reasonable timeframe.
• Correct inaccurate data - if something's wrong, let us know.
• Withdraw consent - you can stop using SciSleuth at any time, and your local storage data can be cleared instantly.

Since SciSleuth is primarily local-storage-based in its current form, most of your data is already under your direct control in your own browser.`,
  },
  {
    icon: Mail,
    title: "Contact Us",
    content: `Privacy questions, data requests, or concerns? We're a small student team and we read every email.

Team SkyHi - Vishwakarma Institute of Technology
Project Lead: Om Vivekanand Karkele
Email: omtechservices.dev@gmail.com


We'll respond within a few business days. For urgent security issues, please mark your subject line "Security" so we prioritize it.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#020817] text-white antialiased">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-teal-500/15 blur-[140px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-cyan-700/10 blur-[140px]" />
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
            <Shield className="h-3.5 w-3.5" />
            Privacy Policy
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-6 py-16">
        {/* Hero */}
        <div className="mb-14 text-center">
          
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Privacy{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #5eead4, #22d3ee)" }}>
              Policy
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            We believe privacy is foundational to trust. Here's exactly what we collect, why, and how we protect it.
          </p>
          <div className="mt-4 text-xs text-white/30">Last Updated: {LAST_UPDATED}</div>
        </div>

        {/* Summary card */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-teal-400/20 bg-teal-400/[0.04] p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.18em] text-teal-300/70 mb-3">TL;DR Summary</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "No ads", detail: "We never show ads or sell your data." },
              { label: "No tracking", detail: "No cross-site tracking or behavior profiling." },
              { label: "Your control", detail: "Most data lives in your browser. Clear it anytime." },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="text-sm font-semibold text-teal-300">{item.label}</div>
                <div className="mt-1 text-xs text-white/50">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick nav */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/40">Quick Navigation</p>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.title}
                href={`#${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/60 transition hover:border-teal-400/30 hover:text-teal-300"
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
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition hover:border-teal-400/20"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-400/10 ring-1 ring-teal-400/30">
                    <Icon className="h-4 w-4 text-teal-300" />
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

        {/* Link to Terms */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-teal-400/20 bg-teal-400/[0.04] p-6 text-center backdrop-blur-xl">
          <p className="text-sm text-white/60">
            Also read our{" "}
            <Link href="/terms" className="font-medium text-teal-400 transition hover:text-teal-300">
              Terms of Service
            </Link>{" "}
            to understand the rules governing platform use.
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