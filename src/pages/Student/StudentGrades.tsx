import type { GradesType } from "@/types/Grades";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const headerTableGrades = [
  "STT",
  "Mã học phần",
  "Tên học phần",
  "Số tín chỉ",
  "Chuyên cần",
  "Quá trình",
  "Điểm thi",
  "Điểm tổng",
  "Điểm thang 4",
  "Điểm chữ",
  "Xếp loại",
  "Trạng thái"
];

const StudentGrades = () => {
  const [dataGrades, setDataGrades] = useState<GradesType[]>([]);

  useEffect(() => {
    const getGrades = async () => {
      try {
        const res = await API.get(
          "/grades/getGradesByStudent/" + localStorage.getItem("username")
        );
        console.log(res.data);
        setDataGrades(res.data.result.data);
      } catch (err: any) {
        toast.error(err?.response?.data?.message);
      }
    };
    getGrades();
  }, []);
  return (
    <div className="py-5 px-10 w-full h-full bg-white dark:bg-card rounded-md overflow-auto">
      <div className="w-full px-2">
        <h1 className="text-2xl uppercase text-amber-400 text-center font-bold">
          Bảng điểm
        </h1>
      </div>
      <div className="w-full p-2">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="text-left border-b bg-gray-100">
              {headerTableGrades.map((h) => (
                <th className="p-2 border border-gray-300">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataGrades?.map((g: GradesType, i) => (
              <tr key={i}>
                <td className="p-3 border border-gray-300">{i+1}</td>
                <td className="p-3 border border-gray-300">{g.MaHP}</td>
                <td className="p-3 border border-gray-300">{g.ten_hocphan}</td>
                <td className="p-3 border border-gray-300">{g.so_tinchi}</td>
                <td className="p-3 border border-gray-300">{g.diem_chuyencan}</td>
                <td className="p-3 border border-gray-300">{g.diem_quatrinh}</td>
                <td className="p-3 border border-gray-300">{g.diem_thi}</td>
                <td className="p-3 border border-gray-300">{g.diem_tong}</td>
                <td className="p-3 border border-gray-300">{g.diem_thang_4}</td>
                <td className="p-3 border border-gray-300">{g.diem_chu}</td>
                <td className="p-3 border border-gray-300">{g.XepLoai}</td>
                <td className="p-3 border border-gray-300">{g.TrangThai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentGrades;
