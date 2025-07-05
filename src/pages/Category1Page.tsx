import React, { useState, useMemo, useRef } from "react";
import CategoryTopBar from "../components/CategoryTopBar";
import AnnouncementCard from "../components/AnnouncementCard";
import CategoryFilterBar from "../components/CategoryFilterBar";
import CategoryFilterModal from "../components/CategoryFilterModal";
import dayjs from "dayjs";

// 더미데이터 예시 (분양 공고)
const DUMMY = [
  {
    id: 1,
    type: "분양",
    recruit: true,
    region: "서울",
    target: "장애인",
    deadline: "2025-09-01",
    url: "https://search.naver.com/search.naver?query=분양중인+장애인+주택",
    title: "서울 강서구 장애인 임대주택 분양 공고"
  },
  {
    id: 2,
    type: "분양",
    recruit: false,
    region: "경기",
    target: "장애인",
    deadline: "2025-07-10",
    url: "https://search.naver.com/search.naver?query=분양중인+장애인+주택",
    title: "경기 남양주 장애인 공공주택 마감"
  },
  // ... 더미 데이터 추가
];

const statusList = ["전체", "분양 중", "분양 마감"];
const regionList = ["ALL", "서울", "경기", "인천"];
const targetList = ["ALL", "장애인", "1인가구", "65세 이상"];

const Category1Page = () => {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [status, setStatus] = useState("전체");
  const [region, setRegion] = useState("ALL");
  const [target, setTarget] = useState("ALL");

  // 필터 태그 표시용
  const filterTags = useMemo(() => {
    const tags = [];
    if (status !== "전체") tags.push(status);
    if (region !== "ALL") tags.push(region);
    if (target !== "ALL") tags.push(target);
    return tags;
  }, [status, region, target]);

  // 필터링 적용
  const filtered = DUMMY.filter(item => {
    const searchMatch = !search || item.title.includes(search);
    const statusMatch =
      status === "전체"
        ? true
        : status === "분양 중"
          ? item.recruit
          : !item.recruit;
    const regionMatch = region === "ALL" || item.region === region;
    const targetMatch = target === "ALL" || item.target === target;
    return searchMatch && statusMatch && regionMatch && targetMatch;
  });

  // 모달 드래그 관련
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // 드래그
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => setDragStartY(e.touches[0].clientY);
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartY !== null) {
      const offset = e.touches[0].clientY - dragStartY;
      setDragOffset(offset > 0 ? offset : 0);
    }
  };
  const onTouchEnd = () => {
    if (dragOffset > 80) setIsFilterOpen(false);
    setDragStartY(null);
    setDragOffset(0);
  };

  return (
    <div className="relative bg-[#f5f5f5] min-h-screen pb-24 overflow-y-auto">
      {/* 상단바 */}
      <CategoryTopBar title="분양 중인 장애인 주택" />

      {/* 필터바 */}
      <CategoryFilterBar
        search={search}
        onSearchChange={setSearch}
        onFilterOpen={() => setIsFilterOpen(true)}
        filterTags={filterTags}
      />

      {/* 공고 카드 리스트 */}
      <div className="flex flex-col gap-4 pt-4 px-4">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">검색 결과가 없습니다.</div>
        ) : (
          filtered.map(item => (
            <AnnouncementCard key={item.id} {...item} />
          ))
        )}
      </div>

      {/* 필터 모달 */}
      {isFilterOpen && (
        <CategoryFilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          status={status}
          setStatus={setStatus}
          region={region}
          setRegion={setRegion}
          target={target}
          setTarget={setTarget}
          statusList={statusList}
          regionList={regionList}
          targetList={targetList}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          dragOffset={dragOffset}
        />
      )}
    </div>
  );
};

export default Category1Page;
