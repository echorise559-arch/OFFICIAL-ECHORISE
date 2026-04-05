import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import OrderModal from './OrderModal'
import InvoiceModal from './InvoiceModal'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/spotify', label: 'Spotify' },
  { to: '/soundcloud', label: 'SoundCloud' },
  { to: '/chart', label: 'Chart Promo' },
  { to: '/dance', label: 'Dance Video' },
  { to: '/youtube', label: 'YouTube' },
  { to: '/apple-music', label: 'Apple Music' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [invoiceOpen, setInvoiceOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
        style={{ background: scrolled ? 'rgba(250,247,242,0.97)' : 'transparent', backdropFilter: scrolled ? 'blur(24px)' : 'none', borderBottom: scrolled ? '1px solid rgba(26,26,26,0.08)' : 'none' }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-0.04em', color: '#1A1A1A', lineHeight: 1 }}>echorise</span><span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.35rem', color: '#FF6A00', lineHeight: 1 }}>.</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <li key={l.to}>
                <Link to={l.to}
                  className={`font-display text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 ${pathname === l.to ? 'font-semibold' : 'hover:bg-black/05'}`}
                  style={{ color: pathname === l.to ? '#1A1A1A' : '#6B6B6B' }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setInvoiceOpen(true)}
              className="text-sm py-2.5 px-5 rounded-xl font-display font-semibold transition-all hover:scale-105"
              style={{ background: 'rgba(255,106,0,0.08)', border: '1.5px solid rgba(255,106,0,0.25)', color: '#FF6A00', cursor: 'pointer' }}
            >
              📧 Invoice
            </button>
            <button onClick={() => setOrderOpen(true)} className="btn-primary text-sm py-2.5 px-6">
              Order Now
            </button>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(v => !v)} className="lg:hidden flex flex-col gap-1.5 p-2">
            <span className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-screen' : 'max-h-0'}`}
          style={{ borderTop: menuOpen ? '1px solid rgba(26,26,26,0.08)' : 'none', background: '#FAF7F2' }}>
          <div className="px-6 py-4 flex flex-col gap-2">
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to}
                className={`font-display text-sm font-medium px-4 py-2.5 rounded-xl transition-colors ${pathname === l.to ? 'font-semibold' : ''}`}
                style={{ color: pathname === l.to ? '#1A1A1A' : '#6B6B6B' }}>
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setInvoiceOpen(true) }}
              className="mt-2 py-3 rounded-2xl font-display font-semibold text-sm transition-all"
              style={{ background: 'rgba(255,106,0,0.08)', border: '1.5px solid rgba(255,106,0,0.25)', color: '#FF6A00', cursor: 'pointer' }}
            >
              📧 Send Invoice
            </button>
            <button onClick={() => { setMenuOpen(false); setOrderOpen(true) }} className="btn-primary mt-1 justify-center">
              Order Now
            </button>
          </div>
        </div>
      </nav>

      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
      <InvoiceModal open={invoiceOpen} onClose={() => setInvoiceOpen(false)} />
    </>
  )
}
