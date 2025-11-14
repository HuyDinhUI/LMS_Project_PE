import { useEffect, useReducer, useRef, useState } from "react";
import API from "@/utils/axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import type { QuizType } from "@/types/QuizType";
import {
  ChevronLeft,
  Clock,
  Ellipsis,
  Import,
  Lock,
  LockOpen,
  Pen,
  Play,
  Plus,
  Repeat,
  Shuffle,
  Trash,
} from "lucide-react";
import { DropdownMenu } from "@/components/ui/dropdown";
import { AlertDialogDelete } from "@/mock/AlertDialog-MockData";
import CheckboxDemo from "@/components/ui/checkbox";
import ReactQuill from "react-quill-new";
import { useAuth } from "@/hooks/useAuth";

const Quiz = () => {
  const { id } = useParams();
  const {user} = useAuth();
  const [dataQuiz, setDataQuiz] = useState<any>([]);
  const [openFormAction, setOpenFormAction] = useState<string>("");
  const [selectedMaTN, setSelectedMaTN] = useState<string>("");
  const navigator = useNavigate();

  const getQuiz = async () => {
    try {
      const res = await API.get(`/quiz/getQuizByClass/${id}`);
      console.log(res.data.result.data);
      setDataQuiz(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const getQuizByStudent = async () => {
    try {
      const res = await API.get(`/quiz/getQuizByStudent/${user?.username}/${id}`);
      console.log(res.data.result.data);
      setDataQuiz(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleDeleteQuiz = async (MaTN: string) => {
    try {
      await API.delete(`/quiz/delete/${MaTN}`);
      getQuiz();
      toast.success("Xoá thành công");
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  const getItemActionQuiz = (MaTN: string, status: string) => {
    return [
      {
        label: "Edit",
        icon: <Pen size={16} />,
        onClick: () => {
          setSelectedMaTN(MaTN);
          setOpenFormAction("update");
        },
      },
      {
        label: "Delete",
        icon: <Trash size={16} />,
        dialog: AlertDialogDelete,
        onClick: () => handleDeleteQuiz(MaTN),
      }
    ];
  };

  useEffect(() => {
    if (!user || !user.role) return;

    if (user?.role === "SV") {
      getQuizByStudent();
    } else {
      getQuiz();
    }
  }, [user]);
  return (
    <div className="flex-1 overflow-auto max-h-165 p-2">
      <div className="flex flex-col justify-center px-20">
        <div className="flex items-center gap-2 mb-10 sticky -top-2 z-999 bg-[#fff8f0]">
          {user?.role === "GV" && (
            <>
              <Button
                onClick={() =>
                  setOpenFormAction((prev) => (prev ? "" : "create"))
                }
                title={openFormAction ? "Return" : "Quiz"}
                icon={openFormAction ? <ChevronLeft /> : <Plus />}
                variant={openFormAction ? "transparent" : "primary"}
              />

              {!openFormAction && (
                <Button
                  onClick={() => setOpenFormAction("import")}
                  title="Import"
                  variant="outline"
                  icon={<Import />}
                />
              )}
            </>
          )}
        </div>

        {openFormAction === "create" && (
          <QuizAction title="Create Quiz" typeAction="create" handleGetQuiz={getQuiz} />
        )}

        {openFormAction === "import" && (
          <QuizAction title="Import Quiz" typeAction="import" handleGetQuiz={getQuiz} />
        )}

        {openFormAction === "update" && (
          <QuizAction
            title="Update Quiz"
            typeAction="update"
            MaTN={selectedMaTN}
            handleGetQuiz={getQuiz}
          />
        )}

        {!openFormAction && (
          <div className="grid grid-cols-3 gap-3">
            {/* list quiz */}
            {dataQuiz?.map((q: any) => (
              <div
                key={q.MaTN}
                className="w-full h-55 p-5 bg-black/5 rounded-xl relative"
              >
                <h2 className="text-lg font-semibold">{q.TieuDe}</h2>
                <p
                  className="h-5 overflow-ellipsis"
                  dangerouslySetInnerHTML={{ __html: q.MoTa }}
                ></p>
                <div className="absolute left-5 bottom-3 flex gap-3 items-center">
                  {q.isRandom ? (
                    <div className="flex items-center gap-1">
                      <Shuffle size={18} />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex items-center gap-1">
                    <Clock size={18} />
                    {q.ThoiGianLam}
                    {"'"}
                  </div>

                  {!q.SoLanChoPhep && (
                    <div className="flex items-center gap-1">
                      <Repeat size={18} />
                      {q.SoLanChoPhep}
                    </div>
                  )}
                </div>
                <div className="flex items-center absolute top-4 right-3">
                  {user?.role === "GV" && (
                    <div className="">
                      <DropdownMenu
                        size="sm"
                        side="bottom"
                        align="start"
                        trigger={
                          <Button
                            variant="transparent"
                            icon={<Ellipsis size={18} />}
                          />
                        }
                        items={getItemActionQuiz(q.MaTN, q.TrangThai)}
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-2 items-center mt-5">
                  {user?.role === "SV" && q.TrangThai === "Mo" && (
                    <Button
                      variant="dark"
                      title={
                        (new Date(q.NgayBatDau) <= new Date() &&
                          new Date(q.HanNop) >= new Date()) ||
                        !q.HanNop
                          ? "Play"
                          : "Close"
                      }
                      icon={<Play size={18} />}
                      className="p-2 bg-black/90 cursor-pointer hover:bg-black/80 text-white rounded-md flex items-center gap-2"
                      onClick={() => navigator(`${q.MaTN}/play`)}
                      disabled={
                        (q.TrangThaiNopBai === "Đã nộp" &&
                          q.SoLanChoPhep > 0) ||
                        (new Date(q.HanNop) < new Date() && q.HanNop)
                          ? true
                          : false
                      }
                    ></Button>
                  )}
                  {user?.role === "SV" && q.TrangThaiNopBai !== "Chưa nộp" && (
                    <Button
                      variant="outline"
                      title="View"
                      onClick={() =>
                        navigator(`${q.MaTN}/submissions/${q.MaBaiLam}`)
                      }
                    />
                  )}
                  {user?.role === "GV" && (
                    <Button
                      title="Xem danh sách nộp bài"
                      className="p-2 cursor-pointer backdrop-blur-md rounded-md flex items-center gap-2 bg-yellow-brand"
                      onClick={() => navigator(`${q.MaTN}/submissions`)}
                    />
                  )}
                </div>
                <div
                  className={`w-20 text-center absolute bottom-3 right-5 ${
                    q.TrangThaiNopBai != "Chưa nộp"
                      ? "bg-green-100 ring ring-green-400 text-green-600 text-sm px-2 rounded-md"
                      : "bg-rose-100 ring ring-rose-400 text-rose-600 text-sm px-2 rounded-md"
                  }`}
                >
                  {user?.role === "GV" && (
                    <p>
                      {(new Date(q.NgayBatDau) <= new Date() &&
                        new Date(q.HanNop) >= new Date()) ||
                      !q.HanNop
                        ? "Openning"
                        : "Close"}
                    </p>
                  )}
                  {user?.role === "SV" && (
                    <p>
                      {q.TrangThaiNopBai === "Đã nộp" ? "Submited" : "Unsubmit"}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {dataQuiz.length === 0 && (
              <span className="text-center italic col-span-3">
                ️🎉 Congratulations, you have not taken any tests yet.️
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;

const quizReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_DATA":
      return [...action.question];
    case "ADD_QUESTION":
      return [
        ...state,
        {
          MaCauHoi: uuidv4(),
          NoiDung: "",
          CorrectIndex: null,
          Diem: 1,
          DapAn: [
            { MaDapAn: uuidv4(), NoiDung: "", LaDapAnDung: false },
            { MaDapAn: uuidv4(), NoiDung: "", LaDapAnDung: false },
          ],
        },
      ];

    case "UPDATE_QUESTION":
      return state.map((q: any) =>
        q.MaCauHoi === action.qid ? { ...q, [action.field]: action.value } : q
      );

    case "ADD_ANSWER":
      return state.map((q: any) =>
        q.MaCauHoi === action.qid
          ? {
              ...q,
              DapAn: [
                ...q.DapAn,
                { MaDapAn: uuidv4(), NoiDung: "", LaDapAnDung: false },
              ],
            }
          : q
      );

    case "UPDATE_ANSWER":
      return state.map((q: any) =>
        q.MaCauHoi === action.qid
          ? {
              ...q,
              DapAn: q.DapAn.map((a: any) =>
                a.MaDapAn === action.aid
                  ? { ...a, [action.field]: action.value }
                  : a
              ),
            }
          : q
      );

    case "SET_CORRECT_INDEX":
      return state.map((q: any) =>
        q.MaCauHoi === action.qid
          ? {
              ...q,
              CorrectIndex: action.index,
              DapAn: q.DapAn.map((a: any, i: number) => ({
                ...a,
                LaDapAnDung: i === action.index,
              })),
            }
          : q
      );

    default:
      return state;
  }
};

type props = {
  title: string
  handleGetQuiz: () => void;
  MaTN?: string;
  typeAction: string;
};

function QuizAction({ handleGetQuiz, typeAction, MaTN, title }: props) {
  const { id } = useParams();
  const [dataQuiz, setDataQuiz] = useState<QuizType>();
  const [tieuDe, setTieuDe] = useState("");
  const [moTa, setMoTa] = useState("");
  const [thoiGian, setThoiGian] = useState<number>();
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [type, setType] = useState<string>("");
  const [questions, dispatch] = useReducer(quizReducer, []);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const dropRef = useRef<any>(null);

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

  const getQuiz = async () => {
    try {
      const res = await API.get(`/quiz/getQuestionById/${MaTN}`);
      console.log(res.data.result.data);
      setDataQuiz(res.data.result.data);
      setTieuDe(res.data.result.data.TieuDe);
      setMoTa(res.data.result.data.MoTa);
      setThoiGian(res.data.result.data.ThoiGianLam);
      setStartDate(res.data.result.data.NgayBatDau);
      setEndDate(res.data.result.data.HanNop);
      setType(res.data.result.data.LoaiTracNghiem);
      dispatch({
        type: "SET_DATA",
        question: res.data.result.data.CauHoi,
      });
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  const handleSubmit = async () => {
    const body = {
      MaLop: id,
      MaTN: MaTN ?? "",
      TieuDe: tieuDe,
      MoTa: moTa,
      LoaiTracNghiem: type,
      ThoiGianLam: thoiGian,
      HanNop: startDate,
      NgayBatDau: endDate,
      TongDiem: 10,
      CauHoi: questions.map((q: any) => ({
        MaCauHoi: q.MaCauHoi ?? "",
        NoiDung: q.NoiDung,
        Diem: q.Diem,
        DapAn: q.DapAn.map((a: any) => ({
          MaDapAn: a.MaDapAn ?? "",
          NoiDung: a.NoiDung,
          LaDapAnDung: a.LaDapAnDung,
        })),
      })),
    };

    console.log(body);

    try {
      if (typeAction === "create") {
        await API.post("/quiz/createQuiz", body);
        toast.success("Tạo quiz thành công!");
      } else if (typeAction === "update") {
        await API.put("quiz/update", body);
        toast.success("Cập nhật quiz thành công!");
      } else {
        const formData = new FormData();
        formData.append("MaLop", id!);
        formData.append("TieuDe", tieuDe);
        formData.append("MoTa", moTa);
        formData.append("LoaiTracNghiem", type);
        formData.append("ThoiGianLam", String(thoiGian));
        formData.append("HanNop", String(startDate));
        formData.append("NgayBatDau", String(endDate));
        formData.append("TongDiem", String(10));
        formData.append("file", file!);

        try {
          await API.post("/quiz/import", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Thêm bài trắc nghiệm thành công");
        } catch (err: any) {
          console.log(err?.response?.message?.data);
        }
      }

      handleGetQuiz();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Lỗi tạo quiz");
    }
  };

  useEffect(() => {
    if (typeAction === "update") {
      getQuiz();
    } else {
      dispatch({
        type: "SET_DATA",
        question: [
          {
            MaCauHoi: uuidv4(),
            NoiDung: "",
            CorrectIndex: null,
            Diem: 1,
            DapAn: [
              { MaDapAn: uuidv4(), NoiDung: "", LaDapAnDung: false },
              { MaDapAn: uuidv4(), NoiDung: "", LaDapAnDung: false },
            ],
          },
        ],
      });
    }
  }, []);

  return (
    <div className="px-5 pb-10 flex flex-col gap-3">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center rounded-md overflow-hidden ring ring-gray-300">
        <label className="w-[13%] p-2 bg-black/5 text-center">Title</label>
        <Input
          placeholder="Test 1"
          value={tieuDe}
          onChange={(e) => setTieuDe(e.target.value)}
          variant="primary"
        />
      </div>
      <ReactQuill value={moTa} onChange={setMoTa} />
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center rounded-md overflow-hidden ring ring-gray-300">
          <label className="w-[30%] p-2 bg-black/5 text-center">Time</label>
          <Input
            type="number"
            placeholder="15"
            value={thoiGian}
            onChange={(e) => setThoiGian(Number(e.target.value))}
            variant="primary"
          />
        </div>
        <select
          onChange={(e) => setType(String(e.target.value))}
          className="p-2 h-10 ring ring-gray-300 rounded-md"
          value={type}
        >
          <option value="" disabled selected>
            Type quiz
          </option>
          <option value="test">Test</option>
          <option value="review">Review</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center rounded-md overflow-hidden ring ring-gray-300">
          <label className="w-[30%] p-2 bg-black/5 text-center">
            Start date
          </label>
          <Input
            value={startDate}
            type="datetime-local"
            variant="primary"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex items-center rounded-md overflow-hidden ring ring-gray-300">
          <label className="w-[30%] p-2 bg-black/5 text-center">End date</label>
          <Input
            value={endDate}
            type="datetime-local"
            variant="primary"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {typeAction === "import" && (
          <>
            <div
              onClick={handleClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-1 h-full col-span-2 flex items-center justify-center border-dashed rounded-xl p-10 cursor-pointer transition-colors ${
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
              accept=".xls,.xlsx"
              hidden
              ref={dropRef}
              onChange={handleFileChange}
            />
          </>
        )}
      </div>

      {typeAction !== "import" &&
        questions.length > 0 &&
        questions.map((q: any, qi: number) => (
          <div key={q.MaCauHoi} className="p-4 shadow-sm rounded-xl mb-4">
            <label className="font-semibold">Question {qi + 1}:</label>
            <ReactQuill
              value={q.NoiDung}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_QUESTION",
                  qid: q.MaCauHoi,
                  field: "NoiDung",
                  value: e,
                })
              }
              className="my-2"
            />

            <h4 className="font-medium mt-2 mb-2">Answer:</h4>
            {q.DapAn.map((a: any, i: number) => (
              <div key={a.MaDapAn} className="flex items-center gap-2 mb-2">
                <CheckboxDemo
                  checked={a.LaDapAnDung}
                  onCheckedChange={(e) =>
                    dispatch({
                      type: "SET_CORRECT_INDEX",
                      qid: q.MaCauHoi,
                      index: e ? i : null,
                    })
                  }
                />
                <Input
                  placeholder={`Answer ${i + 1}`}
                  value={a.NoiDung}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_ANSWER",
                      qid: q.MaCauHoi,
                      aid: a.MaDapAn,
                      field: "NoiDung",
                      value: e.target.value,
                    })
                  }
                  className="flex-1"
                />
              </div>
            ))}

            <Button
              title="Add answer"
              icon={<Plus size={18} />}
              type="button"
              onClick={() => dispatch({ type: "ADD_ANSWER", qid: q.MaCauHoi })}
              className="mt-3 bg-yellow-brand text-white hover:bg-yellow-brand/80"
            ></Button>
          </div>
        ))}

      <div className="flex gap-3 mt-5">
        {typeAction !== "import" && (
          <Button
            title="Add question"
            icon={<Plus size={18} />}
            onClick={() => dispatch({ type: "ADD_QUESTION" })}
            variant="outline"
          ></Button>
        )}
        <Button
          title="Save"
          onClick={handleSubmit}
          variant="primary"
        ></Button>
      </div>
    </div>
  );
}
