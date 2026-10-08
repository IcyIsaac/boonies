import type { Collection } from "@/data/collections";
import ProductCard from "./ProductCard";

export default function CollectionSection({ collection, isLast }: { collection: Collection; isLast?: boolean }) {
  const { title, products, compact } = collection;

  return (
    <section className={`mx-auto max-w-[calc(90rem+80px)] px-5 md:px-10 ${isLast ? "pb-12" : ""} pt-[51px]`}>
      <h3
        className={`mb-[30px] max-w-[60rem] text-[32px] font-bold leading-[1.2] md:text-[48px] ${
          compact ? "tracking-[1.44px]" : "tracking-[3px] md:tracking-[5px]"
        }`}
      >
        {title}
      </h3>
      <div
        className={`grid grid-cols-2 gap-y-9 md:grid-cols-3 ${compact ? "gap-x-2" : "gap-x-[15px] md:gap-x-[26px]"}`}
      >
        {products.map((product) => (
          <ProductCard key={product.handle} product={product} compact={compact} />
        ))}
      </div>
    </section>
  );
}
