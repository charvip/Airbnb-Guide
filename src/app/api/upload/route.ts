import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isHost } from "@/lib/auth";

// Photos upload straight from the host's browser to Vercel Blob. This route
// only hands out a short-lived upload token, and only to a signed-in host.
// Going direct avoids Vercel's ~4.5 MB request limit, which phone photos
// often exceed.
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isHost())) throw new Error("Not signed in as host.");
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic"],
          maximumSizeInBytes: 15 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      // Called by Vercel after the upload finishes. Nothing to do: the photo
      // URL is saved when the host presses "Save changes".
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Upload failed" }, { status: 400 });
  }
}
