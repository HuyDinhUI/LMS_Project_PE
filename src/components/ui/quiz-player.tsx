import type { QuizType } from "@/types/QuizType";
import API from "@/utils/axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import CheckboxDemo from "./checkbox";
import AlertDialogDemo from "./alert-dialog";

/**
 * Props types
 */

type QuizPlayerProps = {
  quiz: QuizType;
  userId?: string; // optional, for submit
  autoShuffle?: boolean; // shuffle questions & answers at start
  onSubmit?: (result: { score: number; total: number; details: any }) => void; // callback after submit
  submitUrl?: string; // if provided, component will POST results to this url
};

/**
 * Utils
 */
function shuffleArray<T>(arr: T[]): T[] {
  // Fisher-Yates shuffle (non-deterministic)
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTimeLeft(totalSeconds: number) {
  const mm = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mm}:${ss}`;
}

/**
 * Main component
 */
export default function QuizPlayer({
  quiz,
  userId,
  autoShuffle = false,
  submitUrl,
}: QuizPlayerProps) {
  // shuffle at mount once
  const initialData = useMemo(() => {
    // deep copy
    const questionsCopy = quiz.CauHoi.map((q) => ({
      ...q,
      DapAn: q.DapAn.map((a) => ({ ...a })),
    }));

    if (autoShuffle) {
      // shuffle answers inside each question, preserve mapping by index
      const qsh = shuffleArray(questionsCopy);
      const withShuffledAnswers = qsh.map((q) => ({
        ...q,
        DapAn: shuffleArray(q.DapAn),
      }));
      return withShuffledAnswers;
    }

    return questionsCopy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz.MaTN]); // re-run if quiz changes

  const questions = initialData;
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<(string | null)[]>(() =>
    Array(initialData.length).fill(null)
  ); // index of answer chosen per question
  const totalTimeSeconds = (quiz.ThoiGianLam ?? 15) * 60;
  const [timeLeft, setTimeLeft] = useState<number>(totalTimeSeconds);
  const timerRef = useRef<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; total: 10 } | null>(
    null
  );

  // Start countdown
  useEffect(() => {
    if (submitted) return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timerRef.current!);
          autoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  // Auto-submit handler
  async function autoSubmit() {
    if (submitted) return;
    await handleSubmit(true);
  }

  // choose answer (single choice)
  const chooseAnswer = (qIndex: number, ansId: string) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = prev.slice();
      next[qIndex] = next[qIndex] === ansId ? null : ansId; // toggle
      return next;
    });
  };

  // navigation helpers
  const goNext = () => setCurrent((c) => Math.min(c + 1, questions.length - 1));
  const goPrev = () => setCurrent((c) => Math.max(c - 1, 0));
  const jumpTo = (i: number) => setCurrent(i);

  // progress
  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  // Submit handler
  const handleSubmit = async (auto = false) => {
    if (submitted) return;
    setSubmitting(true);

    // prepare payload: send choices as index relative to questions' current DapAn order
    const payload = {
      MaTN: quiz.MaTN,
      MaSV: userId ?? null,
      ThoiGianThucTe: totalTimeSeconds - timeLeft, // seconds used
      Answers: questions.map((q, i) => ({
        MaCauHoi: q.MaCauHoi ?? i,
        SelectedMaDapAn: answers[i], // may be null
      })),
    };

    try {
      console.log(payload);

      if (submitUrl) {
        const res = await API.post(submitUrl, payload);
        toast.success("Nộp bài thành công");
        setResult({ score: Number(res.data.result.data.TongDiem), total: 10 });
      }

      // compute local score if possible
      // const local = computeScore();
      // setResult(local);
      setSubmitted(true);
      if (timerRef.current) window.clearInterval(timerRef.current);
      // if (onSubmit)
      //   onSubmit({ score: local.score, total: local.total, details: payload });
    } catch (err: any) {
      if (!auto) toast.error(err?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  // UI render
  return (
    <div className="quiz-player max-w-3xl mx-auto p-4">
      <header className="mb-4">
        <h2 className="text-xl font-semibold">{quiz.TieuDe}</h2>
        {quiz.MoTa && <p className="text-sm text-gray-600">{quiz.MoTa}</p>}
      </header>

      <div className="flex items-center justify-between mb-3 gap-4">
        <div className="w-full">
          <div className="h-2 bg-gray-200/50 rounded overflow-hidden">
            <div
              className="h-2 bg-green-brand"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-sm mt-1">
            <strong>{answeredCount}</strong> / {questions.length} Answered
          </div>
        </div>

        <div className="text-right min-w-[120px]">
          <div className="text-sm">Reamining time</div>
          <div className="font-mono text-lg">{formatTimeLeft(timeLeft)}</div>
        </div>
      </div>

      {/* Question pager */}
      <div className="bg-black/3 rounded p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="text-sm text-gray-500">
              Question {current + 1} / {questions.length}
            </div>
            <div className="font-medium mt-1">
              {questions[current]?.NoiDung}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {questions[current]?.Diem ?? 1} Point
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {questions[current]?.DapAn?.map((ans, ai) => {
            const chosen = answers[current] === ans.MaDapAn;
            return (
              <label
                key={ai}
                className={`flex items-center gap-2 p-3 rounded cursor-pointer hover:shadow ${
                  chosen ? "bg-green-brand/50 text-white" : "bg-black/3"
                }`}
              >
                <CheckboxDemo
                  checked={chosen}
                  onCheckedChange={() => chooseAnswer(current, ans.MaDapAn)}
                />
                <span>{ans.NoiDung}</span>
              </label>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <button
              onClick={goPrev}
              disabled={current === 0}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={goNext}
              disabled={current === questions.length - 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
            <button
              onClick={() => {
                // jump to unanswered
                const nextUnanswered = answers.findIndex((a) => a === null);
                if (nextUnanswered >= 0) setCurrent(nextUnanswered);
              }}
              className="px-3 py-1 border rounded"
            >
              Unanswer
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600 mr-2">
              Question:{" "}
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => jumpTo(i)}
                  className={`inline-block w-8 h-8 mr-1 rounded ${
                    answers[i] != null
                      ? "bg-green-brand text-white"
                      : "bg-green-brand/50"
                  }`}
                  aria-label={`Question ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <AlertDialogDemo
              label="Do you want submit?"
              description="Note: This action cannot be undone."
              onclick={() => handleSubmit(false)}
              trigger={
                <button
                  disabled={submitting || submitted}
                  className="px-4 py-2 bg-green-dark-brand text-white rounded disabled:opacity-60"
                >
                  {submitting
                    ? "Đang nộp..."
                    : submitted
                    ? "Submited"
                    : "Submit"}
                </button>
              }
            />
          </div>
        </div>
      </div>

      {/* Result */}
      {submitted && result && (
        <div className="p-4 border rounded bg-yellow-brand text-white">
          <h3 className="font-semibold">Kết quả (tạm tính)</h3>
          <p>
            Điểm: <strong>{result.score}</strong> / {result.total}
          </p>
        </div>
      )}
    </div>
  );
}
