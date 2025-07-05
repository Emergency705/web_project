import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PriceProgressBar from "../../components/purchase/PriceProgressBar";
import QuantityStepper from "../../components/purchase/QuantityStepper";
import { IoIosArrowBack } from "react-icons/io";
import ConfirmModal from "../../components/purchase/ConfirmModal";
import {
  getFundingDetail,
  createReview,
  deleteFunding,
  type FundingItem,
} from "../../apis/purchase";

const RegisterCommentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<FundingItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [commentText, setCommentText] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const numericId = parseInt(id, 10);
      const fetchProduct = async () => {
        try {
          const fetchedProduct = await getFundingDetail(numericId);
          setProduct(fetchedProduct || null);
        } catch (error) {
          console.error("상품 정보를 불러오는데 실패했습니다:", error);
          setProduct(null);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleCancel = async () => {
    if (product) {
      try {
        await deleteFunding(product.itemId);
        alert("구매 의사를 취소했습니다.");
        setIsConfirmModalOpen(false);
        navigate(`/purchase/${product.itemId}`);
      } catch (error) {
        console.error("구매 의사 취소에 실패했습니다:", error);
        alert("구매 의사 취소에 실패했습니다.");
      }
    }
  };

  const handleRegister = async () => {
    if (product && commentText.trim()) {
      try {
        await createReview({
          itemId: product.itemId,
          content: commentText,
        });
        alert("기대평이 등록되었습니다.");
        navigate(`/purchase/${product.itemId}`);
      } catch (error) {
        console.error("기대평 등록에 실패했습니다:", error);
        alert("기대평 등록에 실패했습니다.");
      }
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
        <h1 className="text-lg font-bold text-center flex-1">
          기대평 등록하기
        </h1>
        <div className="w-8"></div>
      </header>

      <main className="p-4">
        <PriceProgressBar />

        <QuantityStepper
          quantity={quantity}
          setQuantity={setQuantity}
          price={product.currentPrice}
          showTotalPrice={true}
        />

        <div className="mt-8">
          <label htmlFor="comment" className="font-bold text-lg">
            기대평
          </label>
          <textarea
            id="comment"
            rows={5}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
            placeholder="기대평을 남겨주세요."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
        </div>
      </main>

      {/* Footer Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-4 border-t-2 border-gray-100 flex items-center gap-3">
        <button
          onClick={() => setIsConfirmModalOpen(true)}
          className="flex-1 bg-white text-brand-primary border border-brand-primary py-3 rounded-lg font-bold"
        >
          구매 의사 취소하기
        </button>
        <button
          onClick={handleRegister}
          className="flex-1 bg-brand-primary text-white py-3 rounded-lg font-bold disabled:bg-gray-400"
          disabled={!commentText.trim()}
        >
          기대평 등록
        </button>
      </footer>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleCancel}
        title="구매 의사를 취소하시겠어요?"
        message="작성중인 내용은 저장되지 않아요."
      />
    </div>
  );
};

export default RegisterCommentPage;
