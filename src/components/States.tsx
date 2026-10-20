export function Loading() {
  return <p className="py-12 text-center text-mist/70">Načítavam…</p>
}

export function ErrorMessage({ error }: { error: Error }) {
  return (
    <p className="rounded-2xl bg-red-500/10 p-4 text-center text-red-200">
      Niečo sa nepodarilo načítať. {error.message}
    </p>
  )
}
