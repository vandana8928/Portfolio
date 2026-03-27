import { useEffect, useRef, useState } from 'react'
import { projects } from '../data'

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────────────────────────────────────

function ProjectCard({ icon, color, title, desc, tags, link, index }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100 + index * 100)
    return () => clearTimeout(t)
  }, [index])

  // Extract a base hex color from the Tailwind gradient string
  // e.g. "from-[#FF6B6B]/20 to-..." → use a fallback teal if not present
  const accentColor = '#00D4AA'

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-400 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)'}`,
        transform: visible ? (hovered ? 'translateY(-6px)' : 'translateY(0)') : 'translateY(24px)',
        boxShadow: hovered ? '0 24px 48px rgba(0,0,0,0.4)' : 'none',
        transitionDuration: '300ms',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* ── thumbnail / preview area ── */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden shrink-0"
        style={{
          background: `linear-gradient(135deg, rgba(0,212,170,0.08) 0%, rgba(99,102,241,0.06) 100%)`,
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
        }}
      >
        {/* subtle grid inside thumbnail */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* icon */}
        <span
          className="relative z-10 transition-transform duration-300 select-none"
          style={{
            fontSize: 56,
            transform: hovered ? 'scale(1.1) translateY(-3px)' : 'scale(1)',
            filter: hovered ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' : 'none',
          }}
        >
          {icon}
        </span>

        {/* external link icon — appears on hover */}
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{
            background: hovered ? 'rgba(0,212,170,0.15)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${hovered ? 'rgba(0,212,170,0.35)' : 'rgba(255,255,255,0.08)'}`,
            opacity: hovered ? 1 : 0.4,
          }}
        >
          <svg
            width="13" height="13" viewBox="0 0 13 13" fill="none"
            style={{ color: hovered ? '#00D4AA' : 'rgba(255,255,255,0.5)' }}
          >
            <path
              d="M2 11L11 2M11 2H5M11 2v6"
              stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* hover shimmer sweep */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)',
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>

      {/* ── content ── */}
      <div className="flex flex-col flex-1 p-5">

        {/* title row */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3
            className="font-black text-[15px] leading-snug transition-colors duration-200"
            style={{
              color: hovered ? '#fff' : 'rgba(255,255,255,0.88)',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            {title}
          </h3>
          <svg
            className="shrink-0 mt-0.5 transition-all duration-200"
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{
              color: hovered ? '#00D4AA' : 'rgba(255,255,255,0.15)',
              transform: hovered ? 'translate(2px,-2px)' : 'none',
            }}
          >
            <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* description */}
        <p
          className="text-[13px] leading-relaxed flex-1 mb-4"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          {desc}
        </p>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2.5 py-0.75 rounded-lg transition-all duration-200"
              style={{
                background: hovered ? 'rgba(0,212,170,0.1)' : 'rgba(255,255,255,0.04)',
                color: hovered ? 'rgba(0,212,170,0.85)' : 'rgba(255,255,255,0.35)',
                border: `1px solid ${hovered ? 'rgba(0,212,170,0.2)' : 'rgba(255,255,255,0.07)'}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

      </div>

      {/* ── bottom accent bar — grows on hover ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 origin-left"
        style={{
          background: 'linear-gradient(90deg, #00D4AA, #00D4AA88)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
    </a>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

export default function Projects() {
  const sectionRef          = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.06 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 max-w-7xl mx-auto"
    >

      {/* ── heading ── */}
      <div
        className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        {/* eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex gap-1">
            {[4, 8, 12].map((w, i) => (
              <span
                key={i}
                className="h-0.75 rounded-full"
                style={{ width: w, background: '#00D4AA', opacity: i === 2 ? 1 : 0.35 }}
              />
            ))}
          </div>
          <span
            className="text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: '#00D4AA' }}
          >
            Projects
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2
            className="font-black tracking-tight leading-none"
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontFamily: 'Syne, sans-serif',
            }}
          >
            <span className="text-white">Featured </span>
            <span className="relative inline-block" style={{ color: '#00D4AA' }}>
              work
              <span
                className="absolute left-0 -bottom-1 h-0.75 w-full rounded-full"
                style={{ background: '#00D4AA', opacity: 0.3 }}
              />
            </span>
          </h2>

          {/* project count badge */}
          <span
            className="shrink-0 text-[13px] font-semibold px-4 py-2 rounded-full self-start sm:self-auto"
            style={{
              background: 'rgba(0,212,170,0.08)',
              color: 'rgba(0,212,170,0.8)',
              border: '1px solid rgba(0,212,170,0.18)',
            }}
          >
            {projects.length} projects
          </span>
        </div>
      </div>

      {/* ── grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            icon={project.icon}
            color={project.color}
            title={project.title}
            desc={project.desc}
            tags={project.tags}
            link={project.link}
            index={i}
          />
        ))}
      </div>

    </section>
  )
}