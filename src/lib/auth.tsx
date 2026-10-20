import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

type AuthState = { session: Session | null; ready: boolean }

const AuthContext = createContext<AuthState>({ session: null, ready: false })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ session: null, ready: false })
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setState({ session: data.session, ready: true }))
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setState({ session, ready: true })
      // Odkaz z e-mailu na obnovu hesla otvorí stránku na zadanie nového hesla.
      if (event === 'PASSWORD_RECOVERY') navigate('/nove-heslo')
      if (event === 'SIGNED_IN' && session) ensureProfile(session.user.id)
    })
    return () => data.subscription.unsubscribe()
  }, [navigate])

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

// Profil TvojMoment (hm_user_profiles) je oddelený od profilov Rozprávok.
async function ensureProfile(userId: string) {
  await supabase.from('hm_user_profiles').upsert({ id: userId }, { onConflict: 'id', ignoreDuplicates: true })
}

export function signUp(email: string, password: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/ucet`,
      data: { app_source: 'tvojmoment', registered_domain: window.location.hostname, language: 'sk' },
    },
  })
}

export function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password })
}

export function sendPasswordReset(email: string) {
  return supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/nove-heslo` })
}

export function updatePassword(password: string) {
  return supabase.auth.updateUser({ password })
}

export function signOut() {
  return supabase.auth.signOut()
}
