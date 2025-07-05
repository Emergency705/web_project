import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import SignupPage from "../pages/SignupPage";
// import {
//   IntroPage,
//   TermsPage,
//   AccountPage,
//   ProfilePage,
//   ExtraPage,
//   CompletePage,
// } from '../pages/signup';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* 인증이 필요 없는 페이지 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* <Route path="/signup/terms" element={<TermsPage />} /> */}
      {/* <Route path="/signup/account" element={<AccountPage />} /> */}
      {/* <Route path="/signup/profile" element={<ProfilePage />} /> */}
      {/* <Route path="/signup/extra" element={<ExtraPage />} /> */}
      {/* <Route path="/signup/complete" element={<CompletePage />} /> */}
      <Route path="/" element={<LoginPage />} />

      {/* 인증이 필요한 페이지 */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
export default AppRouter;
