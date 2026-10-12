"use client";

import { upload } from "@vercel/blob/client";
import { useState } from "react";

// Photo manager inside a host edit form. Uploads go straight to Vercel Blob;
// the resulting URLs are kept in hidden "photos" inputs, so they're saved
// together with the rest of the form when the host presses "Save changes".
export function PhotoField({ photos: initial }: { photos?: string[] }) {
  const [photos, setPhotos] = useState<string[]>(initial ?? []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    try {
      for (const file of Array.from(files)) {
        const blob = await upload(`photos/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
        setPhotos((p) => [...p, blob.url]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  const move = (i: number, dir: -1 | 1) =>
    setPhotos((p) => {
      const next = [...p];
      const j = i + dir;
      if (j < 0 || j >= next.length) return p;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  return (
    <div className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold">Photos</h2>
      {photos.map((url) => (
        <input key={url} type="hidden" name="photos" value={url} />
      ))}

      {photos.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {photos.map((url, i) => (
            <div key={url} className="space-y-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Photo ${i + 1}`} className="aspect-square w-full rounded-xl object-cover" />
              <div className="flex gap-1 text-sm">
                <button type="button" onClick={() => move(i, -1)} className="rounded-lg border px-2 py-1" aria-label="Move earlier">
                  ←
                </button>
                <button type="button" onClick={() => move(i, 1)} className="rounded-lg border px-2 py-1" aria-label="Move later">
                  →
                </button>
                <button
                  type="button"
                  onClick={() => setPhotos((p) => p.filter((u) => u !== url))}
                  className="flex-1 rounded-lg border border-red-300 px-2 py-1 text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <label className="block cursor-pointer rounded-xl border-2 border-dashed border-stone-300 p-4 text-center text-stone-600 hover:border-emerald-700">
        {uploading ? "Uploading…" : "＋ Add photos"}
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={uploading}
          className="sr-only"
          onChange={(e) => {
            onFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <p className="text-xs text-stone-500">Press &quot;Save changes&quot; after adding or removing photos.</p>
    </div>
  );
}
