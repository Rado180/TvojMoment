-- Prihlásený používateľ si môže prečítať svoje predplatné. Zápis robí len server (Stripe webhook).
create policy "Používateľ vidí svoje predplatné (TvojMoment)" on public.hm_subscriptions
  for select to authenticated using (auth.uid() = user_id);
