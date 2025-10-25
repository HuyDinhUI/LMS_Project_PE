import { Button } from "@/components/ui/button";
import type { Submissions } from "@/types/QuizType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ClassCourseQuizSubmited = () => {
  const { matn } = useParams();
  const [submissions, setSubmissions] = useState<Submissions[]>([]);

  const getSubmissions = async () => {
    try {
      const res = await API.get(`/quiz/getSubmissions/${matn}`);
      console.log(res.data.result.data);
      setSubmissions(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getSubmissions()
  },[])
  return (
    <div className="flex-1 overflow-auto max-h-170">
      <div className="flex flex-col justify-center px-20">
        {/* Danh sách nộp bài */}
        {submissions.map((item) => (
          <div
            key={item.MaSV}
            className="bg-black/5 rounded-xl p-4 mb-4 relative"
          >
            <div className="font-semibold text-lg mb-2">
              {item.hoten} - {item.MaSV}
            </div>
            <div className="absolute flex gap-2 top-4 right-4">
              <span
                className={`${
                  item.TrangThaiNopBai === "Đã nộp"
                    ? "text-green-600 bg-green-200 ring ring-green-500 px-2 text-sm rounded-md"
                    : "text-red-600 bg-rose-200 ring ring-rose-500 px-2 text-sm rounded-md"
                }`}
              >
                {item.TrangThaiNopBai === 'Đã nộp' ? 'Submited' : 'Unsubmit'}
              </span>
              {(item.TrangThaiNopBai === "Đã nộp" ||
                item.TrangThaiNopBai === "Nộp trễ") && (
                <span
                  className={`${
                    item.DiemSo
                      ? "text-green-600 bg-green-200 ring ring-green-500 px-2 text-sm rounded-md"
                      : "text-amber-600 bg-amber-200 ring ring-amber-500 px-2 text-sm rounded-md"
                  }`}
                >
                  {item.DiemSo ?? 0}
                </span>
              )}
            </div>
            {(item.TrangThaiNopBai === "Đã nộp" ||
              item.TrangThaiNopBai === "Nộp trễ") && (
              <div className="">
                <div>
                  <div className="mb-2 absolute bottom-3 right-4">
                    <span className="text-gray-400">
                      {new Date(item.ThoiGianNop!).toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {(item.TrangThaiNopBai === "Đã nộp" ||
              item.TrangThaiNopBai === "Nộp trễ") && (<Button variant="dark" title="Xem chi tiết" className="rounded-md"/>)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassCourseQuizSubmited;
