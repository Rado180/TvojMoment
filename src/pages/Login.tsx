import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { sendPasswordReset, signIn, signUp, useAuth } from '../lib/auth'
import { authErrorMessage } from '../lib/authErrors'
import { Button, Card, Field, Notice } from '../components/Form'

type Mode = 'login' | 'register' | 'reset'

const TITLES: Record<Mode, string> = {
  login: 'Prihlásenie',
  register: 'Registrácia',
  reset: 'Zabudnuté heslo',
}

export default function Login() {
  const { session } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  if (session) return <Navigate to="/ucet" replace />

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
    setInfo(null)
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    setInfo(null)
    if (mode === 'login') {
      const { error } = await signIn(email, password)
      if (error) setError(authErrorMessage(error.message))
    } else if (mode === 'register') {
      const { data, error } = await signUp(email, password)
      if (error) setError(authErrorMessage(error.message))
      else if (!data.session) setInfo('Poslali sme ti e-mail. Účet aktivuješ kliknutím na odkaz v ňom.')
    } else {
      const { error } = await sendPasswordReset(email)
      if (error) setError(authErrorMessage(error.message))
      else setInfo('Ak k tomuto e-mailu existuje účet, poslali sme naň odkaz na nastavenie nového hesla.')
    }
    setBusy(false)
  }

  return (
    <Card>
      <h1 className="text-2xl font-extrabold">{TITLES[mode]}</h1>
      <form onSubmit={submit} className="space-y-4">
        <Field label="E-mail" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {mode !== 'reset' && (
          <Field
            label="Heslo"
            type="password"
            required
            minLength={6}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        {error && <Notice kind="error">{error}</Notice>}
        {info && <Notice kind="ok">{info}</Notice>}
        <Button disabled={busy}>
          {mode === 'login' ? 'Prihlásiť sa' : mode === 'register' ? 'Vytvoriť účet' : 'Poslať odkaz'}
        </Button>
      </form>
      <div className="space-y-1 text-center text-sm text-mist/80">
        {mode === 'login' && (
          <>
            <p>
              Nemáš účet?{' '}
              <button className="text-glow" onClick={() => switchMode('register')}>
                Zaregistruj sa
              </button>
            </p>
            <button className="text-mist/70 hover:text-glow" onClick={() => switchMode('reset')}>
              Zabudol/a si heslo?
            </button>
          </>
        )}
        {mode !== 'login' && (
          <button className="text-glow" onClick={() => switchMode('login')}>
            Späť na prihlásenie
          </button>
        )}
      </div>
    </Card>
  )
}
