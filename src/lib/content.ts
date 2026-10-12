import "server-only";
import { del, list, put } from "@vercel/blob";
import { defaultContent, type SiteContent } from "@/data/house";

// Where the guide's content lives.
//
// Vercel's servers can't save files to disk, so every host edit is written as
// a new JSON file in Vercel Blob under content/. Reads always pick the newest
// one. Each save gets a new random URL, which sidesteps CDN caching (an
// overwritten URL could keep serving the old copy for a while).
//
// Without a Blob store connected (e.g. local dev), the default content from
// src/data/house.ts is used and saving is disabled.

const PREFIX = "content/site-";

export const storageConnected = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

async function newestContentBlobs() {
  const { blobs } = await list({ prefix: PREFIX });
  return blobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
}

export async function getContent(): Promise<SiteContent> {
  if (!storageConnected()) return defaultContent;
  try {
    const [newest] = await newestContentBlobs();
    if (!newest) return defaultContent;
    const res = await fetch(newest.url, { cache: "no-store" });
    if (!res.ok) return defaultContent;
    const saved = (await res.json()) as Partial<SiteContent>;
    // Fill in any sections added to the defaults after this copy was saved.
    return { ...defaultContent, ...saved };
  } catch (err) {
    console.error("Could not load saved content, using defaults", err);
    return defaultContent;
  }
}

export async function saveContent(content: SiteContent) {
  if (!storageConnected()) {
    throw new Error("No Vercel Blob store connected, so changes can't be saved yet.");
  }
  await put(`${PREFIX}${Date.now()}.json`, JSON.stringify(content), {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
  });
  // Keep the 10 most recent versions as a simple undo history.
  const old = (await newestContentBlobs()).slice(10).map((b) => b.url);
  if (old.length) await del(old);
}

export async function updateContent(change: (draft: SiteContent) => void) {
  const content = structuredClone(await getContent());
  change(content);
  await saveContent(content);
}
