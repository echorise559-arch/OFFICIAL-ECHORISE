import useSEO from '../hooks/useSEO'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendPaymentConfirmation } from '../utils/brevo'
import { COUNTRIES, PLATFORMS, SPOTIFY_PACKAGES, SOUNDCLOUD_PACKAGES, CHART_PACKAGES, DANCE_PACKAGES } from '../data'
import PageHero from '../components/PageHero'

const ALL_PACKAGES = [
  ...SPOTIFY_PACKAGES.map(p => ({ ...p, label: `Spotify – ${p.name}`, category: 'Spotify' })),
  ...SOUNDCLOUD_PACKAGES.map(p => ({ ...p, label: `SoundCloud – ${p.name}`, category: 'SoundCloud' })),
  ...CHART_PACKAGES.map(p => ({ ...p, label: `Chart – ${p.name}`, category: 'Chart' })),
  ...DANCE_PACKAGES.map(p => ({ ...p, label: `Dance – ${p.name}`, category: 'Dance' })),
  { id: 'custom', name: 'Custom', price: 0, label: 'Custom Campaign', category: 'Custom', features: [] },
]

const INIT = { artistName: '', email: '', trackLink: '', platform: '', package: '', country: '', notes: '' }

const CURRENCY_MAP = {
  'Nigeria': 'NGN', 'United Kingdom': 'GBP', 'United States': 'USD',
  'Canada': 'CAD', 'Germany': 'EUR', 'France': 'EUR', 'Italy': 'EUR',
  'Spain': 'EUR', 'Netherlands': 'EUR', 'Belgium': 'EUR', 'Austria': 'EUR',
  'Portugal': 'EUR', 'Greece': 'EUR', 'Finland': 'EUR', 'Ireland': 'EUR',
  'Australia': 'AUD', 'New Zealand': 'NZD', 'Japan': 'JPY', 'India': 'INR',
  'South Africa': 'ZAR', 'Ghana': 'GHS', 'Kenya': 'KES', 'Uganda': 'UGX',
  'Tanzania': 'TZS', 'Rwanda': 'RWF', 'Zambia': 'ZMW', 'Egypt': 'EGP',
  'Morocco': 'MAD', 'Tunisia': 'TND', 'Brazil': 'BRL', 'Mexico': 'MXN',
  'Chile': 'CLP', 'Colombia': 'COP', 'Peru': 'PEN', 'Argentina': 'ARS',
  'Sweden': 'SEK', 'Norway': 'NOK', 'Denmark': 'DKK', 'Poland': 'PLN',
  'Switzerland': 'CHF', 'Singapore': 'SGD', 'Malaysia': 'MYR',
  'Indonesia': 'IDR', 'Philippines': 'PHP', 'Thailand': 'THB',
  'Vietnam': 'VND', 'South Korea': 'KRW', 'Pakistan': 'PKR',
  'Bangladesh': 'BDT', 'UAE': 'AED', 'Saudi Arabia': 'SAR',
  'Lebanon': 'USD', 'Jamaica': 'JMD', 'Trinidad & Tobago': 'TTD',
}

