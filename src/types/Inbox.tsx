export type InboxType = {
    MaThread: string
    MaLop: string
    ten_lop: string
    TieuDe: string
    NgayTao: Date
    cover: string
    message: MessageType[] | null
}

export type MessageType = {
    MaTin: string
    MaThread: string
    MaNguoiGui: string
    NoiDung: string
    ThoiGianGui: Date
    hoten: string
    VaiTro: string
}