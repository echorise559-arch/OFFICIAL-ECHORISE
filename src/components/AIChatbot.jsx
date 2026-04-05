import { useState, useRef, useEffect } from 'react'

// ─── KNOWLEDGE BASE ───────────────────────────────────────────────────────────
const KB = [
  {
    key: 'greeting',
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'sup', 'howdy', 'start'],
    response: "Hey there! 👋 Great to meet you. I'm **Aria**, your Echorise Media guide.\n\nI can help you with:\n• 🎵 Spotify, SoundCloud & Chart promotion\n• 💃 Dance / TikTok campaigns\n• 💰 Package pricing & what's best for you\n• 💳 How payments & invoices work\n• 🚀 Getting your campaign started\n\nWhat are you working on with your music?"
  },
  {
    key: 'spotify',
    patterns: ['spotify', 'monthly listeners', 'spotify listeners', 'spotify promotion', 'spotify plan', 'spotify package', 'streams', 'stream count'],
    response: "🎵 **Spotify Promotion Packages**\n\n**Starter — $50**\n• 10,000 targeted listeners\n• Genre-matched audience\n• Campaign live within 48hrs\n• Completion report\n\n**Growth — $100** ⭐ Most Popular\n• 22,000 targeted listeners\n• Advanced genre targeting\n• Algorithm boost strategy\n• Campaign live within 24hrs\n• Detailed analytics report\n\n**Premium — $350**\n• 60,000 targeted listeners\n• Global multi-genre reach\n• Full viral push strategy\n• Campaign live within 12hrs\n• Priority support + consultation\n\n**Custom — $50–$10,000**\n• Bespoke strategy for any goal\n\n✅ All listeners are 100% real — no bots, fully ToS-compliant.\n\nWhich package fits your budget?"
  },
  {
    key: 'soundcloud',
    patterns: ['soundcloud', 'sound cloud', 'sc plays', 'soundcloud plays', 'soundcloud promotion', 'soundcloud package'],
    response: "☁️ **SoundCloud Promotion Packages**\n\n**Starter — $50**\n• 10,000 targeted plays\n• Genre-matched listeners\n• Community reposts\n• Completion report\n\n**Growth — $100** ⭐ Most Popular\n• 22,000 targeted plays\n• Follower growth included\n• Priority channel placement\n• Detailed analytics report\n\n**Premium — $350**\n• 60,000 targeted plays\n• Accelerated follower growth\n• Premium reposts network\n• Priority support\n\n✅ All plays from real SoundCloud accounts — no bots.\n\nWhich one works for you?"
  },
  {
    key: 'chart',
    patterns: ['chart', 'billboard', 'chart promotion', 'top 100', 'uk chart', 'usa chart', 'charting', 'chart entry', 'chart package'],
    response: "📊 **Chart Promotion Packages**\n\n**Starter — $150**\n• Small markets: Iceland, Belarus, Luxembourg, Lithuania\n• Verified chart entry + monitoring\n\n**Growth — $250** ⭐ Most Popular\n• Mid-tier markets: Ukraine, Latvia, Estonia\n• Sustained multi-day campaign\n• Real-time monitoring + analytics\n\n**UK Top 100 — $2,200**\n• UK Top 100 chart target\n• Multi-week stream campaign\n• Press & blog outreach\n• Post-chart consultation\n\n**USA Top 100 — $3,500**\n• USA Top 100 chart target\n• Dedicated campaign manager\n• Full press, blog & media outreach\n\nWhich market are you targeting?"
  },
  {
    key: 'dance',
    patterns: ['dance', 'tiktok', 'tik tok', 'reels', 'instagram reels', 'choreography', 'dance challenge', 'dancers', 'dance promotion', 'viral video'],
    response: "💃 **Dance / TikTok Promotion Packages**\n\n**15 Seconds — $150**\n• Posted on Instagram + TikTok\n• 3 professional dancers\n• Genre-matched choreography\n• Delivered within 5 days\n\n**30 Seconds — $300** ⭐ Most Popular\n• Posted on Instagram + TikTok\n• 5 professional dancers\n• Trending hashtag strategy\n• Delivered within 5 days\n\n**Dance Challenge — $1,000**\n• 10 dancers, 20-second videos each\n• Coordinated challenge rollout\n• Trending hashtag strategy\n• Engagement monitoring + full report\n\n✅ All dancers are real creators with engaged audiences.\n\nWhich package fits your vision?"
  },
  {
    key: 'youtube',
    patterns: ['youtube', 'you tube', 'yt views', 'youtube views', 'youtube promotion', 'youtube subscribers'],
    response: "▶️ **YouTube Promotion**\n\nWe offer custom YouTube campaigns tailored to your goals:\n\n• 📈 Views campaigns\n• 👥 Subscriber growth\n• 📺 Channel growth strategy\n• 🎯 Targeted by genre & country\n\n**Pricing: $50–$10,000** depending on scope.\n\nYouTube campaigns are fully custom. Click **\"Order Now\"** on the site and select YouTube as your platform — or email us at **support@echorisemedia.com** for a quote."
  },
  {
    key: 'applemusic',
    patterns: ['apple music', 'apple', 'itunes', 'shazam', 'apple music promotion'],
    response: "🍎 **Apple Music Promotion**\n\nWe offer custom Apple Music campaigns including:\n\n• 🎵 Stream growth campaigns\n• 📊 Shazam chart targeting\n• 🎧 Playlist pitching\n• 🌍 Region-specific targeting\n\n**Pricing: $50–$10,000** depending on scope.\n\nClick **\"Order Now\"** on the site and select Apple Music — or email **support@echorisemedia.com** for a custom quote."
  },
  {
    key: 'pricing',
    patterns: ['price', 'pricing', 'cost', 'how much', 'rates', 'fee', 'affordable', 'budget', 'packages', 'plans', 'what do you offer', 'all packages', 'all plans'],
    response: "💰 **Echorise Media — Full Price Overview**\n\n🎵 **Spotify** — $50 / $100 / $350 / Custom\n☁️ **SoundCloud** — $50 / $100 / $350\n📊 **Chart Promotion** — $150 / $250 / $2,200 / $3,500\n💃 **Dance/TikTok** — $150 / $300 / $1,000\n▶️ **YouTube** — Custom ($50–$10,000)\n🍎 **Apple Music** — Custom ($50–$10,000)\n\n👉 For new artists, we recommend starting with **Spotify Growth at $100** — most popular, best value, real results.\n\nWhich platform are you most focused on?"
  },
  {
    key: 'payment',
    patterns: ['payment', 'how to pay', 'payment method', 'flutterwave', 'bank transfer', 'mobile money', 'ussd', 'currency', 'naira', 'dollar', 'pound', 'pay now', 'checkout'],
    response: "💳 **How Payment Works**\n\nWe use **Flutterwave** — a secure, trusted payment gateway:\n\n• 💳 Visa & Mastercard (credit/debit)\n• 🏦 Bank Transfer\n• 📱 Mobile Money (MTN, Airtel, M-Pesa etc.)\n• 📲 USSD\n• 🔄 Barter & NQR\n\n**Currencies:** USD, GBP, EUR, NGN, GHS, KES, and more — real-time exchange rates applied automatically.\n\n**After payment:**\n✅ Automatic payment confirmation receipt sent to your email\n✅ Campaign starts within 12–48hrs\n\n🔒 256-bit SSL encrypted — fully secure."
  },
  {
    key: 'howlong',
    patterns: ['how long', 'when does', 'campaign start', 'when will', 'how fast', 'timeline', 'delivery time', 'when start', 'how soon', 'time frame'],
    response: "⏱️ **Campaign Timelines**\n\nAfter confirmed payment:\n\n• **Starter packages** → within **48 hours**\n• **Growth packages** → within **24 hours** ⭐\n• **Premium packages** → within **12 hours**\n• **Dance/TikTok** → delivered within **5 days**\n\nOnce live, you'll see growth in your Spotify for Artists / SoundCloud dashboard. A full analytics report is sent to you when the campaign ends. 📊"
  },
  {
    key: 'real',
    patterns: ['real', 'fake', 'bots', 'legit', 'safe', 'tos', 'terms of service', 'ban', 'banned', 'trustworthy', 'genuine', 'authentic', 'real listeners', 'real plays', 'risky'],
    response: "✅ **100% Real — No Bots, Ever**\n\n• 🟢 All listeners are **real, active users** — never bots\n• 🟢 Fully **ToS-compliant** with Spotify, SoundCloud & all platforms\n• 🟢 Your account will **never be at risk** of a ban\n• 🟢 Engagement from genuine genre-matched audiences\n• 🟢 **1,400+ artists** served worldwide\n\nWe've grown artists like **d4vd** (21M+ monthly listeners) and **JVKE** (19M+ monthly listeners) using these exact compliant methods.\n\nYour music career is safe with us. 🎵"
  },
  {
    key: 'order',
    patterns: ['order', 'how to order', 'get started', 'start campaign', 'place order', 'sign up', 'begin', 'purchase', 'buy', 'how do i start', 'how can i start', 'start my campaign'],
    response: "🚀 **How to Place Your Order**\n\n**Step 1️⃣ — Open the Order Form**\nClick the **\"Order Now\"** button anywhere on the site. You'll fill in:\n• Artist Name & Email\n• Track Link (Spotify/SoundCloud/etc.)\n• Platform & Package\n• Your Country\n\n**Step 2️⃣ — Review & Pay**\nCheck your order summary, then pay securely via **Flutterwave**.\n\n**Step 3️⃣ — Campaign Launches!**\n✅ Confirmation receipt sent to your email\n✅ Campaign live within 12–48hrs\n✅ Full analytics report on completion\n\n👉 Ready? Click **\"Order Now\"** on the page!"
  },
  {
    key: 'refund',
    patterns: ['refund', 'money back', 'cancel', 'cancellation', 'guarantee', 'not satisfied', 'dispute'],
    response: "↩️ **Refund & Cancellation Policy**\n\n• Campaigns are **non-refundable once started** — real promotion costs begin immediately\n• If there's an issue **before your campaign launches**, contact us right away\n• Our team responds within **24 hours** to every inquiry\n\nWe stand behind our work. If something isn't right, we'll find a solution together.\n\n📧 **support@echorisemedia.com**"
  },
  {
    key: 'contact',
    patterns: ['contact', 'email', 'support', 'reach you', 'talk to', 'speak to', 'human', 'team', 'customer service', 'help me'],
    response: "📬 **Contact Echorise Media**\n\nOur team responds to every message within **24 hours**.\n\n📧 **Email:** support@echorisemedia.com\n🌐 **Website:** echorisemedia.com\n📝 **Contact Form:** echorisemedia.com/contact\n\nWe're a real team of music promotion professionals — not bots. Real people who love music and want to see your career grow. 🎶"
  },
  {
    key: 'platforms',
    patterns: ['platform', 'platforms', 'which platform', 'all platforms', 'audiomack', 'boomplay', 'deezer', 'tidal', 'amazon music', 'pandora'],
    response: "🌍 **Platforms We Promote On**\n\n🎵 Spotify\n☁️ SoundCloud\n▶️ YouTube\n🍎 Apple Music\n📊 Billboard & Spotify Charts\n💃 TikTok & Instagram Reels\n🎧 Audiomack\n🎶 Boomplay\n🎵 Deezer\n🌊 Tidal\n📻 Amazon Music\n📡 Pandora\n\nWhether your audience is in Africa, Europe, the USA or anywhere else — we have the right channels to reach them.\n\nWhich platform is most important for your music?"
  },
  {
    key: 'countries',
    patterns: ['country', 'countries', 'international', 'global', 'nigeria', 'africa', 'europe', 'worldwide', 'which countries', 'where are you'],
    response: "🌍 **We Serve Artists Globally**\n\nEchorise Media works with artists from **50+ countries**:\n\n🇺🇸 USA · 🇬🇧 UK · 🇳🇬 Nigeria · 🇬🇭 Ghana · 🇦🇺 Australia\n🇨🇦 Canada · 🇩🇪 Germany · 🇫🇷 France · 🇯🇵 Japan · 🇧🇷 Brazil\n🇿🇦 South Africa · 🇰🇪 Kenya · 🇦🇪 UAE · 🇮🇳 India · and many more!\n\nPayments accepted in **multiple currencies** — you pay in your local currency, we handle the rest. 💱"
  },
  {
    key: 'newartist',
    patterns: ['new artist', 'beginner', 'just starting', 'starting out', 'first time', 'brand new', 'no followers', 'small artist', 'unknown', 'grow my music'],
    response: "🌱 **Best Package for New Artists**\n\nWelcome! Here's our recommendation:\n\n**👉 Start with Spotify Growth — $100**\n• 22,000 real, targeted listeners\n• Algorithm boost — helps Spotify discover your music organically\n• Detailed analytics so you see real results\n• Campaign live within 24hrs\n\n**Why Growth over Starter?**\nThe 22,000 listener threshold tends to trigger Spotify's recommendation algorithm, giving your track continued organic reach after the campaign ends.\n\n**After your first campaign, consider:**\n• SoundCloud Growth ($100) — build community\n• Dance/TikTok 30s ($300) — viral potential\n\nMany artists start at $100 and scale up from there. 🚀\n\nReady to place your first order?"
  },
  {
    key: 'invoice',
    patterns: ['invoice', 'receipt', 'bill', 'billing', 'invoice request', 'send invoice'],
    response: "🧾 **Invoices & Receipts**\n\n• We can send a **professional invoice** to your email before payment\n• After successful payment, you automatically receive a **payment confirmation receipt**\n\n**To request an invoice:**\nEmail **support@echorisemedia.com** with your artist name, service needed, and amount — we'll send it right away!\n\nAnything else I can help you with?"
  },
  {
    key: 'topartists',
    patterns: ['d4vd', 'jvke', 'dj uce', 'top artists', 'promoted artists', 'who have you promoted', 'past clients', 'success stories', 'case study', 'results', 'proof'],
    response: "🏆 **Artists We've Promoted**\n\n**🥇 d4vd** (USA)\n• 21.4M monthly listeners\n• \"Romantic Homicide\" — 1.7 Billion streams\n• Campaign: Spotify Growth\n\n**🥈 JVKE** (USA)\n• 19.6M monthly listeners\n• \"Golden Hour\" — 757M+ streams\n• Campaign: Spotify Premium\n\n**🥉 DJ UCE** (Australia)\n• Emerging artist, strong regional growth\n• Campaign: Spotify Starter\n\nReal artists. Real results. Same methods used for every campaign. 🎵\n\nReady to be our next success story?"
  },
  {
    key: 'multiple',
    patterns: ['multiple tracks', 'two songs', 'more than one', 'bundle', 'discount', 'bulk', 'several songs', 'multiple songs'],
    response: "🎵 **Promoting Multiple Tracks**\n\nAbsolutely! Here's how:\n\n• **Place separate orders** for each track — same or different packages\n• For **3+ tracks or $500+ total**, email us for a **custom bundle quote**\n\n📧 **support@echorisemedia.com** — mention how many tracks and we'll build a deal around your needs!"
  },
  {
    key: 'analytics',
    patterns: ['analytics', 'report', 'stats', 'statistics', 'data', 'tracking', 'see results', 'metrics', 'how will i know'],
    response: "📈 **Campaign Analytics & Reporting**\n\n**During your campaign:**\n• Real-time growth visible in your Spotify for Artists / SoundCloud dashboard\n• You can watch your numbers climb in real time 🚀\n\n**After your campaign:**\n• Detailed analytics report delivered to your email:\n  - Total listeners delivered\n  - Geographic breakdown\n  - Genre targeting accuracy\n  - Stream performance data\n\nGrowth and Premium packages include the most detailed reporting."
  }
]

