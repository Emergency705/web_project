import { AiOutlineHome } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { FiPhone } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "홈", icon: <AiOutlineHome size={24} />, path: "/" },
  { label: "구매", icon: <BsBag size={24} />, path: "/purchase" },
  { label: "상담", icon: <FiPhone size={24} />, path: "/consult" },
  { label: "내 정보", icon: <BiUser size={24} />, path: "/mypage" },
];

export default function BottomNavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow px-4 py-2 flex justify-around items-center z-10">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`flex flex-col items-center flex-1 ${
            location.pathname === item.path ? "text-green-700 font-bold" : "text-gray-500"
          }`}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
