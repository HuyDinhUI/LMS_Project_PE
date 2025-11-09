import { convertTietToTime } from "./converTietToTime"


export function slugtify(val: string) {
    if (!val) return ''
    return val
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-')
}

export const formatterDataEventCalendar = (data: any) =>{
    const events = data.map((item: any) => {
        const startTime = convertTietToTime(item.tiet_batdau)
        const endTime = item.tiet_kethuc < 9 ? convertTietToTime(item.tiet_kethuc + 1) : "17:00:00"

        return {
            id: item.MaLichDay,
            MaLop: item.MaLop,
            title: `${item.ten_lop} - ${item.MaLop} - ${item.hoten} (${item.phonghoc})`,
            start: `${item.ngay_day}T${startTime}`,
            end: `${item.ngay_day}T${endTime}`,
            status: item.TrangThai
        }

    })

    return events
}

export const getName = (fullname: string) => {
    const length = fullname.split(' ',5).length
    const name = fullname.split(' ',5)[length-1]
    return name
}


export function getTimeDiff(createdAt: any) {
  const now = new Date().getTime();
  const diffMs = now - new Date(createdAt).getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "vừa xong";
  if (diffMin < 60) return `${diffMin} phút trước`;
  if (diffHour < 24) return `${diffHour} giờ trước`;
  if (diffDay < 7) return `${diffDay} ngày trước`;

  return new Date(createdAt).toLocaleDateString("vi-VN");
}