import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PurchasePage from "./pages/PurchasePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import CounselPage from "./pages/CounselPage";
import BottomNavBar from "./components/BottomNavBar";

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
        </Routes>
        <BottomNavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
