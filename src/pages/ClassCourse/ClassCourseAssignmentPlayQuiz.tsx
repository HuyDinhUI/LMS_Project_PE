import QuizPlayer from "@/components/ui/quiz-player";
import type { QuizType } from "@/types/QuizType";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PlayQuiz = () => {
  const [dataQuestion, setDataQuestion] = useState<QuizType>();
  const { malop, matn } = useParams();
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
      {dataQuestion && <QuizPlayer
        quiz={dataQuestion}
        userId={"SV001"}
        submitUrl={"http://localhost:4180/quiz/submit"} // optional
        onSubmit={(r) => console.log("submit callback", r)}
        
      />}
      
    </div>
  );
};

export default PlayQuiz;
