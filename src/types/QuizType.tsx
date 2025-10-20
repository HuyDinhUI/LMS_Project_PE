export type QuizType = {
    MaTN: string
    MaLop: string
    TieuDe: string
    MoTa: string
    ThoiGianLam: number
    TongDiem: number
    HanNop: Date | null
    TrangThai: string
    NgayTao: Date
    isRandom: boolean
    SoLanChoPhep: number
    TrangThaiNopBai: string | null
    LoaiTracNghiem: string
    CauHoi: Question[]
}

export type Question = {
    MaCauHoi: string
    NoiDung: string
    Diem: number
    DapAn: Answer[]
}

type Answer = {
    MaDapAn: string
    NoiDung: string
}