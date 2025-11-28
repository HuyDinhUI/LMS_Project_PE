export type ContentType = {
  MaNoiDung: string;
  tieu_de: string;
  mota: string;
  huong_dan: string;
  loai_noidung: string;
  ngay_tao: Date;
  create_by: {
    userId: string;
    hoten: string;
  };
  files: File[];
  videos: Videos[];
};

interface File {
  file_name: string;
  file_path: string;
  mime_type: string;
  original_name: string;
}

interface Videos {
  youtube_id: string;
  youtube_title: string;
  thumbnail: string;
}
