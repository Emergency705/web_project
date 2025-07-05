// src/pages/WriteReview.tsx

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 샘플 펀딩 데이터 (실제 API 또는 props로 대체 가능)
const dummyFundings: Record<number, { title: string; imageUrl: string }> = {
  1: {
    title: '욕실 미끄럼 방지 매트',
    imageUrl: '/images/mat.jpg',
  },
  2: {
    title: '기타 펀딩 제품',
    imageUrl: '/images/other.jpg',
  },
};

const WriteReview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  const funding = dummyFundings[Number(id)];

  const handleSubmit = () => {
    console.log('작성한 기대평:', {
      productId: id,
      content,
    });

    // 저장 처리 (API 연동 가능)
    alert('기대평이 저장되었습니다!');
    navigate('/my-fundings');
  };

  if (!funding) {
    return <p className="text-center text-red-500">해당 펀딩을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="max-w-md mx-auto px-4 py-5">
      {/* 상단 바 */}
      <div className="flex items-center mb-5">
        <button onClick={() => navigate(-1)} className="text-2xl mr-2">
          {'<'}
        </button>
        <h1 className="text-lg font-bold">기대평 남기기</h1>
      </div>

      {/* 펀딩 정보 */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={funding.imageUrl}
          alt={funding.title}
          className="w-20 h-20 object-cover rounded-md"
        />
        <p className="font-semibold">{funding.title}</p>
      </div>

      {/* 입력창 */}
      <textarea
        className="w-full h-32 border rounded-md p-3 resize-none mb-4"
        placeholder="기대평을 작성해 주세요!"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* 저장 버튼 */}
      <button
        onClick={handleSubmit}
        className="w-full bg-gray-800 text-white py-2 rounded-md font-semibold"
      >
        저장하기
      </button>
    </div>
  );
};

export default WriteReview;
