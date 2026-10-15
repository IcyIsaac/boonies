const CDN = "https://store.bensonboone.com/cdn/shop/files/";
// Ask Shopify for a pre-sized copy; some originals are too large for the Next image optimizer.
const img = (file: string) => `${CDN}${file}?width=1000`;
const STORE = "https://store.bensonboone.com";

export const links = {
  store: STORE,
  tour: `${STORE}/pages/tour`,
  email: "hello@bensonboone.com",
};

export const spotify = {
  artistId: "22wbnEMDvgVIAGdFeek6ET",
  /**
   * Play queue. The player starts at the first track and moves to the next one
   * when a track (or its 30-second preview) finishes, looping back at the end.
   */
  queue: [
    { title: "Slow It Down", uri: "spotify:track:51eSHglvG1RJXtL3qI5trr" },
    { title: "Beautiful Things", uri: "spotify:track:3xkHsmpQCBMytMJNiDf3Ii" },
    { title: "In The Stars", uri: "spotify:track:315aBOUD3xtj7sUMXtRgMV" },
    { title: "Mystical Magical", uri: "spotify:track:2ipIPsgrgd0j2beDf4Ki70" },
    { title: "Sorry I'm Here For Someone Else", uri: "spotify:track:15zJeVUmKFnbrxm9dxcxYD" },
    { title: "Ghost Town", uri: "spotify:track:6HuHyXviAdpmnQu73JHfBz" },
    { title: "Mr Electric Blue", uri: "spotify:track:6V7bxWg4mmuU4ILbYPQJvd" },
    { title: "NIGHTS LIKE THESE", uri: "spotify:track:33vZRjxJScapmRShRJq8I0" },
    { title: "Pretty Slowly", uri: "spotify:track:1QxxBUAx42J8pIFYJJR880" },
  ],
  url: "https://open.spotify.com/artist/22wbnEMDvgVIAGdFeek6ET",
};

/** Streaming services, in display order. `icon` names a Simple Icons brand mark. */
export const streaming = [
  { label: "Spotify", wordmark: "Spotify", icon: "spotify", href: spotify.url },
  { label: "Apple Music", wordmark: "Music", icon: "applemusic", href: "https://music.apple.com/us/artist/benson-boone/1587414058" },
  { label: "Amazon Music", wordmark: "amazon music", icon: "amazonmusic", href: "https://music.amazon.com/" },
  { label: "YouTube", wordmark: "YouTube", icon: "youtube", href: "https://www.youtube.com/" },
  { label: "YouTube Music", wordmark: "Music", icon: "youtubemusic", href: "https://music.youtube.com/" },
] as const;

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "TikTok", href: "https://www.tiktok.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "X", href: "https://x.com/" },
] as const;

export const navItems = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Music", href: "#music" },
  { label: "Tour", href: "#tour" },
  { label: "Merch", href: "#merch" },
  { label: "Boonies Club", href: "#club" },
];

/** Colour moods available to the NightPhoto stand-ins. */
export type Tone = "ember" | "teal" | "rose" | "gold" | "night";

/** Milestones for the polaroid timeline (release month.year). */
/** `image` is the photo in the polaroid (from /public); `focus` is the crop's focal point. */
export const timeline: { word: string; title: string; date: string; tone: Tone; image: string; focus?: string }[] = [
  { word: "Begin", title: "ghost town", date: "06.21", tone: "ember", image: "/images/polaroids/ghost-town.webp", focus: "50% 45%" },
  { word: "Rise", title: "beautiful things", date: "01.24", tone: "gold", image: "/images/polaroids/beautiful-things.webp", focus: "40% 30%" },
  { word: "Fly", title: "fireworks & rollerblades", date: "04.24", tone: "night", image: "/images/polaroids/fireworks-rollerblades.webp", focus: "55% 50%" },
  { word: "Return", title: "american heart", date: "06.25", tone: "rose", image: "/images/polaroids/american-heart.png", focus: "55% 60%" },
  { word: "Roam", title: "wanted man world tour", date: "07.26", tone: "teal", image: "/images/polaroids/wanted-man-tour.png", focus: "50% 40%" },
];

/**
 * Official cover art via Apple's public iTunes Search API. `topTrack` is the
 * album's most popular song (Spotify top tracks; Deezer ranking for Pulse) and
 * plays when its record is chosen in the discography section.
 */
const COVER = "https://is1-ssl.mzstatic.com/image/thumb/";

