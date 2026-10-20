import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6">
      <header className="flex items-center justify-between py-6">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Tvoj<span className="text-glow">Moment</span>
        </Link>
      </header>
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <footer className="py-8 text-center text-sm text-mist/60">© {new Date().getFullYear()} TvojMoment</footer>
    </div>
  )
}
