import productImage from "../../assets/purchase/욕실미끄럼방지매트.png";

export interface Product {
  id: number;
  name: string;
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

export const mockCarouselProducts: Product[] = [
  {
    id: 1,
    name: "욕실 미끄럼 방지 매트",
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
    participants: 50,
    maxParticipants: 100,
    currentPrice: 15000,
    location: "서초구 서림물산",
    imageUrl: productImage,
    imageCount: 10,
  },
];

export const mockCategories: Category[] = [
  { name: "거실", emoji: "🛋️" },
  { name: "주방", emoji: "🍳" },
  { name: "침실", emoji: "🛏️" },
  { name: "욕실", emoji: "🚽" },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "욕실 미끄럼 방지 매트",
    participants: 89,
    maxParticipants: 100,
    currentPrice: 12000,
    location: "강동구 대림물산",
    imageUrl: productImage,
  },
  {
    id: 2,
    name: "욕실 미끄럼 방지 매트",
    participants: 89,
    maxParticipants: 100,
    currentPrice: 12000,
    location: "강동구 대림물산",
    imageUrl: productImage,
  },
  {
    id: 3,
    name: "욕실 미끄럼 방지 매트",
    participants: 89,
    maxParticipants: 100,
    currentPrice: 12000,
    location: "강동구 대림물산",
    imageUrl: productImage,
  },
  {
    id: 4,
    name: "욕실 미끄럼 방지 매트",
    participants: 89,
    maxParticipants: 100,
    currentPrice: 12000,
    location: "강동구 대림물산",
    imageUrl: productImage,
  },
];
