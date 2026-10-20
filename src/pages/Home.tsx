import { Link } from 'react-router-dom'
import { getCategories, getChallenges } from '../lib/api'
import { useAsync } from '../lib/useAsync'
import { ErrorMessage, Loading } from '../components/States'

export default function Home() {
  const { data, error, loading } = useAsync(() => Promise.all([getCategories(), getChallenges()]), [])

  if (loading) return <Loading />
  if (error) return <ErrorMessage error={error} />
  const [categories, challenges] = data!
  // Výzvy majú vlastnú sekciu, preto ich kategóriu v zozname nezobrazujeme.
  const listCategories = categories.filter((c) => c.name !== 'Výzvy')

  return (
    <div className="space-y-12">
      <section className="pt-4">
        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
          Nájdi si svoj moment <span className="text-glow">pokoja</span>
        </h1>
        <p className="mt-3 max-w-xl text-lg text-mist/80">
          Krátke meditácie na deň, pokojný spánok a viacdňové výzvy, ktoré ťa prevedú krok za krokom.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {listCategories.map((category) => (
          <Link
            key={category.id}
            to={`/kategoria/${category.id}`}
            className="rounded-3xl bg-gradient-to-br from-dusk to-night p-6 ring-1 ring-white/5 transition hover:ring-glow/40"
          >
            <p className="text-2xl font-bold">{category.name}</p>
            <p className="mt-1 text-mist/70">Zobraziť meditácie →</p>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Výzvy</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => (
            <Link
              key={challenge.id}
              to={`/vyzva/${challenge.id}`}
              className="group overflow-hidden rounded-3xl bg-dusk/70 ring-1 ring-white/5 transition hover:ring-glow/40"
            >
              <div className="aspect-video bg-night">
                {challenge.image_url && (
                  <img src={challenge.image_url} alt="" loading="lazy" className="size-full object-cover" />
                )}
              </div>
              <div className="p-4">
                <p className="font-bold">{challenge.title}</p>
                <p className="text-sm text-mist/70">{challenge.total_days} dní</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
