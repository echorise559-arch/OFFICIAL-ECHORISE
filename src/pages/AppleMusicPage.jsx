import useSEO from '../hooks/useSEO'
import { useState } from 'react'
import PageHero from '../components/PageHero'
import OrderModal from '../components/OrderModal'
import SpotifyCustomModal from '../components/SpotifyCustomModal'
import FAQSection from '../components/FAQSection'

const FEATURES = [
  { icon: '🍎', title: 'Apple Music Streams', desc: 'Drive real streams from genuine Apple Music listeners in your target markets and genres.' },
  { icon: '📋', title: 'Playlist Pitching', desc: 'We pitch your track to Apple Music curators for editorial playlist consideration.' },
  { icon: '📊', title: 'Shazam Chart Push', desc: 'Strategic placements that boost your Shazam chart position and discovery rate.' },
  { icon: '🌍', title: 'Geographic Targeting', desc: 'Target listeners in specific countries where your sound resonates most strongly.' },
  { icon: '🔔', title: 'New Artist Spotlight', desc: 'Eligible artists get pitched to Apple\'s New Artist Spotlight editorial team.' },
  { icon: '📈', title: 'Analytics Report', desc: 'Full Apple Music for Artists report showing stream growth, listener territories, and more.' },
]

const HOW_IT_WORKS = [
  ['01', 'Submit Your Track', 'Share your Apple Music link and tell us your campaign goals and target markets.'],
  ['02', 'Campaign Strategy', 'We plan playlist pitching, stream campaigns, and Shazam targeting around your track.'],
  ['03', 'Campaign Launch', 'We begin promotion across Apple Music channels and editorial networks.'],
  ['04', 'Report & Grow', 'Receive a detailed report and watch your Apple Music for Artists stats grow.'],
]

export default function AppleMusicPage() {
  useSEO({ title: 'Apple Music Promotion | Echorise Media — Playlist Placement & Chart Growth', description: 'Get your music on Apple Music playlists, climb the Shazam chart and build a loyal listener base. Professional Apple Music promotion by Echorise Media.', canonical: 'https://echorisemedia.com/apple-music' })
  const [orderOpen, setOrderOpen] = useState(false)
  const [customOpen, setCustomOpen] = useState(false)

  return (
    <>
      <PageHero
        label="Apple Music Promotion"
        title={<>Grow on<br /><span style={{ background: 'linear-gradient(135deg,#FC3C44,#fa233b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Apple Music</span></>}
        subtitle="Real streams, playlist pitching, Shazam chart pushes, and Apple Music editorial targeting. Built for artists serious about the Apple ecosystem."
        accent="#FC3C44"
        image="https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=900&h=700&fit=crop&crop=center"
      >
        <div className="flex gap-4 flex-wrap">
          <button onClick={() => { setCustomOpen(true) }} className="btn-primary" style={{ background: 'linear-gradient(135deg,#FC3C44,#fa233b)' }}>Start a Campaign →</button>
          <button onClick={() => { setOrderOpen(true) }} className="btn-ghost">Order Now</button>
        </div>
      </PageHero>

      {/* How it works */}
      <section className="py-20 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label" style={{ color: '#FC3C44' }}>How It Works</span>
            <h2 className="font-display font-bold text-3xl mb-3" style={{ color: '#1A1A1A', letterSpacing: '-0.02em' }}>Simple Process. <span className="grad-text">Real Results.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(([num, title, desc]) => (
              <div key={num} className="glass-card p-6">
                <div className="font-display font-black text-5xl mb-3 grad-text" style={{ opacity: 0.25 }}>{num}</div>
                <h3 className="font-display font-bold mb-2" style={{ color: '#1A1A1A' }}>{title}</h3>
                <p className="text-sm" style={{ color: '#6B6B6B' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6" style={{ background: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <span className="section-label" style={{ color: '#FC3C44' }}>What's Included</span>
            <h2 className="font-display font-bold text-3xl mb-3" style={{ color: '#1A1A1A', letterSpacing: '-0.02em' }}>Everything to <span className="grad-text">Break Through</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="glass-card p-7">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-display font-bold mb-2" style={{ color: '#1A1A1A' }}>{f.title}</h3>
                <p className="text-sm" style={{ color: '#6B6B6B' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Pricing CTA */}
      <section className="py-20 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="section-label" style={{ color: '#FC3C44' }}>Pricing</span>
          <h2 className="font-display font-bold text-3xl mb-4" style={{ color: '#1A1A1A', letterSpacing: '-0.02em' }}>Custom <span className="grad-text">Apple Music Packages</span></h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">Apple Music campaigns are tailored to your goals — from $50 to $10,000. Tell us what you need and we'll craft the perfect strategy.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { range: '$50 – $200', label: 'Starter', desc: 'Build stream counts and Shazam chart presence for emerging artists.' },
              { range: '$200 – $1,000', label: 'Growth', desc: 'Playlist pitching + stream campaign to push into editorial consideration.' },
              { range: '$1,000 – $10,000', label: 'Premium', desc: 'Full editorial pitch, multi-market push, Shazam chart targeting and more.' },
            ].map(tier => (
              <div key={tier.label} className="glass-card p-6 text-left">
                <div className="font-display font-black text-2xl mb-1" style={{ color: '#FC3C44' }}>{tier.range}</div>
                <div className="font-display font-bold text-sm mb-2" style={{ color: '#1A1A1A' }}>{tier.label}</div>
                <p className="text-sm" style={{ color: '#6B6B6B' }}>{tier.desc}</p>
              </div>
            ))}
          </div>

          <button onClick={() => { setCustomOpen(true) }} className="btn-primary text-base px-10 py-4" style={{ background: 'linear-gradient(135deg,#FC3C44,#fa233b)' }}>
            Build Your Custom Campaign →
          </button>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="py-8 px-6" style={{ background: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative h-64">
          <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&h=500&fit=crop&crop=center" alt="Apple Music" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-8" style={{ background: 'linear-gradient(135deg,rgba(252,60,68,0.88),rgba(200,30,40,0.85))' }}>
            <h3 className="font-display font-bold text-3xl text-white mb-3" style={{ letterSpacing: '-0.02em' }}>Ready to grow on Apple Music?</h3>
            <p className="text-white/80 mb-6 max-w-md">Join 1,400+ artists who've amplified their music with Echorise.</p>
            <button onClick={() => { setCustomOpen(true) }} className="px-8 py-3.5 rounded-full font-display font-bold text-sm cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg" style={{ background: '#FC3C44', color: '#fff' }}>
              Get Started →
            </button>
          </div>
        </div>
      </section>

      <FAQSection />

      <OrderModal isOpen={orderOpen} onClose={() => { setOrderOpen(false) }} />
      <SpotifyCustomModal isOpen={customOpen} onClose={() => { setCustomOpen(false) }} />
    </>
  )
}
