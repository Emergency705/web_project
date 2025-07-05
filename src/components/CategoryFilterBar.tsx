import { FiSearch, FiFilter } from "react-icons/fi";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  onFilterOpen: () => void;
  filterTags: string[];
}

const CategoryFilterBar = ({
  search,
  onSearchChange,
  onFilterOpen,
  filterTags
}: Props) => (
  <div className="sticky top-[52px] z-20 bg-[#f5f5f5] pt-2 pb-1 px-4">
    {/* 검색 & 필터 */}
    <div className="flex items-center gap-2">
      <div className="flex-1 relative">
        <input
          className="border border-blue-200 px-3 py-2 rounded-2xl w-full text-base"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="공고명 검색"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
          <FiSearch size={22} />
        </button>
      </div>
      <button
        className="flex items-center gap-1 text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded min-w-[64px] bg-white"
        onClick={onFilterOpen}
      >
        <FiFilter size={16} />
        필터
      </button>
    </div>
    {/* 필터 태그 */}
    <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-hide pb-1">
      {filterTags.length === 0 ? (
        <span className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 whitespace-nowrap font-medium">
          전체
        </span>
      ) : (
        filterTags.map((tag, idx) => (
          <span
            key={tag + idx}
            className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-600 whitespace-nowrap font-medium"
          >
            {tag}
          </span>
        ))
      )}
    </div>
  </div>
);

export default CategoryFilterBar;
