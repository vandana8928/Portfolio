import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: 'About',      num: '01' },
  { label: 'Skills',     num: '02' },
  { label: 'Experience', num: '03' },
  { label: 'Projects',   num: '04' },
  { label: 'Contact',    num: '05' },
]

function BottomSheet({ open, onNavigate, onClose }) {
  const sheetRef    = useRef(null)
  const startYRef   = useRef(null)
  const currentYRef = useRef(0)
  const [dragging, setDragging]   = useState(false)
  const [dragDelta, setDragDelta] = useState(0)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) setDragDelta(0)
  }, [open])

  function onTouchStart(e) {
    startYRef.current   = e.touches[0].clientY
    currentYRef.current = 0
    setDragging(true)
  }

  function onTouchMove(e) {
    const delta = e.touches[0].clientY - startYRef.current
    if (delta < 0) return
    currentYRef.current = delta
    setDragDelta(delta)
  }

  function onTouchEnd() {
    setDragging(false)
    if (currentYRef.current > 100) {
      onClose()
    } else {
      setDragDelta(0)
    }
  }

  if (!open && dragDelta === 0) return null

  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 z-40 md:hidden"
        style={{
          background: 'rgba(0,0,0,0.55)',
          opacity: open ? 1 : 0,
          transition: dragging ? 'none' : 'opacity 0.35s ease',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      {/* sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        style={{
          transform: open ? `translateY(${dragDelta}px)` : 'translateY(100%)',
          transition: dragging ? 'none' : 'transform 0.4s cubic-bezier(0.32,0.72,0,1)',
          borderRadius: '24px 24px 0 0',
          background: '#13131F',
          border: '1px solid rgba(255,255,255,0.09)',
          borderBottom: 'none',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div
            className="rounded-full"
            style={{ width: 36, height: 4, background: 'rgba(255,255,255,0.18)' }}
          />
        </div>

        {/* sheet header */}
        <div className="flex items-center justify-between px-6 pt-2 pb-4">
          <span
            className="font-extrabold text-lg tracking-tight"
            style={{ color: '#00D4AA', fontFamily: 'Syne, sans-serif' }}
          >
            Vandana.
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
            aria-label="Close menu"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0 24px' }} />

        {/* nav links */}
        <div className="px-4 pt-3 pb-5">
          {NAV_LINKS.map(({ label, num }) => (
            <button
              key={label}
              onClick={() => onNavigate(label)}
              className="group w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 hover:bg-white/[0.05] active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <span
                  className="font-mono text-[11px] font-bold w-6 text-left"
                  style={{ color: '#00D4AA', opacity: 0.7 }}
                >
                  {num}
                </span>
                <span
                  className="text-[17px] font-semibold transition-colors duration-200 group-hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.72)' }}
                >
                  {label}
                </span>
              </div>
              <svg
                className="transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60"
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                style={{ opacity: 0.2 }}
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

function HamburgerBtn({ open, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 focus:outline-none"
      style={{
        background: open ? 'rgba(0,212,170,0.1)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${open ? 'rgba(0,212,170,0.3)' : 'rgba(255,255,255,0.09)'}`,
      }}
    >
      <div className="flex flex-col gap-1.25 items-end">
        <span
          className="block h-[1.5px] rounded-full transition-all duration-300"
          style={{
            width: 18,
            background: open ? '#00D4AA' : 'rgba(255,255,255,0.85)',
            transform: open ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
          }}
        />
        <span
          className="block h-[1.5px] rounded-full transition-all duration-300"
          style={{
            width: open ? 0 : 13,
            background: 'rgba(255,255,255,0.85)',
            opacity: open ? 0 : 1,
          }}
        />
        <span
          className="block h-[1.5px] rounded-full transition-all duration-300"
          style={{
            width: 18,
            background: open ? '#00D4AA' : 'rgba(255,255,255,0.85)',
            transform: open ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
          }}
        />
      </div>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function scrollToSection(label) {
    const el = document.getElementById(label.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,15,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">

          {/* logo */}
          <span
            className="font-extrabold text-xl tracking-tight select-none"
            style={{ color: '#00D4AA', fontFamily: 'Syne, sans-serif' }}
          >
            Vandana.
          </span>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label }) => (
              <button
                key={label}
                onClick={() => scrollToSection(label)}
                className="relative text-sm font-medium text-[#888899] hover:text-white transition-colors duration-200 group"
              >
                {label}
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                  style={{ background: '#00D4AA' }}
                />
              </button>
            ))}
          </div>

          {/* mobile hamburger */}
          <HamburgerBtn open={menuOpen} onClick={() => setMenuOpen(o => !o)} />

        </div>
      </nav>

      <BottomSheet
        open={menuOpen}
        onNavigate={scrollToSection}
        onClose={() => setMenuOpen(false)}
      />
    </>
  )
}