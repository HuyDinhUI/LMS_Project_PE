
import AlertDialogDemo from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FilterForm } from "@/components/ui/filter-form";
import { Pagination } from "@/components/ui/pagination";
import { SearchForm } from "@/components/ui/search-form";


import API from "@/utils/axios";
import {
  Pencil,
  Trash2,
  UserRoundPlus,
  
} from "lucide-react";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { ScheduleType } from "@/types/ScheduleType";
import { FormUpdateSchedule } from "@/components/layout/form-update/form-update-schedule";
import type { StudentType } from "@/types/StudentType";
import { FormCreateStudent } from "@/components/layout/form-create/form-create-student";
import { FormUpdateStudent } from "@/components/layout/form-update/form-update-student";

const headerTableStudent = [
  "STT",
  "MSSV",
  "Họ tên",
  "Email",
  "Số điện thoại",
  "Khoa",
  "Lớp",
  "Tác vụ"
];

const data_mock = [
  {
    key: "Khoa",
    select: [
      {
        name: "All",
        value: "",
      },
      {
        name: "Công nghệ thông tin",
        value: "0100",
      },
      {
        name: "Công nghệ thực phẩm",
        value: "0200",
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

type FilterType = {
  key: string;
  value: string;
};

type ParamsGetStudentType = {
  page: number;
  limit: number;
  keyword: string;
  filter: FilterType[];
};

const InitParams: ParamsGetStudentType = {
  page: 1,
  limit: 10,
  keyword: "",
  filter: [],
};

const ListStudentPage = () => {
  const [dataStudent, setDataStudent] = useState<StudentType[]>();
  const [paramsData, setParamsData] =
    useState<ParamsGetStudentType>(InitParams);
  const [totalPages, setTotalPages] = useState<number>(1);
  console.log("paramsData:", paramsData);
  console.log("dataCourse:", dataStudent);

  const getAllStudent = async () => {
    try {
      const filter = paramsData.filter
        .map((f) => `${f.key}=${f.value}`)
        .join("&");
      console.log("filter:", filter);
      const params = `keyword=${paramsData.keyword}&${filter}&limit=${paramsData.limit}&page=${paramsData.page}`;
      console.log("params:", params);
      const res = await API.get(`/student/getAllStudent?${params}`);
      console.log(res.data);
      setDataStudent(res.data.result.data);
      setTotalPages(res.data.data.totalPages);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const submitCreateStudent = async (data: any) => {
    console.log("data:", data);
    try {
      const res = await API.post("/student/createStudent", data);
      toast.success("Thêm sinh viên thành công");
    } catch (err: any) {
      console.log(err);
      toast.error(err.response?.data.message);
    }

    getAllStudent();
  };

  const submitDeleteStudent = async (malich: string) => {
    try {
      const res = await API.delete(`student/deleteStudent${malich}`);
      toast.success("Xoá sinh viên thành công");
    } catch (err) {
      console.log(err);
    }

    getAllStudent();
  };

  const submitupdateStudent = async (data: any) => {
    console.log(data);
    try {
      const res = await API.put(`student/updateStudent`, data);
      toast.success("Cập nhật sinh viên thành công");
    } catch (err) {
      console.log(err);
    }

    getAllStudent();
  };

  const prevPage = () => {
    setParamsData((prev) => {
      return { ...prev, page: prev.page - 1 };
    });
  };

  const nextPage = () => {
    setParamsData((prev) => {
      return { ...prev, page: prev.page + 1 };
    });
  };

  const PageNunmberPagination = (page: number) => {
    setParamsData((prev) => {
      return { ...prev, page };
    });
  };

  useEffect(() => {
    getAllStudent();
  }, [paramsData]);

  const handleSearch = async (keyword: string) => {
    console.log("keyword:", keyword);
    setParamsData({ ...paramsData, keyword });
  };

  const handleFilter = (value: string, keySelect: string) => {
    console.log("filter:", value);
    console.log("key:", keySelect);

    setParamsData((prev) => {
      const newFilters = prev.filter.filter((f) => f.key !== keySelect);
      return {
        ...prev,
        filter: [...newFilters, { value, key: keySelect }],
      };
    });
  };

  return (
    <div className="py-5 px-10 w-full h-full dark:bg-card">
      <div className="w-full px-2">
        <h2 className="text-2xl uppercase">Quản lý sinh viên</h2>
      </div>
      {/* Content */}
      <div className="p-3 ring ring-gray-100 max-h-[550px] dark:ring-gray-700  rounded-md mt-5">
        <div className="flex justify-between items-center gap-2 my-5">
          <div className="flex gap-2">
            <SearchForm handleSearch={handleSearch} />
            <FilterForm data={data_mock} handleFilter={handleFilter} />
          </div>
          <Dialog
            trigger={
              <Button
                title="Thêm"
                icon={<UserRoundPlus size={18} />}
                className="h-full"
                variant="primary"
              />
            }
          >
            <FormCreateStudent submitCreateStudent={submitCreateStudent} />
          </Dialog>
        </div>
        {/* table */}
        <div className="w-full h-[350px] overflow-y-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left border-b border-gray-500">
                {headerTableStudent.map((h) => (
                  <th className="py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataStudent?.map((t: any, i) => (
                <tr className="border-b text-left border-gray-500">
                  
                  <td className="py-3">{i + 1}</td>
                  <td>{t.MaSV}</td>
                  <td>{t.hoten}</td>
                  <td>{t.email}</td>
                  <td>{t.sdt}</td>
                  <td>{t.MaKhoa}</td>
                  <td>{t.MaLopHC}</td>
                  
                  <td>
                    <div className="flex gap-2">
                      <Dialog
                        trigger={
                          <Button
                            variant="icon"
                            size="ic"
                            icon={<Pencil size={18} />}
                          />
                        }
                      >
                        <FormUpdateStudent
                          submitUpdateStudent={submitupdateStudent}
                          masv={t.MaSV}
                        />
                      </Dialog>

                      <AlertDialogDemo
                        onclick={() => submitDeleteStudent(t.MaSV)}
                        trigger={
                          <Button
                            variant="icon"
                            size="ic"
                            icon={<Trash2 size={18} color="red" />}
                          />
                        }
                        label="Bạn có muốn xoá không ?"
                        description="Lưu ý: hành động này sẽ không thể hoàn tác."
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          prevFunction={prevPage}
          nextFunction={nextPage}
          pageFunction={PageNunmberPagination}
          page={paramsData.page}
          totalPages={totalPages}
          limit={paramsData.limit}
        />
      </div>
    </div>
  );
};

export default ListStudentPage;
