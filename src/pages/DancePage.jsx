import useSEO from '../hooks/useSEO'
import { useState } from 'react'
import PageHero from '../components/PageHero'
import PricingCard from '../components/PricingCard'
import OrderModal from '../components/OrderModal'
import SpotifyCustomModal from '../components/SpotifyCustomModal'
import { DANCE_PACKAGES } from '../data'

export default function DancePage() {
  useSEO({ title: 'TikTok & Dance Promotion | Echorise Media — Real Creators, Viral Moments', description: 'Real TikTok and Instagram Reels creators making authentic content around your track. Echorise Media dance campaigns spark genuine viral moments for independent artists.', canonical: 'https://echorisemedia.com/dance' })
  const [orderOpen, setOrderOpen] = useState(false)
  const [orderPkg, setOrderPkg] = useState('')
  const [customOpen, setCustomOpen] = useState(false)
  const openOrder = (pkg) => { setOrderPkg(pkg?.id || ''); setOrderOpen(true) }

  return (
    <>
      <PageHero
        label="Dance Video Promotion"
        title={<>Make Your Track<br /><span style={{ background: 'linear-gradient(135deg,#FF6A00,#a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Go Viral</span></>}
        subtitle="We deploy real dancers on TikTok and Instagram Reels to create the kind of authentic content that sparks viral moments. Virality isn't luck — it's choreography."
        accent="#FF6A00"
        image="https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=900&h=700&fit=crop&crop=center"
      >
        <button onClick={() => openOrder()} className="btn-primary">Launch Dance Campaign →</button>
      </PageHero>

      {/* Platforms */}
      <section className="py-20 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="rounded-3xl overflow-hidden shadow-xl" style={{ height: 380 }}>
              <img src="https://images.unsplash.com/photo-1545959570-a94084071b5d?w=700&h=600&fit=crop&crop=center" alt="Dancers performing" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="section-label" style={{ color: '#FF6A00' }}>Platform Coverage</span>
              <h2 className="font-display font-bold text-3xl mb-5" style={{ color: '#1A1A1A', letterSpacing: '-0.02em' }}>Every Major <span className="grad-text">Short-Form Platform</span></h2>
              <div className="flex flex-col gap-4">
                {[['🎵 TikTok','The #1 music discovery platform. One viral dance challenge can reach millions.'],['📸 Instagram Reels','High-retention vertical content that drives follows, saves, and streams.'],['▶️ YouTube Shorts','Growing rapidly with high monetisation potential for your music.'],["💃 Real Creators","Every dancer is vetted, skilled, and chosen to match your track's energy."]].map(([title, desc]) => (
                  <div key={title} className="glass-card p-4 flex gap-4 items-start">
                    <div className="font-display font-bold text-sm w-36 flex-shrink-0" style={{ color: '#1A1A1A' }}>{title}</div>
                    <p className="text-sm" style={{ color: '#6B6B6B' }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mb-14">
            <span className="section-label">Packages</span>
            <h2 className="font-display font-bold text-3xl mb-3" style={{ color: '#1A1A1A', letterSpacing: '-0.02em' }}>Dance Video <span className="grad-text">Campaign Plans</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DANCE_PACKAGES.map(pkg => <PricingCard key={pkg.id} pkg={pkg} onOrder={openOrder} />)}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => { setCustomOpen(true) }} className="btn-outline">Request Custom Offer →</button>
          </div>
        </div>
      </section>

      <section className="py-8 px-6" style={{ background: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden relative h-64">
          <img src="https://images.unsplash.com/photo-1574027542338-98e75acfd385?w=1200&h=500&fit=crop&crop=center" alt="Concert crowd" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg,rgba(255,106,0,0.88),rgba(168,85,247,0.82))' }}>
            <div className="text-center">
              <h3 className="font-display font-bold text-2xl text-white mb-4" style={{ letterSpacing: '-0.02em' }}>Your track deserves to go viral.</h3>
              <button onClick={() => openOrder()} className="px-8 py-3.5 rounded-full font-display font-bold text-sm cursor-pointer transition-all hover:-translate-y-1" style={{ background: '#FF6A00', color: '#FAF7F2' }}>Get Started →</button>
            </div>
          </div>
        </div>
      </section>

      <OrderModal isOpen={orderOpen} onClose={() => { setOrderOpen(false) }} preselect={orderPkg} />
      <SpotifyCustomModal isOpen={customOpen} onClose={() => { setCustomOpen(false) }} />
    </>
  )
}
