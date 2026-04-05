import { Link } from 'react-router-dom'

export default function PricingCard({ pkg, onOrder }) {
  return (
    <div className={`pricing-card ${pkg.popular ? 'popular' : ''}`} style={{ position: 'relative' }}>
      {pkg.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-display font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#FF6A00,#FF6A00)', whiteSpace: 'nowrap' }}>
          Most Popular
        </div>
      )}

      <div className="mb-1 font-body font-semibold text-xs tracking-widest uppercase" style={{ color: 'rgba(26,26,26,0.50)' }}>{pkg.name}</div>

      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-lg" style={{ color: 'rgba(26,26,26,0.55)' }}>$</span>
        <span className={`font-display font-bold text-5xl ${pkg.popular ? 'grad-text' : ''}`} style={!pkg.popular ? { color: '#1A1A1A' } : {}}>{pkg.price}</span>
      </div>
      <div className="text-xs mb-6" style={{ color: 'rgba(26,26,26,0.48)' }}>One-time campaign · {pkg.listeners} listeners</div>

      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {pkg.features.map(f => (
          <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#3A3A3A' }}>
            <span className="mt-0.5 text-xs font-bold" style={{color:'#FF6A00'}}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <button onClick={() => onOrder && onOrder(pkg)}
        className={pkg.popular ? 'btn-primary justify-center w-full' : 'btn-outline justify-center w-full'}>
        {pkg.cta} →
      </button>
    </div>
  )
}
