# Airbnb Guest Guide: rules for every session

Mobile-first guest guide for an Airbnb (guest pages + password-protected host editor).
Stack: **SvelteKit 3 (Svelte 5 runes) + TypeScript + Tailwind CSS 4 + shadcn-svelte**, deployed on
Vercel with Vercel Blob for content and photos. Package manager: **pnpm**.

```bash
pnpm dev            # local dev server
pnpm check          # svelte-check + design-rule check (must pass before you finish)
pnpm check:design   # design-rule check only
pnpm build          # production build (Vercel adapter)
```

---

## 1. Design system: tokens and components first (STRICT)

The UI is built in four layers. Each layer may only use the layers above it:

| #   | Layer              | Location                                              | Made of                                                                    |
| --- | ------------------ | ----------------------------------------------------- | -------------------------------------------------------------------------- |
| 1   | **Tokens**         | `src/lib/styles/tokens.css`                           | CSS variables (colour, radius, font, layout) exposed as Tailwind utilities |
| 2   | **Primitives**     | `src/lib/components/ui/*`                             | shadcn-svelte components, added with the CLI                               |
| 3   | **App components** | `src/lib/components/app/*` (exported from `index.ts`) | Primitives + token utilities only                                          |
| 4   | **Pages**          | `src/routes/**`                                       | App components + primitives + layout utilities only                        |

### The workflow for any UI change

1. **Look in the library first.** Check the inventory below, `src/lib/components/app/index.ts` and
   `src/lib/components/ui/`. If something fits, use it.
2. **Missing a token?** Add it to `tokens.css` first: a variable in `:root`, a matching one in `.dark`,
   and a mapping in `@theme inline` (e.g. `--color-success: var(--success)`). Then use the utility
   (`bg-success`, `text-success`).
3. **Missing a primitive?** If shadcn-svelte has it, add it with the CLI (see below). **Never
   hand-write a component that shadcn-svelte already provides.** If a primitive needs a new look, add
   a **variant** inside its `tv({...})` that uses tokens (example: the `success`/`warning` variants on
   Alert and Badge). Don't fork it.
4. **Missing a product-level component?** Create it in `src/lib/components/app/`, built only from
   primitives and tokens, and export it from `index.ts`. Add it to the inventory below.
5. **Only then** use it in the page.

### Do not invent your own styling

Don't create new visual styles or one-off components outside the library.

- **No raw colours anywhere outside `tokens.css`**: no hex, `rgb()`, `oklch()`, and no Tailwind palette
  classes such as `bg-emerald-800`, `text-stone-600` or `border-red-300`. Use token utilities instead:
  `bg-primary`, `text-muted-foreground`, `border-border`, `text-destructive`, `bg-success-foreground`, and so on.
- **No arbitrary values** (`w-[13px]`, `bg-[#fff]`, `text-[15px]`) and **no `style=""`**
  attributes in pages or app components. Use the Tailwind scale or add a token.
- **Pages contain no raw interactive or visual elements:** no `<button>`, `<a>`, `<input>`
  (except `type="hidden"`), `<select>`, `<textarea>` or `<img>`. Use `Button` (with `href` for links),
  `Input`, `TextField`, `NativeSelect`, `PhotoGallery` and the like.
- Pages **may** use layout utilities (`flex`, `grid`, `gap-*`, `mb-*`, `w-full`, `max-w-page`…) and
  typography utilities (`text-lg`, `font-semibold`) on wrapper elements and headings.
- Use the existing icon set, **`@lucide/svelte`** (import per icon:
  `import XIcon from '@lucide/svelte/icons/x'`). Emoji in content render through `Emoji`.
- Primitives in `ui/` are generated code. Edit them only to add token-based variants, and keep the
  shadcn structure intact so the CLI can update them.

`scripts/check-design-rules.js` enforces these rules on `src/routes` and `src/lib/components/app`,
and `pnpm check` runs it. Don't weaken it to make a change pass. Fix the code, or extend the library.

### Adding shadcn-svelte primitives

`components.json` is configured (style `luma`, base colour `stone`, Lucide icons, Figtree font). From
the repo root:

```bash
pnpm dlx shadcn-svelte@1.7.0 add <component> [more…] -y
```

The CLI may stop at yes/no prompts (for example "update your CSS?"); the answer is yes. After adding,
review any changes it made to `tokens.css` so the warm palette below survives.

### Tokens (summary; see `tokens.css`)

