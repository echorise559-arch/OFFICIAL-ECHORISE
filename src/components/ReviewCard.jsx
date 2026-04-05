// Map of reviewer names to Unsplash face photos
const REVIEWER_PHOTOS = {
  'Jordan T.': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  'Clara F.': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face',
  'Kwame O.': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  'Nina R.': 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop&crop=face',
  'Andre M.': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face',
  'Selin H.': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
  'Damien G.': 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=80&h=80&fit=crop&crop=face',
  'Yuki L.': 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face',
  'Bianca N.': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face',
  'Pablo V.': 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop&crop=face',
  'Olivia T.': 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=80&h=80&fit=crop&crop=face',
  'Erin B.': 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=80&h=80&fit=crop&crop=face',
  'Zara K.': 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=80&h=80&fit=crop&crop=face',
  'Marco F.': 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop&crop=face',
  'Leah B.': 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=80&h=80&fit=crop&crop=face',
  'Theo P.': 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&h=80&fit=crop&crop=face',
  'Aisha B.': 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=face',
  'Fatima D.': 'https://images.unsplash.com/photo-1599842057874-37393e9342df?w=80&h=80&fit=crop&crop=face',
  'George S.': 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&h=80&fit=crop&crop=face',
  'Rami M.': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face',
}

// Map country names to flag image URLs via CDN
const getCountryFlagUrl = (countryName) => {
  const codeMap = {
    'United States': 'us', 'Germany': 'de', 'United Kingdom': 'gb',
    'France': 'fr', 'Canada': 'ca', 'Sweden': 'se', 'Japan': 'jp',
    'Nigeria': 'ng', 'Australia': 'au', 'Ireland': 'ie', 'South Africa': 'za',
    'Spain': 'es', 'Italy': 'it', 'Netherlands': 'nl', 'Lebanon': 'lb',
  }
  const code = codeMap[countryName]
  if (!code) return null
  return `https://flagcdn.com/w40/${code}.png`
}

export default function ReviewCard({ review }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.stars ? '★' : '☆')
  const photoUrl = REVIEWER_PHOTOS[review.name]
  const flagUrl = getCountryFlagUrl(review.country)

  return (
    <div className="review-card">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          {/* Real photo */}
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={review.name}
              className="w-11 h-11 rounded-full object-cover flex-shrink-0"
              style={{ border: '2px solid rgba(255,106,0,0.2)' }}
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
            />
          ) : null}
          <div className={`w-11 h-11 rounded-full items-center justify-center font-display font-bold text-sm text-white flex-shrink-0 bg-gradient-to-br from-[#FF6A00] to-[#FF6A00] ${photoUrl ? 'hidden' : 'flex'}`}
            style={{ border: '2px solid rgba(255,106,0,0.2)' }}>
            {review.name.split(' ').map(n => n[0]).join('')}
          </div>

          <div>
            <div className="font-display font-semibold text-sm" style={{ color: '#1A1A1A' }}>{review.name}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              {/* Real flag image */}
              {flagUrl && (
                <img
                  src={flagUrl}
                  alt={review.country}
                  className="h-3.5 rounded-sm"
                  style={{ width: 'auto', objectFit: 'cover' }}
                />
              )}
              {!flagUrl && <span className="text-xs">{review.flag}</span>}
              <span className="text-xs text-muted">{review.genre} · {review.country} · {review.date}</span>
            </div>
          </div>
        </div>
        <div className="text-yellow-500 text-sm">{stars.join('')}</div>
      </div>

      <p className="text-sm leading-relaxed text-muted flex-1">{review.text}</p>

      <div className="text-xs text-muted leading-relaxed p-3 rounded-lg" style={{ background: 'rgba(255,106,0,0.05)', borderLeft: '2px solid rgba(255,106,0,0.3)' }}>
        <strong style={{ color: '#FF6A00' }}>Echorise Media replied:</strong> <span style={{ color: '#6B6B6B' }}>{review.reply}</span>
      </div>
    </div>
  )
}
