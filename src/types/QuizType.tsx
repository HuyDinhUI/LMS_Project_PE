export type QuizType = {
    MaTN: string
    MaLop: string
    TieuDe: string
    MoTa: string
    ThoiGianLam: number
    TongDiem: number
    HanNop: Date | null
    NgayBatDau: Date
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
    CorrectIndex?: boolean | null
}

type Answer = {
    MaDapAn: string
    NoiDung: string
    LaDapAnDung: boolean
}

export type Submissions = {
    MaSV: string,
    hoten: string,
    ThoiGianNop: string,
    MaBaiLam: string,
    MaTN: string,
    TieuDe: string,
    MoTa: string,
    HanNop: Date,
    DiemSo: number,
    TrangThaiNopBai: string
}