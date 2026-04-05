// ── Brevo (Sendinblue) transactional email utility ────────────────────────────
// Template 1 = Invoice  |  Template 2 = Payment Confirmation
//
// ⚠️  The API key is NEVER hardcoded here.
// It is read from the environment variable VITE_BREVO_API_KEY.
// On Netlify → Site configuration → Environment variables → add VITE_BREVO_API_KEY
// Locally    → create a .env file in your project root with:
//              VITE_BREVO_API_KEY=xkeysib-your-full-key-here

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'
const BASE_URL      = 'https://echorisemedia.com'

const SENDER = { name: 'Echorise Media', email: 'support@echorisemedia.com' }

// ── Formspree — owner notification helper ────────────────────────────────────
// Sends an instant notification to the site owner via Formspree.
// formId  : the Formspree form ID (e.g. 'mojppyke')
// payload : plain object of fields to include in the notification email
// Non-blocking — never throws; owner notification must not break the user flow.
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

/** Build the invoice deep-link so the artist lands on /order with amount pre-filled */
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

async function post(payload) {
  if (!BREVO_API_KEY) {
    console.error('Brevo: VITE_BREVO_API_KEY is not set. Add it to Netlify environment variables.')
    throw new Error('Brevo API key is missing.')
  }
  const res = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Brevo error ${res.status}`)
  }
  return res.json()
}

// ── Template 1 — Invoice ─────────────────────────────────────────────────────
/**
 * @param {{
 *   artistName: string,
 *   artistEmail: string,
 *   artistPhone?: string,
 *   service: string,
 *   amount: number,
 *   invoiceNum: string,
 *   trackTitle?: string,
 *   trackLink?: string,
 *   notes?: string,
 *   country?: string,
 * }} p
 */
export async function sendInvoiceEmail(p) {
  const invoiceDate  = today()
  const dueDate      = dueIn(7)
  const paymentLink  = buildPaymentLink({
    invoiceNum:  p.invoiceNum,
    amount:      p.amount,
    service:     p.service,
    artistName:  p.artistName,
    artistEmail: p.artistEmail,
  })

  const platform = p.service.split('–')[0].replace('Promotion', '').trim() || 'Music Promotion'

  return post({
    to:        [{ email: p.artistEmail, name: p.artistName }],
    sender:    SENDER,
    replyTo:   SENDER,
    templateId: 1,
    params: {
      artist_name:    p.artistName,
      customer_email: p.artistEmail,
      customer_phone: p.artistPhone || '',
      country:        p.country    || '',
      invoice_number: p.invoiceNum,
      invoice_date:   invoiceDate,
      due_date:       dueDate,
      package_name:   p.service,
      platform:       platform,
      track_title:    p.trackTitle || '',
      track_link:     p.trackLink  || '',
      notes:          p.notes      || '',
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
/**
 * @param {{
 *   artistName: string,
 *   artistEmail: string,
 *   artistPhone?: string,
 *   platform: string,
 *   packageName: string,
 *   country: string,
 *   price: number,
 *   invoiceNum: string,
 *   transactionRef?: string,
 *   trackLink?: string,
 *   localAmount?: number,
 *   localCurrency?: string,
 *   notes?: string,
 * }} p
 */
export async function sendPaymentConfirmation(p) {
  const paymentDate = today()

  const amountLocalDisplay =
    p.localCurrency && p.localCurrency !== 'USD' && p.localAmount
      ? `≈ ${p.localCurrency} ${Number(p.localAmount).toLocaleString()}`
      : ''

  return post({
    to:        [{ email: p.artistEmail, name: p.artistName }],
    sender:    SENDER,
    replyTo:   SENDER,
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
      track_link:           p.trackLink || '',
      notes:                p.notes     || '',
      amount_usd:           p.price > 0 ? String(p.price) : '0',
      amount_local_display: amountLocalDisplay,
      website_url:          BASE_URL,
      order_url:            `${BASE_URL}/order`,
      contact_url:          `${BASE_URL}/contact`,
      support_email:        'support@echorisemedia.com',
    },
  })
}
