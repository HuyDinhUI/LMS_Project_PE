import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { AlertDialogDelete } from "@/mock/AlertDialog-MockData";
import type { AssignmentType } from "@/types/AssignmentType";
import API from "@/utils/axios";
import {
  Ellipsis,
  File,
  LayoutGrid,
  LayoutList,
  Pen,
  Plus,
  Trash,
  Upload,
} from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
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
        value: "submited",
      },
      {
        name: "Unsubmit",
        value: "unsubmit",
      },
    ],
  },
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
  const [selectedMaBaiTap, setSelectedMaBaiTap] = useState<string>("");
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
    formData.append("NgayBatDau", data.NgayBatDau);
    formData.append("DiemToiDa", data.DiemToiDa);
    formData.append("MaLop", id!);
    formData.append("file", file!);

    console.log(...formData);
    try {
      await API.post("/assignments/create", formData, {
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
      {
        label: "Edit",
        icon: <Pen size={16} />,
        onClick: () => setSelectedMaBaiTap(MaBaiTap),
      },
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

  const handleFilter = async () => {};

  return (
    <div className="flex-1 overflow-auto max-h-165">
      {/* content */}
      <div className="flex flex-col justify-center px-20 w-full">
        {/* filter */}
        <div className="flex gap-2 mt-2">
          <div className="flex">
            <Button variant="icon" icon={<LayoutGrid size={18} />} />
            <Button variant="transparent" icon={<LayoutList size={18} />} />
          </div>
          <FilterForm data={data_mock} handleFilter={handleFilter} />
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
                        <label className="w-30 p-2 text-center border-r border-gray-200 bg-black/5">
                          Start date
                        </label>
                        <Input
                          {...register("NgayBatDau")}
                          type="datetime-local"
                          variant="primary"
                          placeholder=""
                        />
                      </div>
                      <div className="flex gap-2 ring ring-gray-200 rounded-md overflow-hidden">
                        <label className="w-30 p-2 text-center border-r border-gray-200 bg-black/5">
                          End date
                        </label>
                        <Input
                          {...register("HanNop")}
                          type="datetime-local"
                          variant="primary"
                          placeholder=""
                        />
                      </div>

                      <div className="flex gap-2 ring ring-gray-200 rounded-md overflow-hidden">
                        <label className="w-30 p-2 text-center border-r border-gray-200 bg-black/5">
                          Point
                        </label>
                        <Input
                          {...register("DiemToiDa")}
                          type="number"
                          variant="primary"
                          placeholder="10"
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
                      title="Cancel"
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
                    ${new Date(item.HanNop ?? "No dealine").toLocaleDateString(
                      "vi-VN"
                    )}${" "}
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
      {role === "GV" && selectedMaBaiTap && (
        <FormUpdateAssignment
          MaBaiTap={selectedMaBaiTap}
          handleClose={() => {
            setSelectedMaBaiTap("");
            getAllAssignments();
          }}
        />
      )}
    </div>
  );
};

type Props = {
  MaBaiTap: string;
  handleClose: () => void;
};

const FormUpdateAssignment = ({ MaBaiTap, handleClose }: Props) => {
  const [assignmentData, setAssignmentsData] = useState<AssignmentType>();
  const { register, handleSubmit, reset } = useForm();
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef<any>(null);
  const getOneAssignment = async () => {
    try {
      const res = await API.get(`/assignments/getAssignmentById/${MaBaiTap}`);
      setAssignmentsData(res.data.result.data[0]);
      reset(res.data.result.data[0]);
      setDescription(res.data.result.data[0].NoiDung);
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  const handleUpdate = async (data: any) => {
    const formData = new FormData();
    formData.append("MaBaiTap", MaBaiTap);
    formData.append("TieuDe", data.TieuDe);
    formData.append("NoiDung", description);
    formData.append("HanNop", data.HanNop);
    formData.append("NgayBatDau", data.NgayBatDau);
    formData.append("DiemToiDa", data.DiemToiDa);
    formData.append("file", file!);
    try {
      await API.put("/assignments/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Cập nhật bài tập thành công");
      handleClose();
    } catch (err: any) {
      toast.error(err?.response?.message?.data);
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
    getOneAssignment();
  }, []);
  return (
    <div className="right-0 top-0 left-0 z-999 h-[100vh] w-[100-vw] bg-black/20 fixed">
      <div className="bg-white w-130 p-5 h-[100vh] absolute right-0 flex flex-col gap-2 animate-slideInRight overflow-auto">
        <h1 className="uppercase font-bold pb-2 mb-3 border-b sticky top-0 bg-white">
          Update Assignment
        </h1>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-bold">Title:</label>
              <Input
                {...register("TieuDe", { required: "Tiêu đề là bắt buộc" })}
                placeholder="Title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Description:</label>
              <ReactQuill value={description} onChange={setDescription} />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">
                      Start date:
                    </label>
                    <Input
                      {...register("NgayBatDau")}
                      type="datetime-local"
                      placeholder=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">
                      End date:
                    </label>
                    <Input
                      {...register("HanNop")}
                      type="datetime-local"
                      placeholder=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">
                      Point:
                    </label>
                    <Input
                      {...register("DiemToiDa")}
                      type="number"
                      placeholder="10"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                {assignmentData?.file_path ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-bold">Current file:</label>
                    <a
                      className="bg-gray-100 underline p-2 rounded-md"
                      href={`${import.meta.env.VITE_BASE_STATIC_FILE}/${
                        assignmentData?.file_path
                      }`}
                      target="_blank"
                    >
                      {assignmentData?.original_name}
                    </a>
                  </div>
                ) : (
                  <p className="text-center italic bg-gray-50 rounded-md p-2">
                    There are no files
                  </p>
                )}
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
            <div className="flex gap-2 justify-end fixed top-4 right-5 rounded-md">
              <Button type="submit" title="Save" size="sm" variant="dark"/>
              <Button type="button" onClick={handleClose} size="sm" title="Cancel"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassCourseManagementAssignment;
