import { Link } from 'react-router-dom'
import type { Meditation } from '../lib/api'

export function formatDuration(seconds: number | null) {
  if (!seconds) return null
  return `${Math.round(seconds / 60)} min`
}

export default function MeditationCard({ meditation, label }: { meditation: Meditation; label?: string }) {
  const duration = formatDuration(meditation.duration_seconds)
  return (
    <Link
      to={`/meditacia/${meditation.id}`}
      className="group flex items-center gap-4 rounded-2xl bg-dusk/70 p-3 transition hover:bg-dusk"
    >
      <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-night">
        {meditation.image_url && (
          <img src={meditation.image_url} alt="" loading="lazy" className="size-full object-cover" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        {label && <p className="text-xs font-semibold uppercase tracking-wide text-glow">{label}</p>}
        <p className="truncate font-semibold">{meditation.title}</p>
        {duration && <p className="text-sm text-mist/70">{duration}</p>}
      </div>
      <span className="pr-2 text-mist/50 transition group-hover:text-glow">▶</span>
    </Link>
  )
}