export default function OrderPage() {
  useSEO({ title: 'Order Music Promotion | Echorise Media', description: 'Start your music promotion campaign today. Choose a Spotify, SoundCloud, YouTube, Apple Music, chart or TikTok package and get real results within 24-48 hours.', canonical: 'https://echorisemedia.com/order' })
  const [form, setForm] = useState(INIT)
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState(1)
  const [localAmount, setLocalAmount] = useState(null)
  const [rateLoading, setRateLoading] = useState(false)
  const navigate = useNavigate()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  // selectedPkg must be declared BEFORE useEffect so it's in scope
  const selectedPkg = ALL_PACKAGES.find(p => p.id === form.package)
  const selectedCurrency = CURRENCY_MAP[form.country] || 'USD'

  // Fetch live rate whenever country or package changes so Step 2 shows local price
  useEffect(() => {
    const price = selectedPkg?.price || 0
    if (!price || selectedCurrency === 'USD') { setLocalAmount(null); return }
    setRateLoading(true)
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(r => r.json())
      .then(d => {
        const rate = d.rates?.[selectedCurrency]
        setLocalAmount(rate ? Math.round(price * rate * 100) / 100 : null)
      })
      .catch(() => setLocalAmount(null))
      .finally(() => setRateLoading(false))
  }, [form.country, form.package])

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

  const handleOrder = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Advance to review step — no Formspree here, only fires after confirmed payment
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePay = async () => {
    const invoiceNum = 'ECH-' + Date.now() + '-' + Math.random().toString(36).slice(2, 5).toUpperCase()
    const priceUSD = selectedPkg?.price || 0

    if (priceUSD === 0) {
      // Custom quote — go straight to success, no payment needed
      navigate('/success', { state: { orderData: form, invoiceNum, price: 0 } })
      return
    }

    setStep(3)

    const currency = CURRENCY_MAP[form.country] || 'USD'

    // Fetch live exchange rate before charging
    let chargeAmount = priceUSD
    try {
      if (currency !== 'USD') {
        const rateRes = await fetch('https://open.er-api.com/v6/latest/USD')
        const rateData = await rateRes.json()
        if (rateData.rates?.[currency]) {
          chargeAmount = Math.round(priceUSD * rateData.rates[currency] * 100) / 100
        }
      }
    } catch (_) {
      // Fall back to USD if rate fetch fails
      chargeAmount = priceUSD
    }

    window.FlutterwaveCheckout({
      public_key: 'FLWPUBK-f9b17c5ddc2ffc1700b32fa0ff03eec8-X',
      tx_ref: invoiceNum,
      amount: chargeAmount,
      currency: currency,
      payment_options: 'card,banktransfer,ussd,mobilemoney,barter,nqr',
      customer: {
        email: form.email,
        name: form.artistName,
      },
      customizations: {
        title: 'Echorise Media',
        description: `${selectedPkg?.label || 'Campaign'} – ${form.platform || ''}`,
        logo: 'https://echorisemedia.netlify.app/favicon.svg',
      },
      callback: async function (data) {
        if (data.status === 'successful' || data.status === 'completed') {
          // Brevo confirmation ONLY after Flutterwave confirms payment
          try {
            await sendPaymentConfirmation({
              artistName:     form.artistName,
              artistEmail:    form.email,
              platform:       form.platform,
              packageName:    selectedPkg?.label || form.package,
              country:        form.country,
              price:          priceUSD,
              invoiceNum,
              transactionRef: data.transaction_id ? `FLW-${data.transaction_id}` : invoiceNum,
              trackLink:      form.trackLink || '',
              localAmount:    chargeAmount,
              localCurrency:  currency,
              notes:          form.notes,
            })
          } catch (err) {
            console.error('Brevo confirmation error:', err)
          }
          navigate('/success', {
            state: {
              orderData:     form,
              invoiceNum,
              price:         priceUSD,
              localAmount:   chargeAmount,
              localCurrency: currency,
            },
          })
        } else {
          setStep(2)
        }
      },
      onclose: function () {
        setStep(2)
      },
    })
  }

  return (
    <>
      <PageHero
        label="Place Your Order"
        title={<>Start Your <span className="grad-text">Campaign</span></>}
        subtitle="Complete the form below to launch your music promotion campaign. We'll begin within 24 hours of your order."
        image="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=900&h=700&fit=crop&crop=center"
      />

      <section className="py-10 px-6 pb-28" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-10">
            {[['1','Campaign Details'], ['2','Review & Pay'], ['3','Processing']].map(([n, label], i) => (
              <div key={n} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm transition-all ${step > i ? 'text-white' : step === i + 1 ? 'text-white' : 'text-muted'}`}
                  style={{ background: step > i + 1 ? '#1DB954' : step === i + 1 ? '#FF6A00' : 'rgba(26,26,26,0.08)' }}>
                  {step > i + 1 ? '✓' : n}
                </div>
                <span className={`text-sm font-display hidden sm:inline ${step === i + 1 ? 'text-gray-900' : 'text-muted'}`}>{label}</span>
                {i < 2 && <div className="w-8 h-px mx-1" style={{ background: 'rgba(26,26,26,0.10)' }} />}
              </div>
            ))}
          </div>

          {/* Step 1: Form */}
          {step === 1 && (
            <div className="glass-card p-8">
              <h3 className="font-display font-bold text-xl text-gray-900 mb-6">Campaign Details</h3>
              <form onSubmit={handleOrder}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[['artistName','Artist Name','Your artist / stage name','text'],['email','Email Address','your@email.com','email']].map(([k,label,ph,type]) => (
                    <div key={k}>
                      <label className="block text-xs font-display font-semibold text-muted mb-1.5 uppercase tracking-wider">{label} *</label>
                      <input name={k} type={type} className={`form-input ${errors[k] ? 'border-red-500' : ''}`} placeholder={ph} value={form[k]} onChange={e => set(k, e.target.value)} />
                      {errors[k] && <p className="text-red-400 text-xs mt-1">{errors[k]}</p>}
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-display font-semibold text-muted mb-1.5 uppercase tracking-wider">Track Link *</label>
                    <input name="trackLink" type="url" className={`form-input ${errors.trackLink ? 'border-red-500' : ''}`} placeholder="https://open.spotify.com/track/..." value={form.trackLink} onChange={e => set('trackLink', e.target.value)} />
                    {errors.trackLink && <p className="text-red-400 text-xs mt-1">{errors.trackLink}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-display font-semibold text-muted mb-1.5 uppercase tracking-wider">Platform *</label>
                    <select name="platform" className={`form-input ${errors.platform ? 'border-red-500' : ''}`} value={form.platform} onChange={e => set('platform', e.target.value)}>
                      <option value="">Select platform</option>
                      {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                    </select>
                    {errors.platform && <p className="text-red-400 text-xs mt-1">{errors.platform}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-display font-semibold text-muted mb-1.5 uppercase tracking-wider">Package *</label>
                    <select name="package" className={`form-input ${errors.package ? 'border-red-500' : ''}`} value={form.package} onChange={e => set('package', e.target.value)}>
                      <option value="">Select package</option>
                      {['Spotify','SoundCloud','Chart','Dance','Custom'].map(cat => (
                        <optgroup key={cat} label={`── ${cat} ──`}>
                          {ALL_PACKAGES.filter(p => p.category === cat).map(p => (
                            <option key={p.id} value={p.id}>{p.label} {p.price > 0 ? `($${p.price})` : ''}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {errors.package && <p className="text-red-400 text-xs mt-1">{errors.package}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-display font-semibold text-muted mb-1.5 uppercase tracking-wider">Country *</label>
                    <select name="country" className={`form-input ${errors.country ? 'border-red-500' : ''}`} value={form.country} onChange={e => set('country', e.target.value)}>
                      <option value="">Select your country</option>
                      {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.flag} {c.name}</option>)}
                    </select>
                    {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-display font-semibold text-muted mb-1.5 uppercase tracking-wider">Notes / Special Requests</label>
                    <textarea name="notes" className="form-input resize-none" rows={3} placeholder="Target genre, specific markets, campaign goals, release date…" value={form.notes} onChange={e => set('notes', e.target.value)} />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full justify-center mt-6 py-4 text-base">Continue to Payment →</button>
              </form>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              {/* Invoice preview */}
              <div className="glass-card p-8">
                <div className="flex justify-between items-start mb-6 pb-5" style={{ borderBottom: '1px solid rgba(26,26,26,0.08)' }}>
                  <div>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.03em', color: '#1A1A1A' }}>echorise<span style={{ color: '#FF6A00' }}>.</span></div>
                    <div className="text-muted text-xs mt-1">support@echorisemedia.com</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-display font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}>PENDING</div>
                    <div className="text-muted text-xs mt-1">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>
                </div>
                <h4 className="font-display font-semibold text-gray-900 mb-4">Order Summary</h4>
                {[['Artist Name', form.artistName], ['Email', form.email], ['Platform', form.platform], ['Package', selectedPkg?.label || form.package], ['Country', form.country], ...(form.notes ? [['Notes', form.notes]] : [])].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2.5 text-sm" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <span className="text-muted">{k}</span>
                    <span className="text-gray-900 font-medium text-right max-w-xs">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-4 font-display font-bold text-lg">
                  <span className="text-gray-900">Total Due</span>
                  <span className="grad-text">
                    {selectedPkg?.price > 0
                      ? localAmount && selectedCurrency !== 'USD'
                        ? `${selectedCurrency} ${rateLoading ? '…' : localAmount.toLocaleString()} ($${selectedPkg.price} USD)`
                        : `$${selectedPkg.price}.00 USD`
                      : 'Custom Quote'}
                  </span>
                </div>
              </div>

              {/* Payment */}
              <div className="glass-card p-8" style={{ borderColor: 'rgba(255,106,0,0.2)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display font-black text-xl text-pink">flutterwave</span>
                  <span className="text-xs text-muted">Secure Payment Gateway</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {['💳 Visa','💳 Mastercard','🏦 Bank Transfer','📱 Mobile Money','📲 USSD'].map(m => (
                    <span key={m} className="text-xs text-muted px-2.5 py-1 rounded-md" style={{ background: 'rgba(26,26,26,0.08)' }}>{m}</span>
                  ))}
                </div>
                <button onClick={handlePay} className="btn-primary w-full justify-center py-4 text-base">
                  {step === 3 ? '⏳ Processing…' : '🔒 Pay Now via Flutterwave'}
                </button>
                <button onClick={() => setStep(1)} className="w-full text-center text-muted text-xs mt-3 hover:text-gray-900 transition-colors">← Edit order details</button>
                <p className="text-center text-muted text-xs mt-2">256-bit SSL encryption · Receipt emailed after payment</p>
              </div>
            </div>
          )}

          {/* Step 3: Processing */}
          {step === 3 && (
            <div className="glass-card p-12 text-center">
              <div className="text-5xl mb-6 animate-spin-slow">⏳</div>
              <h3 className="font-display font-bold text-2xl text-gray-900 mb-3">Processing Payment…</h3>
              <p className="text-muted">Please don't close this page. You'll be redirected to your invoice shortly.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
