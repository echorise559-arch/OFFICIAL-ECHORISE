import { useState, useEffect, useRef } from 'react'
import { COUNTRIES, PLATFORMS, SPOTIFY_PACKAGES, SOUNDCLOUD_PACKAGES, CHART_PACKAGES, DANCE_PACKAGES } from '../data'
import PaymentModal from './PaymentModal'
import ModalPortal from './ModalPortal'

const ALL_PACKAGES = [
  ...SPOTIFY_PACKAGES.map(p => ({ ...p, label: `Spotify – ${p.name} ($${p.price})` })),
  ...SOUNDCLOUD_PACKAGES.map(p => ({ ...p, label: `SoundCloud – ${p.name} ($${p.price})` })),
  ...CHART_PACKAGES.map(p => ({ ...p, label: `Chart – ${p.name} ($${p.price})` })),
  ...DANCE_PACKAGES.map(p => ({ ...p, label: `Dance – ${p.name} ($${p.price})` })),
  { id: 'custom', name: 'Custom', price: 0, label: 'Custom Campaign (Quote)' },
]

const INIT = { artistName: '', email: '', trackLink: '', platform: '', package: '', country: '', notes: '' }

export default function OrderModal({ isOpen, onClose, preselect, preselectPkg }) {
  const [form, setForm] = useState({ ...INIT, package: preselect || '' })
  const [errors, setErrors] = useState({})
  const [paymentData, setPaymentData] = useState(null)
  const overlayRef = useRef(null)

  // Scroll overlay to top when modal opens
  useEffect(() => {
    if (isOpen && overlayRef.current) overlayRef.current.scrollTop = 0
  }, [isOpen])

  // When preselectPkg changes (user clicked a specific package button), prefill package
  useEffect(() => {
    if (preselect) setForm(f => ({ ...f, package: preselect }))
  }, [preselect])

  if (!isOpen) return null

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.artistName.trim()) e.artistName = 'Required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.trackLink.trim()) e.trackLink = 'Required'
    if (!form.platform) e.platform = 'Required'
    if (!form.package) e.package = 'Required'
    if (!form.country) e.country = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const pkg = ALL_PACKAGES.find(p => p.id === form.package || p.label === form.package)
    // Advance to payment — Formspree only fires after confirmed Flutterwave payment
    setPaymentData({ ...form, pkgObj: pkg })
  }

  const inputClass = k => `form-input ${errors[k] ? 'border-red-500' : ''}`

  if (paymentData) {
    return <PaymentModal orderData={paymentData} onClose={() => { setPaymentData(null); setForm(INIT); onClose() }} onBack={() => setPaymentData(null)} />
  }

  // Determine selected package name for display
  const selectedPkg = ALL_PACKAGES.find(p => p.id === form.package)

  return (
    <ModalPortal>
    <div ref={overlayRef} className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 700 }}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-pink transition-colors text-lg" style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(26,26,26,0.12)' }}>✕</button>

        <div className="mb-7">
          <span className="section-label">Get Started</span>
          <h2 className="font-display font-bold text-3xl mb-2">Place Your <span className="grad-text">Order</span></h2>
          <p className="text-gray-500 text-sm">Fill in the details below and we'll set up your campaign within 24 hours.</p>
          {selectedPkg && selectedPkg.price > 0 && (
            <div className="mt-3 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: 'rgba(255,106,0,0.1)', color: '#FF6A00' }}>
              Selected: {selectedPkg.label}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Artist Name *</label>
              <input name="artistName" className={inputClass('artistName')} placeholder="Your artist / stage name" value={form.artistName} onChange={e => set('artistName', e.target.value)} />
              {errors.artistName && <p className="text-red-400 text-xs mt-1">{errors.artistName}</p>}
            </div>
            <div>
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email Address *</label>
              <input name="email" type="email" className={inputClass('email')} placeholder="your@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Track Link *</label>
              <input name="trackLink" type="url" className={inputClass('trackLink')} placeholder="https://open.spotify.com/track/..." value={form.trackLink} onChange={e => set('trackLink', e.target.value)} />
              {errors.trackLink && <p className="text-red-400 text-xs mt-1">{errors.trackLink}</p>}
            </div>
            <div>
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Platform *</label>
              <select name="platform" className={inputClass('platform')} value={form.platform} onChange={e => set('platform', e.target.value)}>
                <option value="">Select platform</option>
                {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              {errors.platform && <p className="text-red-400 text-xs mt-1">{errors.platform}</p>}
            </div>
            <div>
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Package *</label>
              <select name="package" className={inputClass('package')} value={form.package} onChange={e => set('package', e.target.value)}>
                <option value="">Select package</option>
                {ALL_PACKAGES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
              {errors.package && <p className="text-red-400 text-xs mt-1">{errors.package}</p>}
            </div>
            <div>
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Country *</label>
              <select name="country" className={inputClass('country')} value={form.country} onChange={e => set('country', e.target.value)}>
                <option value="">Select your country</option>
                {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.flag} {c.name}</option>)}
              </select>
              {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Notes / Special Requests</label>
              <textarea name="notes" className="form-input resize-none" rows={3} placeholder="Target genre, specific markets, campaign goals, release date…" value={form.notes} onChange={e => set('notes', e.target.value)} />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full justify-center mt-6 py-4 text-base">
            Proceed to Payment →
          </button>
          <p className="text-center text-gray-500 text-xs mt-3">Secured by Flutterwave · Response within 24 hours</p>
        </form>
      </div>
    </div>
    </ModalPortal>
  )
}
