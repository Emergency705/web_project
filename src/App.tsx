import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PurchasePage from "./pages/PurchasePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import CounselPage from "./pages/CounselPage";
import Category1Page from "./pages/Category1Page";
import Category2Page from "./pages/Category2Page";
import Category3Page from "./pages/Category3Page";
import Category4Page from "./pages/Category4Page";
import BottomNavBar from "./components/BottomNavBar";

import EditProfile from "./pages/EditProfile"; // 추가
import GoodbyePage from "./pages/GoodbyePage"; // 추가 (탈퇴 후 이동)

function App() {
  return (
    <BrowserRouter>
      <div style={{ paddingBottom: 60, minHeight: "100vh", background: "#fafafa" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/counsel" element={<CounselPage />} />
          <Route path="/edit-profile" element={<EditProfile />} /> {/* 추가 */}
          <Route path="/goodbye" element={<GoodbyePage />} /> {/* 추가 */}
          {/* 카테고리별 페이지 라우트 */}
          <Route path="/category1" element={<Category1Page />} />
          <Route path="/category2" element={<Category2Page />} />
          <Route path="/category3" element={<Category3Page />} />
          <Route path="/category4" element={<Category4Page />} />
        </Routes>
        <BottomNavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
