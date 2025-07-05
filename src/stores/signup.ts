import { create } from "zustand";

// 스토어에서 관리할 데이터의 타입 정의
interface SignupFormData {
  // TermsPage
  termsOfService: boolean;
  privacyPolicy: boolean;
  age: boolean;
  marketing: boolean;
  push: boolean;

  // AccountPage (비밀번호는 저장하지 않음)
  userId: string;
  password: string;

  // ProfilePage
  name: string;
  profileImage: File | null;
  profileImagePreview: string | null;
  birthDate: string;

  // ExtraPage
  region: string;
  disabilityLevel: string;
  disabilityType: string[];
}

interface SignupState extends SignupFormData {
  updateFormData: (data: Partial<SignupFormData>) => void;
  reset: () => void;
}

const initialState: SignupFormData = {
  termsOfService: false,
  privacyPolicy: false,
  age: false,
  marketing: false,
  push: false,
  userId: "",
  password: "",
  name: "",
  profileImage: null,
  profileImagePreview: null,
  birthDate: "",
  region: "",
  disabilityLevel: "",
  disabilityType: [],
};

export const useSignupStore = create<SignupState>((set) => ({
  ...initialState,
  updateFormData: (data) => set((state) => ({ ...state, ...data })),
  reset: () => set(initialState),
}));
