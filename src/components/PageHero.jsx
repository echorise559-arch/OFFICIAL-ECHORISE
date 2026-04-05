export default function PageHero({ label, title, subtitle, children, accent = '#FF6A00', image }) {
  return (
    <section className="relative pt-36 pb-20 px-6 overflow-hidden" style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #F3EFEA 60%, #FAF7F2 100%)' }}>
      {/* Background image if provided - show as side panel on desktop */}
      {image && (
        <div className="absolute right-0 top-0 bottom-0 w-2/5 z-0 hidden lg:block">
          <img src={image} alt="" className="w-full h-full object-cover" style={{ opacity: 0.9 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #FAF7F2 0%, rgba(250,247,242,0.80) 40%, transparent 100%)' }} />
        </div>
      )}
      {/* Subtle background orbs */}
      <div className="orb w-80 h-80 -top-20 right-0 animate-float-slow" style={{ background: accent, opacity: 0.08 }} />
      

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="max-w-2xl">
          <span className="section-label" style={{ color: accent }}>{label}</span>
          <h1 className="font-display font-semibold mb-5" style={{ fontSize: 'clamp(2.8rem,5.5vw,4.5rem)', lineHeight: 1.08, letterSpacing: '-0.01em', color: '#1A1A1A' }}>
            {title}
          </h1>
          {subtitle && <p className="text-lg max-w-xl mb-8" style={{ color: '#6B6B6B' }}>{subtitle}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
