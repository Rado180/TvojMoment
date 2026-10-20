import { useParams } from 'react-router-dom'
import { getChallenge, getChallengeMeditations } from '../lib/api'
import { useAsync } from '../lib/useAsync'
import { ErrorMessage, Loading } from '../components/States'
import MeditationCard from '../components/MeditationCard'

export default function Challenge() {
  const { id = '' } = useParams()
  const { data, error, loading } = useAsync(() => Promise.all([getChallenge(id), getChallengeMeditations(id)]), [id])

  if (loading) return <Loading />
  if (error) return <ErrorMessage error={error} />
  const [challenge, meditations] = data!

  return (
    <div>
      <h1 className="text-3xl font-extrabold">{challenge.title}</h1>
      <p className="mt-1 text-mist/70">{challenge.total_days} dní</p>
      {challenge.description && <p className="mt-4 max-w-2xl text-mist/90">{challenge.description}</p>}
      <div className="mt-6 grid gap-3">
        {meditations.length === 0 && <p className="text-mist/70">Táto výzva sa ešte pripravuje.</p>}
        {meditations.map((m) => (
          <MeditationCard key={m.id} meditation={m} label={m.day_number ? `Deň ${m.day_number}` : undefined} />
        ))}
      </div>
    </div>
  )
}
