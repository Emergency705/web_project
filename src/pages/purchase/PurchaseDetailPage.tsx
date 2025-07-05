import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PriceProgressBar from "../../components/purchase/PriceProgressBar";
import ConfirmModal from "../../components/purchase/ConfirmModal";
import QuantityStepper from "../../components/purchase/QuantityStepper";
import {
  getFundingDetail,
  createFunding,
  deleteFunding,
  type FundingItem,
} from "../../apis/purchase";
import useCommentStore from "../../stores/comment";
import SellerCard from "../../components/purchase/SellerCard";

const PurchaseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<FundingItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { comments, deleteComment } = useCommentStore();
  const productComments = (product && comments[product.itemId]) || [];

  useEffect(() => {
    if (id) {
      const numericId = parseInt(id, 10);
      getFundingDetail(numericId)
        .then(setProduct)
        .catch(() => {
          alert("상품 정보를 불러오는데 실패했습니다.");
          navigate("/purchase");
        });
    }
  }, [id, navigate]);

  const handlePurchase = async () => {
    if (product) {
      try {
        await createFunding({ itemId: product.itemId, count: quantity });
        alert("구매 참여가 완료되었습니다.");
        navigate(`/purchase/${product.itemId}`);
      } catch {
        alert("구매 참여에 실패했습니다.");
      }
    }
  };

  const handleCancel = async () => {
    if (product) {
      try {
        await deleteFunding(product.itemId);
        alert("구매 참여를 취소했습니다.");
        navigate(`/purchase/${product.itemId}`);
      } catch {
        alert("구매 취소에 실패했습니다.");
      }
    }
  };

  const handleRegisterComment = () => {
    if (product) {
      navigate(`/write-review/${product.itemId}`);
    }
  };

  const calculateDday = (dateString: string) => {
    const today = new Date();
    const closedDate = new Date(dateString);
    const diffTime = closedDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0
      ? `${diffDays}일 뒤에 구매가 마감돼요!`
      : "구매가 마감되었어요!";
  };

  if (!product) {
    return <div>상품 정보를 불러오는 중...</div>;
  }

  const isParticipant = true;

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-white z-10 p-4 flex items-center border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="p-1">
          {/* 뒤로가기 아이콘, 필요시 추가 */}
        </button>
        <h1 className="text-lg font-bold text-center flex-1">{product.name}</h1>
        <div className="w-8"></div>
      </header>

      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-60 object-cover"
      />

      <main className="p-4">
        <PriceProgressBar
          currentPrice={product.currentPrice}
          startPrice={product.startPrice ?? 0}
          maxPrice={product.maxPrice ?? 0}
        />
        {product.seller && <SellerCard seller={product.seller} />}

        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2">상품 설명</h3>
          <p className="text-gray-700 whitespace-pre-wrap">
            {product.description}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-lg mb-2">
            기대평 ({productComments.length})
          </h3>
          {productComments.map((comment) => (
            <SellerCard
              key={comment.id}
              seller={{
                id: comment.id,
                name: comment.author,
                profileImageUrl: comment.profileImageUrl,
                comment: `${comment.text} (수량: ${comment.quantity})`,
              }}
              onDelete={() =>
                product && deleteComment(comment.id, product.itemId)
              }
            />
          ))}
        </div>

        {isParticipant && (
          <div className="mt-6">
            <QuantityStepper
              quantity={quantity}
              setQuantity={setQuantity}
              price={product.currentPrice}
              showTotalPrice={true}
            />
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-4 border-t-2 border-gray-100 flex items-center gap-3">
        {isParticipant ? (
          <>
            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold"
            >
              참여 취소
            </button>
            <button
              onClick={handleRegisterComment}
              className="flex-1 bg-[#538E79] text-white py-3 rounded-lg font-bold"
            >
              기대평 등록
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsPurchaseModalOpen(true)}
            className="w-full bg-[#538E79] text-white py-3 rounded-lg font-bold"
          >
            {product.currentPrice.toLocaleString()}원 참여하기
          </button>
        )}
      </footer>

      <ConfirmModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        onConfirm={handlePurchase}
        title="구매에 참여하시겠어요?"
        message={`${quantity}개 / ${(
          quantity * product.currentPrice
        ).toLocaleString()}원`}
      />
      <ConfirmModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancel}
        title="참여를 취소하시겠어요?"
        message="취소하면 다시 되돌릴 수 없어요."
      />
    </div>
  );
};

export default PurchaseDetailPage;
