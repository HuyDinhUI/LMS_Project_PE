import type { SubmissionType } from "@/types/SubmissionType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ClassCourseAssignmentSubmited = () => {
  const { id } = useParams();
  const [submissions, setSubmissions] = useState<SubmissionType[]>([]);

  const getAllSubmissions = async () => {
    try {
      const res = await API.get(`/assignments/getListSubmited/${id}`);
      setSubmissions(res.data.result.data);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
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
            <div className="font-semibold text-lg mb-2">{item.hoten}</div>
            <div className="mb-2">
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
            {item.TrangThai === "Đã nộp" && (
              <>
                <div className="mb-2">
                  Thời gian nộp:{" "}
                  <span className="font-semibold">
                    {new Date(item.ThoiGianNop!).toLocaleString()}
                  </span>
                </div>
                <div className="mb-2">
                  Điểm số:{" "}
                  <span className="font-semibold">
                    {item.DiemSo !== null ? item.DiemSo : "Chưa chấm"}
                  </span>
                </div>
                {item.file_path && (
                  <div className="mb-2">
                    File nộp:{" "}
                    <a
                      href={item.file_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {item.original_name}
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassCourseAssignmentSubmited;
