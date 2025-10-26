import { FormCreateCourse } from "@/components/layout/form-create/form-create-course";
import { FormUpdateCourse } from "@/components/layout/form-update/form-update-course";
import {FormCreateClassCourse} from "@/components/layout/form-create/form-create-classcourse"
import AlertDialogDemo from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FilterForm } from "@/components/ui/filter-form";
import { Pagination } from "@/components/ui/pagination";
import { SearchForm } from "@/components/ui/search-form";
import type { ClassCourseType } from "@/types/ClassCourseType";
import type { CourseType } from "@/types/CourseType";
import API from "@/utils/axios";
import {
  Edit,
  Pencil,
  Plus,
  Trash,
  Trash2,
  UserRoundPen,
  UserRoundPlus,
  UserRoundX,
} from "lucide-react";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormUpdateClassCourse } from "@/components/layout/form-update/form-update-classcourse";

const headerTableClassCourse = [
  "STT",
  "Mã lớp học phần",
  "Tên lớp học phần",
  "Học phần",
  "Giảng viên",
  "Sỉ số",
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

type ParamsGetClassCourseType = {
  page: number;
  limit: number;
  keyword: string;
  filter: FilterType[];
};

const InitParams: ParamsGetClassCourseType = {
  page: 1,
  limit: 10,
  keyword: "",
  filter: [],
};

const ListClassCoursePage = () => {
  const [dataClassCourse, setDataClassCourse] = useState<ClassCourseType[]>();
  const [paramsData, setParamsData] =
    useState<ParamsGetClassCourseType>(InitParams);
  const [totalPages, setTotalPages] = useState<number>(1);
  console.log("paramsData:", paramsData);
  console.log("dataCourse:", dataClassCourse);

  const getAllClassCourse = async () => {
    try {
      const filter = paramsData.filter
        .map((f) => `${f.key}=${f.value}`)
        .join("&");
      console.log("filter:", filter);
      const params = `keyword=${paramsData.keyword}&${filter}&limit=${paramsData.limit}&page=${paramsData.page}`;
      console.log("params:", params);
      const res = await API.get(`/classCourse/getAllClassCourse?${params}`);
      console.log(res.data);
      setDataClassCourse(res.data.result.data);
      setTotalPages(res.data.result.totalPages);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const submitCreateClassCourse = async (data: any) => {
    console.log("data:", data);
    try {
      const res = await API.post("/classCourse/createClassCourse", data);
      toast.success("Thêm lớp học phần thành công");
    } catch (err: any) {
      console.log(err);
      toast.error(err.response?.data.message);
    }

    getAllClassCourse();
  };

  const submitDeleteClassCourse = async (mahp: string) => {
    try {
      const res = await API.delete(`classCourse/deleteClassCourse/${mahp}`);
      toast.success("Xoá lớp học phần thành công");
    } catch (err) {
      console.log(err);
    }

    getAllClassCourse();
  };

  const submitupdateClassCourse = async (data: any) => {
    console.log(data);
    try {
      const res = await API.put(`classCourse/updateClassCourse`, data);
      toast.success("Update lớp học phần thành công");
    } catch (err) {
      console.log(err);
    }

    getAllClassCourse();
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
    getAllClassCourse();
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
        <h2 className="text-2xl uppercase">Quản lý học phần</h2>
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
                icon={<Plus size={18} />}
                className="h-full"
                variant="primary"
              />
            }
          >
            <FormCreateClassCourse submitCreateClassCourse={submitCreateClassCourse} />
          </Dialog>
        </div>
        {/* table */}
        <div className="w-full h-[350px] overflow-y-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left border-b border-gray-500">
                {headerTableClassCourse.map((h) => (
                  <th className="py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataClassCourse?.map((t: any, i) => (
                <tr className="border-b border-gray-500 text-left">
                  {/* 2  */}
                  <td className="py-3">{i + 1}</td>
                  <td>{t.MaLop}</td>
                  <td>{t.ten_lop}</td>
                  <td>{t.MaHP}</td>
                  <td>{t.MSGV}</td>
                  <td>{t.si_so}</td>
                  
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
                        <FormUpdateClassCourse
                          submitUpdateClassCourse={submitupdateClassCourse}
                          MaLop={t.MaLop}
                        />
                      </Dialog>

                      <AlertDialogDemo
                        onclick={() => submitDeleteClassCourse(t.MaLop)}
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

export default ListClassCoursePage;
