import type { InputHTMLAttributes, ReactNode } from 'react'

export function Field({ label, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-left">
      <span className="mb-1 block text-sm text-mist/80">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl bg-night/80 px-4 py-3 text-white ring-1 ring-white/10 outline-none focus:ring-glow/60"
      />
    </label>
  )
}

export function Button({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full rounded-xl bg-glow px-4 py-3 font-bold text-night transition hover:brightness-105 disabled:opacity-60"
    >
      {children}
    </button>
  )
}

export function Notice({ kind, children }: { kind: 'error' | 'ok'; children: ReactNode }) {
  const style = kind === 'error' ? 'bg-red-500/10 text-red-200' : 'bg-emerald-500/10 text-emerald-200'
  return <p className={`rounded-xl p-3 text-sm ${style}`}>{children}</p>
}

export function Card({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-md space-y-4 rounded-3xl bg-dusk/70 p-6 ring-1 ring-white/5 sm:p-8">{children}</div>
}
