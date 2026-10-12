// Keeps a page's existing photos when its form is saved.
// (Uploading new photos is added in the next step.)
export function PhotoField({ photos }: { photos?: string[] }) {
  return (
    <>
      {(photos ?? []).map((url) => (
        <input key={url} type="hidden" name="photos" value={url} />
      ))}
    </>
  );
}
