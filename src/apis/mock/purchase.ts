import productImage from "../../assets/purchase/욕실미끄럼방지매트.png";
import profileImg1 from "../../assets/purchase/profile_img1.jpg";
import profileImg2 from "../../assets/purchase/profile_img2.jpg";
import profileImg3 from "../../assets/purchase/profile_img3.jpg";

export interface Product {
  id: number;
  name: string;
  description?: string;
  category?: string;
  participants: number;
  maxParticipants: number;
  currentPrice: number;
  location: string;
  imageUrl: string;
  imageCount?: number;
}

export interface Category {
  name: string;
  emoji: string;
}

export interface Seller {
  id: number;
  name: string;
  comment: string;
  profileImageUrl: string;
}

export const mockCarouselProducts: Product[] = [
  {
    id: 1,
    name: "욕실 미끄럼 방지 매트",
    description:
      "해당 제품은 보통 욕실을 사용하실 때 미끄러지지 않도록 도와주며, 보호자 분들께는 구매를 정말 추천드립니다.",
    category: "욕실 물건",
    participants: 89,
    maxParticipants: 100,
    currentPrice: 12000,
    location: "강동구 대림물산",
    imageUrl: productImage,
    imageCount: 12,
  },
  {
    id: 2,
    name: "안전 손잡이",
    description:
      "해당 제품은 보통 욕실을 사용하실 때 미끄러지지 않도록 도와주며, 보호자 분들께는 구매를 정말 추천드립니다.",
    category: "욕실 물건",
    participants: 50,
    maxParticipants: 100,
    currentPrice: 15000,
    location: "강동구 대림물산",
    imageUrl: productImage,
    imageCount: 10,
  },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "욕실 미끄럼 방지 매트",
    description:
      "해당 제품은 보통 욕실을 사용하실 때 미끄러지지 않도록 도와주며, 보호자 분들께는 구매를 정말 추천드립니다.",
    category: "욕실 물건",
    participants: 89,
    maxParticipants: 100,
    currentPrice: 12000,
    location: "강동구 대림물산",
    imageUrl: productImage,
    imageCount: 12,
  },
  {
    id: 2,
    name: "안전 손잡이",
    description:
      "해당 제품은 보통 욕실을 사용하실 때 미끄러지지 않도록 도와주며, 보호자 분들께는 구매를 정말 추천드립니다.",
    category: "욕실 물건",
    participants: 50,
    maxParticipants: 100,
    currentPrice: 15000,
    location: "강동구 대림물산",
    imageUrl: productImage,
    imageCount: 10,
  },
  {
    id: 3,
    name: "욕실 미끄럼 방지 매트",
    description:
      "해당 제품은 보통 욕실을 사용하실 때 미끄러지지 않도록 도와주며, 보호자 분들께는 구매를 정말 추천드립니다.",
    category: "욕실 물건",
    participants: 89,
    maxParticipants: 100,
    currentPrice: 12000,
    location: "강동구 대림물산",
    imageUrl: productImage,
  },
  {
    id: 4,
    name: "욕실 미끄럼 방지 매트",
    description:
      "해당 제품은 보통 욕실을 사용하실 때 미끄러지지 않도록 도와주며, 보호자 분들께는 구매를 정말 추천드립니다.",
    category: "욕실 물건",
    participants: 89,
    maxParticipants: 100,
    currentPrice: 12000,
    location: "강동구 대림물산",
    imageUrl: productImage,
  },
];

export const mockCategories: Category[] = [
  { name: "거실", emoji: "🛋️" },
  { name: "주방", emoji: "🍳" },
  { name: "침실", emoji: "🛏️" },
  { name: "욕실", emoji: "🚽" },
];

export const mockComments: Seller[] = [
  {
    id: 1,
    name: "김하은",
    comment: "꼭 필요한 제품이었는데, 좋은 가격에 성사되면 좋겠습니다~!",
    profileImageUrl: profileImg1,
  },
  {
    id: 2,
    name: "김하은",
    comment: "꼭 필요한 제품이었는데, 좋은 가격에 성사되면 좋겠습니다~!",
    profileImageUrl: profileImg2,
  },
  {
    id: 3,
    name: "김하은",
    comment: "꼭 필요한 제품이었는데, 좋은 가격에 성사되면 좋겠습니다~!",
    profileImageUrl: profileImg3,
  },
];

export const getProductById = (id: number) => {
  return mockProducts.find((p: Product) => p.id === id);
};

export const getSellerInfo = () => {
  return {
    id: 1,
    name: "김하은",
    comment: "꼭 필요한 제품이었는데, 좋은 가격에 성사되면 좋겠습니다~!",
    profileImageUrl: profileImg1,
  };
};
