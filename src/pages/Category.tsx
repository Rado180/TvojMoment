import { useParams } from 'react-router-dom'
import { getCategory, getStandaloneMeditations } from '../lib/api'
import { useAsync } from '../lib/useAsync'
import { ErrorMessage, Loading } from '../components/States'
import MeditationCard from '../components/MeditationCard'

export default function Category() {
  const { id = '' } = useParams()
  const { data, error, loading } = useAsync(() => Promise.all([getCategory(id), getStandaloneMeditations(id)]), [id])

  if (loading) return <Loading />
  if (error) return <ErrorMessage error={error} />
  const [category, meditations] = data!

  return (
    <div>
      <h1 className="mb-6 text-3xl font-extrabold">{category.name}</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        {meditations.map((m) => (
          <MeditationCard key={m.id} meditation={m} />
        ))}
      </div>
    </div>
  )
}
