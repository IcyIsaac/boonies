import "server-only";
import { albums, spotify } from "@/data/site";

export type PreviewTrack = {
  title: string;
  uri: string;
  /** Link to the full song on Spotify. */
  url: string;
  /** ~30s MP3 preview clip hosted by Spotify. */
  preview: string;
  cover: string | null;
  /** Spotify's background tint for the track, as an rgb() string. */
  color: string;
};

type Rgb = { red: number; green: number; blue: number };
type Image = { url: string; maxWidth: number };
type VisualIdentity = { image?: Image[]; backgroundBase?: Rgb };

const DAY = 60 * 60 * 24;

/** Fetches a public Spotify embed page and returns its data entity (cached for a day). */
async function embedEntity(path: string) {
  try {
    const res = await fetch(`https://open.spotify.com/embed/${path}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: DAY },
    });
    if (!res.ok) return null;
    const json = (await res.text()).match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
    return json ? JSON.parse(json).props?.pageProps?.state?.data?.entity : null;
  } catch {
    return null;
  }
}

const coverOf = (v?: VisualIdentity) => v?.image?.find((i) => i.maxWidth === 300)?.url ?? v?.image?.[0]?.url ?? null;
const colorOf = (v?: VisualIdentity) =>
  v?.backgroundBase ? `rgb(${v.backgroundBase.red}, ${v.backgroundBase.green}, ${v.backgroundBase.blue})` : "rgb(40, 40, 48)";
const trackUrl = (uri: string) => `https://open.spotify.com/track/${uri.split(":").pop()}`;

/**
 * The general play queue: each queued track's preview clip, cover and tint.
 * Tracks without a preview are skipped.
 */
export async function getPreviewTracks(): Promise<PreviewTrack[]> {
  const tracks = await Promise.all(
    spotify.queue.map(async ({ title, uri }): Promise<PreviewTrack | null> => {
      const entity = await embedEntity(`track/${uri.split(":").pop()}`);
      const preview: string | undefined = entity?.audioPreview?.url;
      if (!preview) return null;
      return { title: entity.name ?? title, uri, url: trackUrl(uri), preview, cover: coverOf(entity.visualIdentity), color: colorOf(entity.visualIdentity) };
    }),
  );
  return tracks.filter((t): t is PreviewTrack => t !== null);
}

/** Every release's tracklist (in order, previews only), keyed by album title. */
export async function getAlbumTracks(): Promise<Record<string, PreviewTrack[]>> {
  const entries = await Promise.all(
    albums.map(async (album) => {
      const entity = await embedEntity(`${album.source.kind}/${album.source.id}`);
      const list: { title: string; uri: string; audioPreview?: { url?: string } }[] = entity?.trackList ?? [];
      const cover = album.cover ?? coverOf(entity?.visualIdentity);
      const color = colorOf(entity?.visualIdentity);
      const tracks = list
        .slice(0, album.source.take ?? list.length)
        .filter((t) => t.audioPreview?.url)
        .map((t) => ({ title: t.title, uri: t.uri, url: trackUrl(t.uri), preview: t.audioPreview!.url!, cover, color }));
      return [album.title, tracks] as const;
    }),
  );
  return Object.fromEntries(entries);
}
