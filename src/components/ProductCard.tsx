import Link from "next/link";

type ProductProps = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};

export default function ProductCard({
  id,
  name,
  description,
  price,
  quantity,
  image,
}: ProductProps) {
  return (
    <div className="w-64 h-full">
      <Link
        href={`/product/${id}`}
        className="p-4 hover:bg-gray-50 transition-colors bg-white rounded shadow h-full block"
      >
        <div className="flex gap-4 items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={name}
            className="h-20 w-20 rounded-lg object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
            <div className="mt-2 text-sm text-gray-500">
              <span>💲{price}</span> — <span>{quantity} in stock</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}