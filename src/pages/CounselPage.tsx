import React, { useState, useMemo } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import CounselCard from "../components/CounselCard";
import { isOpenNow } from "../utils/isOpenNow";
// 더미 데이터 타입
interface Counsel {
  id: number;
  name: string;
  status: string;
  type: string;
  region: string;
  target: string;
  phone: string;
  site: string;
  time: string;
}

// 더미 데이터 15개
const DUMMY: Counsel[] = [
  { id: 1, name: "강서장애인복지센터", status: "모집 중", type: "복지센터", region: "서울", target: "장애인", phone: "010-1234-0001", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 09:00~19:00 / 토 10:00~14:00" },
  { id: 2, name: "마포장애인종합복지관", status: "모집 중", type: "복지센터", region: "서울", target: "1인가구", phone: "010-1234-0002", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 09:00~18:00 / 토 10:00~13:20" },
  { id: 3, name: "관악구청소년수련관", status: "영업중", type: "인터넷 포털", region: "서울", target: "65세 이상", phone: "010-1234-0003", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 09:00~18:00 / 토 09:00~15:00" },
  { id: 4, name: "동작장애인주간보호센터", status: "모집 중", type: "복지센터", region: "서울", target: "장애인", phone: "010-1234-0004", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 09:30~18:00" },
  { id: 5, name: "중구장애인복지관", status: "모집 마감", type: "복지센터", region: "서울", target: "65세 이상", phone: "010-1234-0005", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 09:00~17:30" },
  { id: 6, name: "성동구주민센터", status: "영업중", type: "주민센터", region: "서울", target: "1인가구", phone: "010-1234-0006", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 09:00~20:00 / 토 10:00~17:00" },
  { id: 7, name: "송파인터넷포털센터", status: "모집 중", type: "인터넷 포털", region: "서울", target: "장애인", phone: "010-1234-0007", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 08:00~18:00" },
  { id: 8, name: "서초복지센터", status: "모집 중", type: "복지센터", region: "서울", target: "65세 이상", phone: "010-1234-0008", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 10:00~17:00" },
  { id: 9, name: "강북주민센터", status: "모집 중", type: "주민센터", region: "서울", target: "장애인", phone: "010-1234-0009", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 09:00~19:00" },
  { id: 10, name: "노원장애인복지관", status: "모집 중", type: "복지센터", region: "서울", target: "1인가구", phone: "010-1234-0010", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 09:30~18:00" },
  { id: 11, name: "구로청소년상담센터", status: "모집 마감", type: "복지센터", region: "서울", target: "장애인", phone: "010-1234-0011", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 10:00~19:00" },
  { id: 12, name: "양천주민센터", status: "모집 중", type: "주민센터", region: "서울", target: "65세 이상", phone: "010-1234-0012", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 09:00~17:00" },
  { id: 13, name: "은평장애인복지관", status: "모집 마감", type: "복지센터", region: "서울", target: "1인가구", phone: "010-1234-0013", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 09:00~18:00" },
  { id: 14, name: "광진주민센터", status: "모집 중", type: "주민센터", region: "서울", target: "장애인", phone: "010-1234-0014", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 09:00~20:00" },
  { id: 15, name: "용산장애인주간보호센터", status: "모집 중", type: "복지센터", region: "서울", target: "장애인", phone: "010-1234-0015", site: "https://search.naver.com/search.naver?query=장애인시설", time: "월-금 09:00~19:00" },
];
const typeList = [
  "전체",
  "복지센터",
  "주민센터",
  "인터넷 포털",
];
const regionList = [
  "",
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];
const targetList = [
  "",
  "1인가구",
  "65세 이상",
  "장애인",
  "다문화가족",
  "저소득층",
  "기타",
];
const statusList = ["전체", "영업중", "영업종료"];

const CounselPage = () => {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [type, setType] = useState<string>("전체");
  const [region, setRegion] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [status, setStatus] = useState<string>("전체");

  // 드래그 관련
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);

  // 선택된 필터 태그
  const filterTags = useMemo(() => {
    const tags = [];
    if (type !== "전체") tags.push(type);
    if (region) tags.push(region);
    if (target) tags.push(target);
    if (status !== "전체") tags.push(status);
    return tags;
  }, [type, region, target, status]);

  // 실제로 보여줄 데이터 (영업상태: isOpenNow)
  const filteredData = DUMMY.filter((item) => {
    const keyword = search.trim();

    let statusOk = false;
    if (status === "전체") statusOk = true;
    else if (status === "영업중") statusOk = isOpenNow(item.time);
    else if (status === "영업종료") statusOk = !isOpenNow(item.time);

    return (
      statusOk &&
      (type === "전체" || item.type === type) &&
      (region === "" || item.region === region) &&
      (target === "" || item.target === target) &&
      (!keyword || item.name.includes(keyword))
    );
  });

  // --- 필터 모달 드래그 이벤트 ---
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setDragStartY(e.touches[0].clientY);
  };
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
      {/* 상단 고정바 */}
      <div className="sticky top-0 z-20 bg-white shadow-md pt-4 pb-2 px-4" style={{ minHeight: 80 }}>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              className="border border-blue-200 px-3 py-2 rounded-2xl w-full text-base"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="시설명 검색"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
              <FiSearch size={22} />
            </button>
          </div>
          <button
            className="flex items-center gap-1 text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded ml-2 min-w-[64px] bg-white"
            onClick={() => setIsFilterOpen(true)}
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
        {/* 안내문구 */}
        <div className="text-center text-base font-bold mb-1">
          상담이 가능한 시설이에요!
        </div>
      </div>

      {/* 상담카드 리스트 */}
      <div className="flex flex-col gap-4 pt-2 px-4">
        {filteredData.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">검색 결과가 없습니다.</div>
        ) : (
          filteredData.map(item => (
            <CounselCard key={item.id} {...item} />
          ))
        )}
      </div>

      {/* 필터 모달 (아래에서 올라오는 팝업, 드래그 닫기) */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 flex items-end justify-center"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className="w-full max-w-md mx-auto bg-white rounded-t-2xl p-6 pb-4 shadow-lg"
            style={{
              minHeight: 330,
              transform: `translateY(${dragOffset}px)`,
              transition: dragStartY ? "none" : "transform 0.2s",
            }}
            onClick={e => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4 cursor-pointer" />
            
            {/* 영업상태 */}
            <div className="mb-4">
              <div className="font-semibold mb-2">영업상태</div>
              <div className="flex gap-2 flex-wrap">
                {statusList.map(v => (
                  <button
                    key={v}
                    className={`
                      px-3 py-1 rounded border text-sm
                      ${status === v
                        ? "bg-[#b3dfd6] font-bold border-[#8ccfb6] text-gray-900"
                        : "border-gray-300 text-gray-700 bg-white"}
                      transition
                    `}
                    onClick={() => setStatus(v)}
                  >{v}</button>
                ))}
              </div>
            </div>

            {/* 카테고리 */}
            <div className="mb-4">
              <div className="font-semibold mb-2">카테고리</div>
              <div className="flex gap-2 flex-wrap">
                {typeList.map(v => (
                  <button
                    key={v}
                    className={`
                      px-3 py-1 rounded border text-sm
                      ${type === v
                        ? "bg-[#b3dfd6] font-bold border-[#8ccfb6] text-gray-900"
                        : "border-gray-300 text-gray-700 bg-white"}
                      transition
                    `}
                    onClick={() => setType(v)}
                  >{v}</button>
                ))}
              </div>
            </div>
            {/* 지역 */}
            <div className="mb-4">
              <div className="font-semibold mb-2">지역</div>
              <select
                className="border px-3 py-2 rounded w-full"
                value={region}
                onChange={e => setRegion(e.target.value)}
              >
                <option value="">선택안함</option>
                {regionList.slice(1).map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
            {/* 지원 대상 */}
            <div className="mb-4">
              <div className="font-semibold mb-2">지원 대상</div>
              <div className="flex gap-2 flex-wrap">
                {targetList.slice(1).map(v => (
                  <button
                    key={v}
                    className={`
                      px-3 py-1 rounded border text-sm
                      ${target === v
                        ? "bg-[#b3dfd6] font-bold border-[#8ccfb6] text-gray-900"
                        : "border-gray-300 text-gray-700 bg-white"}
                      transition
                    `}
                    onClick={() => setTarget(v)}
                  >{v}</button>
                ))}
              </div>
            </div>
            <button
              className="w-full mt-2 bg-[#80bfae] text-white py-2 rounded font-semibold text-lg"
              onClick={() => setIsFilterOpen(false)}
            >
              완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounselPage;