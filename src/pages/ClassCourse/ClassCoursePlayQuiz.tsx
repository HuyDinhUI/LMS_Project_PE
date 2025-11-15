import QuizPlayer from "@/components/ui/quiz-player";
import type { QuizType } from "@/types/QuizType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PlayQuiz = () => {
  const [dataQuestion, setDataQuestion] = useState<QuizType>();
  const { matn } = useParams();
  const MaSV = localStorage.getItem("username");
  const getQuestion = async () => {
    try {
      const res = await API.get(`/quiz/getQuestionById/${matn}`);
      console.log(res.data.result.data);
      setDataQuestion(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);
  return (
    <div>
      {dataQuestion && (
        <QuizPlayer
          quiz={dataQuestion}
          userId={MaSV ?? ""}
          submitUrl={"/quiz/submitQuiz"} // optional
          onSubmit={(r) => console.log("submit callback", r)}
          autoShuffle={dataQuestion.isRandom}
        />
      )}
    </div>
  );
};

export default PlayQuiz;
