# cardstack

Cardstack is a minimal single-page kanban board — add cards, move them across columns, mark them done.

**Stack:** Vite + React (TypeScript, SPA)

It is realistic but intentionally small, and 
## Key user actions

add card · move card · complete card

## Running it

```bash
npm install
npm run dev   # http://localhost:5173
```

## Feature flags

Split is wired in `src/flags.ts` (`@splitsoftware/splitio-browserjs`). Two flags: `compact_columns`, targeted to users whose `plan` attribute is `pro`, and `wip_limit`, a 20% percentage rollout that caps the In progress column at three cards. The app also sends `card_added`, `card_moved` and `card_completed` as Split events. The client-side key comes from `VITE_SPLIT_CLIENT_KEY` (see `.env.example`); without it the SDK runs in localhost mode with both flags off.
