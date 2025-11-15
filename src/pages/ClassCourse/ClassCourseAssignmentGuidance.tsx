import { Button } from "@/components/ui/button";
import type { AssignmentType } from "@/types/AssignmentType";
import type { SubmissionType } from "@/types/SubmissionType";
import API from "@/utils/axios";
import { File } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ClassCourseAssignmentGuidance = () => {
  const { assignmentId } = useParams();
  const MaSV = localStorage.getItem("username");
  const [assignmentsData, setAssignmentsData] = useState<AssignmentType>();
  const [file, setFile] = useState<File | null>(null);
  const [dataSubmission, setDataSubmission] = useState<SubmissionType>();
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef<any>(null);

  const getAssignmentsById = async () => {
    try {
      const res = await API.get(
        `/assignments/getAssignmentById/${assignmentId}`
      );
      console.log(res.data.result.data[0]);
      setAssignmentsData(res.data.result.data[0]);
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };

  const getSubmissionByStudentAndAssignment = async () => {
    try {
      const res = await API.get(
        `/assignments/getSubmissionByStudentAndAssignment/${MaSV}/${assignmentId}`
      );
      console.log(res.data.result.data[0]);
      setDataSubmission(res.data.result.data[0]);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Vui lòng chọn file để nộp bài");
      return;
    }
    const formData = new FormData();
    formData.append("MaBaiTap", assignmentId ?? "");
    formData.append("MaSV", MaSV ?? "");
    formData.append("file", file);
    try {
      const res = await API.post("/assignments/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      getAssignmentsById();
      getSubmissionByStudentAndAssignment();
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };

  // Khi kéo file vào vùng
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Khi rời file khỏi vùng
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Khi thả file vào vùng
  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  // Khi chọn file bằng click
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  // Click để mở file picker
  const handleClick = () => {
    dropRef.current.click();
  };
  useEffect(() => {
    getSubmissionByStudentAndAssignment();
    getAssignmentsById();
  }, []);
  return (
    <div className="flex-1 overflow-auto max-h-170 py-2 px-20">
      <div className="grid grid-cols-4 gap-4">
        {/* Info */}
        <div className="col-span-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium">{assignmentsData?.TieuDe}</h1>
            <p className="text-gray-500 text-sm">
              {new Date(assignmentsData?.NgayTao ?? "").toLocaleDateString(
                "vi-VN"
              )}{" "}
            </p>
            <p>{assignmentsData?.DiemToiDa} Point</p>
          </div>
          <div className="pt-5">
            <div className="mb-5">
              <div
                dangerouslySetInnerHTML={{
                  __html: assignmentsData?.NoiDung ?? "",
                }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center justify-center gap-2 p-3 bg-black/5 rounded-md">
                <File size={20} />
                <a
                  href={`http://localhost:4180/contents/${assignmentsData?.file_name}`}
                  className="text-center hover:underline"
                >
                  {assignmentsData?.original_name}
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Upload */}
        <div className="col-span-2 flex justify-center items-center">
          <div className="w-80 p-5 bg-black/3 rounded-md">
            {!dataSubmission ? (
              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-medium">Submission</h2>
                <p className="text-sm">
                  {new Date(assignmentsData?.HanNop ?? "") < new Date()
                    ? "You cannot submit this assignment because it is past the due date."
                    : "Points will be deducted for late assignment submission according to the instructor's regulations"}
                </p>
                {(new Date(assignmentsData?.HanNop ?? "") > new Date() || !assignmentsData?.HanNop) && (
                  <div>
                    <div
                      onClick={handleClick}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                        isDragging
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-400"
                      }`}
                    >
                      {file ? (
                        <p className="">{file.name}</p>
                      ) : (
                        <p>Drag and Drop or Click</p>
                      )}
                    </div>
                    <input
                      type="file"
                      hidden
                      ref={dropRef}
                      onChange={handleFileChange}
                    />
                  </div>
                )}
                {file && (
                  <Button
                    onClick={() => handleSubmit()}
                    variant="primary"
                    className="justify-center rounded-md"
                    title="Nộp bài"
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-medium">Submited</h2>
                <p className="text-sm">
                  You have submitted this assignment. If you want to change,
                  please contact your instructor.
                </p>
                <div className="flex flex-col items-center justify-center gap-2 p-3 bg-green-brand text-white rounded-md">
                  <File size={20} />
                  <a
                    href={`http://localhost:4180/contents/${dataSubmission?.file_name}`}
                    className="text-center hover:underline"
                  >
                    {dataSubmission?.original_name}
                  </a>
                </div>
                <p className="text-sm text-gray-500">
                  Submit at:{" "}
                  {new Date(dataSubmission?.thoigian_nop ?? "").toLocaleString(
                    "vi-VN"
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCourseAssignmentGuidance;
