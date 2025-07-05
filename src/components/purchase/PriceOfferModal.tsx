import React, { useState, useEffect } from "react";
import PriceProgressBar from "./PriceProgressBar";
import QuantityStepper from "./QuantityStepper";
import type { Product } from "../../apis/mock/purchase";
import { IoClose } from "react-icons/io5";
import usePurchaseStore from "../../stores/purchase";

interface PriceOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const PriceOfferModal: React.FC<PriceOfferModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [quantity, setQuantity] = useState(1);
  const addOffer = usePurchaseStore((state) => state.addOffer);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDone = () => {
    addOffer(product.id);
    console.log(`Offered to buy ${quantity} of ${product.name}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl w-full max-w-md p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">현재가격</span>
          <button onClick={onClose} className="text-gray-500">
            <IoClose size={24} />
          </button>
        </header>

        <p className="text-2xl font-bold mb-2">
          {product.currentPrice.toLocaleString()}원
        </p>

        <PriceProgressBar />

        <QuantityStepper
          quantity={quantity}
          setQuantity={setQuantity}
          price={product.currentPrice}
          showTotalPrice={false}
        />

        <div className="mt-8">
          <button
            onClick={handleDone}
            className="w-full bg-[#538E79] text-white py-3.5 rounded-lg font-bold text-lg"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceOfferModal;
