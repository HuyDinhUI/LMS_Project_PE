import type { ContentType } from "@/types/ContentType";
import API from "@/utils/axios";
import { useEffect, useReducer, useRef, useState } from "react";
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
  X,
  Youtube,
} from "lucide-react";
import { useForm } from "react-hook-form";
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
import { formatsQuill, modulesQuill } from "@/mock/quill";
import TextField from "@mui/material/TextField";

const get_icon: any = {
  pdf: <FaFilePdf size={30} />,
  image: <CiImageOn size={30} />,
  video: <CiVideoOn size={30} />,
  doc: <BsFiletypeDoc size={30} />,
  zip: <GoFileZip size={30} />,
};

const fileReducer = (state: File[], action: any) => {
  switch (action.type) {
    case "SET_DATA":
      return action.value;
    case "ADD_FILE":
      return [...state, action.value];
    case "DELETE_FILE":
      return state.filter((f: any) => f.name !== action.name);
    default:
      return state;
  }
};

const ClassCourseManagementHome = () => {
  const { user } = useAuth();
  const [contentData, setContentData] = useState<ContentType[]>([]);
  const { id } = useParams(); // MaLop
  const [preview, setPreview] = useState<any>(null);
  const [opentFormCreate, setOpenFormCreate] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, dispatch] = useReducer(fileReducer, []);
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

  const { ref } = register("file");

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
    file.forEach((f: File) => {
      formData.append("file", f);
    });

    try {
      withLoading(async () => {
        await API.post("/contents/create", formData);

        getContent();
        setOpenFormCreate(false);
        setSelectedVideoId(null);
        setDescription("");
        dispatch({ type: "SET_DATA", value: [] });
        reset();
        toast.success("Tạo nội dung thành công", { theme: "light" });
      });
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  const handleDeleteContent = async (MaNoiDung: string) => {
    console.log(MaNoiDung);
    try {
      await API.delete(`/contents/delete/${MaNoiDung}`);
      getContent();
      toast.success("Xoá nội dung thành công", { theme: "light" });
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  const handleFileOnChange = (e: any) => {
    if (!e.target.files[0]) return;
    dispatch({ type: "ADD_FILE", value: e.target.files[0] });
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
  }, [id]);

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
          className={`rounded-xl bg-black/3 transition-all duration-300 relative ${
            opentFormCreate ? "h-130" : "h-13"
          }`}
        >
          <h2
            onClick={() => setOpenFormCreate(!opentFormCreate)}
            className="cursor-pointer flex gap-2 p-4"
          >
            <Plus />
            Add content
          </h2>

          {opentFormCreate && (
            <div className="">
              <form
                onSubmit={handleSubmit(handleCreateContent)}
                className="max-h-100 overflow-auto"
              >
                <div className="p-4 flex flex-col gap-3">
                  <div className="relative">
                    <TextField
                      label="Title"
                      {...register("tieu_de", {
                        required: "Tiêu đề không được để trống",
                      })}
                      aria-invalid={errors.tieu_de ? "true" : "false"}
                      fullWidth
                    />
                    {errors.tieu_de && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                        <TriangleAlert size={15} />
                      </div>
                    )}
                  </div>

                  <ReactQuill
                    value={description}
                    modules={modulesQuill}
                    formats={formatsQuill}
                    onChange={setDescription}
                  />
                  <Input
                    {...register("file")}
                    ref={(e) => {
                      ref(e);
                      fileInputRef.current = e;
                    }}
                    hidden
                    type="file"
                    onChange={handleFileOnChange}
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {/* Preview */}
                    {selectedVideoId && (
                      <div className="flex items-center gap-2 p-2 ring ring-gray-300 rounded-xl">
                        <span className="flex-1">{selectedVideoId.title}</span>
                        <img width={100} src={selectedVideoId.thumbnail}></img>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {file &&
                      file.map((f: any) => (
                        <div className="px-3 py-3 ring ring-gray-200 rounded-md flex justify-between items-center gap-2">
                          <a
                            href={URL.createObjectURL(f)}
                            target="_blank"
                            className="flex items-center gap-2"
                          >
                            <File />
                            <span className="w-full block hover:underline">
                              {f.name}
                            </span>
                          </a>
                          <Button
                            type="button"
                            onClick={() =>
                              dispatch({ type: "DELETE_FILE", name: f.name })
                            }
                            variant="transparent"
                            icon={<X />}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div
                  className={`flex bg-black/3 justify-between items-center p-3 gap-2 rounded-bl-xl rounded-br-xl absolute bottom-0 left-0 right-0 ${
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
                        dispatch({ type: "SET_DATA", value: [] });
                        reset();
                        setOpenFormCreate(false);
                        setDescription("");
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
                  <h2>{c.create_by.hoten}</h2>
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
              <div className="grid grid-cols-3 mt-4 gap-2">
                {c.videos.map((v) => (
                  <a
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${v.youtube_id}`}
                    className="ring ring-gray-300 rounded-md p-2 flex gap-2"
                  >
                    <p className="flex-1 underline">{v.youtube_title}</p>
                    <img width={70} src={v.thumbnail}></img>
                  </a>
                ))}
              </div>
              {/* file */}
              <div className="grid grid-cols-3 mt-4 gap-2">
                {c.files.map((f) => (
                  <div
                    onClick={() =>
                      handlePreview(
                        getFileUrl(f.file_name),
                        getFileType(f.mime_type)
                      )
                    }
                    className="p-3 ring ring-gray-300 rounded-md flex gap-2 cursor-pointer"
                  >
                    <div className="flex items-center">
                      {get_icon[`${getFileType(f.mime_type)}`]}
                    </div>
                    <label className="w-full block cursor-pointer underline">
                      {f.original_name}
                    </label>
                  </div>
                ))}
              </div>
              {c.create_by.userId === user?.username && (
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
      toast.success("Cập nhật nội dung thành công", { theme: "light" });
      handleClose();
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getOneContentById();
  }, [MaNoiDung]);

  return (
    <div className="right-0 top-0 left-0 z-999 h-[100vh] w-[100-vw] bg-black/20 fixed">
      <div className="bg-white w-130 p-5 h-full absolute right-0 flex flex-col gap-2 animate-slideInRight overflow-auto">
        <h1 className="uppercase font-bold pb-2 mb-3 border-b">
          Update Content
        </h1>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="flex flex-col gap-5">
            <TextField
              label="Title"
              {...register("tieu_de", { required: "Tiêu đề là bắt buộc" })}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <ReactQuill
              placeholder="Description"
              value={description}
              modules={modulesQuill}
              formats={formatsQuill}
              onChange={setDescription}
            />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-bold">Current video:</label>
                {contentData?.videos.map((v) => (
                  <a
                    key={v.youtube_id}
                    className="bg-gray-100 underline p-2 rounded-md flex"
                    href={`https://www.youtube.com/watch?v=${v.youtube_id}`}
                    target="_blank"
                  >
                    <span className="flex-1">{v.youtube_title}</span>
                    <img width={100} src={v.thumbnail}></img>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-bold">Current file:</label>
                {contentData?.files.map((f) => (
                  <a
                    key={f.file_name}
                    className="bg-gray-100 underline p-2 rounded-md"
                    href={`${import.meta.env.VITE_BASE_STATIC_FILE}/${
                      f.file_path
                    }`}
                    target="_blank"
                  >
                    {f.original_name}
                  </a>
                ))}
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
