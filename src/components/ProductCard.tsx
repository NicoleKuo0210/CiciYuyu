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
    <div className="flex gap-4 items-start h-40">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={name}
        className="h-40 w-40 rounded-lg object-cover"
      />
      <div className="flex flex-col w-full h-full justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p className="ml-3 text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>

        <div className="text-sm text-gray-500 flex justify-end mt-4">
          <span>💲{price}</span> — <span>{quantity} in stock</span>
        </div>
      </div>
    </div>
  );
}