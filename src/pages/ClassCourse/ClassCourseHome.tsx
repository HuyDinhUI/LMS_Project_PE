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
import {
  ChevronLeft,
  Ellipsis,
  File,
  Pen,
  Plus,
  Search,
  Trash,
  TriangleAlert,
  Upload,
  Youtube,
} from "lucide-react";
import { set, useForm } from "react-hook-form";
import type { ClassCourseType } from "@/types/ClassCourseType";
import { DropdownMenu } from "@/components/ui/dropdown";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { AlertDialogDelete } from "@/mock/AlertDialog-MockData";
import { Dialog } from "@/components/ui/dialog";
import logo_youtube from "@/assets/logo_youtube.png";
import { useAuth } from "@/hooks/useAuth";
import { useSubmitLoading } from "@/hooks/useLoading";
import { LoadingOverlay } from "@/components/ui/loading-overlay";

const get_icon: any = {
  pdf: <FaFilePdf size={30} />,
  image: <CiImageOn size={30} />,
  video: <CiVideoOn size={30} />,
  doc: <BsFiletypeDoc size={30} />,
  zip: <GoFileZip size={30} />,
};

const ClassCourseManagementHome = () => {
  const { user } = useAuth();
  const [contentData, setContentData] = useState<ContentType[]>([]);
  const { id } = useParams(); // MaLop
  const [preview, setPreview] = useState<any>(null);
  const [opentFormCreate, setOpenFormCreate] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [classCourseData, setClassCourseData] = useState<ClassCourseType>();
  const [description, setDescription] = useState<string>("");
  const [selectedMaNoiDung, setSelectedMaNoiDung] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [dataVideoYoutube, setDataVideoYoutube] = useState<any>([]);
  const [dialog, setDialog] = useState<boolean>(false);
  const [selectedVideoId, setSelectedVideoId] = useState<{
    id: string;
    title: string;
    thumbnail: string;
  } | null>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { loading, withLoading } = useSubmitLoading();

  const getItemActionContent = (MaNoiDung: string) => {
    return [
      {
        label: "Edit",
        icon: <Pen size={16} />,
        onClick: () => setSelectedMaNoiDung(MaNoiDung),
      },
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
    formData.append("id_youtube", selectedVideoId?.id ?? "");
    formData.append("thumbnail_youtube", selectedVideoId?.thumbnail ?? "");
    formData.append("title_youtube", selectedVideoId?.title ?? "");
    formData.append("file", file!);

    console.log(formData);
    try {
      withLoading(async () => {
        await API.post("/contents/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        getContent();
      });

      // await API.post("/contents/create", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      
      setOpenFormCreate(false);
      setSelectedVideoId(null);
      setDescription("");
      setFile(null);
      reset();
      toast.success("Tạo nội dung thành công");
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleDeleteContent = async (MaNoiDung: string) => {
    console.log(MaNoiDung);
    try {
      await API.delete(`/contents/delete/${MaNoiDung}`);
      getContent();
      toast.success("Xoá nội dung thành công");
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleFileOnChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const submitSearch = async () => {
    try {
      const res = await API.get(`/youtube/getVideos?keyword=${keyword}`);
      setDataVideoYoutube(res.data.result.data);
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getClassCourse();
    getContent();
  }, []);

  useEffect(() => {
    document.title =
      classCourseData?.ten_lop + "-" + classCourseData?.MaLop || "Lớp học";
  }, [classCourseData]);
  return (
    <div className="flex-1 overflow-auto max-h-170 px-20">
      <LoadingOverlay show={loading} message="Đang tạo nhóm..." />
      {/* cover */}
      <div
        className="w-full h-40 flex flex-col justify-end rounded-xl bg-cover overflow-hidden"
        style={{ backgroundImage: `url(${classCourseData?.cover})` }}
      ></div>
      {/* content */}
      <div className="mt-5">
        {/* form tạo content */}
        <div
          className={`rounded-xl bg-black/3 transition-all duration-300 relative overflow-hidden ${
            opentFormCreate ? "h-100" : "h-13"
          }`}
        >
          <h2
            onClick={() => setOpenFormCreate(!opentFormCreate)}
            className="cursor-pointer flex gap-2 p-4 sticky top-0"
          >
            <Plus />
            Add content
          </h2>

          {opentFormCreate && (
            <div className="overflow-auto h-90">
              <form
                onSubmit={handleSubmit(handleCreateContent)}
                className="h-80"
              >
                <div className="p-4 flex flex-col gap-3">
                  <div className="relative">
                    <Input
                      placeholder="Title"
                      {...register("tieu_de", {
                        required: "Tiêu đề không được để trống",
                      })}
                      variant={errors.tieu_de ? "danger" : "default"}
                      aria-invalid={errors.tieu_de ? "true" : "false"}
                    />
                    {errors.tieu_de && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                        <TriangleAlert size={15} />
                      </div>
                    )}
                  </div>

                  <ReactQuill value={description} onChange={setDescription} />
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
                  {selectedVideoId && (
                    <div className="grid grid-cols-3">
                      <div className="flex items-center gap-2 p-2 ring ring-gray-300 rounded-xl">
                        <span className="flex-1">{selectedVideoId.title}</span>
                        <img width={100} src={selectedVideoId.thumbnail}></img>
                      </div>
                    </div>
                  )}
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
                </div>
                <div
                  className={`flex bg-black/3 justify-between items-center p-3 gap-2 absolute bottom-0 left-0 right-0 ${
                    opentFormCreate ? "" : "hidden"
                  }`}
                >
                  <div className="flex gap-2">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      type="button"
                      variant="icon"
                      size="ic"
                      className="bg-transparent ring ring-gray-500 hover:bg-gray-100"
                      icon={<Upload color="black" />}
                    />
                    <Dialog
                      close={dialog}
                      handleClose={() => setDataVideoYoutube([])}
                      trigger={
                        <Button
                          onClick={() => {
                            setDataVideoYoutube([]);
                            setSelectedVideoId(null);
                          }}
                          type="button"
                          variant="icon"
                          size="ic"
                          className="bg-transparent ring ring-gray-500 hover:bg-gray-100"
                          icon={<Youtube color="black" />}
                        />
                      }
                    >
                      <div className="flex flex-col h-full overflow-scroll relative">
                        <header className="p-5 sticky top-0 bg-white">
                          <img width={130} height={50} src={logo_youtube}></img>
                        </header>
                        <hr></hr>
                        {dataVideoYoutube.length === 0 && (
                          <div className="flex flex-col pt-20  items-center flex-1">
                            <img
                              width={300}
                              src="//www.gstatic.com/newt/images/newt_uploadvideo@1x.gif"
                            ></img>
                            <div className="w-100 flex p-2 ring ring-gray-400 rounded-md gap-2">
                              <input
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) =>
                                  e.key === "Enter" && submitSearch()
                                }
                                className="flex-1 outline-none border-r border-gray-300"
                              />
                              <Search color="gray" />
                            </div>
                          </div>
                        )}
                        {dataVideoYoutube.length > 0 && !selectedVideoId && (
                          <div className="p-5">
                            <div>
                              <div className="w-100 flex p-2 ring ring-gray-400 rounded-md gap-2">
                                <input
                                  value={keyword}
                                  onChange={(e) => setKeyword(e.target.value)}
                                  onKeyDown={(e) =>
                                    e.key === "Enter" && submitSearch()
                                  }
                                  className="flex-1 outline-none border-r border-gray-300"
                                />
                                <Search color="gray" />
                              </div>
                              <div className="grid grid-cols-4 gap-3 mt-5">
                                {dataVideoYoutube.map((v: any) => (
                                  <div
                                    onClick={() =>
                                      setSelectedVideoId({
                                        id: v.id,
                                        title: v.title,
                                        thumbnail: v.thumbnail,
                                      })
                                    }
                                    key={v.id}
                                    className="ring ring-gray-100 overflow-hidden rounded-md"
                                  >
                                    <img
                                      src={v.thumbnail}
                                      alt={v.title}
                                      className="w-full object-cover"
                                    />
                                    <div className="p-2">
                                      <p className="font-semibold mt-2 line-clamp-2">
                                        {v.title}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                        {v.channelTitle}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                        {selectedVideoId && (
                          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md p-5 flex flex-col gap-5">
                            <div className="flex justify-between">
                              <Button
                                title="return"
                                icon={<ChevronLeft />}
                                variant="transparent"
                                className="hover:bg-gray-100"
                              />
                              <Button
                                title="Add video"
                                icon={<Plus />}
                                variant="primary"
                                onClick={() => {
                                  setDialog(true);
                                  setDataVideoYoutube([]);
                                  setKeyword("");
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${selectedVideoId.id}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </Dialog>
                  </div>
                  <div>
                    <Button
                      type="button"
                      onClick={() => {
                        setSelectedVideoId(null);
                        setFile(null);
                        reset();
                        setOpenFormCreate(false);
                      }}
                      title="Cancle"
                      variant="transparent"
                    />
                    <Button type="submit" variant="primary" title="Post" />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* list content */}
        <div className="flex flex-col gap-3 mt-5">
          {contentData.map((c) => (
            <div
              key={c.MaNoiDung}
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
              {/* youtube */}
              {c.youtube_id && (
                <div className="grid grid-cols-3 mt-4">
                  <a
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${c.youtube_id}`}
                    className="ring ring-gray-300 rounded-md p-2 flex gap-2"
                  >
                    <p className="flex-1 underline">{c.youtube_title}</p>
                    <img width={70} src={c.thumbnail}></img>
                  </a>
                </div>
              )}
              {/* file */}
              {c.file_name && (
                <div className="grid grid-cols-3 mt-4">
                  <div
                    onClick={() =>
                      handlePreview(
                        getFileUrl(c.file_name),
                        getFileType(c.mime_type)
                      )
                    }
                    className="p-3 ring ring-gray-300 rounded-md flex gap-2 cursor-pointer"
                  >
                    <div className="flex items-center">
                      {get_icon[`${getFileType(c.mime_type)}`]}
                    </div>
                    <label className="w-full block cursor-pointer underline">
                      {c.original_name}
                    </label>
                  </div>
                </div>
              )}
              {c.userId === user?.username && (
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
      {selectedMaNoiDung && (
        <FormUpdateContent
          MaNoiDung={selectedMaNoiDung}
          handleClose={() => {
            setSelectedMaNoiDung("");
            getContent();
          }}
        />
      )}
    </div>
  );
};

type Props = {
  MaNoiDung: string;
  handleClose: () => void;
};

const FormUpdateContent = ({ MaNoiDung, handleClose }: Props) => {
  const [contentData, setContentData] = useState<ContentType>();
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef<any>(null);
  const { register, handleSubmit, reset } = useForm();

  const getOneContentById = async () => {
    try {
      const res = await API.get(`/contents/getOneById/${MaNoiDung}`);
      setContentData(res.data.result.data);
      setDescription(res.data.result.data.mota);
      reset(res.data.result.data);
    } catch (err: any) {
      console.log(err?.response?.data?.message);
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

  const handleUpdate = async (data: any) => {
    const formData = new FormData();
    formData.append("tieu_de", data.tieu_de);
    formData.append("MaNoiDung", MaNoiDung);
    formData.append("mota", description);
    formData.append("file", file!);

    try {
      await API.put("/contents/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Cập nhật nội dung thành công");
      handleClose();
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getOneContentById();
  }, []);

  return (
    <div className="right-0 top-0 left-0 z-999 h-[100vh] w-[100-vw] bg-black/20 fixed">
      <div className="bg-white w-130 p-5 h-full absolute right-0 flex flex-col gap-2 animate-slideInRight overflow-auto">
        <h1 className="uppercase font-bold pb-2 mb-3 border-b">
          Update Content
        </h1>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-bold">Title:</label>
              <Input
                {...register("tieu_de", { required: "Tiêu đề là bắt buộc" })}
                placeholder="Title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Description:</label>
              <ReactQuill value={description} onChange={setDescription} />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-bold">Current video:</label>
                {contentData?.youtube_id ? (
                  <a
                    className="bg-gray-100 underline p-2 rounded-md flex"
                    href={`https://www.youtube.com/watch?v=${contentData?.youtube_id}`}
                    target="_blank"
                  >
                    <span className="flex-1">{contentData?.youtube_title}</span>
                    <img width={100} src={contentData?.thumbnail}></img>
                  </a>
                ) : (
                  <p className="text-center italic bg-gray-50 rounded-md p-2">
                    There are no video
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-bold">Current file:</label>
                {contentData?.file_path ? (
                  <a
                    className="bg-gray-100 underline p-2 rounded-md"
                    href={`${import.meta.env.VITE_BASE_STATIC_FILE}/${
                      contentData?.file_path
                    }`}
                    target="_blank"
                  >
                    {contentData?.original_name}
                  </a>
                ) : (
                  <p className="text-center italic bg-gray-50 rounded-md p-2">
                    There are no files
                  </p>
                )}
              </div>
              <div
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-1 h-full flex items-center justify-center border-dashed rounded-xl p-10 cursor-pointer transition-colors ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-400"
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
            <div className="flex gap-2 justify-end fixed top-4 right-5 rounded-md">
              <Button type="submit" title="Save" variant="dark" size="sm" />
              <Button
                type="button"
                onClick={handleClose}
                title="Cancel"
                size="sm"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassCourseManagementHome;
