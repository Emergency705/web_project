import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Product, Seller } from "../../apis/mock/purchase";
import { getProductById, getSellerInfo } from "../../apis/mock/purchase";
import PriceProgressBar from "../../components/purchase/PriceProgressBar";
import SellerCard from "../../components/purchase/SellerCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import PriceOfferModal from "../../components/purchase/PriceOfferModal";
import usePurchaseStore from "../../stores/purchase";
import ConfirmModal from "../../components/purchase/ConfirmModal";
import useCommentStore from "../../stores/comment";

const PurchaseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | undefined>();
  const [seller, setSeller] = useState<Seller | undefined>();
  const [isPriceOfferModalOpen, setIsPriceOfferModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { offeredProductIds, cancelOffer } = usePurchaseStore();
  const hasOffered = product && offeredProductIds.includes(product.id);

  const { comments, deleteComment } = useCommentStore();
  const productComments = (product && comments[product.id]) || [];

  useEffect(() => {
    if (id) {
      const productId = parseInt(id, 10);
      setProduct(getProductById(productId));
      setSeller(getSellerInfo());
    }
  }, [id]);

  const handleOpenPriceOfferModal = () => {
    setIsPriceOfferModalOpen(true);
  };

  const handleClosePriceOfferModal = () => {
    setIsPriceOfferModalOpen(false);
  };

  const handleCancelOffer = () => {
    if (product) {
      cancelOffer(product.id);
      setIsConfirmModalOpen(false);
    }
  };

  const handleRegisterComment = () => {
    if (product) {
      navigate(`/purchase/${product.id}/comment`);
    }
  };

  if (!product) {
    return <div>상품 정보를 불러오는 중...</div>;
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-white z-10 p-4 flex items-center border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="p-1">
          <IoIosArrowBack size={24} />
        </button>
        <h1 className="text-lg font-bold text-center flex-1">구매하기</h1>
        <div className="w-8"></div> {/* for centering title */}
      </header>

      {/* Product Image */}
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-auto"
        />
        <div className="absolute top-4 left-4 bg-[#538E79] text-white text-xs px-2 py-1 rounded">
          {product.category}
        </div>
        <div className="absolute top-4 right-4 bg-yellow-400/80 text-white text-xs px-3 py-1.5 rounded-full font-bold">
          MD 추천템
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-sm font-bold text-red-500">
          3일 뒤에 구매가 마감돼요!
        </p>
        <h2 className="text-2xl font-bold mt-1">{product.name}</h2>
        <p className="text-gray-600 mt-2 text-sm">{product.description}</p>

        <div className="mt-4">
          <h3 className="font-bold">현재가격</h3>
          <p className="text-3xl font-bold">14,000원</p>
        </div>

        <PriceProgressBar />
      </div>

      <div className="w-full h-2 bg-gray-100 my-2"></div>

      {/* Comments/Reviews */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">기대평 {productComments.length}개</h3>
          <button className="text-sm text-gray-500 flex items-center">
            <IoIosArrowForward size={16} />
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {productComments.length > 0 ? (
            productComments.map((comment) => (
              <SellerCard
                key={comment.id}
                seller={{
                  id: comment.id,
                  name: comment.author,
                  profileImageUrl: comment.profileImageUrl,
                  comment: `${comment.text} (수량: ${comment.quantity})`,
                }}
                onDelete={() =>
                  product && deleteComment(comment.id, product.id)
                }
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              아직 등록된 기대평이 없어요.
            </p>
          )}
        </div>
      </div>

      <div className="w-full h-2 bg-gray-100 my-2"></div>

      {/* Seller Info */}
      {seller && (
        <div className="p-4">
          <h3 className="font-bold mb-2">판매자 정보</h3>
          <SellerCard seller={seller} />
          {hasOffered && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setIsConfirmModalOpen(true)}
                className="flex-1 bg-white text-[#538E79] border border-[#538E79] py-3 rounded-lg font-bold"
              >
                구매 의사 취소
              </button>
              <button
                onClick={handleRegisterComment}
                className="flex-1 bg-[#538E79] text-white py-3 rounded-lg font-bold"
              >
                기대평 등록
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer Action Bar */}
      {!hasOffered && (
        <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-4 border-t border-gray-200 flex items-center gap-3">
          <button className="flex flex-col items-center justify-center p-2 border border-gray-300 rounded-lg text-[#538E79]">
            <FaHeart size={20} />
            <span className="text-xs font-bold mt-1">200</span>
          </button>
          <button
            onClick={handleOpenPriceOfferModal}
            className="flex-1 bg-[#538E79] text-white py-3 rounded-lg font-bold"
          >
            구매 의사 등록하기
          </button>
        </footer>
      )}

      <PriceOfferModal
        isOpen={isPriceOfferModalOpen}
        onClose={handleClosePriceOfferModal}
        product={product}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleCancelOffer}
        title="구매 의사를 취소하시겠어요?"
        message="구매 의사를 취소하면 다시 되돌릴 수 없습니다."
      />
    </div>
  );
};

export default PurchaseDetailPage;
