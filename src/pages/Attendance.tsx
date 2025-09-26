import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

type Props = {
  courseId: string;
  studentId: string;
  sessionNo: number;
};

export default function FaceAttendance({ courseId, studentId, sessionNo }: Props) {
  const webcamRef = useRef(undefined as unknown as Webcam);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const captureAndCheckIn = async () => {
    setLoading(true);
    setStatus("Đang xử lý...");

    try {
      // Chụp ảnh từ webcam
      const imageSrc = webcamRef.current.getScreenshot();

      // Gửi API check-in
      const res = await axios.post("http://localhost:5000/api/attendance/checkin", {
        courseId,
        studentId,
        sessionNo,
        faceImage: imageSrc, // gửi base64
      });

      if (res.data.success) {
        setStatus("✅ Điểm danh thành công!");
      } else {
        setStatus("❌ Không nhận diện được khuôn mặt!");
      }
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Lỗi khi điểm danh!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 text-center flex flex-col items-center">
      <h2 className="text-xl font-bold">Điểm danh bằng FaceID</h2>

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-lg border"
        width={400}
        height={300}
      />

      <button
        onClick={captureAndCheckIn}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Đang kiểm tra..." : "Điểm danh"}
      </button>

      <p className="text-gray-700 mt-2">{status}</p>
    </div>
  );
}
