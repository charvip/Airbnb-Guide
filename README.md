# Airbnb Guest Guide

A mobile-first guest guide for an Airbnb, with a **guest side** (room-by-room tour, appliance how-tos, essentials, activities, FAQ) and a password-protected **host side** for editing everything and uploading photos.

## Tech stack

- SvelteKit 3 (Svelte 5) + TypeScript, form actions for host edits
- Tailwind CSS 4 + shadcn-svelte components, styled through design tokens (see `CLAUDE.md`)
- Vercel hosting, with Vercel Blob for saved content and photos

## Guest side

| Route                             | What it shows                                                             |
| --------------------------------- | ------------------------------------------------------------------------- |
| `/`                               | Home: start the tour, devices, essentials, activities, FAQ                |
| `/tour`, `/tour/[stop]`           | Arrival → living room → kitchen → garden → checkout                       |
| `/appliances`, `/appliances/[id]` | Where each device and its supplies are, steps, troubleshooting, photos    |
| `/essentials`                     | Door code, WiFi, parking, checkout, quiet hours (optional guest passcode) |
| `/activities`, `/faq`, `/contact` | Things to do, common questions, host contact                              |

## Host side

Sign in at `/host` (link at the bottom of the home page) with `HOST_PASSWORD`. Hosts can:

- Edit essentials, host contact, the welcome message and FAQ
- Edit each tour stop and choose which devices appear on it
- Add, edit and delete devices and activities
- Upload, reorder and remove photos

Edits show up for guests immediately.

## How saving works

Vercel servers can't write to disk, so each save writes the full content as a new JSON file in Vercel Blob, and pages read the newest one (the last 10 versions are kept). Reads are cached in Vercel's Runtime Cache and refreshed on every save, which keeps Blob usage within the Hobby plan. Photos upload straight from the browser to Blob through short-lived presigned URLs that only signed-in hosts can get. `src/lib/data/house.ts` holds the starting content used before anything is saved.

## Setup on Vercel

1. **Storage → Create → Blob** (access: **Public**), and connect it to this project. Vercel adds `BLOB_STORE_ID` and `BLOB_WEBHOOK_PUBLIC_KEY` and authenticates with rotating OIDC tokens; older connections with `BLOB_READ_WRITE_TOKEN` also work.
2. **Settings → Environment Variables**: add `HOST_PASSWORD`, and optionally `GUEST_CODE`.
3. Redeploy.

## Demo data

The host names, phone number (555-01xx test range), email (example.com) and door code in the default content are fictional.

## Run locally

```bash
cp .env.example .env.local   # fill in the values
pnpm install
pnpm dev
```

Then open http://localhost:5173. Without Blob credentials (`vercel env pull`) the site shows the default content and saving is disabled.

## Design system

UI is built tokens first: `src/lib/styles/tokens.css` (tokens) → `src/lib/components/ui` (shadcn-svelte primitives) → `src/lib/components/app` (app components) → pages. `pnpm check` also runs `scripts/check-design-rules.js`, which rejects raw colours, arbitrary values and raw elements in pages. The full rules are in `CLAUDE.md`.
