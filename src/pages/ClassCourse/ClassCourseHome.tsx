import type { ContentType } from "@/types/ContentType";
import API from "@/utils/axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaFilePdf } from "react-icons/fa6";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { BsFiletypeDoc } from "react-icons/bs";
import { GoFileZip } from "react-icons/go";
import { FilePreview } from "@/components/ui/file-preview";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Ellipsis, File, Link2, Pen, Plus, Trash, Upload, Youtube } from "lucide-react";
import { useForm } from "react-hook-form";
import type { ClassCourseType } from "@/types/ClassCourseType";
import { DropdownMenu } from "@/components/ui/dropdown";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { AlertDialogDelete } from "@/mock/AlertDialog-MockData";

const get_icon: any = {
  pdf: <FaFilePdf size={30} />,
  image: <CiImageOn size={30} />,
  video: <CiVideoOn size={30} />,
  doc: <BsFiletypeDoc size={30} />,
  zip: <GoFileZip size={30} />,
};

const ClassCourseManagementHome = () => {
  const role = localStorage.getItem("role");
  const [contentData, setContentData] = useState<ContentType[]>([]);
  const { id } = useParams(); // MaLop
  const [preview, setPreview] = useState<any>(null);
  const [opentFormCreate, setOpenFormCreate] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [classCourseData, setClassCourseData] = useState<ClassCourseType>();
  const [description,setDescription] = useState<string>("")
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getItemActionContent = (MaNoiDung: string) => {
    return [
      { label: "Edit", icon: <Pen size={16} /> },
      {
        label: "Delete",
        icon: <Trash size={16} />,
        dialog: AlertDialogDelete,
        onClick: () => handleDeleteContent(MaNoiDung),
      },
    ];
  };

  const { ref, onChange } = register("file");

  const getContent = async () => {
    try {
      const res = await API.get(`/contents/getByOneClass/${id}`);
      setContentData(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getClassCourse = async () => {
    try {
      const res = await API.get(`/classCourse/getOneClassCourse/${id}`);
      setClassCourseData(res.data.result.data[0]);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getFileUrl = (filename: string) =>
    `${import.meta.env.VITE_BASE_STATIC_FILE}/contents/${filename}`;

  const getFileType = (mime: string) => {
    if (mime.includes("pdf")) return "pdf";
    if (mime.includes("image")) return "image";
    if (mime.includes("video")) return "video";
    if (mime.includes("word") || mime.includes("officedocument")) return "doc";
    if (mime.includes("zip") || mime.includes("rar")) return "zip";
    return "other";
  };

  const handlePreview = (url: string, type: string) =>
    setPreview({ url, type });

  const handleCreateContent = async (data: any) => {
    const formData = new FormData();
    formData.append("tieu_de", data.tieu_de);
    formData.append("MaLop", id!);
    formData.append("mota", description);
    formData.append("file", file!);

    console.log(formData);
    try {
      const res = await API.post("/contents/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      getContent();
      toast.success("Tạo nội dung thành công");
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleDeleteContent = async (MaNoiDung: string) => {
    console.log(MaNoiDung);
    try {
      const res = await API.delete(`/contents/delete/${MaNoiDung}`);
      getContent();
      toast.success("Xoá nội dung thành công");
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleFileOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    getClassCourse();
    getContent();
    
  }, []);

  useEffect(() => {
    document.title = classCourseData?.ten_lop + '-' + classCourseData?.MaLop || 'Lớp học'
  },[classCourseData])
  return (
    <div className="flex-1 overflow-auto max-h-170 px-20">
      {/* cover */}
      <div className="w-full h-40 flex flex-col justify-end rounded-xl bg-cover overflow-hidden" style={{backgroundImage: `url(${classCourseData?.cover})`}}>
        
      </div>
      {/* content */}
      <div className="mt-5">
        {/* form tạo content */}
        <div className={`p-4 rounded-xl bg-black/3 overflow-scroll transition-all duration-300 relative ${opentFormCreate ? "h-100" : "h-13"}`}>
          <h2
            onClick={() => setOpenFormCreate(!opentFormCreate)}
            className="cursor-pointer flex gap-2"
          >
            <Plus/>
            Add content
          </h2>

          {opentFormCreate && <form
            onSubmit={handleSubmit(handleCreateContent)}
            className="flex flex-col gap-3 mt-10"
          >
            <Input
              placeholder="Title"
              {...register("tieu_de", {
                required: "Tiêu đề không được để trống",
              })}
            />
            {/* <textarea
              className="w-full ring ring-gray-200 rounded-md p-2"
              placeholder="Mô tả"
              {...register("mota")}
            ></textarea> */}
            <ReactQuill value={description} onChange={setDescription}/>
            <Input
              {...register("file")}
              ref={(e) => {
                ref(e); // Gắn ref của React Hook Form
                fileInputRef.current = e; // Lưu ref của bạn để trigger click
              }}
              hidden
              type="file"
              onChange={handleFileOnChange}
            />
            {/* Preview */}
            {file && (
              <div className="grid grid-cols-4">
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
            <div className="flex gap-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                type="button"
                variant="icon"
                size="lg"
                className=""
                icon={<Upload />}
              />
              <Button
                type="button"
                variant="icon"
                size="lg"
                className=""
                icon={<Link2 />}
              />
               <Button
                type="button"
                variant="icon"
                size="lg"
                className=""
                icon={<Youtube />}
              />
            </div>
            <div className={`flex justify-end gap-2 ${opentFormCreate ? 'absolute bottom-3 right-3' : 'hidden'}`}>
              <Button
                type="button"
                onClick={() => {
                  setFile(null);
                  reset();
                  setOpenFormCreate(false);
                }}
                title="Cancle"
                variant="transparent"
              />
              <Button type="submit" variant="primary" title="Post" />
            </div>
          </form>}
        </div>

        {/* list content */}
        <div className="flex flex-col gap-3 mt-5 h-150">
          {contentData.map((c, i) => (
            <div
              key={i}
              className="w-full p-5 bg-black/3 rounded-xl relative"
            >
              {/* header */}
              <div className="flex gap-2">
                <img
                  width={50}
                  height={50}
                  src="https://img.freepik.com/free-vector/hand-drawn-minimal-background_23-2149008068.jpg?uid=R40278496&ga=GA1.1.12754122.1753975824&semt=ais_hybrid&w=740&q=80"
                  className="rounded-full"
                ></img>
                <div>
                  <h2>{c.hoten}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(c.ngay_tao).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
              {/* content */}
              <div className="mt-3">
                <h2 className="font-bold">{c.tieu_de}</h2>
                <div dangerouslySetInnerHTML={{ __html: c.mota }}></div>
              </div>
              {/* file */}
              {c.file_name && (
                <div className="grid grid-cols-4 mt-4">
                  <div
                    onClick={() =>
                      handlePreview(
                        getFileUrl(c.file_name),
                        getFileType(c.mime_type)
                      )
                    }
                    className="p-3 bg-green-brand text-white rounded-xl flex gap-2"
                  >
                    <div className="flex items-center">
                      {get_icon[`${getFileType(c.mime_type)}`]}
                    </div>
                    <label className="w-full block">
                      {c.original_name}
                    </label>
                  </div>
                </div>
              )}
              {role === "GV" && (
                <div className="absolute top-3 right-3">
                  <DropdownMenu
                    trigger={
                      <Button variant="icon" size="ic" icon={<Ellipsis />} />
                    }
                    items={getItemActionContent(c.MaNoiDung)}
                    size="sm"
                    label="Tác vụ"
                    side="bottom"
                    align="end"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Modal xem file */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setPreview(false)}
        >
          <div
            className="bg-white p-4 rounded-xl w-[90vw] h-[80vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <FilePreview url={preview.url} type={preview.type} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassCourseManagementHome;
