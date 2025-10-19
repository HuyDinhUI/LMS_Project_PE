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
    CauHoi: Question[]
}

export type Question = {
    MaCauHoi: string
    NoiDung: string
    Diem: number
    CorrectIndex: number
    DapAn: Answer[]
}

type Answer = {
    MaDapAn: string
    NoiDung: string
}