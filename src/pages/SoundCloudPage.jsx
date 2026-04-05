import useSEO from '../hooks/useSEO'
import { useState } from 'react'
import PageHero from '../components/PageHero'
import PricingCard from '../components/PricingCard'
import OrderModal from '../components/OrderModal'
import SpotifyCustomModal from '../components/SpotifyCustomModal'
import { SOUNDCLOUD_PACKAGES } from '../data'

export default function SoundCloudPage() {
  useSEO({ title: 'SoundCloud Promotion | Echorise Media — Real Plays & Followers', description: 'Grow your SoundCloud with real plays, followers and reposts from genre-matched communities. Affordable SoundCloud promotion from $50. No bots, no fake accounts.', canonical: 'https://echorisemedia.com/soundcloud' })
  const [orderOpen, setOrderOpen] = useState(false)
  const [orderPkg, setOrderPkg] = useState('')
  const [customOpen, setCustomOpen] = useState(false)
  const openOrder = (pkg) => { setOrderPkg(pkg?.id || ''); setOrderOpen(true) }

  return (
    <>
      <PageHero
        label="SoundCloud Promotion"
        title={<>Build Your SoundCloud<br /><span style={{ background: 'linear-gradient(135deg,#FF5500,#FF8800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Presence</span></>}
        subtitle="We drive plays, followers, and reposts from engaged listeners in your genre's core community. Real growth. Real community."
        accent="#FF5500"
        image="https://images.unsplash.com/photo-1540039155733-5bb30b4f5d54?w=900&h=700&fit=crop&crop=center"
      >
        <button onClick={() => openOrder()} className="btn-primary" style={{ background: 'linear-gradient(135deg,#FF5500,#cc4400)' }}>Start Campaign →</button>
      </PageHero>

      <section className="py-20 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {[['🎵','Real Plays & Reposts','Every play and repost comes from genuine SoundCloud users. No fake accounts, no bots.'],['👥','Follower Growth','Build a loyal SoundCloud following that actually listens and engages with your content.'],['🎯','Community Targeting','We place your music in front of the SoundCloud community that already loves your genre.']].map(([icon,title,desc]) => (
              <div key={title} className="glass-card p-7">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-display font-bold mb-2" style={{ color: '#1A1A1A' }}>{title}</h3>
                <p className="text-sm" style={{ color: '#6B6B6B' }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-14">
            <span className="section-label">Packages</span>
            <h2 className="font-display font-bold text-3xl mb-3" style={{ color: '#1A1A1A', letterSpacing: '-0.02em' }}>SoundCloud <span className="grad-text">Promotion Plans</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SOUNDCLOUD_PACKAGES.map(pkg => <PricingCard key={pkg.id} pkg={pkg} onOrder={openOrder} />)}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => { setCustomOpen(true) }} className="btn-outline">Request Custom Offer →</button>
          </div>
        </div>
      </section>

      <section className="py-8 px-6" style={{ background: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative h-64">
          <img src="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=1200&h=500&fit=crop&crop=center" alt="Music production" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg,rgba(255,85,0,0.85),rgba(204,68,0,0.8))' }}>
            <div className="text-center">
              <h3 className="font-display font-bold text-2xl text-white mb-4" style={{ letterSpacing: '-0.02em' }}>Ready to dominate SoundCloud?</h3>
              <button onClick={() => openOrder()} className="px-8 py-3.5 rounded-full font-display font-bold text-sm cursor-pointer transition-all hover:-translate-y-1" style={{ background: '#FF5500', color: '#1A1A1A' }}>Get Started →</button>
            </div>
          </div>
        </div>
      </section>

      <OrderModal isOpen={orderOpen} onClose={() => { setOrderOpen(false) }} preselect={orderPkg} />
      <SpotifyCustomModal isOpen={customOpen} onClose={() => { setCustomOpen(false) }} />
    </>
  )
}