export const albums: {
  title: string;
  kind: string;
  year: number;
  tracks: number;
  cover: string;
  href: string;
  source: { kind: "album" | "playlist"; id: string; take?: number };
  topTrack: { title: string; uri: string };
}[] = [
  {
    title: "American Heart",
    kind: "Album",
    year: 2025,
    tracks: 10,
    cover: COVER + "Music211/v4/cb/35/5d/cb355d50-f32a-6641-db03-a1d08ad87399/093624834960.jpg/600x600bb.jpg",
    href: "https://music.apple.com/us/album/american-heart/1807490612",
    /** Spotify source for this release's tracklist (previews come from its embed page). */
    source: { kind: "album", id: "3C0QJ1R0T3xX0BUbOZcdCw" },
    topTrack: { title: "Mystical Magical", uri: "spotify:track:2ipIPsgrgd0j2beDf4Ki70" },
  },
  {
    title: "Fireworks & Rollerblades",
    kind: "Album",
    year: 2024,
    tracks: 15,
    cover: COVER + "Music211/v4/a5/c1/9c/a5c19c62-d641-93b4-2800-e74778569f5f/093624852483.jpg/600x600bb.jpg",
    href: "https://music.apple.com/us/album/fireworks-rollerblades/1736051351",
    source: { kind: "album", id: "168CdR21lfn0TTyw1Pkdcm" },
    topTrack: { title: "Beautiful Things", uri: "spotify:track:3xkHsmpQCBMytMJNiDf3Ii" },
  },
  {
    title: "Pulse",
    kind: "EP",
    year: 2023,
    tracks: 5,
    cover: COVER + "Music116/v4/fc/c7/02/fcc7028a-719d-0417-4db1-90451032ae38/093624856566.jpg/600x600bb.jpg",
    href: "https://music.apple.com/us/album/pulse-ep/1678602256",
    source: { kind: "album", id: "7nr5rtJ59Y0jBxKHPrGdW5" },
    topTrack: { title: "Coffee Cake", uri: "spotify:track:31XxRxQ4g4mVkHoJwhCJ5z" },
  },
  {
    title: "Walk Me Home...",
    kind: "EP",
    year: 2022,
    tracks: 8,
    cover: COVER + "Music122/v4/4b/c9/0b/4bc90b5e-98c9-366a-5ae8-6402dd50f774/093624867142.jpg/600x600bb.jpg",
    href: "https://music.apple.com/us/album/walk-me-home/1632274443",
    // No public album page found; Warner's official playlist opens with the EP's 8 tracks in order.
    source: { kind: "playlist", id: "3GwWp1tv2BREcM247QPV7e", take: 8 },
    topTrack: { title: "In The Stars", uri: "spotify:track:5bFg6rdrEWuuc1D760jbcg" },
  },
];

export type Album = (typeof albums)[number];

export const merch = [
  {
    title: "Wanted Man Ash Grey Hoodie",
    category: "Hoodie",
    price: "$125.00",
    image: img("BB-WANTED-MAN-HOODIE-HG-FRONT_1.png"),
    hover: img("BB-WANTED-MAN-HOODIE-HG-BACK_2.png"),
    href: `${STORE}/products/wanted-man-ash-grey-hoodie`,
  },
  {
    title: "Reward Tee",
    category: "Tee",
    price: "$50.00",
    image: img("BB_WANTEDMANTOUR_REWARDTEE_FRONT.png"),
    hover: img("BB_WANTEDMANTOUR_REWARDTEE_BACK.png"),
    href: `${STORE}/products/reward-tee`,
  },
  {
    title: "Wanted Man Denim Jacket",
    category: "Outerwear",
    price: "$150.00",
    image: img("BB_WANTEDMANTOUR_WANTEDMANJACKET_BACK.png"),
    hover: img("BB_WANTEDMANTOUR_WANTEDMANJACKET_pins_front.png"),
    href: `${STORE}/products/wanted-man-denim-jacket`,
  },
  {
    title: "I <3 A Wanted Man Hat",
    category: "Accessories",
    price: "$40.00",
    image: img("WTDENIMHATFRONT.png"),
    hover: img("WTDENIMHATHATB.png"),
    href: `${STORE}/products/i-3-a-wanted-man-hat`,
  },
];

/** Remaining Wanted Man World Tour dates (as printed on the official tour merch). */
export const tourDates = [
  { date: "Oct 26", city: "Seoul", country: "South Korea" },
  { date: "Oct 29", city: "Tokyo", country: "Japan" },
  { date: "Nov 02", city: "Singapore", country: "Singapore" },
  { date: "Nov 06–08", city: "Brisbane", country: "Australia" },
  { date: "Nov 12–14", city: "Melbourne", country: "Australia" },
  { date: "Nov 17–19", city: "Sydney", country: "Australia" },
];


export const clubPerks = [
  { title: "Early access", body: "First look at tour presales before tickets go public." },
  { title: "Member drops", body: "Limited merch runs made only for club members." },
  { title: "Behind the scenes", body: "Studio clips, soundcheck footage and tour diaries." },
];

export const countries = ["United States", "Canada", "Mexico", "United Kingdom", "Australia", "Japan", "South Korea", "Singapore", "Germany", "France", "Brazil", "Other"];
