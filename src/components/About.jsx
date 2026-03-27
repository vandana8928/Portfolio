import { useEffect, useRef, useState } from 'react'
import { personal } from '../data'

// ─────────────────────────────────────────────────────────────────────────────
// AVATAR CARD — refined with floating badges
// ─────────────────────────────────────────────────────────────────────────────

function AvatarCard({ openToWork }) {
  return (
    <div className="relative flex items-center justify-center lg:justify-start">

      {/* main card */}
      <div
        className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(0,212,170,0.1) 0%, rgba(99,102,241,0.08) 50%, rgba(0,212,170,0.05) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* inner glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(0,212,170,0.12) 0%, transparent 65%)',
          }}
        />

        {/* grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* avatar emoji */}
        <span
          className="relative z-10 select-none"
          style={{ fontSize: 'clamp(80px, 18vw, 120px)' }}
        >
          👩‍💻
        </span>

        {/* corner accent lines */}
        <div className="absolute top-4 left-4 w-8 h-8 pointer-events-none"
          style={{ borderTop: '2px solid rgba(0,212,170,0.4)', borderLeft: '2px solid rgba(0,212,170,0.4)', borderRadius: '4px 0 0 0' }}
        />
        <div className="absolute bottom-4 right-4 w-8 h-8 pointer-events-none"
          style={{ borderBottom: '2px solid rgba(0,212,170,0.4)', borderRight: '2px solid rgba(0,212,170,0.4)', borderRadius: '0 0 4px 0' }}
        />
      </div>

      {/* ── floating availability badge ── */}
      {openToWork && (
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-bottom-5 lg:-right-6 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl whitespace-nowrap"
          style={{
            background: '#0D0D1A',
            border: '1px solid rgba(0,212,170,0.25)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <span className="relative flex w-2 h-2 shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ background: '#00D4AA' }}
            />
            <span
              className="relative inline-flex rounded-full w-2 h-2"
              style={{ background: '#00D4AA' }}
            />
          </span>
          <span className="text-[12px] font-semibold" style={{ color: '#00D4AA' }}>
            Open to work
          </span>
        </div>
      )}

      {/* ── floating experience badge ── */}
      <div
        className="absolute -top-4 -right-4 lg:-top-5 lg:-right-6 flex flex-col items-center px-4 py-3 rounded-2xl"
        style={{
          background: '#0D0D1A',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <span
          className="text-[22px] font-black leading-none"
          style={{ color: '#00D4AA', fontFamily: 'Syne, sans-serif' }}
        >
          1.5+
        </span>
        <span className="text-[9px] uppercase tracking-wider mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Yrs Exp
        </span>
      </div>

    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────────────

export default function About() {
  const sectionRef          = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const highlights = [
    { value: '10+', label: 'Projects' },
    { value: '5+', label: 'Clients'  },
    { value: '100%', label: 'Dedication' },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* ── LEFT — avatar ── */}
        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <AvatarCard openToWork={personal.openToWork} />
        </div>

        {/* ── RIGHT — content ── */}
        <div
          className={`transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex gap-1">
              {[4, 8, 12].map((w, i) => (
                <span
                  key={i}
                  className="h-[3px] rounded-full"
                  style={{ width: w, background: '#00D4AA', opacity: i === 2 ? 1 : 0.35 }}
                />
              ))}
            </div>
            <span
              className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: '#00D4AA' }}
            >
              About Me
            </span>
          </div>

          {/* heading */}
          <h2
            className="font-black tracking-tight leading-[1.08] mb-6"
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            <span className="text-white">Passionate about </span>
            <span className="relative inline-block" style={{ color: '#00D4AA' }}>
              pixels
              <span
                className="absolute left-0 -bottom-0.5 h-[3px] w-full rounded-full"
                style={{ background: '#00D4AA', opacity: 0.3 }}
              />
            </span>
            <span className="text-white"> &amp; performance.</span>
          </h2>

          {/* bio paragraphs */}
          <div className="space-y-4 mb-8">
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {personal.bio1}
            </p>
            <p
              className="text-[15px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.42)' }}
            >
              {personal.bio2}
            </p>
          </div>

          {/* ── stats row ── */}
          <div
            className="flex items-center gap-6 pt-7 mt-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {highlights.map((h, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="text-[24px] font-black leading-none"
                  style={{ color: '#00D4AA', fontFamily: 'Syne, sans-serif' }}
                >
                  {h.value}
                </span>
                <span
                  className="text-[11px] mt-1 uppercase tracking-wider"
                  style={{ color: 'rgba(255,255,255,0.28)' }}
                >
                  {h.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── tech tags ── */}
          <div className="flex flex-wrap gap-2 mt-7">
            {['React.js', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'Figma', 'WordPress'].map(tag => (
              <span
                key={tag}
                className="text-[11px] font-mono px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  background: 'rgba(0,212,170,0.06)',
                  color: 'rgba(0,212,170,0.8)',
                  border: '1px solid rgba(0,212,170,0.15)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}