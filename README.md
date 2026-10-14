# Airbnb Guest Guide

A mobile-first guest guide for an Airbnb, with a **guest side** (room-by-room tour, appliance how-tos, essentials, activities, FAQ) and a password-protected **host side** for editing everything and uploading photos.

## Tech stack
- Next.js (App Router, Server Actions) + TypeScript
- Tailwind CSS
- Vercel hosting, with Vercel Blob for saved content and photos

## Guest side
| Route | What it shows |
| --- | --- |
| `/` | Home: start the tour, devices, essentials, activities, FAQ |
| `/tour`, `/tour/[stop]` | Arrival → living room → kitchen → garden → checkout |
| `/appliances`, `/appliances/[id]` | Where each device and its supplies are, steps, troubleshooting, photos |
| `/essentials` | Door code, WiFi, parking, checkout, quiet hours (optional guest passcode) |
| `/activities`, `/faq`, `/contact` | Things to do, common questions, host contact |

## Host side
Sign in at `/host` (link at the bottom of the home page) with `HOST_PASSWORD`. Hosts can:
- Edit essentials, host contact, the welcome message and FAQ
- Edit each tour stop and choose which devices appear on it
- Add, edit and delete devices and activities
- Upload, reorder and remove photos

Edits show up for guests immediately.

## How saving works
Vercel servers can't write to disk, so each save writes the full content as a new JSON file in Vercel Blob, and pages read the newest one (the last 10 versions are kept). Photos upload straight from the browser to Blob through short-lived presigned URLs that only signed-in hosts can get. `src/data/house.ts` holds the starting content used before anything is saved.

## Setup on Vercel
1. **Storage → Create → Blob** (access: **Public**), and connect it to this project. Vercel adds `BLOB_STORE_ID` and `BLOB_WEBHOOK_PUBLIC_KEY` and authenticates with rotating OIDC tokens; older connections with `BLOB_READ_WRITE_TOKEN` also work.
2. **Settings → Environment Variables**: add `HOST_PASSWORD`, and optionally `GUEST_CODE`.
3. Redeploy.

## Demo data
The host names, phone number (555-01xx test range), email (example.com) and door code in the default content are fictional.

## Run locally
```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev
```
Then open http://localhost:3000. Without Blob credentials (`vercel env pull`) the site shows the default content and saving is disabled.
