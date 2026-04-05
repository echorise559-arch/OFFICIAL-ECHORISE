import { useState, useEffect, useRef } from 'react'
import { STATS } from '../data'

const STAT_COLORS = ['#FF6A00', '#4B3F72', '#1DB954', '#FF6A00', '#4B3F72']

function Counter({ value, suffix, color }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const step = value / 60
        const timer = setInterval(() => {
          start += step
          if (start >= value) { setCount(value); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 25)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="font-display font-bold text-4xl"
      style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsBar() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="stats-bar">
        {STATS.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center gap-1">
            <Counter value={s.value} suffix={s.suffix} color={STAT_COLORS[i % STAT_COLORS.length]} />
            <span className="text-xs font-display uppercase tracking-widest" style={{ color: 'rgba(26,26,26,0.28)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
