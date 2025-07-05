import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PurchasePage from "./pages/PurchasePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import CounselPage from "./pages/CounselPage";
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
        </Routes>
        <BottomNavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
