import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SubmissionType } from "@/types/SubmissionType";
import API from "@/utils/axios";
import { File } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ClassCourseAssignmentSubmited = () => {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState<SubmissionType[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [grade, setGrade] = useState<number>(0)
  const [comment, setComment] = useState<string>("")
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

  const handleScoring = async (MaSV: string, grade: number) => {
    clearTimeout(debounceRef.current);
    console.log(comment, grade);
    debounceRef.current = setTimeout(async () => {
      try {
        await API.post("/assignments/scoring", {
          MaSV,
          MaBaiTap: assignmentId,
          Diem: grade,
          NhanXet: comment
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
                  item.TrangThai === "Đã nộp"
                    ? "text-green-600 bg-green-200 ring ring-green-500 px-2 text-sm rounded-md"
                    : "text-red-600 bg-rose-200 ring ring-rose-500 px-2 text-sm rounded-md"
                }`}
              >
                {item.TrangThai === 'Đã nộp' ? 'Submited' : 'Unsubmit'}
              </span>
              {(item.TrangThai === "Đã nộp" || item.TrangThai === "Nộp trễ") && <span
                className={`${
                  item.DiemSo
                    ? "text-green-600 bg-green-200 ring ring-green-500 px-2 text-sm rounded-md"
                    : "text-amber-600 bg-amber-200 ring ring-amber-500 px-2 text-sm rounded-md"
                }`}
              >
                {item.DiemSo ? 'Đã chấm' : 'Chưa chấm'}
              
              </span>}
              {item.DiemSo !== null && <span className="text-blue-600 bg-blue-200 ring ring-blue-500 px-2 text-sm rounded-md">
                Score: {item.DiemSo}
              </span>}
            </div>
            {(item.TrangThai === "Đã nộp" || item.TrangThai === "Nộp trễ") && (
              <div className="">
                <div>
                  <div className="mb-2 absolute bottom-3 right-4">
                    <span className="text-gray-400">
                      {new Date(item.thoigian_nop!).toLocaleString("vi-VN")}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {item.file_path && (
                      <div className="my-5 flex text-gray-500 items-center gap-2">
                        <File />
                        <a
                          href={`${import.meta.env.VITE_BASE_STATIC_FILE}/${
                            item.file_path
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 underline"
                        >
                          {item.original_name}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => setSelected(item.MaNopBai)}
                  title="Scoring"
                  variant="primary"
                  className="rounded-md"
                />

                <div
                  className={`right-0 top-0 left-0 z-999 h-[100vh] w-[100-vw] bg-black/20 ${
                    selected === item.MaNopBai ? "fixed" : "hidden"
                  }`}
                >
                  <div
                    className={`bg-white w-80 p-5 h-full absolute right-0 flex flex-col gap-2 ${
                      selected === item.MaNopBai
                        ? "animate-slideInRight"
                        : "animate-slideOutRight"
                    } `}
                  >
                    <h2>Scoring for {item.hoten}</h2>
                    <p>Status: {item.TrangThai}</p>
                    <Input
                      onChange={(e) => setGrade(parseFloat(e.target.value))}
                      value={grade}
                      variant="default"
                      className="outline-none"
                      sizeOpt="md"
                      placeholder="Grade"
                      type="number"
                    />
                    <textarea
                      value={comment}
                      className="p-2 ring ring-gray-500 rounded-xl"
                      placeholder="Comment"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <div className="flex gap-2">
                      <Button title="Save" variant="dark" onClick={() => handleScoring(item.MaSV,grade)} />
                      <Button onClick={() => {
                        
                        setSelected("")}
                        } title="Cancel" />
                    </div>
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
