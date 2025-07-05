import { FiSearch } from "react-icons/fi";

const CategorySearchBar = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="bg-gray-100 rounded-lg px-3 py-2 flex items-center mb-2">
    <input
      className="bg-transparent flex-1 outline-none"
      placeholder="원하는 공고를 검색해보세요!"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <FiSearch size={20} />
  </div>
);

export default CategorySearchBar;
