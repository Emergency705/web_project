import React from "react";
import type { Product } from "../../apis/mock/purchase";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="cursor-pointer">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto rounded-lg aspect-square object-cover"
        />
        <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded-full font-bold">
          MD 추천
        </div>
      </div>
      <div className="mt-2">
        <p className="font-bold text-sm text-[#538E79]">
          {product.participants}/{product.maxParticipants}명
        </p>
        <h3 className="font-semibold truncate">{product.name}</h3>
        <p className="text-gray-800 font-bold">
          현재 가격: {product.currentPrice.toLocaleString()}원/1장
        </p>
        <p className="text-xs text-gray-500">{product.location}</p>
      </div>
    </div>
  );
};

export default ProductCard;
