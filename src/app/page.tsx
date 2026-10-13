import About from "@/components/About";
import Club from "@/components/Club";
import CurvedMarquee from "@/components/CurvedMarquee";
import Discography from "@/components/Discography";
import FanWall from "@/components/FanWall";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { MusicProvider } from "@/components/music";
import Nav from "@/components/Nav";
import Newsletter from "@/components/Newsletter";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import Store from "@/components/Store";
import Tour from "@/components/Tour";
import { getAlbumTracks, getPreviewTracks } from "@/lib/previews";

export default async function Home() {
  const [tracks, albumTracks] = await Promise.all([getPreviewTracks(), getAlbumTracks()]);

  return (
    <MusicProvider tracks={tracks} albumTracks={albumTracks}>
      <Nav />
      <main>
        <Hero />
        <FanWall />
        <CurvedMarquee />
        <About />
        <Discography />
        <Store />
        <Tour />
        <Club />
        <Newsletter />
      </main>
      <Footer />
      <SpotifyPlayer />
    </MusicProvider>
  );
}
