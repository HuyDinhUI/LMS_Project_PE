import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { AlertDialogDelete } from "@/mock/AlertDialog-MockData";
import type { AssignmentType } from "@/types/AssignmentType";
import API from "@/utils/axios";
import { Ellipsis, File, LayoutGrid, LayoutList, Pen, Plus, Trash, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FilterForm } from "@/components/ui/filter-form";

const data_mock = [
    {
      key: "order",
      select: [
        {
          name: "Last create",
          value: "asc",
        },
        {
          name: "New create",
          value: "desc",
        },
      ],
    },
    {
      key: "status",
      select: [
        {
          name: "Submited",
          value: "submited"
        },
        {
          name: "Unsubmit",
          value: "unsubmit"
        }
      ]
    }
  ];

const ClassCourseManagementAssignment = () => {
  const role = localStorage.getItem("role");
  const { id } = useParams(); // MaLop
  const MaSV = localStorage.getItem("username");
  const [assignmentsData, setAssignmentsData] = useState<AssignmentType[]>([]);
  const [opentFormCreate, setOpenFormCreate] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef<any>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
    if (role === "GV") {
      getAllAssignments();
    } else {
      getAssignmentsByStudent();
    }
  }, []);

  const handleCreateAssignment = async (data: any) => {
    const formData = new FormData();
    formData.append("TieuDe", data.TieuDe);
    formData.append("NoiDung", description);
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
      { label: "Edit", icon: <Pen size={16} /> },
      {
        label: "Delete",
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

  const handleFilter = async () => {

  }

  return (
    <div className="flex-1 overflow-auto max-h-165">
      {/* content */}
      <div className="flex flex-col justify-center px-20 w-full">
        {/* filter */}
        <div className="flex gap-2 mt-2">
          <div className="flex">
          <Button variant="icon" icon={<LayoutGrid size={18}/>}/>
          <Button variant="transparent" icon={<LayoutList size={18}/>}/>
        </div>
        <FilterForm data={data_mock} handleFilter={handleFilter}/>
        </div>
        <div className="flex flex-col gap-3 w-full mt-5 mb-7">
          {/* Form tạo */}
          {role === "GV" && (
            <div
              className={`p-4 col-span-2 bg-black/3 rounded-xl overflow-scroll relative ${
                opentFormCreate ? "h-130" : "h-13"
              } transition-all duration-300 ease-in-out`}
            >
              <div
                className="flex items-center gap-2 cursor-pointer w-full"
                onClick={() => setOpenFormCreate(!opentFormCreate)}
              >
                <Plus size={20} />
                <h2>Add Assigment</h2>
              </div>

              {opentFormCreate && (
                <form
                  onSubmit={handleSubmit(handleCreateAssignment)}
                  className="flex flex-col gap-3 mt-7"
                >
                  <Input
                    {...register("TieuDe", { required: "Tiêu đề là bắt buộc" })}
                    placeholder="Title"
                  />
                  <ReactQuill value={description} onChange={setDescription} />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 ring ring-gray-200 rounded-md overflow-hidden">
                        <label className="w-30 p-2 text-center border-r border-gray-200 bg-black/5">Date</label>
                        <Input
                          {...register("HanNop")}
                          type="date"
                          variant="primary"
                          placeholder="Hạn nộp"
                        />
                      </div>
                      <div className="flex gap-2 ring ring-gray-200 rounded-md overflow-hidden">
                        <label className="w-30 p-2 text-center border-r border-gray-200 bg-black/5">Time</label>
                        <Input
                          {...register("GioNop")}
                          type="time"
                          variant="primary"
                          placeholder="Giờ nộp"
                        />
                      </div>
                      <div className="flex gap-2 ring ring-gray-200 rounded-md overflow-hidden">
                        <label className="w-30 p-2 text-center border-r border-gray-200 bg-black/5">Grade</label>
                        <Input
                          {...register("DiemToiDa")}
                          type="number"
                          variant="primary"
                          placeholder="Maximum grade"
                        />
                      </div>
                    </div>
                    <div>
                      <div
                        onClick={handleClick}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-1 h-full flex items-center justify-center border-dashed rounded-xl p-10 cursor-pointer transition-colors ${
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
                  </div>
                  <div
                    className={`flex justify-end gap-2 ${
                      opentFormCreate ? "absolute bottom-3 right-3" : "hidden"
                    }`}
                  >
                    <Button
                      onClick={() => {
                        reset();
                        setFile(null);
                        setOpenFormCreate(false);
                      }}
                      type="button"
                      variant="transparent"
                      title="Cancle"
                    />
                    <Button type="submit" variant="primary" title="Create" />
                  </div>
                </form>
              )}
            </div>
          )}
          {/* Danh sách bài tập */}
          {assignmentsData.map((item) => (
            <div
              key={item.MaBaiTap}
              className="w-full p-5 bg-black/3 rounded-xl relative"
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
                    Created at: {new Date(item.NgayTao).toLocaleDateString()}{" "}
                    {item.NgayTao && " - "}{" "}
                    {new Date(item.NgayTao).toLocaleTimeString()}
                  </p>
                ) : (
                  <p>
                    {item.TrangThai === "Đã nộp" || item.TrangThai === "Nộp trễ"
                      ? item.TrangThai
                      : `Deadline:${" "}
                    ${new Date(
                      item.HanNop ?? "No dealine"
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
                {role === "GV"
                  ? `Maximum grade: ${item.DiemToiDa}`
                  : `Grade: ${item.DiemSo ?? "Chưa chấm điểm"}`}
              </div>
              <div className="mt-7">
                <Link
                  to={`${
                    role === "GV"
                      ? `/classcourse/${id}/submissions/${item.MaBaiTap}`
                      : `/classcourse/${id}/guidance/${item.MaBaiTap}`
                  }`}
                  className="p-2 bg-yellow-brand rounded-md"
                >
                  {role === "GV" ? "View submission" : "View guide"}
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
