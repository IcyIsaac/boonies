import CollectionSection from "@/components/CollectionSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { collections } from "@/data/collections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {collections.map((collection, i) => (
          <CollectionSection key={collection.title} collection={collection} isLast={i === collections.length - 1} />
        ))}
      </main>
      <Footer />
    </>
  );
}
