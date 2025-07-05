import React from "react";

const PriceProgressBar: React.FC = () => {
  const progress = 48; // 현재 참여 인원 (48명 기준)
  const max = 100;
  const percentage = (progress / max) * 100;

  return (
    <div className="w-full my-4">
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-2 bg-[#538E79] rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#538E79] rounded-full"
          style={{ left: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
        <div>
          <p className="font-bold">1개</p>
          <p>16,000원</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-[#538E79]">{progress}개</p>
          <p className="text-[#538E79]">14,000원</p>
        </div>
        <div className="text-right">
          <p className="font-bold">100개</p>
          <p>13,000원</p>
        </div>
      </div>
    </div>
  );
};

export default PriceProgressBar;
