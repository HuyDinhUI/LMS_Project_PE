import { Input } from "@/components/ui/input";
import type { SubmissionType } from "@/types/SubmissionType";
import API from "@/utils/axios";
import { File } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ClassCourseAssignmentSubmited = () => {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState<SubmissionType[]>([]);
  const debounceRef = useRef<any>(null);
  const getAllSubmissions = async () => {
    try {
      const res = await API.get(`/assignments/getListSubmited/${assignmentId}`);
      setSubmissions(res.data.result.data);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };

  const handleScoring = async (MaSV: string, e: any) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        await API.post("/assignments/scoring", {
          MaSV,
          MaBaiTap: assignmentId,
          Diem: e.target.value,
        });
        toast.success("Chấm điểm thành công");
        getAllSubmissions();
      } catch (err: any) {
        toast.error(
          err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
        );
      }
    }, 500);
  };

  useEffect(() => {
    getAllSubmissions();
  }, []);

  return (
    <div className="flex-1 overflow-auto max-h-170 p-2">
      <div className="flex flex-col justify-center px-20">
        {/* Danh sách nộp bài */}
        {submissions.map((item) => (
          <div
            key={item.MaSV}
            className="border border-gray-300 rounded-md p-4 mb-4 relative"
          >
            <div className="font-semibold text-lg mb-2">
              {item.hoten} - {item.MaSV}
            </div>
            <div className="absolute top-4 right-4">
              Trạng thái:{" "}
              <span
                className={`font-semibold ${
                  item.TrangThai === "Đã nộp"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.TrangThai}
              </span>
            </div>
            {(item.TrangThai === "Đã nộp" || item.TrangThai === "Nộp trễ") && (
              <div className="flex justify-between">
                <div>
                  <div className="mb-2">
                    Thời gian nộp:{" "}
                    <span className="font-semibold">
                      {new Date(item.thoigian_nop!).toLocaleString("vi-VN")}
                    </span>
                  </div>

                  {item.file_path && (
                    <div className="mb-2 ring ring-gray-300 p-2 rounded-md w-fit flex flex-col items-center gap-2">
                      <File />
                      <a
                        href={`${import.meta.env.VITE_BASE_STATIC_FILE}/${
                          item.file_path
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 underline"
                      >
                        {item.original_name}
                      </a>
                    </div>
                  )}
                </div>
                <div>
                  <div className="mb-2 mr-5 w-20 h-20 p-3 ring ring-gray-300 flex flex-col justify-center items-center rounded-full">
                    <span className="font-semibold grid grid-cols-2">
                      <Input
                        onChange={(e) => handleScoring(item.MaSV, e)}
                        defaultValue={item.DiemSo ?? ""}
                        variant="borderBottom"
                        className="outline-none mt-[3px] text-center"
                        sizeOpt="sm"
                      /> {" "}
                      / 10
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassCourseAssignmentSubmited;
