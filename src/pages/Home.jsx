import useSEO from '../hooks/useSEO'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import OrderModal from '../components/OrderModal'
import SpotifyCustomModal from '../components/SpotifyCustomModal'
import InvoiceModal from '../components/InvoiceModal'
import PricingCard from '../components/PricingCard'
import ReviewCard from '../components/ReviewCard'
import TeamSection from '../components/TeamSection'
import StatsBar from '../components/StatsBar'
import FAQSection from '../components/FAQSection'
import PartnerLogos from '../components/PartnerLogos'
import TopArtists from '../components/TopArtists'
import { SPOTIFY_PACKAGES, REVIEWS } from '../data'

const SERVICES = [
  { icon: '🎵', title: 'Spotify Promotion',    desc: 'Targeted listener campaigns and algorithm-boosting strategies that put your track in front of people who actually engage.', to: '/spotify',    color: '#1DB954', bg: 'rgba(29,185,84,0.14)' },
  { icon: '☁️', title: 'SoundCloud Promotion', desc: 'Build your SoundCloud presence from the ground up — real plays, followers, and reposts from your genre\'s core community.',  to: '/soundcloud', color: '#FF5500', bg: 'rgba(255,85,0,0.14)' },
  { icon: '📊', title: 'Chart Promotion',       desc: 'From regional viral charts to the UK and USA Top 100 — we know how charts move, and we have the network to move yours.',      to: '/chart',      color: '#FF6A00', bg: 'rgba(255,106,0,0.10)' },
  { icon: '🎬', title: 'Dance & TikTok Promo',  desc: 'Real creators on TikTok and Instagram Reels making authentic content around your track — the kind that sparks viral moments.',  to: '/dance',      color: '#4B3F72', bg: 'rgba(75,63,114,0.08)' },
  { icon: '▶️', title: 'YouTube Promotion',     desc: 'Grow your channel with real views, subscribers, and watch-time campaigns designed to trigger the YouTube algorithm in your favour.', to: '/youtube',  color: '#FF0000', bg: 'rgba(255,0,0,0.08)' },
  { icon: '🍎', title: 'Apple Music Promotion', desc: 'Get your tracks onto Apple Music playlists, climb the Shazam chart, and build a loyal listener base on one of the world\'s top platforms.', to: '/apple-music', color: '#FC3C44', bg: 'rgba(252,60,68,0.08)' },
]

const ALL_PLATFORMS = [
  { name: 'Spotify',      color: '#1DB954', icon: '🎵' },
  { name: 'SoundCloud',   color: '#FF5500', icon: '☁️' },
  { name: 'YouTube',      color: '#FF0000', icon: '▶️' },
  { name: 'Apple Music',  color: '#FC3C44', icon: '🍎' },
  { name: 'TikTok',       color: '#010101', icon: '🎶' },
  { name: 'Audiomack',    color: '#F5A623', icon: '🎙️' },
  { name: 'Boomplay',     color: '#FF1F5A', icon: '💿' },
  { name: 'Deezer',       color: '#A238FF', icon: '🎧' },
  { name: 'Tidal',        color: '#1A1A1A', icon: '🌊' },
  { name: 'Amazon Music', color: '#00A8E1', icon: '🔵' },
  { name: 'Pandora',      color: '#005483', icon: '📻' },
  { name: 'iHeartRadio',  color: '#C6002B', icon: '❤️' },
]

const GENRES = ['Afrobeats','R&B','Hip-Hop','Electronic','Pop','Amapiano','Dancehall','Drill','Lo-Fi','House','Soul','Jazz Fusion','Trap','Latin','Alternative','Indie','UK Rap','Techno']

export default function Home() {
  useSEO({ title: 'Echorise Media | #1 Music Promotion Studio — Spotify, SoundCloud, YouTube & More', description: 'Real listeners. Real results. Echorise Media promotes your music on Spotify, SoundCloud, YouTube, Apple Music, TikTok & charts worldwide. 1,400+ artists promoted. 50M+ streams driven.', canonical: 'https://echorisemedia.com/' })
  const [orderOpen, setOrderOpen] = useState(false)
  const [orderPreselect, setOrderPreselect] = useState('')
  const [spotifyOpen, setSpotifyOpen] = useState(false)
  const [invoiceOpen, setInvoiceOpen] = useState(false)

  const openOrder = (pkg) => {
    setOrderPreselect(pkg?.id || '')
    setOrderOpen(true)
  }

  const openSpotify = () => {
    setSpotifyOpen(true)
  }

  const closeOrder = () => setOrderOpen(false)
  const closeSpotify = () => setSpotifyOpen(false)

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 px-6 overflow-hidden bg-hero-pattern" style={{ background: '#FAF7F2' }}>
        <div className="orb w-[600px] h-[600px] -top-60 -right-40 animate-float-slow" style={{ background: '#FF6A00', opacity: 0.06 }} />
        <div className="orb w-[500px] h-[500px] -bottom-40 -left-40 animate-float" style={{ background: '#4B3F72', opacity: 0.05 }} />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-display font-bold tracking-widest uppercase"
                style={{ background: 'rgba(255,106,0,0.08)', border: '1.5px solid rgba(255,106,0,0.2)', color: '#FF6A00' }}>
                ✦ The Music Promotion Studio
              </div>

              <h1 className="font-display font-bold mb-6"
                style={{ fontSize: 'clamp(2.8rem,6vw,5rem)', lineHeight: 1.06, letterSpacing: '-0.03em', color: '#1A1A1A', fontFamily: 'Syne, sans-serif' }}>
                Your Music Deserves<br />
                <span className="grad-text">More Than an Algorithm</span>
              </h1>

              <p className="text-lg max-w-xl mb-10 leading-relaxed" style={{ color: '#6B6B6B' }}>
                We don't just push your track — we architect its rise. Echorise Media connects your music with real listeners, real channels, and real momentum on the platforms that define careers.
              </p>

              <div className="flex gap-4 flex-wrap mb-12">
                <button onClick={() => openOrder()} className="btn-primary animate-pulse-glow text-base px-10 py-4">
                  Order Now →
                </button>
                <Link to="/contact" className="btn-ghost text-base px-10 py-4">Talk to Our Team</Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6">
                {[['✦','#FF6A00','1,400+ Artists Promoted'],['✦','#FF6A00','50M+ Streams Driven'],['✦','#1DB954','18+ Countries Reached'],['✦','#4B3F72','24-Hour Response']].map(([icon,color,label]) => (
                  <div key={label} className="flex items-center gap-2 text-sm font-medium" style={{ color: '#6B6B6B' }}>
                    <span style={{ color }}>{icon}</span> {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image collage */}
            <div className="relative hidden lg:block">
              <div className="relative" style={{ height: 520 }}>
                {/* Main artist image */}
                <div className="absolute right-0 top-0 w-72 h-80 rounded-3xl overflow-hidden shadow-2xl" style={{ border: '4px solid white' }}>
                  <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=700&fit=crop&crop=center" alt="Artist performing" className="w-full h-full object-cover" />
                </div>
                {/* Second image */}
                <div className="absolute left-0 bottom-16 w-52 h-64 rounded-3xl overflow-hidden shadow-xl" style={{ border: '4px solid white' }}>
                  <img src="https://images.unsplash.com/photo-1508973379184-7517410ebc43?w=400&h=500&fit=crop&crop=center" alt="Artist in studio" className="w-full h-full object-cover" />
                </div>
                {/* Third small image */}
                <div className="absolute right-16 bottom-0 w-36 h-36 rounded-2xl overflow-hidden shadow-lg" style={{ border: '4px solid white' }}>
                  <img src="https://images.unsplash.com/photo-1619983081563-430f63602796?w=300&h=300&fit=crop&crop=center" alt="Music studio" className="w-full h-full object-cover" />
                </div>
                {/* Floating stat badge */}
                <div className="absolute left-36 top-12 px-5 py-4 rounded-2xl font-display font-bold text-sm shadow-xl"
                  style={{ background: '#FF6A00', color: 'white', boxShadow: '0 4px 20px rgba(255,106,0,0.30)' }}>
                  <div className="text-2xl font-black">1,400+</div>
                  <div className="text-white/80 text-xs">Artists Amplified</div>
                </div>
                {/* Floating review badge */}
                <div className="absolute right-0 bottom-32 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3"
                  style={{ background: '#FFFFFF', border: '1px solid rgba(26,26,26,0.08)', boxShadow: '0 4px 16px rgba(26,26,26,0.08)' }}>
                  <span className="text-yellow-500 text-lg">★★★★★</span>
                  <div>
                    <div className="font-display font-bold text-sm" style={{ color: '#1A1A1A' }}>Trusted</div>
                    <div className="text-xs" style={{ color: 'rgba(107,107,107,0.90)' }}>by 1,400+ artists</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GENRE TICKER ── */}
      <div className="ticker-wrap py-4">
        <div className="ticker-track">
          {[...GENRES, ...GENRES].map((g, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-4 font-body text-sm font-medium" style={{ color: '#6B6B6B' }}>
              {g} <span style={{ color: '#FF6A00', opacity: 0.8 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section className="py-24 px-6" id="services" style={{ background: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-14">
            <span className="section-label">What We Do</span>
            <h2 className="font-display font-bold text-5xl mb-4" style={{ color: '#1A1A1A', letterSpacing: '-0.02em', fontFamily: 'Syne, sans-serif' }}>Promotion That <span className="grad-text">Actually Works</span></h2>
            <p style={{ color: '#6B6B6B' }}>Every campaign is tailored to your sound, your audience, and your goals. No bots. No shortcuts. No excuses.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(s => (
              <Link key={s.title} to={s.to} className="glass-card p-8 block group">
                <div className="rounded-2xl flex items-center justify-center text-3xl mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: s.bg, width: 56, height: 56, border: `1.5px solid ${s.color}33` }}>
                  {s.icon}
                </div>
                <h3 className="font-display font-bold text-lg mb-3" style={{ color: '#1A1A1A' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B6B6B' }}>{s.desc}</p>
                <span className="text-sm font-display font-bold flex items-center gap-1" style={{ color: s.color }}>
                  Explore <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* All Platforms Banner */}
        <div className="max-w-6xl mx-auto mt-14">
          <div className="rounded-3xl px-8 py-8 text-center" style={{ background: 'linear-gradient(135deg,#1A1A1A 0%,#2D1A0E 100%)', border: '1.5px solid rgba(255,106,0,0.2)' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ background: 'rgba(255,106,0,0.15)', border: '1px solid rgba(255,106,0,0.3)', color: '#FF6A00' }}>
              ✦ All Platforms Covered
            </div>
            <h3 className="font-display font-bold text-2xl mb-2" style={{ color: 'white', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>
              We Promote on <span style={{ color: '#FF6A00' }}>Every Major Platform</span>
            </h3>
            <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
              From the world's biggest streaming giants to the platforms dominating Africa and beyond — your music, everywhere it matters.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {ALL_PLATFORMS.map(p => (
                <div key={p.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${p.color}33`, color: 'rgba(255,255,255,0.85)' }}>
                  <span>{p.icon}</span>
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES PREVIEW ── */}
      <section className="py-24 px-6" id="packages" style={{ background: '#F3EFEA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">Spotify Packages</span>
            <h2 className="font-display font-bold text-5xl mb-4" style={{ color: '#1A1A1A', letterSpacing: '-0.02em', fontFamily: 'Syne, sans-serif' }}>Choose Your <span className="grad-text">Launch Pad</span></h2>
            <p className="max-w-sm mx-auto" style={{ color: '#6B6B6B' }}>Transparent pricing, no hidden fees. Every listener is real, every campaign is handcrafted.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {SPOTIFY_PACKAGES.map(pkg => <PricingCard key={pkg.id} pkg={pkg} onOrder={openOrder} />)}
          </div>
          <div className="text-center">
            <p className="mb-4 text-sm" style={{ color: 'rgba(107,107,107,0.90)' }}>Not seeing exactly what you need?</p>
            <button onClick={openSpotify} className="btn-outline">Request Custom Offer →</button>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="py-6"><StatsBar /></div>

      {/* ── ABOUT SPLIT ── */}
      <section className="py-24 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ height: 460 }}>
              <img
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=800&fit=crop&crop=center"
                alt="Music producer in studio"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 px-5 py-4 rounded-2xl font-display font-bold text-sm shadow-xl"
              style={{ background: '#FF6A00', color: 'white', boxShadow: '0 4px 20px rgba(255,106,0,0.30)' }}>
              <div className="text-2xl font-black">1,400+</div>
              <div className="text-white/80 text-xs">Artists Amplified</div>
            </div>
            {/* Second floating card */}
            <div className="absolute -top-4 -left-4 px-4 py-3 rounded-xl shadow-xl"
              style={{ background: '#FFFFFF', border: '1px solid rgba(26,26,26,0.08)', boxShadow: '0 4px 16px rgba(26,26,26,0.08)' }}>
              <div className="flex items-center gap-2">
                <span style={{ color: '#1DB954', fontSize: 20 }}>♫</span>
                <div>
                  <div className="font-display font-bold text-xs" style={{ color: '#1A1A1A' }}>50M+ Streams</div>
                  <div className="text-xs" style={{ color: 'rgba(107,107,107,0.90)' }}>delivered globally</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span className="section-label">About Echorise</span>
            <h2 className="font-display font-bold text-4xl mb-5 leading-tight" style={{ color: '#1A1A1A', letterSpacing: '-0.02em', fontFamily: 'Syne, sans-serif' }}>
              Built by Music Lovers,<br />
              <span className="grad-text">For Music Makers</span>
            </h2>
            <p className="mb-5 leading-relaxed" style={{ color: '#6B6B6B' }}>
              Echorise Media was built because real artists deserve real results. We understand the struggle of getting your sound heard in a saturated world — so we built a system that actually works.
            </p>
            <p className="mb-8 leading-relaxed" style={{ color: '#6B6B6B' }}>
              We connect your music directly to real, engaged audiences who genuinely love your genre — across the world's biggest streaming platforms.
            </p>
            <div className="flex flex-col gap-3">
              {[
                ['100% real listeners — no bots, no fake streams',          '#1DB954'],
                ['Genre-targeted campaigns reaching the right audience',    '#FF6A00'],
                ['Campaigns live within 48 hours of payment',              '#4B3F72'],
                ['Full analytics report delivered at campaign end',         '#FF6A00'],
              ].map(([text, color]) => (
                <div key={text} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(26,26,26,0.65)' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold"
                    style={{ background: color + '18', border: `1.5px solid ${color}40`, color }}>✓</span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CUSTOM SPOTIFY SECTION ── */}
      <section className="py-24 px-6" id="spotify-custom" style={{ background: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label" style={{ color: '#1DB954' }}>Custom Spotify Campaigns</span>
            <h2 className="font-display font-bold text-5xl mb-4" style={{ color: '#1A1A1A', letterSpacing: '-0.02em', fontFamily: 'Syne, sans-serif' }}>Your Sound. <span className="grad-text-spotify">Our Strategy.</span></h2>
            <p className="mb-8" style={{ color: '#6B6B6B' }}>Not every artist fits a template. If you have a specific budget, target chart position, or niche audience in mind, our Spotify specialists will build a campaign around your exact goals.</p>
            <ul className="flex flex-col gap-3 mb-8">
              {['Bespoke promotion strategy for your genre','Target specific countries and listener demographics','Chart position targeting in selected markets','Custom proposal delivered within 24 hours'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: '#6B6B6B' }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                    style={{ background: 'rgba(29,185,84,0.12)', border: '1.5px solid rgba(29,185,84,0.3)', color: '#1DB954' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <button onClick={openSpotify} className="btn-spotify">
              Request Custom Spotify Campaign →
            </button>
          </div>
          <div className="glass-card p-8" style={{ borderColor: 'rgba(29,185,84,0.2)' }}>
            <div className="rounded-2xl overflow-hidden mb-6" style={{ height: 200 }}>
              <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=300&fit=crop&crop=center" alt="Music production" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg"
                style={{ background: 'linear-gradient(135deg,#1DB954,#00a846)' }}>♫</div>
              <div>
                <div className="font-display font-bold" style={{ color: '#1A1A1A' }}>Custom Spotify Package</div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(26,26,26,0.28)' }}>Tailored to your track & goals</div>
              </div>
            </div>
            {[['Listener targeting','Custom'],['Chart position','Included'],['Budget range','$50 – $1,000+'],['Proposal turnaround','24 hours']].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5 text-sm" style={{ borderBottom: '1px solid rgba(26,26,26,0.08)' }}>
                <span style={{ color: 'rgba(107,107,107,0.90)' }}>{k}</span>
                <span style={v === 'Custom' || v === 'Included' ? { color: '#1DB954', fontWeight: 700 } : { color: '#1A1A1A', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div className="mt-5 p-3 rounded-xl text-xs italic" style={{ background: 'rgba(29,185,84,0.08)', border: '1px solid rgba(29,185,84,0.2)', color: '#6B6B6B' }}>
              💬 "We'll build a campaign that fits your budget, sound, and ambitions — not the other way around."
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER LOGOS ── */}
      <PartnerLogos />

      {/* ── TOP ARTISTS ── */}
      <TopArtists onOrder={openOrder} />

      {/* ── TEAM ── */}
      <TeamSection />

      {/* ── REVIEWS ── */}
      <section className="py-24 px-6" id="reviews" style={{ background: '#F3EFEA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">Artist Reviews</span>
            <h2 className="font-display font-bold text-5xl mb-4" style={{ color: '#1A1A1A', letterSpacing: '-0.02em', fontFamily: 'Syne, sans-serif' }}>Artists We've <span className="grad-text">Amplified</span></h2>
            <p className="max-w-md mx-auto" style={{ color: '#6B6B6B' }}>Over 1,400 artists have trusted Echorise Media with their music. Here's what some of them had to say.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map(r => <ReviewCard key={r.name} review={r} />)}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── CTA ── */}
      <section className="py-24 px-6 relative overflow-hidden text-center" style={{ background: 'linear-gradient(135deg, #FF6A00 0%, #E85F00 100%)' }}>
        <div className="orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: '#FFFFFF', opacity: 0.08 }} />
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.20)', color: 'white' }}>Ready When You Are</span>
          <h2 className="font-display font-bold text-5xl mb-5 text-white" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>Ready to <em>Rise?</em></h2>
          <p className="mb-8 text-lg" style={{ color: 'rgba(255,255,255,0.80)' }}>Let's build a campaign around your sound, your audience, and your goals. The conversation is free — the results are not.</p>
          <button onClick={() => openOrder()} className="text-base px-12 py-4 rounded-full font-bold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{ background: '#FFFFFF', color: '#FF6A00', fontWeight: 700 }}>
            Get Your Custom Offer →
          </button>
          <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.60)' }}>No commitment. Response within 24 hours. We respond to every inquiry.</p>
        </div>
      </section>

      <OrderModal isOpen={orderOpen} onClose={closeOrder} preselect={orderPreselect} />
      <SpotifyCustomModal isOpen={spotifyOpen} onClose={closeSpotify} />
      <InvoiceModal open={invoiceOpen} onClose={() => setInvoiceOpen(false)} />
    </>
  )
}
