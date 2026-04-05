import { useState, useEffect, useRef } from 'react'
import { COUNTRIES } from '../data'
import ModalPortal from './ModalPortal'
import { notifyOwner } from '../utils/brevo'

// Formspree form ID for custom promotion requests — notifies owner immediately
const CUSTOM_REQUEST_FORM_ID = 'mojppyke'

const CHART_POSITIONS = [
  'Not targeting charts', 'Top 200 in a small market', 'Top 100 in a small market',
  'Top 50 in a small market', 'Viral 50 chart', 'Top 100 UK / USA', 'Top 50 UK / USA',
  'New Music Friday placement',
]

const TABS = [
  { id: 'spotify', label: 'Spotify', color: '#1DB954', icon: '🎧' },
  { id: 'youtube', label: 'YouTube', color: '#FF0000', icon: '▶️' },
  { id: 'apple', label: 'Apple Music', color: '#FC3C44', icon: '🍎' },
]

const INIT = { artistName: '', email: '', trackLink: '', budget: 250, country: '', chartPosition: '', notes: '' }

function BudgetSlider({ value, onChange, color }) {
  const min = 50, max = 10000
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-xs font-display font-semibold text-gray-500 uppercase tracking-wider">Budget *</label>
        <span className="font-display font-bold text-xl" style={{ color }}>${value.toLocaleString()}</span>
      </div>
      <input type="range" min={min} max={max} step={50} value={value} onChange={e => onChange(Number(e.target.value))}
        className="w-full" style={{ WebkitAppearance: 'none', height: 6, borderRadius: 3, background: `linear-gradient(to right, ${color} ${pct}%, rgba(0,0,0,0.1) ${pct}%)`, outline: 'none', cursor: 'pointer' }} />
      <div className="flex justify-between text-xs text-gray-400 mt-1"><span>$50</span><span>$10,000</span></div>
    </div>
  )
}

