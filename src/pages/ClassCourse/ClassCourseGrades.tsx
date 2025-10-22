import { Button } from "@/components/ui/button";
import { FilterForm } from "@/components/ui/filter-form";
import { SearchForm } from "@/components/ui/search-form";
import API from "@/utils/axios";
import { FolderOutput, Printer, PrinterCheck } from "lucide-react";
import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ClassCourseManagementGrades = () => {
  const role = localStorage.getItem("role");
  const { id } = useParams();
  const MaSV = localStorage.getItem("username");
  const [dataGradesAssignment, setDataGradesAssignment] = useState<any[]>([]);
  const [dataGradesTest, setDataGradesTest] = useState<any[]>([]);

  const getGradesAssignment = async () => {
    try {
      const res = await API.get("assignments/getGrades/" + id);
      setDataGradesAssignment(res.data.result.data);
      console.log(res.data.result.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Lỗi khi lấy dữ liệu");
    }
  };

  const getGradesTest = async () => {
    try {
      const res = await API.get("quiz/getGrades/" + id);
      setDataGradesTest(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Lỗi khi lấy dữ liệu");
    }
  };

  const getGradesAssignmentForStudent = async () => {
    try {
      const res = await API.get(
        `/assignments/getAssignmentByStudent/${MaSV}/${id}`
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
      const res = await API.get(
        `/quiz/getQuizByStudent/${MaSV}/${id}`
      );
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

  const handleFilter = (filter: string) => {
    // Xử lý lọc ở đây
    console.log("Lọc theo:", filter);
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
    if (role === "GV") {
      getGradesAssignment();
      getGradesTest();
    } else {
      getGradesAssignmentForStudent();
      getGradesTestForStudent()
    }
  }, []);

  const data_mock = [
    {
      key: "gioitinh",
      select: [
        {
          name: "All",
          value: "",
        },
        {
          name: "Nam",
          value: "Nam",
        },
        {
          name: "Nữ",
          value: "nữ",
        },
      ],
    },
    {
      key: "order",
      select: [
        {
          name: "a-z",
          value: "asc",
        },
        {
          name: "z-a",
          value: "desc",
        },
      ],
    },
  ];
  return (
    <div className="flex-1 overflow-auto max-h-170 p-2">
      {/* header */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 items-center">
          <SearchForm handleSearch={handleSearch} />
          <FilterForm data={data_mock} handleFilter={handleFilter} />
        </div>
        <div>
          <Button
            variant="primary"
            title={role === "GV" ? "Xuất bảng điểm" : "In bảng điểm"}
            className="rounded-md"
            icon={role === "GV" ? <FolderOutput /> : <PrinterCheck />}
            onClick={() => exportToExcel()}
          />
        </div>
      </div>
      {/* table */}
      {role === "GV" && (
        <div className="mt-4">
          <table className="min-w-full border border-gray-300 table-auto">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Mã sinh viên</th>
                <th className="px-4 py-2 border-l">Họ tên</th>
                {columnsAssignment.map((col) => (
                  <th className="px-4 py-2 border-l" key={col}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataGradesAssignment.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-2">{row.MaSV}</td>
                  <td className="border px-4 py-2">{row.hoten}</td>
                  {columnsAssignment.map((col) => (
                    <td key={col} className="border px-4 py-2">
                      {row[col] !== null && row[col] !== undefined
                        ? row[col]
                        : "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <table className="mt-5 min-w-full border border-gray-300 table-auto">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Mã sinh viên</th>
                <th className="px-4 py-2 border-l">Họ tên</th>
                {columnsTest.map((col) => (
                  <th className="px-4 py-2 border-l" key={col}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataGradesTest.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-2">{row.MaSV}</td>
                  <td className="border px-4 py-2">{row.hoten}</td>
                  {columnsTest.map((col) => (
                    <td key={col} className="border px-4 py-2">
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
      )}
      {role === "SV" && (
        <div className="mt-4">
          <table className="min-w-full border border-gray-300 table-auto">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Tên bài tập</th>
                <th className="px-4 py-2 border-l">Hạn nộp</th>
                <th className="px-4 py-2 border-l">Điểm</th>
                <th className="px-4 py-2 border-l">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {dataGradesAssignment.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-2">{row.TieuDe}</td>
                  <td className="border px-4 py-2">
                    {new Date(row.HanNop).toLocaleDateString("vi-VN")}{" "}
                    {row.GioNop}
                  </td>
                  <td className="border px-4 py-2">
                    {row.DiemSo !== null ? row.DiemSo : "-"}
                  </td>
                  <td className="border px-4 py-2">{row.TrangThai}</td>
                </tr>
              ))}
              <tr className="border-t font-semibold">
                <td className="border px-4 py-2" colSpan={2}>
                  Điểm trung bình
                </td>
                <td className="border px-4 py-2" colSpan={2}>
                  {dataGradesAssignment.reduce(
                    (acc, row) => acc + (row.DiemSo || acc),
                    0
                  ) / dataGradesAssignment.length || 0}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="mt-5 min-w-full border border-gray-300 table-auto">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Tên bài tập</th>
                <th className="px-4 py-2 border-l">Hạn nộp</th>
                <th className="px-4 py-2 border-l">Điểm</th>
                <th className="px-4 py-2 border-l">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {dataGradesTest.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-2">{row.TieuDe}</td>
                  <td className="border px-4 py-2">
                    {new Date(row.HanNop).toLocaleDateString("vi-VN")}{" "}
                    {row.GioNop}
                  </td>
                  <td className="border px-4 py-2">
                    {parseFloat(row.DiemSo) !== null ? parseFloat(row.DiemSo) : "-"}
                  </td>
                  <td className="border px-4 py-2">{row.TrangThai}</td>
                </tr>
              ))}
              <tr className="border-t font-semibold">
                <td className="border px-4 py-2" colSpan={2}>
                  Điểm trung bình
                </td>
                <td className="border px-4 py-2" colSpan={2}>
                  {dataGradesTest.reduce(
                    (acc, row) => acc + (parseFloat(row.DiemSo) || acc),
                    0
                  ) / dataGradesTest.length || 0}
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <p className="mt-4 italic">
              * Lưu ý: Điểm trung bình được tính dựa trên các bài tập đã chấm
              điểm.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassCourseManagementGrades;
