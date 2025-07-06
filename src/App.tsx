import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
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

// 카테고리/상담/메인
import HomePage from "./pages/HomePage";
import CounselPage from "./pages/CounselPage";
import Category1Page from "./pages/Category1Page";
import Category2Page from "./pages/Category2Page";
import Category3Page from "./pages/Category3Page";
import Category4Page from "./pages/Category4Page";
import AnnouncementDetailPage from "./pages/AnnouncementDetailPage";

// 마이/펀딩/리뷰 등
import MyPage from "./pages/MyPage";
import GoodbyePage from "./pages/GoodbyePage";
import MyFundings from "./pages/MyFundings";
import WriteReview from "./pages/WriteReview";
import SavedPosts from "./pages/SavedPosts";
import EditFunding from "./pages/EditFunding";
import EditProfile from "./pages/EditProfile";

// 인증된 사용자를 위한 레이아웃 (조건부 BottomNavBar)
const ProtectedLayout = () => {
  const location = useLocation();
  const hideNavBarPaths = [
    /^\/purchase\/\d+$/, // 구매 상세 페이지
    /^\/purchase\/\d+\/comment$/, // 댓글 작성 페이지
  ];

  const shouldHideNavBar = hideNavBarPaths.some((path) =>
    path.test(location.pathname)
  );

  return (
    <div
      style={{
        paddingBottom: shouldHideNavBar ? 0 : 60,
        minHeight: "100vh",
        background: "#ffffff",
      }}
    >
      <Outlet />
      {!shouldHideNavBar && <BottomNavBar />}
    </div>
  );
};

// 👇 하단바가 필요한 public 경로들만 관리
const showNavBarPaths = [
  "/home",
  "/category1",
  "/category2",
  "/category3",
  "/category4",
  "/counsel",
  // 상세 페이지는 정규식으로 처리 (예시)
  /^\/announcements\/\d+$/,
];

const PublicLayout = () => {
  const location = useLocation();
  // 경로가 문자열 또는 정규식 패턴과 일치하면 true
  const showNavBar = showNavBarPaths.some((path) =>
    typeof path === "string"
      ? location.pathname === path
      : path.test(location.pathname)
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", paddingBottom: showNavBar ? 60 : 0 }}>
      <Outlet />
      {showNavBar && <BottomNavBar />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증이 필요 없는 페이지 */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/terms" element={<TermsPage />} />
          <Route path="/signup/account" element={<AccountPage />} />
          <Route path="/signup/profile" element={<ProfilePage />} />
          <Route path="/signup/extra" element={<ExtraPage />} />
          <Route path="/signup/complete" element={<CompletePage />} />

          {/* 👇 하단바 필요한 public 경로 */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/category1" element={<Category1Page />} />
          <Route path="/category2" element={<Category2Page />} />
          <Route path="/category3" element={<Category3Page />} />
          <Route path="/category4" element={<Category4Page />} />
          <Route path="/counsel" element={<CounselPage />} />
          <Route path="/announcements/:id" element={<AnnouncementDetailPage />} />
        </Route>

        {/* 인증이 필요한 페이지 */}
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/purchase/:id/comment" element={<WriteReview />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/goodbye" element={<GoodbyePage />} />
          <Route path="/my-fundings" element={<MyFundings />} />
          <Route path="/write-review/:id" element={<WriteReview />} />
          <Route path="/saved-posts" element={<SavedPosts />} />
          <Route path="/edit-funding/:id" element={<EditFunding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
