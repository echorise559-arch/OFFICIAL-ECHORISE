import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendPaymentConfirmation, notifyOwner } from '../utils/brevo'
import ModalPortal from './ModalPortal'

// Formspree form ID — owner notified ONLY after Flutterwave confirms payment
const PAYMENT_FORM_ID = 'mojppyke'

const FLW_PUBLIC_KEY = 'FLWPUBK-f9b17c5ddc2ffc1700b32fa0ff03eec8-X'

// Currency map by country — falls back to USD
const CURRENCY_MAP = {
  'Nigeria': 'NGN', 'United Kingdom': 'GBP', 'United States': 'USD',
  'Canada': 'CAD', 'Germany': 'EUR', 'France': 'EUR', 'Italy': 'EUR',
  'Spain': 'EUR', 'Netherlands': 'EUR', 'Belgium': 'EUR', 'Austria': 'EUR',
  'Portugal': 'EUR', 'Greece': 'EUR', 'Finland': 'EUR', 'Ireland': 'EUR',
  'Australia': 'AUD', 'New Zealand': 'NZD', 'Japan': 'JPY', 'India': 'INR',
  'South Africa': 'ZAR', 'Ghana': 'GHS', 'Kenya': 'KES', 'Uganda': 'UGX',
  'Tanzania': 'TZS', 'Rwanda': 'RWF', 'Zambia': 'ZMW',
  'Egypt': 'EGP', 'Morocco': 'MAD', 'Tunisia': 'TND',
  'Brazil': 'BRL', 'Mexico': 'MXN', 'Chile': 'CLP', 'Colombia': 'COP',
  'Peru': 'PEN', 'Argentina': 'ARS', 'Uruguay': 'UYU',
  'Sweden': 'SEK', 'Norway': 'NOK', 'Denmark': 'DKK', 'Poland': 'PLN',
  'Switzerland': 'CHF', 'Singapore': 'SGD', 'Malaysia': 'MYR',
  'Indonesia': 'IDR', 'Philippines': 'PHP', 'Thailand': 'THB',
  'Vietnam': 'VND', 'South Korea': 'KRW', 'Pakistan': 'PKR',
  'Bangladesh': 'BDT', 'UAE': 'AED', 'Saudi Arabia': 'SAR',
  'Lebanon': 'USD', 'Jamaica': 'JMD', 'Trinidad & Tobago': 'TTD',
}

