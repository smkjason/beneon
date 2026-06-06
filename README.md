# beneon

A conversational web app for Bible readings, prayer, and community.

## Web (Next.js)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Supabase

1. Copy `.env.example` to `.env.local`
2. Add your project URL and publishable (or anon) key from the [Supabase dashboard](https://supabase.com/dashboard)
3. Restart the dev server — the home page shows connection status

```bash
cp .env.example .env.local
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## iOS

The SwiftUI iOS app lives in [`ios/`](ios/) for future development. See [`ios/README.md`](ios/README.md).

## Project Structure

```
beneon/
├── src/
│   ├── app/          # Next.js routes
│   └── lib/supabase/ # Supabase clients (browser, server, proxy)
├── public/           # Static assets
├── ios/              # SwiftUI iOS app (paused)
└── package.json
```
