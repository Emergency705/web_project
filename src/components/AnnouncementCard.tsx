import dayjs from "dayjs";

interface Props {
  title: string;
  recruit: boolean;
  region: string;
  target: string;
  deadline: string;
  url: string;
}

const AnnouncementCard = ({
  title,
  recruit,
  region,
  target,
  deadline,
  url
}: Props) => {
  // 남은 일수 계산
  const left = dayjs(deadline).diff(dayjs(), "day");
  const statusText = recruit ? "분양 중" : "마감";
  const statusColor = recruit ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500";
  const dday = left >= 0 ? `D-${left}` : "마감";

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="rounded-2xl p-5 bg-white shadow-md flex flex-col gap-2 active:scale-95 transition">
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full font-bold ${statusColor}`}>
            {statusText}
          </span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{region}</span>
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{target}</span>
          <span className="text-xs ml-auto">{dday}</span>
        </div>
        <div className="font-semibold text-base">{title}</div>
        <div className="text-xs text-gray-500">분양 마감일: {dayjs(deadline).format("YYYY.MM.DD")}</div>
      </div>
    </a>
  );
};

export default AnnouncementCard;
