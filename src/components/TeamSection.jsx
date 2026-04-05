import { useState } from 'react'
import { TEAM, TEAM_DEPARTMENTS } from '../data'

const DEPT_ICONS = {
  'Leadership':          { icon: '👑', color: '#FF6A00', bg: 'rgba(255,106,0,0.10)' },
  'Campaign Management': { icon: '🚀', color: '#FF6A00', bg: 'rgba(124,58,237,0.10)' },
  'Audience Growth':     { icon: '📈', color: '#FF6A00', bg: 'rgba(255,106,0,0.10)' },
  'Analytics & Strategy':{ icon: '📊', color: '#FF6A00', bg: 'rgba(255,106,0,0.10)' },
  'Artist Relations':    { icon: '🎤', color: '#F97316', bg: 'rgba(249,115,22,0.10)' },
  'Finance':             { icon: '💰', color: '#16A34A', bg: 'rgba(22,163,74,0.10)'  },
  'Operations':          { icon: '⚙️',  color: '#64748B', bg: 'rgba(100,116,139,0.10)'},
  'Dance Department':    { icon: '💃', color: '#FF6A00', bg: 'rgba(255,106,0,0.10)' },
}

export default function TeamSection() {
  const [activeDept, setActiveDept] = useState('All')

  const depts = ['All', ...TEAM_DEPARTMENTS]
  const filtered = activeDept === 'All' ? TEAM : TEAM.filter(m => m.dept === activeDept)

  return (
    <section className="py-24 px-6" id="team" style={{ background: '#FAF7F2' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <span className="section-label">The Team</span>
          <h2 className="font-display font-bold text-4xl mb-4" style={{ color: '#1A1A1A', letterSpacing: '-0.02em' }}>
            The Minds Behind <span className="grad-text">the Music</span>
          </h2>
          <p className="max-w-lg" style={{ color: '#6B6B6B' }}>
            35+ professionals across campaign management, analytics, audience growth, artist relations, operations, and dance promotion.
          </p>
        </div>

        {/* Department filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {depts.map(dept => {
            const meta = dept !== 'All' ? DEPT_ICONS[dept] : null
            const isActive = activeDept === dept
            return (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-display font-bold transition-all duration-200"
                style={{
                  background: isActive
                    ? (meta ? meta.color : 'linear-gradient(135deg,#FF6A00,#FF6A00)')
                    : 'rgba(26,26,26,0.05)',
                  color: isActive ? '#FFFFFF' : '#6B6B6B',
                  border: isActive ? 'none' : '1.5px solid rgba(26,26,26,0.12)',
                  boxShadow: isActive ? '0 4px 16px rgba(255,106,0,0.25)' : 'none',
                  transform: isActive ? 'translateY(-1px)' : 'none',
                }}
              >
                {meta && <span>{meta.icon}</span>}
                {dept}
              </button>
            )
          })}
        </div>

        {/* Department heading when filtered */}
        {activeDept !== 'All' && DEPT_ICONS[activeDept] && (
          <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-2xl" style={{ background: DEPT_ICONS[activeDept].bg, border: `1.5px solid ${DEPT_ICONS[activeDept].color}22` }}>
            <span className="text-2xl">{DEPT_ICONS[activeDept].icon}</span>
            <div>
              <div className="font-display font-bold text-sm" style={{ color: DEPT_ICONS[activeDept].color }}>{activeDept}</div>
              <div className="text-xs" style={{ color: 'rgba(26,26,26,0.28)' }}>{filtered.length} team member{filtered.length !== 1 ? 's' : ''}</div>
            </div>
          </div>
        )}

        {/* All departments grouped view */}
        {activeDept === 'All' ? (
          <div className="flex flex-col gap-12">
            {TEAM_DEPARTMENTS.map(dept => {
              const members = TEAM.filter(m => m.dept === dept)
              const meta = DEPT_ICONS[dept]
              return (
                <div key={dept}>
                  {/* Dept label */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-lg">{meta.icon}</span>
                    <h3 className="font-display font-bold text-sm tracking-widest uppercase" style={{ color: meta.color }}>{dept}</h3>
                    <div className="flex-1 h-px ml-2" style={{ background: `${meta.color}25` }} />
                    <span className="text-xs font-display font-semibold px-2.5 py-0.5 rounded-full" style={{ background: meta.bg, color: meta.color }}>{members.length}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {members.map(member => (
                      <MemberCard key={`${member.name}-${member.role}`} member={member} meta={meta} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map(member => (
              <MemberCard key={`${member.name}-${member.role}`} member={member} meta={DEPT_ICONS[member.dept]} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function MemberCard({ member, meta }) {
  return (
    <div className="glass-card p-5 text-center flex flex-col items-center gap-3 group">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-base text-white flex-shrink-0 bg-gradient-to-br ${member.gradient} transition-transform duration-200 group-hover:scale-110`}
        style={{ boxShadow: '0 4px 16px rgba(26,26,26,0.08)' }}>
        {member.initials}
      </div>
      <div>
        <div className="font-display font-bold text-sm leading-tight" style={{ color: '#1A1A1A' }}>{member.name}</div>
        <div className="text-xs mt-1 font-medium" style={{ color: meta.color }}>{member.role}</div>
      </div>
    </div>
  )
}
