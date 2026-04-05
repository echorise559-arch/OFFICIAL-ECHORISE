import useSEO from '../hooks/useSEO'
import { useState } from 'react'
import PageHero from '../components/PageHero'
import { notifyOwner } from '../utils/brevo'

// Formspree form ID for contact / custom-request messages
const CONTACT_FORM_ID = 'mojppyke'

const INIT = { name: '', email: '', subject: '', message: '' }

export default function ContactPage() {
  useSEO({ title: 'Contact Us | Echorise Media — Music Promotion Studio', description: 'Get in touch with the Echorise Media team. We respond within 24 hours. Talk to us about your music promotion campaign on Spotify, SoundCloud, YouTube, Apple Music and more.', canonical: 'https://echorisemedia.com/contact' })
  const [form, setForm] = useState(INIT)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Notify owner immediately — contact/custom-request messages fire right away
    notifyOwner(CONTACT_FORM_ID, {
      _subject: `📩 New Contact Message from ${form.name}`,
      formType: 'contact',
      name: form.name,
      email: form.email,
      subject: form.subject || '(no subject)',
      message: form.message,
      submittedAt: new Date().toISOString(),
    })
    setSubmitted(true)
  }

  return (
    <>
      <PageHero
        label="Contact Us"
        title={<>Let's Talk <span className="grad-text">Strategy</span></>}
        subtitle="Whether you're ready to place an order or just want to explore what's possible, our team responds to every message within 24 hours."
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=700&fit=crop&crop=center"
      />

      <section className="py-12 px-6 pb-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="glass-card p-12 text-center">
                <div className="text-5xl mb-5">✉️</div>
                <h3 className="font-display font-bold text-2xl mb-3" style={{ color: '#1A1A1A' }}>Message Received!</h3>
                <p style={{ color: '#6B6B6B' }}>We'll get back to you at <strong style={{ color: '#1A1A1A' }}>{form.email}</strong> within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm(INIT) }} className="btn-primary mt-6">Send Another Message</button>
              </div>
            ) : (
              <div className="glass-card p-8">
                <h3 className="font-display font-bold text-xl mb-6" style={{ color: '#1A1A1A' }}>Send a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-display font-bold mb-1.5 uppercase tracking-wider" style={{ color: 'rgba(107,107,107,0.90)' }}>Your Name *</label>
                      <input name="name" className={`form-input ${errors.name ? 'border-red-500' : ''}`} placeholder="Artist or full name" value={form.name} onChange={e => set('name', e.target.value)} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-display font-bold mb-1.5 uppercase tracking-wider" style={{ color: 'rgba(107,107,107,0.90)' }}>Email Address *</label>
                      <input name="email" type="email" className={`form-input ${errors.email ? 'border-red-500' : ''}`} placeholder="your@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-display font-bold mb-1.5 uppercase tracking-wider" style={{ color: 'rgba(107,107,107,0.90)' }}>Subject</label>
                    <input name="subject" className="form-input" placeholder="Campaign enquiry, custom quote, general question…" value={form.subject} onChange={e => set('subject', e.target.value)} />
                  </div>
                  <div className="mb-6">
                    <label className="block text-xs font-display font-bold mb-1.5 uppercase tracking-wider" style={{ color: 'rgba(107,107,107,0.90)' }}>Message *</label>
                    <textarea name="message" className={`form-input resize-none ${errors.message ? 'border-red-500' : ''}`} rows={6} placeholder="Tell us about your music, your goals, and how we can help…" value={form.message} onChange={e => set('message', e.target.value)} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center py-4">Send Message →</button>
                </form>
              </div>
            )}
          </div>

          {/* Info sidebar */}
          <div className="flex flex-col gap-5">
            <div className="glass-card p-6">
              <h4 className="font-display font-bold mb-4" style={{ color: '#1A1A1A' }}>Contact Info</h4>
              {[['✉️','Email','support@echorisemedia.com'],['⏱','Response Time','Within 24 hours'],['🕐','Business Hours','Mon – Fri, 9am – 6pm GMT'],['🌍','We Work With','Artists from 18+ countries']].map(([icon, label, val]) => (
                <div key={label} className="flex items-center gap-3 mb-4 last:mb-0">
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg" style={{ background: 'rgba(255,106,0,0.08)', border: '1.5px solid rgba(255,106,0,0.2)' }}>{icon}</span>
                  <div>
                    <div className="text-xs" style={{ color: 'rgba(26,26,26,0.28)' }}>{label}</div>
                    <div className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-6" style={{ borderColor: 'rgba(255,106,0,0.2)', background: 'rgba(255,106,0,0.04)' }}>
              <div className="text-lg mb-2" style={{ color: '#FF6A00' }}>⚡ Fast Response</div>
              <p className="text-sm" style={{ color: '#6B6B6B' }}>We respond to every single enquiry within 24 hours. If you don't hear from us, check your spam folder.</p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-md" style={{ height: 200 }}>
              <img src="https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&h=400&fit=crop&crop=center" alt="Music studio" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
