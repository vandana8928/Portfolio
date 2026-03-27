import { useEffect, useRef, useState } from 'react'
import { personal } from '../data'

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL LINK DATA
// ─────────────────────────────────────────────────────────────────────────────

const CONTACT_LINKS = [
  {
    label: 'Email',
    sublabel: personal.email,
    href: `mailto:${personal.email}`,
    color: '#FB923C',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    sublabel: 'Connect with me',
    href: personal.linkedin,
    color: '#60A5FA',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    sublabel: 'See my work',
    href: personal.github,
    color: '#A78BFA',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  
]

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT LINK CARD
// ─────────────────────────────────────────────────────────────────────────────

function LinkCard({ item, index }) {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300 + index * 80)
    return () => clearTimeout(t)
  }, [index])

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{
        background: hovered ? `${item.color}0e` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? item.color + '35' : 'rgba(255,255,255,0.07)'}`,
        transform: hovered ? 'translateY(-2px)' : visible ? 'translateY(0)' : 'translateY(16px)',
        transitionProperty: 'all',
        transitionDuration: '300ms',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* icon circle */}
      <div
        className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          background: hovered ? item.color + '22' : item.color + '10',
          color: hovered ? item.color : item.color + 'aa',
          border: `1px solid ${item.color}${hovered ? '40' : '18'}`,
        }}
      >
        {item.icon}
      </div>

      {/* text */}
      <div className="flex-1 min-w-0">
        <div
          className="font-semibold text-[14px] leading-tight transition-colors duration-200"
          style={{ color: hovered ? '#fff' : 'rgba(255,255,255,0.8)' }}
        >
          {item.label}
        </div>
        <div
          className="text-[11.5px] mt-0.5 truncate transition-colors duration-200"
          style={{ color: hovered ? item.color + 'cc' : 'rgba(255,255,255,0.3)' }}
        >
          {item.sublabel}
        </div>
      </div>

      {/* arrow */}
      <svg
        width="16" height="16" viewBox="0 0 16 16" fill="none"
        className="shrink-0 transition-all duration-300"
        style={{
          color: hovered ? item.color : 'rgba(255,255,255,0.15)',
          transform: hovered ? 'translate(2px, -2px)' : 'none',
        }}
      >
        <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN CONTACT SECTION
// ─────────────────────────────────────────────────────────────────────────────

export default function Contacts() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-10 px-4 sm:px-6 max-w-7xl mx-auto"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — heading + description */}
          <div>
            {/* eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex gap-1">
                {[4, 8, 12].map(w => (
                  <span key={w} className="h-0.75 rounded-full" style={{ width: w, background: '#00D4AA', opacity: w === 12 ? 1 : 0.35 }} />
                ))}
              </div>
              <span
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: '#00D4AA' }}
              >
                Contact
              </span>
            </div>

            {/* heading */}
            <h2
              className={`font-black tracking-tight leading-[1.05] mb-5 transition-all duration-700
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{
                fontSize: 'clamp(36px, 6vw, 56px)',
                fontFamily: 'Syne, sans-serif',
              }}
            >
              <span className="text-white">Let's </span>
              <span
                className="relative inline-block"
                style={{ color: '#00D4AA' }}
              >
                work
                <span
                  className="absolute left-0 -bottom-1 h-0.75 w-full rounded-full"
                  style={{ background: '#00D4AA', opacity: 0.3 }}
                />
              </span>
              <br />
              <span className="text-white">together.</span>
            </h2>

            {/* body */}
            <p
              className={`text-[15px] leading-relaxed mb-8 transition-all duration-700 delay-100
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ color: 'rgba(255,255,255,0.42)', maxWidth: 380 }}
            >
              Have a project in mind? I'm currently open to freelance and
              full-time opportunities. Let's build something great.
            </p>

            {/* availability pill */}
            <div
              className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-700 delay-200
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{
                background: 'rgba(0,212,170,0.08)',
                border: '1px solid rgba(0,212,170,0.22)',
              }}
            >
              {/* pulse dot */}
              <span className="relative flex w-2 h-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: '#00D4AA' }}
                />
                <span
                  className="relative inline-flex rounded-full w-2 h-2"
                  style={{ background: '#00D4AA' }}
                />
              </span>
              <span className="text-[12px] font-semibold" style={{ color: '#00D4AA' }}>
                Available for work
              </span>
            </div>
          </div>

          {/* RIGHT — link cards */}
          <div
            className={`flex flex-col gap-3 transition-all duration-700 delay-150
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {CONTACT_LINKS.map((item, i) => (
              <LinkCard key={item.label} item={item} index={i} />
            ))}
          </div>

        </div>

        {/* ── bottom divider + footer note ── */}
        
      </div>
    </section>
  )
}