import { useState } from 'react'
import { FAQ } from '../data'

export default function FAQSection() {
  const [open, setOpen] = useState(null)

  return (
    <section className="py-24 px-6" style={{ background: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">FAQ</span>
          <h2 className="font-display font-bold text-4xl mb-4" style={{ color: '#1A1A1A', letterSpacing: '-0.02em' }}>Questions <span className="grad-text">Answered</span></h2>
          <p className="max-w-md mx-auto" style={{ color: 'rgba(107,107,107,0.90)' }}>Everything artists ask before their first campaign. Honest answers, no sales spin.</p>
        </div>
        <div className="flex flex-col" style={{ borderColor: 'rgba(26,26,26,0.08)' }}>
          {FAQ.map((item, i) => (
            <div key={i} className="py-6" style={{ borderBottom: '1px solid rgba(26,26,26,0.08)' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center gap-5 text-left">
                <span className="font-display font-semibold text-base" style={{ color: '#1A1A1A' }}>{item.q}</span>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 font-bold ${open === i ? 'rotate-45' : ''}`}
                  style={{ background: 'rgba(255,106,0,0.08)', border: '1.5px solid rgba(255,106,0,0.25)', color: '#FF6A00' }}>
                  +
                </span>
              </button>
              <div className={`faq-answer text-sm leading-relaxed ${open === i ? 'open' : ''}`} style={{ color: '#6B6B6B' }}>
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