// Fetch real exchange rates from open.er-api.com (free, no key needed)
async function fetchRate(targetCurrency) {
  if (targetCurrency === 'USD') return 1
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/USD`)
    const data = await res.json()
    if (data.rates && data.rates[targetCurrency]) return data.rates[targetCurrency]
  } catch (_) {}
  return null
}

// Payment method options by currency region
const PAYMENT_OPTIONS = 'card,banktransfer,ussd,mobilemoney,barter,nqr'

const PAYMENT_ICONS = [
  { label: 'Visa / Mastercard', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
    </svg>
  )},
  { label: 'Bank Transfer', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zM11.5 1L2 6v2h19V6l-9.5-5z"/>
    </svg>
  )},
  { label: 'Mobile Money', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-4.2-5.78v1.75l3.2-2.99L12.8 9v1.7c-3.11.43-4.35 2.56-4.8 4.7 1.11-1.5 2.58-2.18 4.8-2.18z"/>
    </svg>
  )},
  { label: 'USSD', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  )},
]

export default function PaymentModal({ orderData, onClose, onBack }) {
  const [processing, setProcessing] = useState(false)
  const [localDisplay, setLocalDisplay] = useState(null)  // { amount, currency, loading }
  const navigate = useNavigate()
  const overlayRef = useRef(null)

  // Scroll overlay to top when payment modal appears
  useEffect(() => {
    if (overlayRef.current) overlayRef.current.scrollTop = 0
  }, [])

  const pkg = orderData?.pkgObj
  const priceUSD = pkg?.price || orderData?.customPrice || 0
  const currency = CURRENCY_MAP[orderData?.country] || 'USD'
  const txRef = 'ECH-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase()

  // displayAmount is computed fresh inside handlePay — no stale state race condition

  // Fetch rate for display as user reviews order (non-blocking)
  useEffect(() => {
    if (!priceUSD || currency === 'USD') { setLocalDisplay(null); return }
    setLocalDisplay(d => ({ ...d, loading: true }))
    fetchRate(currency).then(rate => {
      if (rate) setLocalDisplay({ amount: Math.round(priceUSD * rate * 100) / 100, currency, loading: false })
      else setLocalDisplay(null)
    }).catch(() => setLocalDisplay(null))
  }, [priceUSD, currency])

  const handlePay = async () => {
    if (priceUSD === 0) {
      // Custom quote — just navigate to success/contact
      navigate('/success', { state: { orderData, invoiceNum: txRef, price: 0 } })
      onClose()
      return
    }

    setProcessing(true)

    // Always fetch a fresh live rate right before charging — never rely on stale state
    let chargeAmount = priceUSD
    try {
      if (currency !== 'USD') {
        const res = await fetch('https://open.er-api.com/v6/latest/USD')
        const data = await res.json()
        if (data.rates?.[currency]) {
          chargeAmount = Math.round(priceUSD * data.rates[currency] * 100) / 100
        }
      }
    } catch (_) {
      chargeAmount = priceUSD // fallback to USD amount if fetch fails
    }

    window.FlutterwaveCheckout({
      public_key: FLW_PUBLIC_KEY,
      tx_ref: txRef,
      amount: chargeAmount,
      currency: currency,
      payment_options: PAYMENT_OPTIONS,
      customer: {
        email: orderData.email,
        name: orderData.artistName,
      },
      customizations: {
        title: 'Echorise Media',
        description: `${pkg?.name || 'Campaign'} – ${orderData?.platform || ''}`,
        logo: 'https://echorisemedia.netlify.app/favicon.svg',
      },
      callback: async function (data) {
        if (data.status === 'successful' || data.status === 'completed') {
          // Send Brevo payment confirmation receipt (template 2)
          try {
            await sendPaymentConfirmation({
              artistName:      orderData.artistName,
              artistEmail:     orderData.email,
              artistPhone:     orderData.phone     || '',
              platform:        orderData.platform,
              packageName:     pkg?.label || pkg?.name || 'Custom Campaign',
              country:         orderData.country,
              price:           priceUSD,
              invoiceNum:      txRef,
              transactionRef:  data.transaction_id ? `FLW-${data.transaction_id}` : txRef,
              trackLink:       orderData.trackLink || '',
              localAmount:     chargeAmount,
              localCurrency:   currency,
              notes:           orderData.notes     || '',
            })
          } catch (e) {
            console.error('Brevo confirmation error:', e)
          }
          // Notify owner via Formspree — fires ONLY after Flutterwave confirms payment
          notifyOwner(PAYMENT_FORM_ID, {
            _subject: `💰 Payment Confirmed — ${orderData.artistName} · ${pkg?.label || 'Custom'} · ${currency} ${chargeAmount.toLocaleString()}`,
            formType: 'payment_confirmed',
            artistName:     orderData.artistName,
            email:          orderData.email,
            platform:       orderData.platform,
            package:        pkg?.label || pkg?.name || 'Custom Campaign',
            country:        orderData.country,
            amountUSD:      `$${priceUSD}`,
            amountLocal:    `${currency} ${chargeAmount.toLocaleString()}`,
            transactionRef: data.transaction_id ? `FLW-${data.transaction_id}` : txRef,
            invoiceRef:     txRef,
            trackLink:      orderData.trackLink || '',
            notes:          orderData.notes     || '',
            confirmedAt:    new Date().toISOString(),
          })
          navigate('/success', { state: { orderData, invoiceNum: txRef, price: priceUSD } })
          onClose()
        } else {
          setProcessing(false)
        }
      },
      onclose: function () {
        setProcessing(false)
      },
    })
  }

  return (
    <ModalPortal>
    <div ref={overlayRef} className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 480 }}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-pink transition-colors"
          style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(26,26,26,0.12)' }}>✕</button>

        <div className="mb-6">
          <span className="section-label">Secure Payment</span>
          <h2 className="font-display font-bold text-2xl">Complete Your <span className="grad-text">Order</span></h2>
        </div>

        {/* Order Summary */}
        <div className="rounded-xl p-5 mb-5" style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="font-display font-semibold text-sm mb-3 text-gray-900">Order Summary</div>
          {[
            ['Artist', orderData?.artistName],
            ['Package', pkg?.label || pkg?.name],
            ['Platform', orderData?.platform],
            ['Country', orderData?.country],
            ['Currency', currency],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-2 text-sm" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
              <span className="text-gray-500">{k}</span>
              <span className="text-gray-900 font-medium">{v}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3 font-display font-bold">
            <span className="text-gray-900">Total Due</span>
            <span className="grad-text text-xl">{priceUSD > 0 ? `$${priceUSD} USD${currency !== "USD" ? ` ≈ ${currency} ${!localDisplay || localDisplay.loading ? "..." : localDisplay.amount.toLocaleString()}` : ""}` : 'Custom Quote'}</span>
          </div>
        </div>

        {/* Flutterwave panel */}
        <div className="rounded-xl p-5 mb-5" style={{ background: 'rgba(255,106,0,0.06)', border: '1px solid rgba(255,106,0,0.20)' }}>
          <div className="flex items-center gap-3 mb-3">
            {/* Flutterwave wordmark SVG */}
            <svg viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg" width="110" height="26">
              <text x="0" y="22" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="20" fill="#F5A623">flutterwave</text>
            </svg>
            <span className="text-xs text-gray-500 ml-1">Secure Gateway</span>
          </div>
          <p className="text-gray-500 text-xs mb-3">Billed in <strong className="text-gray-900">{currency}</strong>. All transactions are 256-bit SSL encrypted.</p>
          <div className="flex flex-wrap gap-2">
            {PAYMENT_ICONS.map(({ label, icon }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-gray-500 px-2.5 py-1.5 rounded-lg"
                style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <span style={{ color: '#FF6A00' }}>{icon}</span> {label}
              </span>
            ))}
          </div>
        </div>

        <button onClick={handlePay} disabled={processing}
          className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60">
          {processing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin" viewBox="0 0 24 24" fill="none" width="18" height="18">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              Opening Payment…
            </span>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              Pay Now · {currency} {priceUSD > 0 ? (!localDisplay || localDisplay.loading ? "..." : localDisplay.amount.toLocaleString()) : "Custom"}
            </>
          )}
        </button>

        <button onClick={onBack} className="w-full text-center text-gray-500 text-xs mt-3 hover:text-gray-900 transition-colors py-2">
          ← Back to order form
        </button>

        <p className="text-center text-gray-500 text-xs mt-1">256-bit SSL · PCI-DSS compliant · Invoice sent to your email</p>
      </div>
    </div>
    </ModalPortal>
  )
}
