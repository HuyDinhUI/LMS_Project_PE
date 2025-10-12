import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { AlertDialogDelete } from "@/mock/AlertDialog-MockData";
import type { AssignmentType } from "@/types/AssignmentType";
import API from "@/utils/axios";
import { Ellipsis, File, Pen, Plus, Trash, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ClassCourseManagementAssignment = () => {
  const role = localStorage.getItem("role");
  const { id } = useParams(); // MaLop
  const MaSV = localStorage.getItem("username");
  const [assignmentsData, setAssignmentsData] = useState<AssignmentType[]>([]);
  const [opentFormCreate, setOpenFormCreate] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { ref, onChange } = register("file");

  const handleFileOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const getAllAssignments = async () => {
    try {
      const res = await API.get(`/assignments/getAssignmentsByClass/${id}`);
      setAssignmentsData(res.data.result.data);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };

  const getAssignmentsByStudent = async () => {
    try {
      const res = await API.get(
        `/assignments/getAssignmentByStudent/${MaSV}/${id}`
      );
      setAssignmentsData(res.data.result.data);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };

  useEffect(() => {
    if (role === "GV") {
      getAllAssignments();
    } else {
      getAssignmentsByStudent();
    }
  }, []);

  const handleCreateAssignment = async (data: any) => {
    const formData = new FormData();
    formData.append("TieuDe", data.TieuDe);
    formData.append("NoiDung", data.NoiDung);
    formData.append("HanNop", data.HanNop);
    formData.append("GioNop", data.GioNop);
    formData.append("DiemToiDa", data.DiemToiDa);
    formData.append("MaLop", id!);
    formData.append("file", file!);

    console.log(...formData);
    try {
      const res = await API.post("/assignments/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Tạo bài tập thành công");
      getAllAssignments();
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };

  const getItemActionAssignment = (MaBaiTap: string) => {
    return [
      { label: "Sửa", icon: <Pen size={16} /> },
      {
        label: "Xoá",
        icon: <Trash size={16} />,
        dialog: AlertDialogDelete,
        onClick: () => handleDeleteAssignment(MaBaiTap),
      },
    ];
  };

  const handleDeleteAssignment = async (MaBaiTap: string) => {
    console.log(MaBaiTap);
    try {
      const res = await API.delete(`/assignments/delete/${MaBaiTap}`);
      toast.success("Xoá bài tập thành công");
      getAllAssignments();
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };

  return (
    <div className="flex-1 overflow-auto max-h-170 p-2">
      {/* content */}
      <div className="flex flex-col justify-center px-20">
        <div className="flex flex-col gap-3">
          {/* Form tạo */}
          {role === "GV" && (
            <div
              className={`p-4 col-span-2 ring ring-gray-200 rounded-md shadow-md overflow-scroll relative ${
                opentFormCreate ? "h-120" : "h-15"
              } transition-all duration-300 ease-in-out`}
            >
              <div
                className="flex items-center gap-2 cursor-pointer w-full"
                onClick={() => setOpenFormCreate(!opentFormCreate)}
              >
                <Plus size={20} />
                <h2>Thêm bài tập</h2>
              </div>

              {opentFormCreate && <form
                onSubmit={handleSubmit(handleCreateAssignment)}
                className="flex flex-col gap-3 mt-7"
              >
                <Input
                  {...register("TieuDe", { required: "Tiêu đề là bắt buộc" })}
                  placeholder="Tiêu đề"
                />
                <textarea
                  placeholder="Nội dung"
                  className="p-2 ring ring-gray-200 rounded-md"
                  {...register("NoiDung")}
                ></textarea>
                <div className="grid grid-cols-4 gap-2">
                  <Input
                    {...register("HanNop")}
                    type="date"
                    placeholder="Hạn nộp"
                  />
                  <Input
                    {...register("GioNop")}
                    type="time"
                    placeholder="Giờ nộp"
                  />
                  <Input
                    {...register("DiemToiDa")}
                    type="number"
                    placeholder="Điểm tối đa"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    type="button"
                    variant="icon"
                    size="md"
                    className="ring ring-gray-200"
                    title="Thêm tệp đính kèm"
                    icon={<Upload />}
                  ></Button>
                </div>
                <Input
                  {...register("file")}
                  ref={(e) => {
                    ref(e);
                    fileInputRef.current = e;
                  }}
                  onChange={handleFileOnChange}
                  hidden
                  type="file"
                />
                {file && (
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-3 ring ring-gray-200 rounded-md">
                      <label>
                        <div className="flex justify-center items-center p-5">
                          <File />
                        </div>
                        <label className="text-center w-full block">
                          {file.name}
                        </label>
                      </label>
                    </div>
                  </div>
                )}
                <div className={`flex justify-end gap-2 ${opentFormCreate ? 'absolute bottom-3 right-3' : 'hidden'}`}>
                  <Button
                    onClick={() => {
                      reset();
                      setFile(null);
                      setOpenFormCreate(false);
                    }}
                    type="button"
                    variant="outline"
                    title="Huỷ"
                  />
                  <Button type="submit" variant="primary" title="Tạo" />
                </div>
              </form>}
            </div>
          )}
          {/* Danh sách bài tập */}
          {assignmentsData.map((item) => (
            <div
              key={item.MaBaiTap}
              className="w-full p-5 ring ring-gray-200 rounded-md relative"
            >
              <h2 className="text-lg font-semibold">{item.TieuDe}</h2>
              {item.file_name && (
                <div className="mt-5">
                  <a
                    href={
                      item.file_path
                        ? "http://localhost:4180/contents/" + item.file_name
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-500 hover:underline"
                  >
                    <File />
                    {item.original_name}
                  </a>
                </div>
              )}
              <div className="absolute top-5 right-5 text-sm text-gray-500 flex items-center gap-2">
                {role === "GV" ? (
                  <p>
                    Ngày tạo: {new Date(item.NgayTao).toLocaleDateString()}{" "}
                    {item.NgayTao && " - "}{" "}
                    {new Date(item.NgayTao).toLocaleTimeString()}
                  </p>
                ) : (
                  <p>
                    {item.TrangThai === "Đã nộp" || item.TrangThai === "Nộp trễ"
                      ? item.TrangThai
                      : `Hạn nộp:${" "}
                    ${new Date(
                      item.HanNop ?? "Không có hạn nộp"
                    ).toLocaleDateString("vi-VN")}${" "}
                    ${item.HanNop && " - "} ${item.GioNop}`}
                  </p>
                )}

                {role === "GV" && (
                  <DropdownMenu
                    size="sm"
                    side="bottom"
                    align="end"
                    items={getItemActionAssignment(item.MaBaiTap)}
                    trigger={
                      <Button variant="icon" icon={<Ellipsis size={18} />} />
                    }
                  />
                )}
              </div>
              <div className="absolute bottom-5 right-5 text-sm text-gray-500">
                Điểm tối đa: {item.DiemToiDa}
              </div>
              <div className="mt-7">
                <Link
                  to={`${
                    role === "GV"
                      ? `/classcourse/${id}/submissions/${item.MaBaiTap}`
                      : `/classcourse/${id}/guidance/${item.MaBaiTap}`
                  }`}
                  className="p-2 ring ring-gray-200 rounded-md"
                >
                  {role === "GV" ? "Xem danh sách nộp bài" : "Xem hướng dẫn"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassCourseManagementAssignment;
