import { useLocation, Link } from 'react-router-dom'

export default function SuccessPage() {
  const { state } = useLocation()
  const { orderData, invoiceNum, price, localAmount, localCurrency } = state || {}
  const isPaid = price > 0
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  const handleDownload = () => {
    if (!orderData) return
    const lines = [
      'ECHORISE MEDIA',
      'support@echorisemedia.com',
      '─────────────────────────────',
      `Reference #: ${invoiceNum}`,
      `Date: ${date}`,
      `Status: ${isPaid ? 'PAID' : 'CUSTOM QUOTE REQUEST'}`,
      '─────────────────────────────',
      `Artist Name: ${orderData.artistName}`,
      `Email: ${orderData.email}`,
      `Platform: ${orderData.platform}`,
      `Country: ${orderData.country}`,
      orderData.notes ? `Notes: ${orderData.notes}` : '',
      '─────────────────────────────',
      isPaid
        ? localAmount && localCurrency && localCurrency !== 'USD'
          ? `AMOUNT PAID: ${localCurrency} ${Number(localAmount).toLocaleString()} ($${price} USD)`
          : `AMOUNT PAID: $${price}.00 USD`
        : 'Custom Quote — our team will be in touch within 24hrs.',
      '─────────────────────────────',
      isPaid ? 'Payment processed via Flutterwave' : '',
      'Campaign begins within 24–48 hours.',
      'Thank you for choosing Echorise Media.',
    ].filter(Boolean).join('\n')

    const blob = new Blob([lines], { type: 'text/plain' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `Echorise-Invoice-${invoiceNum}.txt`
    a.click()
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center">
          <h1 className="font-display font-bold text-3xl text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-muted mb-6">Your campaign is being set up. Check your email for details.</p>
          <Link to="/" className="btn-primary">Back to Home →</Link>
        </div>
      </div>
    )
  }

  return (
    <section className="py-32 px-6 min-h-screen" style={{ background: '#FFFFFF' }}>
      <div className="max-w-2xl mx-auto">
        {/* Celebration header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5 text-4xl"
            style={{ background: isPaid ? 'linear-gradient(135deg,rgba(16,185,129,0.2),rgba(16,185,129,0.05))' : 'linear-gradient(135deg,rgba(255,106,0,0.2),rgba(255,106,0,0.05))', border: isPaid ? '2px solid rgba(16,185,129,0.4)' : '2px solid rgba(255,106,0,0.4)' }}>
            {isPaid ? '✓' : '📋'}
          </div>
          <h1 className="font-display font-bold text-4xl text-gray-900 mb-3">
            {isPaid ? 'Payment Confirmed!' : 'Quote Request Received!'}
          </h1>
          <p className="text-muted">
            {isPaid ? "Your campaign is locked in. We'll begin within 24–48 hours." : "Our team will review your request and get back to you within 24 hours."}
          </p>
        </div>

        {/* Invoice card */}
        <div className="glass-card p-8 mb-6" style={{ borderColor: isPaid ? 'rgba(16,185,129,0.2)' : 'rgba(255,106,0,0.2)' }}>
          {/* Invoice header */}
          <div className="flex justify-between items-start mb-6 pb-5 flex-wrap gap-4" style={{ borderBottom: '1px solid rgba(26,26,26,0.08)' }}>
            <div>
              <div className="font-display font-bold text-xl" style={{ background: 'linear-gradient(135deg,#FF6A00,#FF6A00,#FF6A00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, letterSpacing: '-0.03em' }}>echorise<span style={{ color: '#FF6A00' }}>.</span></span>
              </div>
              <div className="text-muted text-xs mt-1">support@echorisemedia.com</div>
            </div>
            <div className="text-right">
              {isPaid ? (
                <span className="text-xs font-display font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}>
                  ✓ PAID
                </span>
              ) : (
                <span className="text-xs font-display font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,106,0,0.12)', border: '1px solid rgba(255,106,0,0.3)', color: '#FF6A00' }}>
                  ⏳ PENDING QUOTE
                </span>
              )}
              <div className="text-muted text-xs mt-2">Ref #{invoiceNum}</div>
            </div>
          </div>

          <h3 className="font-display font-semibold text-gray-900 mb-5">
            {isPaid ? 'Payment Receipt' : 'Quote Request Summary'}
          </h3>

          <div className="flex flex-col">
            {[
              ['Date', date],
              ['Artist Name', orderData.artistName],
              ['Email', orderData.email],
              ['Platform', orderData.platform],
              ['Country', orderData.country],
              ...(orderData.notes ? [['Notes', orderData.notes]] : []),
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-3 text-sm gap-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <span className="text-muted flex-shrink-0">{k}</span>
                <span className="text-gray-900 font-medium text-right">{v}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-5 font-display font-bold">
              <span className="text-gray-900 text-lg">{isPaid ? 'Amount Paid' : 'Estimated Budget'}</span>
              <span className="text-2xl" style={{ background: 'linear-gradient(135deg,#FF6A00,#FF6A00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {isPaid
                  ? localAmount && localCurrency && localCurrency !== 'USD'
                    ? `${localCurrency} ${Number(localAmount).toLocaleString()} ($${price} USD)`
                    : `$${price}.00 USD`
                  : 'Custom Quote'}
              </span>
            </div>
          </div>

          <div className="mt-5 p-4 rounded-xl text-sm text-muted" style={{ background: isPaid ? 'rgba(16,185,129,0.07)' : 'rgba(255,106,0,0.06)', border: isPaid ? '1px solid rgba(16,185,129,0.15)' : '1px solid rgba(255,106,0,0.18)' }}>
            {isPaid
              ? <>✓ Payment processed securely via Flutterwave &nbsp;·&nbsp; A receipt has been sent to <strong className="text-gray-900">{orderData.email}</strong> &nbsp;·&nbsp; Campaign begins within 24–48 hours.</>
              : <>📋 Quote request received &nbsp;·&nbsp; Our team will contact <strong className="text-gray-900">{orderData.email}</strong> within 24 hours with a custom offer.</>
            }
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 flex-wrap">
          {isPaid && (
            <button onClick={handleDownload} className="btn-outline flex-1 justify-center">⬇ Download Receipt</button>
          )}
          <Link to="/" className="btn-primary flex-1 justify-center">Back to Home →</Link>
        </div>

        {/* What's next */}
        <div className="glass-card p-7 mt-8">
          <h4 className="font-display font-semibold text-gray-900 mb-4">What Happens Next?</h4>
          <div className="flex flex-col gap-3">
            {[['24–48 hrs','Our team reviews your track and begins campaign setup.'],['Week 1','Your track is promoted to targeted channels and real listeners.'],['Week 2–3','Listen counts, saves, and engagement grow organically.'],['Campaign End','You receive a detailed analytics report with all campaign data.']].map(([time, desc]) => (
              <div key={time} className="flex gap-3 text-sm">
                <span className="font-display font-semibold text-pink flex-shrink-0 w-20">{time}</span>
                <span className="text-muted">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
