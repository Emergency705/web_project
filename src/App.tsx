import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import BottomNavBar from "./components/BottomNavBar";

// Public Pages
import IntroPage from "./pages/signup/IntroPage";
import LoginPage from "./pages/LoginPage";
import TermsPage from "./pages/signup/TermsPage";
import AccountPage from "./pages/signup/AccountPage";
import ProfilePage from "./pages/signup/ProfilePage";
import ExtraPage from "./pages/signup/ExtraPage";
import CompletePage from "./pages/signup/CompletePage";

// Protected Pages
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import CounselPage from "./pages/CounselPage";
import PurchasePage from "./pages/PurchasePage";
import Category1Page from "./pages/Category1Page";
import Category2Page from "./pages/Category2Page";
import Category3Page from "./pages/Category3Page";
import Category4Page from "./pages/Category4Page";
import SavedPosts from './pages/SavedPosts';


// 인증된 사용자를 위한 공통 레이아웃
const MainLayout = () => (
  <div style={{ paddingBottom: 60, minHeight: "100vh", background: "#fafafa" }}>
    <Outlet /> 
    <BottomNavBar />
  </div>
);

import EditProfile from "./pages/EditProfile"; // 추가
import GoodbyePage from "./pages/GoodbyePage"; // 추가 (탈퇴 후 이동)
import MyFundings from "./pages/MyFundings"; // 추가 (내가 참여한 펀딩 목록)
import WriteReview from "./pages/WriteReview";
import EditFunding from './pages/EditFunding';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증이 필요 없는 페이지 (공통 레이아웃 없음) */}
        <Route path="/" element={<IntroPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/terms" element={<TermsPage />} />
        <Route path="/signup/account" element={<AccountPage />} />
        <Route path="/signup/profile" element={<ProfilePage />} />
        <Route path="/signup/extra" element={<ExtraPage />} />
        <Route path="/signup/complete" element={<CompletePage />} />

        {/* 인증이 필요한 페이지 (공통 레이아웃 + ProtectedRoute 적용) */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/counsel" element={<CounselPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/goodbye" element={<GoodbyePage />} />
          <Route path="/my-fundings" element={<MyFundings />} />
          <Route path="/write-review/:id" element={<WriteReview />} />
          <Route path="/saved-posts" element={<SavedPosts />} />
          <Route path="/edit-funding/:id" element={<EditFunding />} />


          {/* 카테고리별 페이지 라우트 */}
          <Route path="/category1" element={<Category1Page />} />
          <Route path="/category2" element={<Category2Page />} />
          <Route path="/category3" element={<Category3Page />} />
          <Route path="/category4" element={<Category4Page />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
