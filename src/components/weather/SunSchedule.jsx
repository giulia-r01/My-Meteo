import { Moon, Sun, Sunrise, Sunset } from 'lucide-react'

export default function SunSchedule({ current, today, sunProgress }) {
  const hasProgress = Number.isFinite(sunProgress) && current?.isDay
  const progress = Math.max(0, Math.min(1, sunProgress ?? 0))
  const markerStyle = {
    left: `${50 - 50 * Math.cos(Math.PI * progress)}%`,
    top: `${100 - 100 * Math.sin(Math.PI * progress)}%`,
  }

  return (
    <article className="sun-card" aria-label="Alba e tramonto">
      <div className="sun-orbit" aria-hidden="true">
        <div className="sun-arc" />
        {hasProgress ? <Sun className="sun-marker" style={markerStyle} />
          : current && !current.isDay ? <Moon className="night-marker" /> : null}
      </div>
      <div className="sun-times">
        <div><Sunrise aria-hidden="true" /><div><h3>Alba</h3><p>{today?.sunrise?.slice(11, 16) ?? '—'}</p></div></div>
        <div><Sunset aria-hidden="true" /><div><h3>Tramonto</h3><p>{today?.sunset?.slice(11, 16) ?? '—'}</p></div></div>
      </div>
      <p className="sun-caption">{current ? current.isDay
        ? 'Il sole, dall’alba al tramonto.'
        : 'Anche il cielo si prende una pausa.'
        : 'Gli orari del sole, nella tua zona.'}</p>
    </article>
  )
}
