// Top 3 Promoted Artists — Echorise Media

const TOP_ARTISTS = [
  {
    rank: 1,
    name: 'd4vd',
    country: 'USA 🇺🇸',
    genre: 'Indie Pop · Alt R&B',
    spotifyUrl: 'https://open.spotify.com/artist/5y8tKLUfMvliMe8IKamR32',
    monthlyListeners: '21.4M',
    followers: '4.8M',
    highlight: '"Romantic Homicide" — 1.7B streams',
    campaign: 'Spotify Growth Campaign',
    result: '+2.3M monthly listeners',
    badge: '🏆 #1 Artist',
    accentColor: '#1DB954',
    // Visual: rank badge on green Spotify-themed card
  },
  {
    rank: 2,
    name: 'JVKE',
    country: 'USA 🇺🇸',
    genre: 'Indie Pop · Singer-Songwriter',
    spotifyUrl: 'https://open.spotify.com/artist/164Uj4eKjl6zTBKfJLFKKK',
    monthlyListeners: '19.6M',
    followers: '5.7M',
    highlight: '"Golden Hour" — 757M+ streams',
    campaign: 'Spotify Premium Campaign',
    result: '+4.6B total streams',
    badge: '🥈 #2 Artist',
    accentColor: '#FF6A00',
  },
  {
    rank: 3,
    name: 'DJ UCE',
    country: 'Australia 🇦🇺',
    genre: 'Hip-Hop · Electronic',
    spotifyUrl: 'https://open.spotify.com/artist/7dlX1Z8UVrLby9K7P6kJL1',
    monthlyListeners: 'Growing',
    followers: 'Rising',
    highlight: 'Emerging Artist — Pacific Region',
    campaign: 'Spotify Starter Campaign',
    result: 'Strong regional growth',
    badge: '🥉 #3 Artist',
    accentColor: '#ee0979',
  },
]

// Spotify green waveform bars SVG (purely decorative)
function WaveBars({ color }) {
  const heights = [6, 12, 18, 10, 16, 8, 14, 20, 10, 14, 8, 18, 12, 6, 10]
  return (
    <svg viewBox={`0 0 60 24`} width="60" height="24" xmlns="http://www.w3.org/2000/svg">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 4}
          y={24 - h}
          width="3"
          height={h}
          rx="1.5"
          fill={color}
          opacity={0.7 + (i % 3) * 0.1}
        />
      ))}
    </svg>
  )
}

// Spotify logo SVG
function SpotifyLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#1DB954" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  )
}

// Rank number visual — large styled number
function RankVisual({ rank, color }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-2xl overflow-hidden"
      style={{
        width: 120,
        height: 120,
        background: `linear-gradient(135deg, ${color}22, ${color}08)`,
        border: `2px solid ${color}33`,
        flexShrink: 0,
      }}
    >
      {/* Big rank number */}
      <span
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 900,
          fontSize: 72,
          lineHeight: 1,
          color: color,
          opacity: 0.18,
          position: 'absolute',
          userSelect: 'none',
        }}
      >
        {rank}
      </span>
      {/* Spotify logo centered */}
      <div className="relative z-10 flex flex-col items-center gap-1.5">
        <SpotifyLogo size={32} />
        <span style={{ fontSize: 9, fontWeight: 700, color: color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          #{rank} Artist
        </span>
      </div>
    </div>
  )
}

export default function TopArtists({ onOrder }) {
  return (
    <section className="py-24 px-6" style={{ background: '#0D0D0D' }} id="top-artists">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(29,185,84,0.12)', border: '1px solid rgba(29,185,84,0.25)', color: '#1DB954' }}
          >
            <SpotifyLogo size={14} /> Verified Results
          </span>
          <h2
            className="font-display font-bold text-4xl md:text-5xl mb-4"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.03em', color: '#FFFFFF' }}
          >
            Artists We've <span style={{ background: 'linear-gradient(135deg,#1DB954,#17a847)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Promoted</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 480, margin: '0 auto', fontSize: 15 }}>
            Real campaigns. Real artists. Real results — across Spotify's global charts.
          </p>
        </div>

        {/* Artist Cards */}
        <div className="flex flex-col gap-5">
          {TOP_ARTISTS.map((artist) => (
            <div
              key={artist.rank}
              className="rounded-3xl overflow-hidden transition-all hover:scale-[1.01] hover:shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1.5px solid rgba(255,255,255,0.08)`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8">

                {/* Rank Visual */}
                <RankVisual rank={artist.rank} color={artist.accentColor} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: `${artist.accentColor}18`, color: artist.accentColor, border: `1px solid ${artist.accentColor}30` }}
                    >
                      {artist.badge}
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{artist.country}</span>
                  </div>

                  <h3
                    className="font-bold text-3xl mb-0.5"
                    style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF', letterSpacing: '-0.02em' }}
                  >
                    {artist.name}
                  </h3>
                  <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>{artist.genre}</p>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>Monthly Listeners</div>
                      <div className="font-bold text-lg" style={{ color: '#1DB954', fontFamily: 'Syne, sans-serif' }}>{artist.monthlyListeners}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>Followers</div>
                      <div className="font-bold text-lg" style={{ color: '#FFFFFF', fontFamily: 'Syne, sans-serif' }}>{artist.followers}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>Campaign Result</div>
                      <div className="font-bold text-lg" style={{ color: artist.accentColor, fontFamily: 'Syne, sans-serif' }}>{artist.result}</div>
                    </div>
                  </div>

                  {/* Highlight */}
                  <div
                    className="flex items-center gap-2 rounded-xl px-3 py-2 mb-4 w-fit"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <WaveBars color={artist.accentColor} />
                    <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>{artist.highlight}</span>
                  </div>

                  {/* CTA */}
                  <a
                    href={artist.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all hover:scale-105"
                    style={{
                      background: 'rgba(29,185,84,0.12)',
                      border: '1px solid rgba(29,185,84,0.25)',
                      color: '#1DB954',
                      textDecoration: 'none',
                    }}
                  >
                    <SpotifyLogo size={14} />
                    View on Spotify
                    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                  </a>
                </div>

                {/* Campaign tag — right side */}
                <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-4">
                  <div
                    className="rounded-2xl px-4 py-3 text-right"
                    style={{ background: `${artist.accentColor}10`, border: `1.5px solid ${artist.accentColor}25`, minWidth: 130 }}
                  >
                    <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Campaign</div>
                    <div className="text-xs font-bold" style={{ color: artist.accentColor }}>{artist.campaign}</div>
                  </div>
                  <div
                    className="rounded-full px-3 py-1.5 text-xs font-bold"
                    style={{ background: '#1DB954', color: '#000000' }}
                  >
                    ✓ Verified
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Join 1,400+ artists who've grown with Echorise Media
          </p>
          <button
            onClick={() => onOrder ? onOrder() : window.location.href = '/order'}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-white transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: 'linear-gradient(135deg,#FF6A00,#ee0979)', border: 'none', cursor: 'pointer', fontFamily: 'Syne, sans-serif' }}
          >
            Start Your Campaign →
          </button>
        </div>

      </div>
    </section>
  )
}