- Surfaces: `background` (warm cream), `card` (white), `foreground` (warm near-black)
- Brand: `primary` (deep emerald) / `primary-foreground`; `secondary` (emerald-50) / `secondary-foreground`
- Neutrals: `muted`, `muted-foreground`, `accent`, `border`, `input`, `ring`
- Status: `destructive`, `success` / `success-foreground`, `warning` / `warning-foreground`
- Radius: `--radius` (0.875rem) → `rounded-sm … rounded-4xl`
- Font: Figtree (`font-sans`)
- Layout: `max-w-page` (36rem, the single phone-width column)

### Component inventory

**Primitives (`#lib/components/ui/<name>/index.js`):** accordion, alert (+ `success`, `warning`),
aspect-ratio, badge (+ `warning`), button, card, field, input, item, label, native-select,
separator, textarea.

**App components (`#lib/components/app/index.js`):**

| Component                                                 | Use for                                                               |
| --------------------------------------------------------- | --------------------------------------------------------------------- |
| `PageHeader`                                              | Page title with optional emoji, eyebrow, subtitle, centring           |
| `BackLink`                                                | "← Home"-style link at the top of a page                              |
| `NavCard`                                                 | Tappable row linking to another page (emoji, title, summary, chevron) |
| `SectionCard`                                             | Titled content card on guest pages                                    |
| `TextList`                                                | Bulleted or numbered list of strings                                  |
| `InfoList`                                                | Label/value pairs (WiFi network/password…)                            |
| `CodeDisplay`                                             | A short code shown large (door code)                                  |
| `PhotoGallery`                                            | Grid of host-uploaded photos                                          |
| `ContactCta`                                              | "Still stuck? Contact the host" button                                |
| `TourPager`                                               | Previous/next buttons between tour stops                              |
| `PasswordGate`                                            | One-field password form (guest unlock, host login)                    |
| `Emoji`                                                   | Decorative emoji icon (`sm`/`md`/`lg`)                                |
| `HostHeader`                                              | Host editor page header with "Host mode" badge                        |
| `FormNotice`                                              | Saved/error alert from a form action result                           |
| `EditorForm`                                              | Host edit form (progressive enhancement, keeps values after save)     |
| `FormSection`                                             | Card grouping related fields                                          |
| `TextField`, `TextAreaField`, `LinesField`, `SelectField` | Labelled form fields (`LinesField` = one item per line)               |
| `PhotoField`                                              | Upload/reorder/remove photos (direct-to-Blob uploads)                 |
| `EditLink`                                                | Dashboard row that opens an editor                                    |
| `AddItemForm`                                             | Inline "name + Add" create form                                       |

---

## 2. SvelteKit 3 conventions used here

- Config lives in `vite.config.ts` (there is no `svelte.config.js`).
- Import from `src/lib` with the `#lib` alias **and a file extension**: `#lib/server/content.js`,
  `#lib/components/app/index.js`, `#lib/components/ui/button/index.js`.
- Environment variables are declared in `src/env.ts` (`defineEnvVars`) and read through
  `$app/env/private`. Add new variables there and in `.env.example`.
- Svelte 5 runes only (`$props`, `$state`, `$derived`). Use `$props.id()` for label/input ids.
- Server-only code goes in `src/lib/server/`.

## 3. App architecture

- **Content:** `src/lib/server/content.ts`. Every save writes a new JSON file to Vercel Blob (the last 10
  are kept). Reads are cached with `getCache()` from `@vercel/functions` and invalidated by tag on
  save. **Don't remove the cache**: without it each page view calls Blob `list()`, which would hit the
  Vercel Hobby limit. Default content and types are in `src/lib/data/house.ts`.
- **Access:** `src/lib/server/auth.ts`. `/essentials` is gated by `GUEST_CODE` and `/host/*` by
  `HOST_PASSWORD`, both through httpOnly cookies. Pages check in `load`
  (`guardGuestPage` / `guardHostPage`, plus the `host/(editor)/+layout.server.ts` guard). **Form
  actions and endpoints must check again** (`requireHost`, or `save()` in `host-actions.ts`), because
  layout loads don't run for actions.
- **Don't leak secrets:** a page's `load` returns only the fields that page needs. The door code and
  WiFi are only ever returned by `/essentials` (after the guard) and the host editor.
- **Host edits:** form actions in `src/routes/host/(editor)/**/+page.server.ts` use the helpers in
  `src/lib/server/host-actions.ts` (`save`, `text`, `lines`, `photos`, `slugify`).
- **Photos:** `PhotoField` uploads straight to Blob using presigned URLs from `/api/upload`
  (host-only).

## 4. Before you finish

1. `pnpm check` passes (types and design rules).
2. `pnpm build` succeeds.
3. New tokens or components are documented in the inventory above.
