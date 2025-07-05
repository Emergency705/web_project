import React, { useState, useMemo, useRef } from "react";
import CategoryTopBar from "../components/CategoryTopBar";
import AnnouncementCard from "../components/AnnouncementCard";
import CategoryFilterBar from "../components/CategoryFilterBar";
import CategoryFilterModal from "../components/CategoryFilterModal";
import dayjs from "dayjs";

const DUMMY = [
  {
    id: 1,
    type: "보수",
    recruit: true,
    region: "서울",
    target: "장애인",
    deadline: "2025-09-20",
    url: "https://search.naver.com/search.naver?query=집+시설+보수+지원",
    title: "서울 장애인 집 시설 보수 지원 접수 중"
  },
  {
    id: 2,
    type: "보수",
    recruit: false,
    region: "경기",
    target: "1인가구",
    deadline: "2025-07-18",
    url: "https://search.naver.com/search.naver?query=집+시설+보수+지원",
    title: "경기 저소득 1인가구 집 시설 보수 마감"
  },
  {
    id: 3,
    type: "보수",
    recruit: true,
    region: "인천",
    target: "장애인",
    deadline: "2025-08-28",
    url: "https://search.naver.com/search.naver?query=집+시설+보수+지원",
    title: "인천 장애인 시설 보수 지원 신청 안내"
  },
  // ...추가 더미 데이터
];

const statusList = ["전체", "접수 중", "접수 마감"];
const regionList = ["ALL", "서울", "경기", "인천"];
const targetList = ["ALL", "장애인", "1인가구", "65세 이상"];

const Category3Page = () => {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [status, setStatus] = useState("전체");
  const [region, setRegion] = useState("ALL");
  const [target, setTarget] = useState("ALL");

  const filterTags = useMemo(() => {
    const tags = [];
    if (status !== "전체") tags.push(status);
    if (region !== "ALL") tags.push(region);
    if (target !== "ALL") tags.push(target);
    return tags;
  }, [status, region, target]);

  const filtered = DUMMY.filter(item => {
    const searchMatch = !search || item.title.includes(search);
    const statusMatch =
      status === "전체"
        ? true
        : status === "접수 중"
        ? item.recruit
        : !item.recruit;
    const regionMatch = region === "ALL" || item.region === region;
    const targetMatch = target === "ALL" || item.target === target;
    return searchMatch && statusMatch && regionMatch && targetMatch;
  });

  // 모달 드래그
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);

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
      <CategoryTopBar title="집 시설 보수 지원" />
      <CategoryFilterBar
        search={search}
        onSearchChange={setSearch}
        onFilterOpen={() => setIsFilterOpen(true)}
        filterTags={filterTags}
      />
      <div className="flex flex-col gap-4 pt-4 px-4">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">검색 결과가 없습니다.</div>
        ) : (
          filtered.map(item => (
            <AnnouncementCard key={item.id} {...item} />
          ))
        )}
      </div>
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

export default Category3Page;
