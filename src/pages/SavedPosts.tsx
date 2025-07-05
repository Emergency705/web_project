import { useNavigate } from 'react-router-dom';

const samplePosts = [
  {
    tags: ['모집 중', '서울', '1인가구'],
    dday: '3일 남았어요!',
    title: 'LH 장애인 지원 주택 상반기 분양(서울)',
    agency: 'LH주택공사',
    date: '2025-03-12',
  },
  {
    tags: ['모집 중', '고양시', '청년'],
    dday: '3일 남았어요!',
    title: 'LH 장애인 지원 주택 상반기 분양(서울)',
    agency: 'LH주택공사',
    date: '2025-03-12',
  },
  {
    tags: ['모집 중', '대구광역시', '65세 이상'],
    dday: '3일 남았어요!',
    title: 'LH 장애인 지원 주택 상반기 분양(서울)',
    agency: 'LH주택공사',
    date: '2025-03-12',
  },
];

const SavedPosts = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white-100">
      {/* 상단 바 */}
      <div className="bg-[#D3D3D3] px-2 py-3 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-2">
          <svg width={24} height={24} viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" stroke="black" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* 공고 리스트 */}
      <div className="p-4">
        {samplePosts.map((post, idx) => (
          <div key={idx} className="mb-6">
            <div className="flex gap-2 mb-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-gray-400 rounded-xl px-2 py-[2px] text-xs text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-[#FF2E00] font-bold text-base mb-1">
              {post.dday}
            </div>
            <div className="font-bold text-[17px] mb-1">{post.title}</div>
            <div className="text-gray-500 text-sm mb-2">
              {post.agency} {post.date}
            </div>
              <hr className="border-gray-400" />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPosts;
