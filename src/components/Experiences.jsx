import { useEffect, useRef, useState } from 'react'
import { experience } from '../data'

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE CARD
// ─────────────────────────────────────────────────────────────────────────────

function ExperienceCard({ role, company, date, desc, index, isActive, onClick }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150 + index * 100)
    return () => clearTimeout(t)
  }, [index])

  return (
    <button
      onClick={onClick}
      className="w-full text-left group"
    >
      <div
        className={`relative rounded-2xl p-5 transition-all duration-300 cursor-pointer
          ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
        style={{
          background: isActive
            ? 'rgba(0,212,170,0.07)'
            : 'rgba(255,255,255,0.02)',
          border: `1px solid ${isActive
            ? 'rgba(0,212,170,0.3)'
            : 'rgba(255,255,255,0.07)'}`,
          transform: visible
            ? isActive ? 'translateX(4px)' : 'translateX(0)'
            : 'translateX(-16px)',
        }}
      >
        {/* active left bar */}
        <div
          className="absolute left-0 top-4 bottom-4 w-0.75 rounded-full transition-all duration-300"
          style={{
            background: '#00D4AA',
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
          }}
        />

        <div className="flex-col md:flex items-start justify-between gap-10">
          <div className="min-w-0">
            {/* role */}
            <div
              className="font-bold text-[15px] leading-snug transition-colors duration-200"
              style={{
                color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
                fontFamily: 'Syne, sans-serif',
              }}
            >
              {role}
            </div>
            {/* company */}
            <div
              className="text-[13px] font-semibold mt-1 transition-colors duration-200"
              style={{ color: isActive ? '#00D4AA' : 'rgba(0,212,170,0.6)' }}
            >
              {company}
            </div>
          </div>

          {/* date badge */}
          <span
            className="shrink-0  md:mt-0 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg whitespace-nowrap mt-0.5"
            style={{
              background: isActive ? 'rgba(0,212,170,0.15)' : 'rgba(255,255,255,0.05)',
              color: isActive ? '#00D4AA' : 'rgba(255,255,255,0.3)',
              border: `1px solid ${isActive ? 'rgba(0,212,170,0.3)' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            {date}
          </span>
        </div>
      </div>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL PANEL
// ─────────────────────────────────────────────────────────────────────────────

function DetailPanel({ exp }) {
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey(k => k + 1)
  }, [exp])

  return (
    <div
      key={key}
      className="h-full rounded-2xl p-7 flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        animation: 'fadeInUp 0.35s ease both',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* header */}
      <div className="mb-6">
        <div
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4"
          style={{ background: 'rgba(0,212,170,0.1)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.2)' }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#00D4AA' }}
          />
          Current role
        </div>

        <h3
          className="font-black text-[22px] text-white leading-tight mb-1"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {exp.role}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px] font-semibold" style={{ color: '#00D4AA' }}>
            {exp.company}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12 }}>·</span>
          <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {exp.date}
          </span>
        </div>
      </div>

      {/* divider */}
      <div
        className="mb-6"
        style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }}
      />

      {/* description */}
      <p
        className="text-[14px] leading-[1.8] flex-1"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        {exp.desc}
      </p>

      {/* bottom: index indicator */}
      <div className="mt-6 flex items-center gap-2">
        <div
          className="h-0.5 rounded-full flex-1"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: '100%', background: 'rgba(0,212,170,0.5)' }}
          />
        </div>
        <span
          className="text-[11px] font-mono"
          style={{ color: 'rgba(0,212,170,0.6)' }}
        >
          {exp.company}
        </span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

export default function Experiences() {
  const sectionRef              = useRef(null)
  const [visible, setVisible]   = useState(false)
  const [activeIdx, setActive]  = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const activeExp = experience[activeIdx]

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-10 px-4 sm:px-6 max-w-7xl mx-auto"
    >

      {/* ── HEADING ── */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex gap-1">
            {[4, 8, 12].map(w => (
              <span
                key={w}
                className="h-0.75 rounded-full"
                style={{ width: w, background: '#00D4AA', opacity: w === 12 ? 1 : 0.35 }}
              />
            ))}
          </div>
          <span
            className="text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: '#00D4AA' }}
          >
            Experience
          </span>
        </div>

        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <h2
            className="font-black tracking-tight leading-none mb-3"
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            <span className="text-white">Work </span>
            <span className="relative inline-block" style={{ color: '#00D4AA' }}>
              History
              <span
                className="absolute left-0 -bottom-1 h-0.75 w-full rounded-full"
                style={{ background: '#00D4AA', opacity: 0.3 }}
              />
            </span>
          </h2>
          <p
            className="text-[14px]"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            {experience.length} positions · click to explore each role
          </p>
        </div>
      </div>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-5 transition-all duration-700 delay-200
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >

        {/* LEFT — clickable list */}
        <div className="flex flex-col gap-3">
          {experience.map((exp, i) => (
            <ExperienceCard
              key={exp.company}
              role={exp.role}
              company={exp.company}
              date={exp.date}
              desc={exp.desc}
              index={i}
              isActive={i === activeIdx}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        {/* RIGHT — detail panel */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <DetailPanel exp={activeExp} />
        </div>

      </div>

    </section>
  )
}