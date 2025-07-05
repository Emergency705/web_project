// src/utils/isOpenNow.ts

export function isOpenNow(timeStr: string): boolean {
  // 오늘 요일: 0(일)~6(토)
  const now = new Date();
  const day = now.getDay(); // 0=일, 1=월 ... 6=토
  const hour = now.getHours();
  const min = now.getMinutes();

  const segments = timeStr.split("/");
  let matched = false;

  for (const seg of segments) {
    const part = seg.trim();
    const [days, times] = part.split(" ");
    let daysMatched = false;
    if (!days || !times) continue;

    // 요일 매칭
    if (days.includes("월-금") && day >= 1 && day <= 5) daysMatched = true;
    if (days.includes("토") && day === 6) daysMatched = true;
    if (days.includes("일") && day === 0) daysMatched = true;
    if (days.includes("월") && !days.includes("-") && day === 1) daysMatched = true;
    if (days.includes("화") && !days.includes("-") && day === 2) daysMatched = true;
    if (days.includes("수") && !days.includes("-") && day === 3) daysMatched = true;
    if (days.includes("목") && !days.includes("-") && day === 4) daysMatched = true;
    if (days.includes("금") && !days.includes("-") && day === 5) daysMatched = true;

    if (!daysMatched) continue;

    // 시간 매칭
    const [start, end] = times.split("~").map(t => t.trim());
    if (!start || !end) continue;

    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    const nowMin = hour * 60 + min;
    const startMin = startH * 60 + startM;
    const endMin = endH * 60 + endM;

    if (nowMin >= startMin && nowMin <= endMin) {
      matched = true;
      break;
    }
  }
  return matched;
}
