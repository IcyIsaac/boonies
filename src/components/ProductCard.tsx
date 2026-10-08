import Image from "next/image";
import type { Product } from "@/data/collections";

export default function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const [front, back] = product.images;
  const tracking = compact ? "tracking-[3px]" : "tracking-[5px]";

  return (
    <a href={`/products/${product.handle}`} className="group flex flex-col gap-[17px]">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={front}
          alt={product.title}
          fill
          sizes="(min-width: 750px) 33vw, 50vw"
          className={`object-cover transition-opacity duration-300 ${back ? "group-hover:opacity-0" : ""}`}
        />
        {back && (
          <Image
            src={back}
            alt=""
            fill
            sizes="(min-width: 750px) 33vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </div>
      <div className={`flex flex-col gap-1 ${tracking}`}>
        <h4 className="text-[12px] font-semibold leading-[1.3] md:text-[13px]">{product.title}</h4>
        <span className="text-[12px] font-semibold md:text-[13px]">{product.price}</span>
      </div>
    </a>
  );
}
