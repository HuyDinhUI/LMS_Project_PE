import { Button } from "@/components/ui/button";
import { SearchForm } from "@/components/ui/search-form";
import API from "@/utils/axios";
import { FolderOutput, PrinterCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useAuth } from "@/hooks/useAuth";

const ClassCourseManagementGrades = () => {
  const { id } = useParams();
  const {user} = useAuth();
  const [dataGradesAssignment, setDataGradesAssignment] = useState<any[]>([]);
  const [dataGradesTest, setDataGradesTest] = useState<any[]>([]);

  const getGradesAssignment = async () => {
    try {
      const res = await API.get("assignments/getGrades/" + id);
      setDataGradesAssignment(res.data.result.data);
      console.log(res.data.result.data);
    } catch (error: any) {
      console.log(error?.response?.data?.message || "Lỗi khi lấy dữ liệu");
    }
  };

  const getGradesTest = async () => {
    try {
      const res = await API.get("quiz/getGrades/" + id);
      setDataGradesTest(res.data.result.data);
    } catch (err: any) {
      console.log(err?.response?.data?.message || "Lỗi khi lấy dữ liệu");
    }
  };

  const getGradesAssignmentForStudent = async () => {
    try {
      const res = await API.get(
        `/assignments/getAssignmentByStudent/${user?.username}/${id}`
      );
      setDataGradesAssignment(res.data.result.data);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };

  const getGradesTestForStudent = async () => {
    try {
      const res = await API.get(`/quiz/getQuizByStudent/${user?.username}/${id}`);
      setDataGradesTest(res.data.result.data);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
    }
  };

  // Lấy danh sách tiêu đề động (trừ MaSV và hoten)
  const columnsAssignment = Object.keys(dataGradesAssignment[0] ?? []).filter(
    (key) => key !== "MaSV" && key !== "hoten"
  );

  const columnsTest = Object.keys(dataGradesTest[0] ?? []).filter(
    (key) => key !== "MaSV" && key !== "hoten"
  );

  const handleSearch = (query: string) => {
    // Xử lý tìm kiếm ở đây
    console.log("Tìm kiếm:", query);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataGradesAssignment);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grades");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "grades.xlsx");
  };

  useEffect(() => {
    if (!user || !user.role) return;

    if (user?.role === "GV") {
      getGradesAssignment();
      getGradesTest();
    } else {
      getGradesAssignmentForStudent();
      getGradesTestForStudent();
    }
  }, [user]);

  return (
    <div className="flex-1 overflow-auto max-h-170 px-20">
      {/* header */}
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
      {/* table */}
      {user?.role === "GV" && (
        <div className="mt-4">
          <div className="overflow-x-scroll">
            <table className="min-w-300 border border-gray-500 table-auto">
              <thead className="text-left">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2 border-l border-gray-500">
                    Full name
                  </th>
                  {columnsAssignment.map((col) => (
                    <th className="px-4 py-2 border-l border-gray-500" key={col}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataGradesAssignment.map((row, index) => (
                  <tr key={index} className="border-t border-gray-500">
                    <td className="border border-gray-500 px-4 py-2">
                      {row.MaSV}
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {row.hoten}
                    </td>
                    {columnsAssignment.map((col) => (
                      <td key={col} className="border border-gray-500 px-4 py-2">
                        {row[col] !== null && row[col] !== undefined
                          ? row[col]
                          : "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-scroll">
            <table className="mt-5 min-w-300 border border-gray-500 table-auto">
              <thead className="text-left">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2 border-l border-gray-500">
                    Full name
                  </th>
                  {columnsTest.map((col) => (
                    <th className="px-4 py-2 border-l border-gray-500" key={col}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataGradesTest.map((row, index) => (
                  <tr key={index} className="border-t border-gray-500">
                    <td className="border border-gray-500 px-4 py-2">
                      {row.MaSV}
                    </td>
                    <td className="border border-gray-500 px-4 py-2">
                      {row.hoten}
                    </td>
                    {columnsTest.map((col) => (
                      <td key={col} className="border border-gray-500 px-4 py-2">
                        {row[col] !== null && row[col] !== undefined
                          ? row[col]
                          : "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {dataGradesTest?.length === 0 && <span className="italic text-center py-2 block">Data empty.</span>}
          </div>
        </div>
      )}
      {user?.role === "SV" && (
        <div className="mt-4">
          <table className="min-w-full border border-gray-500 table-auto">
            <thead className="text-left">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2 border-l border-gray-500">Dealine</th>
                <th className="px-4 py-2 border-l border-gray-500">Grade</th>
                <th className="px-4 py-2 border-l border-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {dataGradesAssignment.map((row, index) => (
                <tr key={index} className="border-t border-gray-500">
                  <td className="border border-gray-500 px-4 py-2">
                    {row.TieuDe}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {row.HanNop ? new Date(row.HanNop).toLocaleString("vi-VN") : "Unlimited"}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {row.DiemSo !== null ? row.DiemSo : "-"}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {row.TrangThai === "Đã nộp" ? "Submited" : "Unsubmit"}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-gray-500 font-semibold">
                <td className="border border-gray-500 px-4 py-2" colSpan={2}>
                  Average score
                </td>
                <td className="border border-gray-500 px-4 py-2" colSpan={2}>
                  {(dataGradesAssignment.reduce(
                    (acc, row) => acc + (row.DiemSo),
                    0
                  ) / dataGradesAssignment.filter(item => !item.DiemSo).length || 0).toFixed(1)}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="mt-5 min-w-full border border-gray-500 table-auto">
            <thead className="text-left">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2 border-l border-gray-500">Dealine</th>
                <th className="px-4 py-2 border-l border-gray-500">Grade</th>
                <th className="px-4 py-2 border-l border-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {dataGradesTest.map((row, index) => (
                <tr key={index} className="border-t border-gray-500">
                  <td className="border border-gray-500 px-4 py-2">
                    {row.TieuDe}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {row.HanNop ? new Date(row.HanNop).toLocaleString("vi-VN") : "Unlimited"}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {parseFloat(row.DiemSo) !== null
                      ? parseFloat(row.DiemSo)
                      : "-"}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {row.TrangThaiNopBai === "Đã nộp" ? "Submited" : "Unsubmit"}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-gray-500 font-semibold">
                <td className="border border-gray-500 px-4 py-2" colSpan={2}>
                  Average score
                </td>
                <td className="border border-gray-500 px-4 py-2" colSpan={2}>
                  {(dataGradesTest.reduce(
                    (acc, row) => acc + (parseFloat(row.DiemSo)),
                    0
                  ) / dataGradesTest.length).toFixed(1) || 0}
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <p className="mt-4 italic">
              * Note: The average score is calculated based on graded
              assignments.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassCourseManagementGrades;
