import { Navigate } from 'react-router-dom'
import { signOut, useAuth } from '../lib/auth'
import { getMySubscription, isActive } from '../lib/api'
import { useAsync } from '../lib/useAsync'
import { Card } from '../components/Form'
import { ErrorMessage, Loading } from '../components/States'

export default function Account() {
  const { session, ready } = useAuth()
  const userId = session?.user.id
  const { data: sub, error, loading } = useAsync(
    () => (userId ? getMySubscription(userId) : Promise.resolve(null)),
    [userId],
  )

  if (!ready) return <Loading />
  if (!session) return <Navigate to="/prihlasenie" replace />

  return (
    <Card>
      <h1 className="text-2xl font-extrabold">Môj účet</h1>
      <p className="text-mist/80">{session.user.email}</p>
      <div className="rounded-2xl bg-night/60 p-4">
        <p className="text-sm text-mist/70">Predplatné</p>
        {loading && <Loading />}
        {error && <ErrorMessage error={error} />}
        {!loading && !error &&
          (isActive(sub) ? (
            <p className="font-bold text-glow">
              Aktívne
              {sub?.expires_at && ` do ${new Date(sub.expires_at).toLocaleDateString('sk-SK')}`}
            </p>
          ) : (
            <p className="font-bold">Zatiaľ nemáš predplatné. Platby pripravujeme.</p>
          ))}
      </div>
      <button onClick={() => signOut()} className="w-full rounded-xl px-4 py-3 text-mist ring-1 ring-white/10 hover:text-glow">
        Odhlásiť sa
      </button>
    </Card>
  )
}
