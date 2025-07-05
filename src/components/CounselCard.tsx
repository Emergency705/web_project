import React from "react";
import { isOpenNow } from "../utils/isOpenNow";

interface CounselCardProps {
  name: string;
  type: string;
  region: string;
  target: string;
  phone: string;
  site: string;
  time: string;
}

const CounselCard: React.FC<CounselCardProps> = ({
  name,
  type,
  region,
  target,
  phone,
  site,
  time,
}) => {
  const open = isOpenNow(time);

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap items-center">
        {/* 영업중/종료 상태 뱃지 */}
        <span className={`text-xs px-2 py-1 rounded font-bold ${open ? "bg-[#b3dfd6] text-green-700" : "bg-gray-200 text-gray-500"}`}>
          {open ? "영업중" : "영업종료"}
        </span>
        <span className="bg-[#b3dfd6] text-xs px-2 py-1 rounded">{type}</span>
        {region && <span className="bg-gray-100 text-xs px-2 py-1 rounded">{region}</span>}
        {target && <span className="bg-gray-100 text-xs px-2 py-1 rounded">{target}</span>}
      </div>
      <div className="font-bold">{name}</div>
      <div className="text-xs text-gray-600">{time}</div>
      <div className="flex gap-2 mt-1">
        <a
          href={`tel:${phone}`}
          className="bg-[#80bfae] hover:bg-[#62a495] text-white text-sm px-4 py-2 rounded font-bold flex-1 text-center"
        >
          전화 걸기
        </a>
        <a
          href={site}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded font-bold flex-1 text-center"
        >
          웹사이트 방문하기
        </a>
      </div>
    </div>
  );
};

export default CounselCard;
