# TvojMoment

Web s meditáciami (React + Vite + Tailwind). Dáta číta zo Supabase projektu „Rozpravky“ (tabuľky `hm_*`). Nasadzuje sa na Cloudflare Pages.

## Lokálne spustenie

```bash
cp .env.example .env
npm install
npm run dev
```

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Premenné prostredia: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (hodnoty v `.env.example`)

`public/_redirects` zabezpečí, že priame odkazy na podstránky fungujú.

## Ďalej

- Prihlasovanie (Supabase Auth)
- Predplatné cez Stripe (Cloudflare Worker + webhooky) a odomykanie prémiového obsahu
