import { Link, useParams } from 'react-router-dom'
import { getMeditation } from '../lib/api'
import { useAsync } from '../lib/useAsync'
import { ErrorMessage, Loading } from '../components/States'
import { formatDuration } from '../components/MeditationCard'

export default function Meditation() {
  const { id = '' } = useParams()
  const { data: meditation, error, loading } = useAsync(() => getMeditation(id), [id])

  if (loading) return <Loading />
  if (error) return <ErrorMessage error={error} />
  const m = meditation!
  const backTo = m.challenge_id ? `/vyzva/${m.challenge_id}` : `/kategoria/${m.category_id}`

  return (
    <div className="mx-auto max-w-xl text-center">
      <Link to={backTo} className="text-sm text-mist/70 hover:text-glow">
        ← Späť
      </Link>
      <div className="mx-auto mt-6 aspect-square w-full max-w-sm overflow-hidden rounded-[2rem] bg-dusk shadow-2xl shadow-black/40">
        {m.image_url && <img src={m.image_url} alt="" className="size-full object-cover" />}
      </div>
      {m.day_number && <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-glow">Deň {m.day_number}</p>}
      <h1 className="mt-2 text-3xl font-extrabold">{m.title}</h1>
      {formatDuration(m.duration_seconds) && <p className="text-mist/70">{formatDuration(m.duration_seconds)}</p>}
      {m.description && <p className="mt-4 text-mist/90">{m.description}</p>}
      {m.audio_url ? (
        <audio controls preload="none" src={m.audio_url} className="mt-8 w-full" />
      ) : (
        <p className="mt-8 text-mist/70">Audio zatiaľ nie je k dispozícii.</p>
      )}
    </div>
  )
}
