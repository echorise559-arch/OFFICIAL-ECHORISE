import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center relative overflow-hidden" style={{ background: '#FAF7F2' }}>
      <div className="orb w-96 h-96 -top-20 -right-20 animate-float" style={{ background: '#FF6A00', opacity: 0.07 }} />
      <div className="relative z-10">
        <div className="font-display font-black text-8xl grad-text mb-4">404</div>
        <h1 className="font-display font-bold text-3xl mb-4" style={{ color: '#1A1A1A' }}>Track Not Found</h1>
        <p className="mb-8 max-w-sm" style={{ color: '#6B6B6B' }}>Even the best algorithms miss sometimes. Let's get you back on track.</p>
        <Link to="/" className="btn-primary">← Back to Home</Link>
      </div>
    </div>
  )
}
