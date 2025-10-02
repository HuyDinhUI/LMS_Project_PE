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
            title: `${item.ten_lop} - ${item.MaLop} - ${item.hoten} (${item.phonghoc})`,
            start: `${item.ngay_day}T${startTime}`,
            end: `${item.ngay_day}T${endTime}`
        }

    })

    return events
}