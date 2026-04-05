import useSEO from '../hooks/useSEO'
import { useState } from 'react'
import PageHero from '../components/PageHero'
import PricingCard from '../components/PricingCard'
import OrderModal from '../components/OrderModal'
import { CHART_PACKAGES } from '../data'
import SpotifyCustomModal from '../components/SpotifyCustomModal'

const CHART_COUNTRIES = [
  { flag: '🇬🇧', name: 'United Kingdom', charts: 'Top 100 · Viral 50' },
  { flag: '🇺🇸', name: 'United States', charts: 'Top 100 · Viral 50' },
  { flag: '🇩🇪', name: 'Germany', charts: 'Top 100 · Viral 50' },
  { flag: '🇳🇬', name: 'Nigeria', charts: 'Top 50 · Viral 50' },
  { flag: '🇫🇷', name: 'France', charts: 'Top 100 · Viral 50' },
  { flag: '🇸🇪', name: 'Sweden', charts: 'Top 50 · Viral 50' },
  { flag: '🇳🇱', name: 'Netherlands', charts: 'Top 50 · Viral 50' },
  { flag: '🇮🇪', name: 'Ireland', charts: 'Top 50 · Viral 50' },
  { flag: '🇳🇴', name: 'Norway', charts: 'Top 50 · Viral 50' },
  { flag: '🇦🇺', name: 'Australia', charts: 'Top 100 · Viral 50' },
  { flag: '🇮🇸', name: 'Iceland', charts: 'Top 50 · Viral 50' },
  { flag: '🇱🇹', name: 'Lithuania', charts: 'Top 50 · Viral 50' },
]

export default function ChartPage() {
  useSEO({ title: 'Chart Promotion | Echorise Media — UK & USA Top 100 Campaigns', description: 'From regional viral charts to the UK and USA Top 100. Echorise Media has the network and strategy to move your track up the charts. Proven results for independent artists.', canonical: 'https://echorisemedia.com/chart' })
  const [orderOpen, setOrderOpen] = useState(false)
  const [orderPkg, setOrderPkg] = useState('')
  const [customOpen, setCustomOpen] = useState(false)
  const openOrder = (pkg) => { setOrderPkg(pkg?.id || ''); setOrderOpen(true) }

  return (
    <>
      <PageHero
        label="Chart Promotion"
        title={<>Get Your Track<br /><span className="grad-text">On the Charts</span></>}
        subtitle="From regional viral charts to the UK and USA Top 100 — we know how charts move, and we have the network to move yours. A chart position changes everything."
        accent="#FF6A00"
        image="https://images.unsplash.com/photo-1501386761578-eaa54b915e8a?w=900&h=700&fit=crop&crop=center"
      >
        <button onClick={() => openOrder()} className="btn-primary" style={{ background: 'linear-gradient(135deg,#FF6A00,#FF6A00)' }}>Start Chart Campaign →</button>
      </PageHero>

      {/* Why charts matter */}
      <section className="py-20 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="section-label" style={{ color: '#FF6A00' }}>Why Chart Position Matters</span>
              <h2 className="font-display font-bold text-3xl mb-5" style={{ color: '#1A1A1A', letterSpacing: '-0.02em' }}>A Chart Entry <span className="grad-text">Opens Doors</span></h2>
              <div className="flex flex-col gap-4">
                {['Label A&R teams actively monitor chart movements for new signings.','Booking agents take charting artists more seriously for live shows.','Press and blogs amplify chart entries with features and reviews.',"Spotify's editorial team notices charting tracks for playlist consideration.",'Social media algorithm boosts content from charting artists.'].map(t => (
                  <div key={t} className="flex gap-3 text-sm" style={{ color: '#6B6B6B' }}>
                    <span className="mt-0.5 flex-shrink-0 font-bold" style={{ color: '#FF6A00' }}>→</span> {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl" style={{ height: 360 }}>
              <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=700&h=500&fit=crop&crop=center" alt="Artist performing" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Chart countries table */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="section-label" style={{ color: '#FF6A00' }}>Available Markets</span>
              <h2 className="font-display font-bold text-3xl mb-3" style={{ color: '#1A1A1A', letterSpacing: '-0.02em' }}>12+ Chart <span className="grad-text">Markets Available</span></h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {CHART_COUNTRIES.map(c => (
                <div key={c.name} className="glass-card p-4 flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className="font-display font-bold text-sm" style={{ color: '#1A1A1A' }}>{c.name}</div>
                    <div className="text-xs" style={{ color: 'rgba(26,26,26,0.28)' }}>{c.charts}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="text-center mb-14">
            <span className="section-label">Pricing</span>
            <h2 className="font-display font-bold text-3xl mb-3" style={{ color: '#1A1A1A', letterSpacing: '-0.02em' }}>Chart Campaign <span className="grad-text">Packages</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHART_PACKAGES.map(pkg => <PricingCard key={pkg.id} pkg={pkg} onOrder={openOrder} />)}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => { setCustomOpen(true) }} className="btn-outline">Request Custom Offer →</button>
          </div>
        </div>
      </section>

      <OrderModal isOpen={orderOpen} onClose={() => { setOrderOpen(false) }} preselect={orderPkg} />
      <SpotifyCustomModal isOpen={customOpen} onClose={() => { setCustomOpen(false) }} />
    </>
  )
}
