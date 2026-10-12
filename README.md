# Airbnb Guest Guide

A mobile-first guest guide for an Airbnb: a room-by-room tour, appliance how-tos (with where each appliance and its supplies live), house essentials, FAQs and activities.

## Tech stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Deployed on Vercel (auto-deploys on every push to `main`)

## Pages
| Route | What it shows |
| --- | --- |
| `/` | Home: start the tour, devices, essentials, activities, FAQ |
| `/tour`, `/tour/[stop]` | Arrival → living room → kitchen → garden → checkout |
| `/appliances`, `/appliances/[id]` | Device list, and per-device location, supplies and instructions |
| `/essentials` | Door code, WiFi, parking, checkout, quiet hours, host (passcode-protected) |
| `/activities` | Hike, bonfire, yoga, board games, hot tub |
| `/faq` | Common questions |
| `/contact` | Host contact (every "Still stuck?" button links here) |

## Editing content
All content lives in `src/data/house.ts`. Replace each `[ADD: ...]` placeholder with real details. Adding a device or tour stop is just a new entry in that file.

## Secrets
The door code and WiFi details are **not** stored in the repo. Set these in Vercel → Project → Settings → Environment Variables, then redeploy:

- `GUEST_CODE`: passcode guests enter to see Essentials
- `DOOR_CODE`, `WIFI_NETWORK`, `WIFI_PASSWORD`

See `.env.example`. If `GUEST_CODE` is unset, Essentials is open.

## Run locally
```bash
cp .env.example .env.local
npm install
npm run dev
```
Then open http://localhost:3000.
