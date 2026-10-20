import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../lib/auth'

export default function Layout() {
  const { session, ready } = useAuth()
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6">
      <header className="flex items-center justify-between py-6">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Tvoj<span className="text-glow">Moment</span>
        </Link>
        {ready && (
          <Link
            to={session ? '/ucet' : '/prihlasenie'}
            className="rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-white/15 transition hover:text-glow hover:ring-glow/40"
          >
            {session ? 'Môj účet' : 'Prihlásiť sa'}
          </Link>
        )}
      </header>
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <footer className="py-8 text-center text-sm text-mist/60">© {new Date().getFullYear()} TvojMoment</footer>
    </div>
  )
}
