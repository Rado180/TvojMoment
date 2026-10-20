import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { updatePassword, useAuth } from '../lib/auth'
import { authErrorMessage } from '../lib/authErrors'
import { Button, Card, Field, Notice } from '../components/Form'
import { Loading } from '../components/States'

export default function NewPassword() {
  const { session, ready } = useAuth()
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  if (!ready) return <Loading />
  if (!session) {
    return (
      <Card>
        <h1 className="text-2xl font-extrabold">Odkaz už neplatí</h1>
        <p className="text-mist/80">Požiadaj o nový odkaz na obnovu hesla.</p>
        <Link to="/prihlasenie" className="text-glow">
          Späť na prihlásenie
        </Link>
      </Card>
    )
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    const { error } = await updatePassword(password)
    if (error) setError(authErrorMessage(error.message))
    else setDone(true)
    setBusy(false)
  }

  return (
    <Card>
      <h1 className="text-2xl font-extrabold">Nové heslo</h1>
      {done ? (
        <>
          <Notice kind="ok">Heslo je zmenené.</Notice>
          <Link to="/ucet" className="text-glow">
            Pokračovať na môj účet
          </Link>
        </>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Field
            label="Nové heslo"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Notice kind="error">{error}</Notice>}
          <Button disabled={busy}>Uložiť heslo</Button>
        </form>
      )}
    </Card>
  )
}
