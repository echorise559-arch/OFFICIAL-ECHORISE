import { useState, useEffect, useRef } from 'react'
import { sendInvoiceEmail } from '../utils/brevo'
import ModalPortal from './ModalPortal'

const SERVICES_LIST = [
  'Spotify Promotion – Starter ($50)',
  'Spotify Promotion – Growth ($100)',
  'Spotify Promotion – Premium ($350)',
  'SoundCloud Promotion – Starter ($50)',
  'SoundCloud Promotion – Growth ($100)',
  'SoundCloud Promotion – Premium ($350)',
  'Chart Promotion – Starter ($150)',
  'Chart Promotion – Growth ($350)',
  'Chart Promotion – Premium ($650)',
  'YouTube Promotion – Custom',
  'Apple Music Promotion – Custom',
  'Dance / TikTok Promotion – Custom',
  'Custom Campaign',
]

export default function InvoiceModal({ open, onClose }) {
  const [form, setForm] = useState({
    artistName: '',
    artistEmail: '',
    artistPhone: '',
    service: '',
    customAmount: '',
    trackTitle: '',
    trackLink: '',
    notes: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const overlayRef = useRef(null)

  useEffect(() => {
    if (open && overlayRef.current) overlayRef.current.scrollTop = 0
  }, [open])

  if (!open) return null

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const getAmount = () => {
    if (form.customAmount) return parseFloat(form.customAmount) || 0
    const match = form.service.match(/\$(\d+)/)
    return match ? parseInt(match[1]) : 0
  }

  const handleSend = async () => {
    if (!form.artistName || !form.artistEmail || !form.service) {
      setError('Please fill in artist name, email, and service.')
      return
    }
    setError('')
    setSending(true)

    const amount = getAmount()
    const invoiceNum = `ECH-${Date.now().toString().slice(-6)}`
    const dueDate = new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })

    try {
      await sendInvoiceEmail({
        artistName:  form.artistName,
        artistEmail: form.artistEmail,
        artistPhone: form.artistPhone || '',
        service:     form.service,
        amount,
        invoiceNum,
        trackTitle:  form.trackTitle || '',
        trackLink:   form.trackLink  || '',
        notes:       form.notes      || '',
      })
      setSending(false)
      setSent(true)
    } catch (err) {
      setSending(false)
      setError('Failed to send invoice. Please try again or contact support.')
      console.error('Brevo invoice error:', err)
    }
  }

  const handleClose = () => {
    setSent(false)
    setForm({ artistName: '', artistEmail: '', artistPhone: '', service: '', customAmount: '', trackTitle: '', trackLink: '', notes: '' })
    onClose()
  }

  return (
    <ModalPortal>
    <div
      ref={overlayRef}
      className="modal-overlay"
      onClick={e => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="modal-box"
        style={{ background: '#FDFCFB', maxWidth: 560, padding: 0 }}
      >
        {/* Header */}
        <div className="px-8 py-6 flex items-center justify-between" style={{ background: 'linear-gradient(135deg,#1A1A1A,#2D1A0E)', borderBottom: '2px solid #FF6A00' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span style={{ color: '#FF6A00', fontWeight: 800, fontFamily: 'Syne, sans-serif', fontSize: 18 }}>echorise</span>
              <span style={{ color: '#FF6A00', fontWeight: 800, fontSize: 18 }}>.</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(255,106,0,0.15)', color: '#FF6A00', border: '1px solid rgba(255,106,0,0.3)' }}>INVOICE</span>
            </div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Send a payment invoice directly to artist email</p>
          </div>
          <button onClick={handleClose} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>

        {sent ? (
          <div className="px-8 py-12 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(29,185,84,0.1)', border: '2px solid #1DB954' }}>
              <svg viewBox="0 0 24 24" fill="#1DB954" width="28" height="28"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <h3 className="font-display font-bold text-2xl mb-2" style={{ color: '#1A1A1A', fontFamily: 'Syne, sans-serif' }}>Invoice Sent!</h3>
            <p className="mb-2" style={{ color: '#6B6B6B' }}>Invoice has been sent directly to <strong>{form.artistEmail}</strong> via Echorise Media.</p>
            <p className="text-sm mb-8" style={{ color: '#6B6B6B' }}>The artist will receive the invoice email with payment instructions shortly.</p>
            <button onClick={handleClose} className="btn-primary px-8 py-3">Done</button>
          </div>
        ) : (
          <div className="px-8 py-6 flex flex-col gap-5">
            {/* Artist Info */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#FF6A00' }}>Artist Information</div>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#6B6B6B' }}>Artist / Client Name *</label>
                  <input
                    value={form.artistName}
                    onChange={e => set('artistName', e.target.value)}
                    placeholder="e.g. DJ Khaled"
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                    style={{ background: '#F5F3F0', border: '1.5px solid transparent', color: '#1A1A1A' }}
                    onFocus={e => e.target.style.borderColor = '#FF6A00'}
                    onBlur={e => e.target.style.borderColor = 'transparent'}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#6B6B6B' }}>Artist Email (invoice will be sent here) *</label>
                  <input
                    type="email"
                    value={form.artistEmail}
                    onChange={e => set('artistEmail', e.target.value)}
                    placeholder="artist@example.com"
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                    style={{ background: '#F5F3F0', border: '1.5px solid transparent', color: '#1A1A1A' }}
                    onFocus={e => e.target.style.borderColor = '#FF6A00'}
                    onBlur={e => e.target.style.borderColor = 'transparent'}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#6B6B6B' }}>Phone Number (optional)</label>
                  <input
                    value={form.artistPhone}
                    onChange={e => set('artistPhone', e.target.value)}
                    placeholder="+1 234 567 8900"
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                    style={{ background: '#F5F3F0', border: '1.5px solid transparent', color: '#1A1A1A' }}
                    onFocus={e => e.target.style.borderColor = '#FF6A00'}
                    onBlur={e => e.target.style.borderColor = 'transparent'}
                  />
                </div>
              </div>
            </div>

            {/* Service */}
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#FF6A00' }}>Service Details</div>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#6B6B6B' }}>Service / Package *</label>
                  <select
                    value={form.service}
                    onChange={e => set('service', e.target.value)}
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all appearance-none"
                    style={{ background: '#F5F3F0', border: '1.5px solid transparent', color: form.service ? '#1A1A1A' : '#9CA3AF' }}
                    onFocus={e => e.target.style.borderColor = '#FF6A00'}
                    onBlur={e => e.target.style.borderColor = 'transparent'}
                  >
                    <option value="">Select a service…</option>
                    {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {form.service === 'Custom Campaign' || form.service.includes('Custom') ? (
                  <div>
                    <label className="block text-xs font-semibold mb-1" style={{ color: '#6B6B6B' }}>Custom Amount (USD)</label>
                    <input
                      type="number"
                      value={form.customAmount}
                      onChange={e => set('customAmount', e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                      style={{ background: '#F5F3F0', border: '1.5px solid transparent', color: '#1A1A1A' }}
                      onFocus={e => e.target.style.borderColor = '#FF6A00'}
                      onBlur={e => e.target.style.borderColor = 'transparent'}
                    />
                  </div>
                ) : null}
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#6B6B6B' }}>Track / Song Title</label>
                  <input
                    value={form.trackTitle}
                    onChange={e => set('trackTitle', e.target.value)}
                    placeholder="e.g. Golden Hour"
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                    style={{ background: '#F5F3F0', border: '1.5px solid transparent', color: '#1A1A1A' }}
                    onFocus={e => e.target.style.borderColor = '#FF6A00'}
                    onBlur={e => e.target.style.borderColor = 'transparent'}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: '#6B6B6B' }}>Track Link (Spotify/SoundCloud/etc.)</label>
                  <input
                    value={form.trackLink}
                    onChange={e => set('trackLink', e.target.value)}
                    placeholder="https://open.spotify.com/track/..."
                    className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                    style={{ background: '#F5F3F0', border: '1.5px solid transparent', color: '#1A1A1A' }}
                    onFocus={e => e.target.style.borderColor = '#FF6A00'}
                    onBlur={e => e.target.style.borderColor = 'transparent'}
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: '#6B6B6B' }}>Additional Notes</label>
              <textarea
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                rows={3}
                placeholder="Any special instructions or campaign details…"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all resize-none"
                style={{ background: '#F5F3F0', border: '1.5px solid transparent', color: '#1A1A1A' }}
                onFocus={e => e.target.style.borderColor = '#FF6A00'}
                onBlur={e => e.target.style.borderColor = 'transparent'}
              />
            </div>

            {/* Amount preview */}
            {getAmount() > 0 && (
              <div className="flex items-center justify-between rounded-2xl px-5 py-4" style={{ background: 'linear-gradient(135deg,rgba(255,106,0,0.08),rgba(238,9,121,0.05))', border: '1.5px solid rgba(255,106,0,0.2)' }}>
                <span className="text-sm font-semibold" style={{ color: '#6B6B6B' }}>Invoice Total</span>
                <span className="font-display font-bold text-2xl" style={{ color: '#FF6A00', fontFamily: 'Syne, sans-serif' }}>${getAmount().toFixed(2)} USD</span>
              </div>
            )}

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(238,9,121,0.08)', border: '1px solid rgba(238,9,121,0.2)', color: '#ee0979' }}>
                {error}
              </div>
            )}

            <button
              onClick={handleSend}
              disabled={sending}
              className="w-full py-4 rounded-2xl font-display font-bold text-white transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-60 disabled:scale-100"
              style={{ background: 'linear-gradient(135deg,#FF6A00,#ee0979)', border: 'none', cursor: 'pointer', fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}
            >
              {sending ? 'Sending via Brevo…' : '📧 Send Invoice to Artist →'}
            </button>
            <p className="text-xs text-center" style={{ color: 'rgba(107,107,107,0.7)' }}>Invoice sent directly to the artist's email via Echorise Media.</p>
          </div>
        )}
      </div>
    </div>
    </ModalPortal>
  )
}