const FALLBACK = "Thanks for your message! 😊\n\nI want to make sure you get the right answer. I can help with:\n\n• 🎵 Spotify, SoundCloud, Chart, Dance & YouTube packages\n• 💰 Pricing & payment methods\n• 🚀 How to place an order\n• ✅ Whether our promotion is safe & real\n• 📬 How to contact our team\n\nOr reach us directly:\n📧 **support@echorisemedia.com** — we reply within 24 hours!\n\nWhat would you like to know?"

const QUICK_QUESTIONS = [
  { label: "Best package for a new artist?", key: 'newartist' },
  { label: "Spotify promotion prices?", key: 'spotify' },
  { label: "See all packages & prices", key: 'pricing' },
  { label: "Are listeners real? Is it safe?", key: 'real' },
  { label: "How do I pay?", key: 'payment' },
  { label: "Dance / TikTok packages?", key: 'dance' },
]

// ─── MATCHING ENGINE ──────────────────────────────────────────────────────────
function getResponse(input) {
  const lower = input.toLowerCase()
  for (const entry of KB) {
    if (entry.patterns.some(p => lower.includes(p))) return entry.response
  }
  return FALLBACK
}

function getResponseByKey(key) {
  return KB.find(e => e.key === key)?.response ?? FALLBACK
}

