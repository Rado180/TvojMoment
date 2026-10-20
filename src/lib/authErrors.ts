// Preklad najčastejších chýb Supabase Auth do slovenčiny.
export function authErrorMessage(message: string) {
  if (/invalid login credentials/i.test(message)) return 'Nesprávny e-mail alebo heslo.'
  if (/email not confirmed/i.test(message)) return 'E-mail ešte nie je potvrdený. Skontroluj si schránku.'
  if (/already registered/i.test(message)) return 'Tento e-mail už má účet. Prihlás sa, platí aj účet z Rozprávok.'
  if (/password should be at least/i.test(message)) return 'Heslo musí mať aspoň 6 znakov.'
  if (/rate limit/i.test(message)) return 'Príliš veľa pokusov. Skús to znova o chvíľu.'
  return message
}
