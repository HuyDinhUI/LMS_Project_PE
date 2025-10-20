import { useEffect, useReducer, useState } from "react";
import API from "@/utils/axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { QuizType } from "@/types/QuizType";
import {
  ChevronLeft,
  Clock,
  Ellipsis,
  ListStart,
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

const Quiz = () => {
  const { id } = useParams();
  const MaSV = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const [dataQuiz, setDataQuiz] = useState<QuizType[]>();
  const [openFormCreate, setOpenFormCreate] = useState<boolean>(false);
  const navigator = useNavigate()

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
      const res = await API.get(`/quiz/getQuizByStudent/${MaSV}/${id}`);
      console.log(res.data.result.data);
      setDataQuiz(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleDeleteQuiz = async (MaTN: string) => {};

  const getItemActionQuiz = (MaTN: string, status: string) => {
    return [
      { label: "Sửa", icon: <Pen size={16} /> },
      {
        label: "Xoá",
        icon: <Trash size={16} />,
        dialog: AlertDialogDelete,
        onClick: () => handleDeleteQuiz(MaTN),
      },
      {
        label: `${status === "Mo" ? "Đóng" : "Mở"}`,
        icon: status === "Mo" ? <Lock size={16} /> : <LockOpen size={16} />,
      },
    ];
  };

  useEffect(() => {
    if (role === "SV") {
      getQuizByStudent();
    } else {
      getQuiz();
    }
  }, []);
  return (
    <div className="flex-1 overflow-auto max-h-150 p-2">
      <div className="flex flex-col justify-center px-20">
        <div className="flex items-center justify-end gap-2 mb-10">
          {role === "GV" && (
            <Button
              onClick={() => setOpenFormCreate(!openFormCreate)}
              title={openFormCreate ? "Quay lại" : "Quiz"}
              icon={openFormCreate ? <ChevronLeft /> : <Plus />}
              variant={openFormCreate ? "default" : "primary"}
            />
          )}
        </div>

        {openFormCreate && (
          <div className="h-140 overflow-auto">
            <QuizCreate handleGetQuiz={getQuiz} />
          </div>
        )}

        {!openFormCreate && (
          <div className="grid grid-cols-3 gap-3">
            {/* list quiz */}
            {dataQuiz?.map((q) => (
              <div
                key={q.MaTN}
                className="w-full h-55 p-5 ring ring-gray-200 rounded-md relative"
              >
                <h2 className="text-lg font-semibold">{q.TieuDe}</h2>
                <p className="h-5 overflow-ellipsis">{q.MoTa}</p>
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
                  {role === "GV" && (
                    <div className="">
                      <DropdownMenu
                        size="sm"
                        side="bottom"
                        align="end"
                        trigger={
                          <Button
                            variant="icon"
                            icon={<Ellipsis size={18} />}
                          />
                        }
                        items={getItemActionQuiz(q.MaTN, q.TrangThai)}
                      />
                    </div>
                  )}
                </div>
                {role === "SV" && q.TrangThai === "Mo" && (
                  <Button
                    variant="dark"
                    title={q.TrangThai === 'Mo' ? 'Làm bài' : 'Chưa mở'}
                    icon={<Play size={18} />}
                    className="p-2 bg-black/90 cursor-pointer hover:bg-black/80 text-white rounded-md flex items-center gap-2 mt-5"
                    onClick={() => navigator(`/classcourse/${id}/quiz/${q.MaTN}/play`)}
                    disabled = {q.TrangThaiNopBai && q.SoLanChoPhep > 0 ? true : false}
                  >
                    
                  </Button>
                )}
                {role === "GV" && (
                  <Button variant="outline"
                  title="Xem danh sách nộp bài"
                  className="p-2 cursor-pointer rounded-md flex items-center gap-2 mt-5"
                  />
                  
                )}
                <div
                  className={`w-20 text-center absolute bottom-3 right-5 ${
                    q.TrangThai === "Mo" && q.TrangThaiNopBai != "Chưa nộp"
                      ? "bg-green-100 ring ring-green-400 text-green-600 text-sm px-2 rounded-md"
                      : "bg-rose-100 ring ring-rose-400 text-rose-600 text-sm px-2 rounded-md"
                  }`}
                >
                  {role === "GV" && <p>{q.TrangThai === "Mo" ? "Đang mở" : "Chưa mở"}</p>}
                  {role === "SV" && <p>{q.TrangThaiNopBai}</p>}
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;

const quizReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_QUESTION":
      return [
        ...state,
        {
          id: uuidv4(),
          NoiDung: "",
          CorrectIndex: null,
          Diem: 1,
          DapAn: [
            { id: uuidv4(), NoiDung: "", LaDapAnDung: false },
            { id: uuidv4(), NoiDung: "", LaDapAnDung: false },
          ],
        },
      ];

    case "UPDATE_QUESTION":
      return state.map((q: any) =>
        q.id === action.qid ? { ...q, [action.field]: action.value } : q
      );

    case "ADD_ANSWER":
      return state.map((q: any) =>
        q.id === action.qid
          ? {
              ...q,
              DapAn: [
                ...q.DapAn,
                { id: uuidv4(), NoiDung: "", LaDapAnDung: false },
              ],
            }
          : q
      );

    case "UPDATE_ANSWER":
      return state.map((q: any) =>
        q.id === action.qid
          ? {
              ...q,
              DapAn: q.DapAn.map((a: any) =>
                a.id === action.aid ? { ...a, [action.field]: action.value } : a
              ),
            }
          : q
      );

    case "SET_CORRECT_INDEX":
      return state.map((q: any) =>
        q.id === action.qid
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
  handleGetQuiz: () => void;
};

function QuizCreate({ handleGetQuiz }: props) {
  const { id } = useParams();
  const [tieuDe, setTieuDe] = useState("");
  const [moTa, setMoTa] = useState("");
  const [thoiGian, setThoiGian] = useState<number>();
  const [type,setType] = useState<string>()
  const [questions, dispatch] = useReducer(quizReducer, [
    {
      id: uuidv4(),
      NoiDung: "",
      CorrectIndex: null,
      Diem: 1,
      DapAn: [
        { id: uuidv4(), NoiDung: "", LaDapAnDung: false },
        { id: uuidv4(), NoiDung: "", LaDapAnDung: false },
      ],
    },
  ]);

  const handleSubmit = async () => {
    const body = {
      MaLop: id,
      TieuDe: tieuDe,
      MoTa: moTa,
      ThoiGianLam: thoiGian,
      TongDiem: 10,
      CauHoi: questions.map((q: any) => ({
        NoiDung: q.NoiDung,
        Diem: q.Diem,
        DapAn: q.DapAn.map((a: any) => ({
          NoiDung: a.NoiDung,
          LaDapAnDung: a.LaDapAnDung,
        })),
      })),
    };

    console.log(body);

    try {
      await API.post("/quiz/createQuiz", body);
      toast.success("Tạo quiz thành công!");
      handleGetQuiz();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Lỗi tạo quiz");
    }
  };

  return (
    <div className="px-30">
      <h1 className="text-2xl font-semibold mb-4">Tạo Quiz mới</h1>

      <Input
        placeholder="Tiêu đề quiz"
        value={tieuDe}
        onChange={(e) => setTieuDe(e.target.value)}
        className="mb-3"
      />
      <textarea
        placeholder="Mô tả"
        value={moTa}
        onChange={(e) => setMoTa(e.target.value)}
        className="w-full border rounded-md p-2 mb-3"
      />
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="number"
          placeholder="Thời gian (phút)"
          value={thoiGian}
          onChange={(e) => setThoiGian(Number(e.target.value))}
          className="mb-5"
        />
        <select onChange={(e) => setType(String(e.target.value))} className="p-2 h-10 ring ring-gray-200 rounded-md">
          <option value="" disabled selected>Loại trắc nghiệm</option>
          <option value="test">Bài kiểm tra</option>
          <option value="review">Ôn tập</option>
        </select>
      </div>

      {questions.map((q: any, qi: number) => (
        <div key={q.id} className="p-4 border rounded-lg mb-4">
          <label className="font-semibold">Câu {qi + 1}:</label>
          <Input
            placeholder="Nội dung câu hỏi"
            value={q.NoiDung}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_QUESTION",
                qid: q.id,
                field: "NoiDung",
                value: e.target.value,
              })
            }
            className="my-2"
          />
          <Input
            type="number"
            placeholder="Điểm"
            value={q.Diem}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_QUESTION",
                qid: q.id,
                field: "Diem",
                value: Number(e.target.value),
              })
            }
            className="mb-3"
          />

          <h4 className="font-medium mt-2 mb-2">Đáp án:</h4>
          {q.DapAn.map((a: any, i: number) => (
            <div key={a.id} className="flex items-center gap-2 mb-2">
              <CheckboxDemo
                checked={i === q.CorrectIndex}
                onCheckedChange={(e) =>
                  dispatch({
                    type: "SET_CORRECT_INDEX",
                    qid: q.id,
                    index: e ? i : null,
                  })
                }
              />
              <Input
                placeholder={`Đáp án ${i + 1}`}
                value={a.NoiDung}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_ANSWER",
                    qid: q.id,
                    aid: a.id,
                    field: "NoiDung",
                    value: e.target.value,
                  })
                }
                className="flex-1"
              />
            </div>
          ))}

          <Button
            title="Thêm đáp án"
            icon={<Plus size={18} />}
            type="button"
            variant="dark"
            onClick={() => dispatch({ type: "ADD_ANSWER", qid: q.id })}
            className="mt-3"
          ></Button>
        </div>
      ))}

      <div className="flex gap-3 mt-5">
        <Button
          title="Thêm câu hỏi"
          icon={<Plus size={18} />}
          onClick={() => dispatch({ type: "ADD_QUESTION" })}
        ></Button>
        <Button
          title="Tạo quiz"
          icon={<Plus size={18} />}
          onClick={handleSubmit}
          variant="primary"
        ></Button>
      </div>
    </div>
  );
}