// ─── MARKDOWN-LITE RENDERER (handles **bold** and \n) ────────────────────────
function MsgText({ text }) {
  return (
    <span>
      {text.split('\n').map((line, i, arr) => {
        const parts = line.split(/\*\*(.*?)\*\*/g)
        return (
          <span key={i}>
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
            {i < arr.length - 1 && <br />}
          </span>
        )
      })}
    </span>
  )
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: "Hey! 👋 I'm **Aria** — your Echorise Media guide.\n\nI know everything about our packages, pricing, and how to get your music growing. What can I help you with?"
  }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showQuick, setShowQuick] = useState(true)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  const deliverReply = (text) => {
    setTyping(true)
    const delay = 350 + Math.min(text.length * 0.4, 800)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: text }])
      setTyping(false)
    }, delay)
  }

  const sendMessage = (text) => {
    const msg = (text ?? input).trim()
    if (!msg || typing) return
    setInput('')
    setShowQuick(false)
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    deliverReply(getResponse(msg))
  }

  const sendQuick = (key, label) => {
    setShowQuick(false)
    setMessages(prev => [...prev, { role: 'user', content: label }])
    deliverReply(getResponseByKey(key))
  }

  const resetChat = () => {
    setMessages([{ role: 'assistant', content: "Hey! 👋 I'm **Aria** — your Echorise Media guide.\n\nI know everything about our packages, pricing, and how to get your music growing. What can I help you with?" }])
    setShowQuick(true)
    setInput('')
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
        style={{ background: 'linear-gradient(135deg,#FF6A00,#ee0979)', border: 'none', cursor: 'pointer' }}
        aria-label="Chat with Aria"
      >
        {open
          ? <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          : <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
        }
        {!open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white flex items-center justify-center font-bold"
            style={{ background: '#1DB954', fontSize: 9 }}>AI</span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{ width: 360, height: 560, background: '#fff', border: '1px solid rgba(0,0,0,0.1)' }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#FF6A00,#ee0979)' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-base text-white flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.4)' }}>A</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Aria · Echorise Media</div>
              <div className="text-xs text-white" style={{ opacity: 0.8 }}>Music promotion expert</div>
            </div>
            <div className="flex items-center gap-1.5 mr-1">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
              <span className="text-xs text-white" style={{ opacity: 0.75 }}>Online</span>
            </div>
            <button onClick={resetChat} title="Restart chat"
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: 'white' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                <path d="M17.65 6.35A7.958 7.958 0 0012 4C7.58 4 4 7.58 4 12s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2.5"
            style={{ background: '#F8F5F1' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mb-0.5"
                    style={{ background: 'linear-gradient(135deg,#FF6A00,#ee0979)' }}>A</div>
                )}
                <div className="max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed"
                  style={m.role === 'user'
                    ? { background: 'linear-gradient(135deg,#FF6A00,#ee0979)', color: '#fff', borderRadius: '18px 18px 4px 18px' }
                    : { background: '#fff', color: '#1A1A1A', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '18px 18px 18px 4px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <MsgText text={m.content} />
                </div>
              </div>
            ))}

            {/* Typing dots */}
            {typing && (
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#FF6A00,#ee0979)' }}>A</div>
                <div className="px-4 py-3 flex gap-1.5 items-center"
                  style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '18px 18px 18px 4px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  {[0, 160, 320].map(d => (
                    <span key={d} className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: '#FF6A00', animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Quick questions */}
            {showQuick && messages.length === 1 && !typing && (
              <div className="flex flex-col gap-1.5 mt-1 ml-8">
                <div className="text-xs font-medium" style={{ color: 'rgba(107,107,107,0.6)' }}>Quick questions:</div>
                {QUICK_QUESTIONS.map(q => (
                  <button key={q.key} onClick={() => sendQuick(q.key, q.label)}
                    className="text-left text-xs px-3 py-2 rounded-xl transition-all hover:-translate-y-0.5"
                    style={{ background: '#fff', border: '1px solid rgba(255,106,0,0.3)', color: '#FF6A00', cursor: 'pointer' }}>
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-2.5 flex gap-2 items-end flex-shrink-0"
            style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
              rows={1}
              placeholder="Ask about packages, pricing, how it works…"
              className="flex-1 resize-none text-sm outline-none rounded-xl px-3 py-2.5"
              style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', maxHeight: 72, lineHeight: 1.5, color: '#1A1A1A' }}
            />
            <button onClick={() => sendMessage()} disabled={!input.trim() || typing}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-35 hover:scale-105 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#FF6A00,#ee0979)', border: 'none', cursor: 'pointer' }}>
              <svg viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
