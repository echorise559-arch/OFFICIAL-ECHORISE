import { Link } from 'react-router-dom'

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.843L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const IGIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)
const TKIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.72a4.85 4.85 0 0 1-1.01-.03z"/>
  </svg>
)

const SOCIALS = [
  { Icon: XIcon, color: '#ffffff', href: '#' },
  { Icon: IGIcon, color: '#E1306C', href: '#' },
  { Icon: TKIcon, color: '#ffffff', href: '#' },
]

const ALL_PLATFORMS = [
  'Spotify', 'SoundCloud', 'YouTube', 'Apple Music',
  'TikTok', 'Audiomack', 'Boomplay', 'Deezer',
  'Tidal', 'Amazon Music', 'Pandora', 'iHeartRadio',
]

export default function Footer() {
  return (
    <footer style={{ background: '#1A1A1A', borderTop: '3px solid #FF6A00' }} className="mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="font-display font-bold text-2xl mb-3" style={{ color: 'white', letterSpacing: '-0.02em', fontWeight: 800 }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, letterSpacing: '-0.04em' }}>echorise</span><span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#FF6A00' }}>.</span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>We amplify artists on the platforms that matter most. Real strategy. Real reach. Real results.</p>
            <div className="flex gap-2.5">
              {SOCIALS.map(({ Icon, color, href }) => (
                <a key={color} href={href}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${color}22`; e.currentTarget.style.borderColor = `${color}55` }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm" style={{ color: 'rgba(255,255,255,0.90)' }}>Services</h4>
            <div className="flex flex-col gap-2.5">
              {[['Spotify Promotion', '/spotify', '#1DB954'], ['SoundCloud Promotion', '/soundcloud', '#FF5500'], ['Chart Promotion', '/chart', '#FF6A00'], ['Dance & Video Promo', '/dance', '#FF6A00'], ['YouTube Promotion', '/youtube', '#FF0000'], ['Apple Music Promotion', '/apple-music', '#FC3C44']].map(([l, to, color]) => (
                <Link key={to} to={to} className="text-sm transition-colors flex items-center gap-2 group" style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.90)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                  <span className="w-1 h-1 rounded-full transition-all duration-200 group-hover:w-2" style={{ background: color }} />
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm" style={{ color: 'rgba(255,255,255,0.90)' }}>Company</h4>
            <div className="flex flex-col gap-2.5">
              {[['Our Team', '/#team'], ['Reviews', '/#reviews'], ['Contact', '/contact']].map(([l, to]) => (
                <Link key={to} to={to} className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.90)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>{l}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm" style={{ color: 'rgba(255,255,255,0.90)' }}>Contact</h4>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:support@echorisemedia.com" className="text-sm transition-colors" style={{ color: '#FF8C3A' }}>support@echorisemedia.com</a>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Response within 24 hours</span>
              <span className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Mon – Fri, 9am – 6pm GMT</span>
            </div>
          </div>
        </div>

        {/* All Platforms Row */}
        <div className="py-8 mb-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4 text-center" style={{ color: 'rgba(255,106,0,0.8)' }}>✦ All Music Platforms Promoted</p>
          <div className="flex flex-wrap justify-center gap-2">
            {ALL_PLATFORMS.map(p => (
              <span key={p}
                className="text-xs px-3 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>© 2025 Echorise Media. All rights reserved.</span>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Built for artists who refuse to go unheard.</span>
        </div>
      </div>
    </footer>
  )
}
