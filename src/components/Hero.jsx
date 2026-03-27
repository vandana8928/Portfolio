import { useEffect, useRef, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED BLOB — pure CSS, no canvas
// ─────────────────────────────────────────────────────────────────────────────

function BlobBackground() {
  return (
    <>
      <style>{`
        @keyframes blobDrift {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          33%      { transform: translate(30px, -20px) scale(1.05); }
          66%      { transform: translate(-20px, 15px) scale(0.96); }
        }
        @keyframes blobDrift2 {
          0%,100% { transform: translate(0px, 0px) scale(1); }
          40%      { transform: translate(-25px, 20px) scale(1.08); }
          70%      { transform: translate(15px, -10px) scale(0.94); }
        }
        @keyframes ringPulse {
          0%,100% { opacity: 0.15; }
          50%      { opacity: 0.3; }
        }
        @keyframes ringPulse2 {
          0%,100% { opacity: 0.08; }
          50%      { opacity: 0.18; }
        }
        @keyframes floatDot {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-hero-1 { animation: heroFadeIn 0.7s ease both 0.1s; }
        .animate-hero-2 { animation: heroFadeIn 0.7s ease both 0.25s; }
        .animate-hero-3 { animation: heroFadeIn 0.7s ease both 0.4s; }
        .animate-hero-4 { animation: heroFadeIn 0.7s ease both 0.55s; }
        .animate-hero-5 { animation: heroFadeIn 0.7s ease both 0.7s; }
        .pulse-dot::before {
          content:'';
          position:absolute;
          inset:-3px;
          border-radius:50%;
          background:#00D4AA;
          animation: pingAnim 1.5s cubic-bezier(0,0,0.2,1) infinite;
        }
        @keyframes pingAnim {
          75%,100%{ transform:scale(2); opacity:0; }
        }
      `}</style>

      {/* ── main teal blob ── */}
      <div
        style={{
          position: 'absolute',
          right: '8%',
          top: '15%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,170,0.18) 0%, rgba(0,212,170,0.06) 45%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'blobDrift 9s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* ── secondary indigo blob ── */}
      <div
        style={{
          position: 'absolute',
          right: '20%',
          top: '35%',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          filter: 'blur(35px)',
          animation: 'blobDrift2 12s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* ── outer ring ── */}
      <div
        style={{
          position: 'absolute',
          right: 'calc(8% - 60px)',
          top: 'calc(15% - 60px)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          border: '1px solid rgba(0,212,170,0.15)',
          animation: 'ringPulse 4s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* ── middle ring ── */}
      <div
        style={{
          position: 'absolute',
          right: 'calc(8% - 10px)',
          top: 'calc(15% - 10px)',
          width: 500,
          height: 500,
          borderRadius: '50%',
          border: '1px solid rgba(0,212,170,0.1)',
          animation: 'ringPulse2 4s ease-in-out infinite 1s',
          pointerEvents: 'none',
        }}
      />

      {/* ── inner ring ── */}
      <div
        style={{
          position: 'absolute',
          right: 'calc(8% + 55px)',
          top: 'calc(15% + 55px)',
          width: 370,
          height: 370,
          borderRadius: '50%',
          border: '1px solid rgba(0,212,170,0.06)',
          animation: 'ringPulse 5s ease-in-out infinite 2s',
          pointerEvents: 'none',
        }}
      />

      {/* ── center dot ── */}
      <div
        style={{
          position: 'absolute',
          right: 'calc(8% + 225px)',
          top: 'calc(15% + 225px)',
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#00D4AA',
          animation: 'floatDot 4s ease-in-out infinite',
          pointerEvents: 'none',
          boxShadow: '0 0 16px rgba(0,212,170,0.6)',
        }}
      />

      {/* ── floating mini dots scattered ── */}
      {[
        { right: '12%', top: '20%', size: 4, delay: '0s', opacity: 0.4 },
        { right: '28%', top: '12%', size: 3, delay: '1s', opacity: 0.25 },
        { right: '6%',  top: '55%', size: 5, delay: '2s', opacity: 0.3 },
        { right: '35%', top: '62%', size: 3, delay: '0.5s', opacity: 0.2 },
        { right: '18%', top: '70%', size: 4, delay: '1.5s', opacity: 0.3 },
      ].map((d, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            right: d.right,
            top: d.top,
            width: d.size,
            height: d.size,
            borderRadius: '50%',
            background: '#00D4AA',
            opacity: d.opacity,
            animation: `floatDot ${3 + i * 0.7}s ease-in-out infinite ${d.delay}`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────

export default function Hero() {
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: 80 }}
    >
      {/* ── background blobs + rings ── */}
      <BlobBackground />

      {/* ── subtle grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 20% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 20% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* ── content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="max-w-2xl">

          {/* eyebrow */}
          <div className="flex items-center gap-3 mb-7 animate-hero-1">
            <div className="flex gap-1">
              {[4, 8, 14].map((w, i) => (
                <span
                  key={i}
                  className="h-0.75 rounded-full"
                  style={{ width: w, background: '#00D4AA', opacity: i === 2 ? 1 : 0.35 }}
                />
              ))}
            </div>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: '#00D4AA' }}
            >
              Frontend Developer
            </span>
          </div>

          {/* main heading */}
          <h1
            className="animate-hero-2 font-black tracking-tight leading-[1.02] mb-6"
            style={{
              fontSize: 'clamp(44px, 7vw, 44px)',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            <span className="text-white">Building </span>
            <span className="relative inline-block" style={{ color: '#00D4AA' }}>
              beautiful
              {/* underline */}
              <span
                className="absolute left-0 -bottom-1 h-0.75 w-full rounded-full"
                style={{ background: '#00D4AA', opacity: 0.35 }}
              />
            </span>
            <br />
            <span className="text-white">web experiences.</span>
          </h1>

          {/* description */}
          <p
            className="animate-hero-3 text-[16px] leading-relaxed mb-10"
            style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 480 }}
          >
            I craft fast, accessible, and visually stunning interfaces
            using React.js, Tailwind CSS, and modern web technologies.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-14 animate-hero-4">
            <button
              onClick={() => scrollTo('projects')}
              className="group flex items-center gap-2.5 text-[13px] font-bold px-7 py-3.5 rounded-xl transition-all duration-200 active:scale-95"
              style={{ background: '#00D4AA', color: '#0A0A0F' }}
            >
              View Projects
              <svg
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                width="15" height="15" viewBox="0 0 15 15" fill="none"
              >
                <path d="M2 7.5h11M9 3l4.5 4.5L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="text-[13px] font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/0.5"
              style={{
                color: 'rgba(255,255,255,0.65)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              Get in Touch
            </button>
          </div>

          {/* stats + availability */}
          <div className="flex flex-wrap items-center gap-8 animate-hero-5">

            {/* stats */}
            {[
              { value: '1.5+', label: 'Years exp.' },
              { value: '10+',  label: 'Projects'   },
              { value: '5+',  label: 'Clients'    },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="font-black text-[28px] leading-none"
                  style={{ color: '#00D4AA', fontFamily: 'Syne, sans-serif' }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[11px] mt-1 uppercase tracking-wider"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                >
                  {s.label}
                </span>
              </div>
            ))}

            {/* divider */}
            <div
              className="hidden sm:block h-8 w-px"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            />

            {/* availability */}
            <div
              className="flex items-center gap-2.5 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(0,212,170,0.08)',
                border: '1px solid rgba(0,212,170,0.2)',
              }}
            >
              <span
                className="pulse-dot relative w-2 h-2 rounded-full shrink-0"
                style={{ background: '#00D4AA' }}
              />
              <span
                className="text-[12px] font-semibold"
                style={{ color: '#00D4AA' }}
              >
                Available for work
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* ── bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0A0A0F, transparent)',
        }}
      />
    </section>
  )
}