export default function SpotifyCustomModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('spotify')
  const [form, setForm] = useState(INIT)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [invoiceMode, setInvoiceMode] = useState(false)
  const [invoiceSent, setInvoiceSent] = useState(false)
  const [invoiceForm, setInvoiceForm] = useState({ name: '', email: '', amount: 250, notes: '' })
  const [invoiceErrors, setInvoiceErrors] = useState({})
  const overlayRef = useRef(null)

  useEffect(() => {
    if (isOpen && overlayRef.current) overlayRef.current.scrollTop = 0
  }, [isOpen])

  if (!isOpen) return null

  const activeTab = TABS.find(t => t.id === tab)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setInv = (k, v) => setInvoiceForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.artistName.trim()) e.artistName = 'Required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.trackLink.trim()) e.trackLink = 'Required'
    if (!form.country) e.country = 'Required'
    setErrors(e); return Object.keys(e).length === 0
  }

  const validateInvoice = () => {
    const e = {}
    if (!invoiceForm.name.trim()) e.name = 'Required'
    if (!invoiceForm.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    setInvoiceErrors(e); return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Notify owner immediately — custom promotion requests fire right away
    notifyOwner(CUSTOM_REQUEST_FORM_ID, {
      _subject: `🎵 New Custom Promotion Request — ${form.artistName} (${tab})`,
      formType: 'custom_request',
      platform: tab,
      artistName: form.artistName,
      email: form.email,
      trackLink: form.trackLink,
      budget: form.budget,
      country: form.country,
      chartPosition: form.chartPosition || '',
      notes: form.notes || '',
      submittedAt: new Date().toISOString(),
    })
    setSubmitted(true)
  }

  const handleInvoice = (e) => {
    e.preventDefault()
    if (!validateInvoice()) return
    setInvoiceSent(true)
  }

  const resetAll = () => { setSubmitted(false); setInvoiceSent(false); setInvoiceMode(false); setForm(INIT); setInvoiceForm({ name: '', email: '', amount: 250, notes: '' }); onClose() }

  if (submitted) return (
    <ModalPortal>
    <div ref={overlayRef} className="modal-overlay" onClick={e => e.target === e.currentTarget && resetAll()}>
      <div className="modal-box text-center" style={{ maxWidth: 440 }}>
        <div className="text-5xl mb-5">{activeTab.icon}</div>
        <h2 className="font-display font-bold text-2xl mb-3" style={{ color: activeTab.color }}>Request Submitted!</h2>
        <p className="text-gray-500 mb-6 text-sm">We'll send a custom <strong>{activeTab.label}</strong> proposal to <strong className="text-gray-900">{form.email}</strong> within 24 hours.</p>
        <button onClick={resetAll} className="btn-primary justify-center w-full">Done →</button>
      </div>
    </div>
    </ModalPortal>
  )

  if (invoiceSent) return (
    <ModalPortal>
    <div ref={overlayRef} className="modal-overlay" onClick={e => e.target === e.currentTarget && resetAll()}>
      <div className="modal-box text-center" style={{ maxWidth: 440 }}>
        <div className="text-5xl mb-5">📧</div>
        <h2 className="font-display font-bold text-2xl mb-3 grad-text">Invoice Sent!</h2>
        <p className="text-gray-500 mb-6 text-sm">Invoice for <strong className="text-gray-900">${invoiceForm.amount.toLocaleString()}</strong> sent to <strong className="text-gray-900">{invoiceForm.email}</strong>.</p>
        <button onClick={resetAll} className="btn-primary justify-center w-full">Done →</button>
      </div>
    </div>
    </ModalPortal>
  )

  if (invoiceMode) return (
    <ModalPortal>
    <div ref={overlayRef} className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 520 }}>
        <button onClick={() => setInvoiceMode(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-pink transition-colors" style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(26,26,26,0.12)' }}>✕</button>
        <div className="mb-7">
          <span className="section-label">Invoice</span>
          <h2 className="font-display font-bold text-3xl mb-2">Send <span className="grad-text">Invoice</span></h2>
          <p className="text-gray-500 text-sm">Enter the artist's details — we'll send the invoice directly to their email.</p>
        </div>
        <form onSubmit={handleInvoice}>
          <input type="hidden" name="platform" value={tab} />
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Artist / Client Name *</label>
              <input name="name" className={`form-input ${invoiceErrors.name ? 'border-red-500' : ''}`} placeholder="Artist stage or full name" value={invoiceForm.name} onChange={e => setInv('name', e.target.value)} />
              {invoiceErrors.name && <p className="text-red-400 text-xs mt-1">{invoiceErrors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Artist Email *</label>
              <input name="email" type="email" className={`form-input ${invoiceErrors.email ? 'border-red-500' : ''}`} placeholder="artist@email.com" value={invoiceForm.email} onChange={e => setInv('email', e.target.value)} />
              {invoiceErrors.email && <p className="text-red-400 text-xs mt-1">{invoiceErrors.email}</p>}
            </div>
            <BudgetSlider value={invoiceForm.amount} onChange={v => setInv('amount', v)} color={activeTab.color} />
            <div>
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Invoice Notes</label>
              <textarea name="notes" className="form-input resize-none" rows={3} placeholder="Campaign details, platform, deliverables…" value={invoiceForm.notes} onChange={e => setInv('notes', e.target.value)} />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full justify-center mt-6 py-4 text-base">Send Invoice →</button>
          <button type="button" onClick={() => setInvoiceMode(false)} className="w-full text-center text-gray-500 text-xs mt-3 hover:text-gray-900 transition-colors py-2">← Back</button>
        </form>
      </div>
    </div>
    </ModalPortal>
  )

  const platformLabels = {
    spotify: { placeholder: 'https://open.spotify.com/track/...', hint: 'Targeted listeners, playlist placements, algorithm boost' },
    youtube: { placeholder: 'https://www.youtube.com/watch?v=...', hint: 'Views, subscribers, channel growth & promotion campaigns' },
    apple: { placeholder: 'https://music.apple.com/...', hint: 'Apple Music streams, Shazam chart, playlist pitching' },
  }

  return (
    <ModalPortal>
    <div ref={overlayRef} className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 700 }}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-pink transition-colors" style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(26,26,26,0.12)' }}>✕</button>

        {/* Platform tabs */}
        <div className="flex gap-2 mb-7 p-1 rounded-xl" style={{ background: 'rgba(0,0,0,0.04)' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-display font-semibold transition-all"
              style={tab === t.id ? { background: '#fff', color: t.color, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' } : { color: '#6B6B6B' }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <span className="section-label" style={{ color: activeTab.color }}>Custom {activeTab.label} Request</span>
          <h2 className="font-display font-bold text-3xl mb-1">Build Your <span style={{ color: activeTab.color }}>{activeTab.label}</span> Campaign</h2>
          <p className="text-gray-500 text-sm">{platformLabels[tab].hint} — budget from $50 to $10,000.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Artist Name *</label>
              <input name="artistName" className={`form-input ${errors.artistName ? 'border-red-500' : ''}`} placeholder="Your artist / stage name" value={form.artistName} onChange={e => set('artistName', e.target.value)} />
              {errors.artistName && <p className="text-red-400 text-xs mt-1">{errors.artistName}</p>}
            </div>
            <div>
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email Address *</label>
              <input name="email" type="email" className={`form-input ${errors.email ? 'border-red-500' : ''}`} placeholder="your@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Track / Album Link *</label>
              <input name="trackLink" type="url" className={`form-input ${errors.trackLink ? 'border-red-500' : ''}`} placeholder={platformLabels[tab].placeholder} value={form.trackLink} onChange={e => set('trackLink', e.target.value)} />
              {errors.trackLink && <p className="text-red-400 text-xs mt-1">{errors.trackLink}</p>}
            </div>
            <div className="sm:col-span-2">
              <BudgetSlider value={form.budget} onChange={v => set('budget', v)} color={activeTab.color} />
            </div>
            <div>
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Country *</label>
              <select name="country" className={`form-input ${errors.country ? 'border-red-500' : ''}`} value={form.country} onChange={e => set('country', e.target.value)}>
                <option value="">Select your country</option>
                {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.flag} {c.name}</option>)}
              </select>
              {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
            </div>
            {tab === 'spotify' && (
              <div>
                <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Desired Chart Position</label>
                <select name="chartPosition" className="form-input" value={form.chartPosition} onChange={e => set('chartPosition', e.target.value)}>
                  {CHART_POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            )}
            <div className={tab === 'spotify' ? '' : 'sm:col-span-2'}>
              <label className="block text-xs font-display font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Notes / Goals</label>
              <textarea name="notes" className="form-input resize-none" rows={3} placeholder="Target audience, genre, markets, timeline, specific goals…" value={form.notes} onChange={e => set('notes', e.target.value)} />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full justify-center mt-6 py-4 text-base" style={{ background: `linear-gradient(135deg,${activeTab.color},${activeTab.color}bb)` }}>
            Submit Custom Request →
          </button>
          <div className="flex items-center justify-between mt-3">
            <p className="text-gray-500 text-xs">We'll respond with a custom proposal within 24 hours</p>
            <button type="button" onClick={() => setInvoiceMode(true)}
              className="text-xs font-semibold flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all hover:opacity-90"
              style={{ background: `${activeTab.color}15`, color: activeTab.color }}>
              📄 Send Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
    </ModalPortal>
  )
}
