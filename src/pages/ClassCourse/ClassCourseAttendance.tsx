import { Button } from "@/components/ui/button";
import CheckboxDemo from "@/components/ui/checkbox";
import { SearchForm } from "@/components/ui/search-form";
import { useAuth } from "@/hooks/useAuth";
import API from "@/utils/axios";
import { FolderOutput, PrinterCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

const ClassCourseAttendance = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [attendanceData, setAttendanceData] = useState<any[]>([]);

  const getAttendanceData = async () => {
    try {
      const res = await API.get(`/attendance/get/${id}`);
      setAttendanceData(res.data.result.data);
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  const getAttendanceDataForStudent = async () => {
    try {
      const res = await API.get(`/attendance/student/get/${id}`);
      setAttendanceData(res.data.result.data);
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  const Recordhandle = async (
    MaSV: string,
    MaLop: string,
    status: boolean,
    ngay_day: string
  ) => {
    try {
      await API.post(`/attendance/record`, {
        MaSV,
        MaLop,
        status,
        ngay_day,
      });
      getAttendanceData();
    } catch (err: any) {
      toast.warning(err?.response?.data?.message, { theme: "light" });
    }
  };

  const columnsAttendance = Object.keys(attendanceData[0] ?? []).filter(
    (key) => key !== "MaSV" && key !== "hoten"
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(attendanceData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grades");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "attendance.xlsx");
  };

  useEffect(() => {
    if (user?.role === "GV") getAttendanceData();
    if (user?.role === "SV") getAttendanceDataForStudent();
  }, []);

  const handleSearch = (value: string) => {
    console.log("Search:", value);
  };
  return (
    <div className="flex-1 overflow-auto max-h-170 px-20">
      <div className="flex items-center gap-2 mt-2">
        <div className="flex-1 flex gap-2 items-center">
          <SearchForm handleSearch={handleSearch} />
        </div>
        <div>
          <Button
            variant="primary"
            title={user?.role === "GV" ? "Export" : "Print"}
            className="rounded-md"
            icon={user?.role === "GV" ? <FolderOutput /> : <PrinterCheck />}
            onClick={() => exportToExcel()}
          />
        </div>
      </div>
      {user?.role === "GV" && (
        <div className="mt-4 overflow-x-scroll">
          <table className="min-w-300 border border-gray-500 table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left border-l border-gray-500">
                  Full name
                </th>
                {columnsAttendance.map((col) => (
                  <th key={col} className="px-4 py-2 border-l border-gray-500">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index} className="border-t border-gray-500">
                  <td className="border border-gray-500 px-4 py-2">
                    {record.MaSV}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {record.hoten}
                  </td>
                  {columnsAttendance.map((col) => (
                    <td key={col} className="border border-gray-500 px-4 py-2">
                      <div className="flex justify-center">
                        <CheckboxDemo
                          checked={record[col] === 1 ? true : false}
                          onCheckedChange={(e) =>
                            Recordhandle(record.MaSV, id!, e as boolean, col)
                          }
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {user?.role === "SV" && (
        <div className="mt-4">
          <table className="min-w-full border border-gray-500 table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Session</th>
                <th className="px-4 py-2 text-left border-l border-gray-500">
                  Date
                </th>
                <th className="px-4 py-2 text-left border-l border-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index} className="border-t border-gray-500">
                  <td className="border border-gray-500 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {record.ngay_day}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    <span
                      className={`py-1 px-2 rounded-md text-sm ${
                        record.DaDiemDanh === "Present" &&
                        "bg-green-100 ring ring-green-400 text-green-600"
                      }
                          ${
                            record.DaDiemDanh === "Absent" &&
                            "bg-rose-200 ring ring-rose-400 text-rose-600"
                          }`}
                    >
                      {record.DaDiemDanh}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClassCourseAttendance;
