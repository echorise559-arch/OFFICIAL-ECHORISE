// ── Brevo (Sendinblue) transactional email utility ────────────────────────────
// Template 1 = Invoice  |  Template 2 = Payment Confirmation
//
// ⚠️  The API key is NEVER in client code.
// All Brevo calls go through /.netlify/functions/send-email (server-side).
// On Netlify → Site configuration → Environment variables → add BREVO_API_KEY
// (NO VITE_ prefix — that would expose it in the client bundle)

const BASE_URL = 'https://echorisemedia.com'
const SENDER   = { name: 'Echorise Media', email: 'support@echorisemedia.com' }

// ── Formspree — owner notification helper ────────────────────────────────────
export async function notifyOwner(formId, payload) {
  try {
    await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (_) {}
}

// ── helpers ──────────────────────────────────────────────────────────────────

function today() {
  return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
}

function dueIn(days = 7) {
  return new Date(Date.now() + days * 86_400_000)
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
}

function buildPaymentLink({ invoiceNum, amount, service, artistName, artistEmail }) {
  const params = new URLSearchParams({
    ref:     invoiceNum,
    amount:  amount > 0 ? String(amount) : '0',
    service: service || '',
    name:    artistName || '',
    email:   artistEmail || '',
  })
  return `${BASE_URL}/order?${params.toString()}`
}

// Sends payload to the Netlify function which calls Brevo server-side
async function post(payload) {
  const res = await fetch('/.netlify/functions/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Server error ${res.status}`)
  }
  return res.json()
}

// ── Template 1 — Invoice ─────────────────────────────────────────────────────
export async function sendInvoiceEmail(p) {
  const invoiceDate = today()
  const dueDate     = dueIn(7)
  const paymentLink = buildPaymentLink({
    invoiceNum:  p.invoiceNum,
    amount:      p.amount,
    service:     p.service,
    artistName:  p.artistName,
    artistEmail: p.artistEmail,
  })

  const platform = p.service.split('–')[0].replace('Promotion', '').trim() || 'Music Promotion'

  return post({
    to:         [{ email: p.artistEmail, name: p.artistName }],
    sender:     SENDER,
    replyTo:    SENDER,
    templateId: 1,
    params: {
      artist_name:    p.artistName,
      customer_email: p.artistEmail,
      customer_phone: p.artistPhone || '',
      country:        p.country     || '',
      invoice_number: p.invoiceNum,
      invoice_date:   invoiceDate,
      due_date:       dueDate,
      package_name:   p.service,
      platform:       platform,
      track_title:    p.trackTitle  || '',
      track_link:     p.trackLink   || '',
      notes:          p.notes       || '',
      amount_usd:     p.amount > 0 ? p.amount.toFixed(2) : '0.00',
      payment_link:   paymentLink,
      website_url:    BASE_URL,
      order_url:      `${BASE_URL}/order`,
      contact_url:    `${BASE_URL}/contact`,
      support_email:  'support@echorisemedia.com',
    },
  })
}

// ── Template 2 — Payment Confirmation ────────────────────────────────────────
export async function sendPaymentConfirmation(p) {
  const paymentDate = today()

  const amountLocalDisplay =
    p.localCurrency && p.localCurrency !== 'USD' && p.localAmount
      ? `≈ ${p.localCurrency} ${Number(p.localAmount).toLocaleString()}`
      : ''

  return post({
    to:         [{ email: p.artistEmail, name: p.artistName }],
    sender:     SENDER,
    replyTo:    SENDER,
    templateId: 2,
    params: {
      artist_name:          p.artistName,
      customer_email:       p.artistEmail,
      customer_phone:       p.artistPhone || '',
      country:              p.country     || '',
      invoice_number:       p.invoiceNum,
      invoice_date:         paymentDate,
      transaction_ref:      p.transactionRef || p.invoiceNum,
      platform:             p.platform,
      package_name:         p.packageName,
      track_link:           p.trackLink      || '',
      notes:                p.notes          || '',
      amount_usd:           p.price > 0 ? String(p.price) : '0',
      amount_local_display: amountLocalDisplay,
      website_url:          BASE_URL,
      order_url:            `${BASE_URL}/order`,
      contact_url:          `${BASE_URL}/contact`,
      support_email:        'support@echorisemedia.com',
    },
  })
}
