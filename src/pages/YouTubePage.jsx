import useSEO from '../hooks/useSEO'
import { useState } from 'react'
import PageHero from '../components/PageHero'
import OrderModal from '../components/OrderModal'
import SpotifyCustomModal from '../components/SpotifyCustomModal'
import FAQSection from '../components/FAQSection'

const FEATURES = [
  { icon: '▶️', title: 'Real YouTube Views', desc: 'Drive genuine views from real YouTube users — boosting watch time, engagement, and channel authority.' },
  { icon: '📈', title: 'Subscriber Growth', desc: 'Grow your subscriber base with targeted campaigns reaching fans who love your music genre.' },
  { icon: '🎯', title: 'Audience Targeting', desc: 'Target viewers by genre, region, age, and listening habits for maximum engagement rates.' },
  { icon: '🔔', title: 'Algorithm Signals', desc: 'Strategic watch patterns that signal strong content quality to the YouTube algorithm.' },
  { icon: '📊', title: 'Analytics Report', desc: 'Detailed campaign report showing view growth, retention rates, and channel improvements.' },
  { icon: '🔒', title: 'ToS Compliant', desc: 'Fully compliant with YouTube\'s guidelines. No bots, no click farms — only real engagement.' },
]

const HOW_IT_WORKS = [
  ['01', 'Submit Your Video', 'Share your YouTube link and tell us your goals — more views, subscribers, or both.'],
  ['02', 'Campaign Strategy', 'We map out the best targeting approach based on your genre, region, and audience.'],
  ['03', 'Campaign Launch', 'We start driving real viewers to your video with strategic promotion.'],
  ['04', 'Growth & Report', 'Watch your channel stats grow and receive a full analytics report at campaign end.'],
]

export default function YouTubePage() {
  useSEO({ title: 'YouTube Music Promotion | Echorise Media — Real Views & Subscribers', description: 'Grow your YouTube channel with real views, subscribers and watch-time campaigns. Echorise Media triggers the YouTube algorithm to work in your favour. Results guaranteed.', canonical: 'https://echorisemedia.com/youtube' })
  const [orderOpen, setOrderOpen] = useState(false)
  const [customOpen, setCustomOpen] = useState(false)

  return (
    <>
      <PageHero
        label="YouTube Promotion"
        title={<>Grow Your YouTube<br /><span style={{ background: 'linear-gradient(135deg,#FF0000,#cc0000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Channel</span></>}
        subtitle="Real views, real subscribers, and algorithm-boosting strategies. No bots. No risk. Just genuine growth that builds your YouTube presence."
        accent="#FF0000"
        image="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&h=700&fit=crop&crop=center"
      >
        <div className="flex gap-4 flex-wrap">
          <button onClick={() => { setCustomOpen(true) }} className="btn-primary" style={{ background: 'linear-gradient(135deg,#FF0000,#cc0000)' }}>Start a Campaign →</button>
          <button onClick={() => { setOrderOpen(true) }} className="btn-ghost">Order Now</button>
        </div>
      </PageHero>

      {/* How it works */}
      <section className="py-20 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label" style={{ color: '#FF0000' }}>How It Works</span>
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
            <span className="section-label" style={{ color: '#FF0000' }}>What's Included</span>
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
          <span className="section-label" style={{ color: '#FF0000' }}>Pricing</span>
          <h2 className="font-display font-bold text-3xl mb-4" style={{ color: '#1A1A1A', letterSpacing: '-0.02em' }}>Custom <span className="grad-text">YouTube Packages</span></h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">YouTube campaigns are tailored to your goals and budget — from $50 to $10,000. Tell us what you need and we'll build the right strategy.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { range: '$50 – $200', label: 'Starter', desc: 'Great for new artists. Build initial view counts and channel credibility.' },
              { range: '$200 – $1,000', label: 'Growth', desc: 'Drive significant views, growing watch time and subscriber velocity.' },
              { range: '$1,000 – $10,000', label: 'Premium', desc: 'Full viral push strategy with multi-channel promotion and priority support.' },
            ].map(tier => (
              <div key={tier.label} className="glass-card p-6 text-left">
                <div className="font-display font-black text-2xl mb-1" style={{ color: '#FF0000' }}>{tier.range}</div>
                <div className="font-display font-bold text-sm mb-2" style={{ color: '#1A1A1A' }}>{tier.label}</div>
                <p className="text-sm" style={{ color: '#6B6B6B' }}>{tier.desc}</p>
              </div>
            ))}
          </div>

          <button onClick={() => { setCustomOpen(true) }} className="btn-primary text-base px-10 py-4" style={{ background: 'linear-gradient(135deg,#FF0000,#cc0000)' }}>
            Build Your Custom Campaign →
          </button>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="py-8 px-6" style={{ background: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative h-64">
          <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=500&fit=crop&crop=center" alt="YouTube studio" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-8" style={{ background: 'linear-gradient(135deg,rgba(255,0,0,0.85),rgba(180,0,0,0.8))' }}>
            <h3 className="font-display font-bold text-3xl text-white mb-3" style={{ letterSpacing: '-0.02em' }}>Ready to grow your YouTube?</h3>
            <p className="text-white/80 mb-6 max-w-md">Join thousands of artists who've amplified their music with Echorise.</p>
            <button onClick={() => { setCustomOpen(true) }} className="px-8 py-3.5 rounded-full font-display font-bold text-sm cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg" style={{ background: '#FF0000', color: '#fff' }}>
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
