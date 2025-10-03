
import {FormCreateClassCourse} from "@/components/layout/form-create/form-create-classcourse"
import AlertDialogDemo from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FilterForm } from "@/components/ui/filter-form";
import { Pagination } from "@/components/ui/pagination";
import { SearchForm } from "@/components/ui/search-form";
import type { ClassCourseType } from "@/types/ClassCourseType";

import API from "@/utils/axios";
import {
 
  Pencil,
  Plus,

  Trash2,
  
} from "lucide-react";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormUpdateClassCourse } from "@/components/layout/form-update/form-update-classcourse";
import type { ScheduleType } from "@/types/ScheduleType";
import { FormUpdateSchedule } from "@/components/layout/form-update/form-update-schedule";

const headerTableSchedule = [
  "STT",
  "Mã lịch",
  "Mã lớp học phần",
  "Giảng viên",
  "Ngày dạy",
  "Tiết bắt đầu",
  "Tiết kết thúc",
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

type ParamsGetScheduleType = {
  page: number;
  limit: number;
  keyword: string;
  filter: FilterType[];
};

const InitParams: ParamsGetScheduleType = {
  page: 1,
  limit: 10,
  keyword: "",
  filter: [],
};

const ListSchedulePage = () => {
  const [dataSchedule, setDataSchedule] = useState<ScheduleType[]>();
  const [paramsData, setParamsData] =
    useState<ParamsGetScheduleType>(InitParams);
  const [totalPages, setTotalPages] = useState<number>(1);
  console.log("paramsData:", paramsData);
  console.log("dataCourse:", dataSchedule);

  const getAllSchedule = async () => {
    try {
      const filter = paramsData.filter
        .map((f) => `${f.key}=${f.value}`)
        .join("&");
      console.log("filter:", filter);
      const params = `keyword=${paramsData.keyword}&${filter}&limit=${paramsData.limit}&page=${paramsData.page}`;
      console.log("params:", params);
      const res = await API.get(`/schedule/getAllSchedule?${params}`);
      console.log(res.data);
      setDataSchedule(res.data.data.data);
      setTotalPages(res.data.data.totalPages);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const submitDeleteSchedule = async (malich: string) => {
    try {
      const res = await API.delete(`schedule/deleteSchedule/${malich}`);
      toast.success("Xoá lịch thành công");
    } catch (err) {
      console.log(err);
    }

    getAllSchedule();
  };

  const submitupdateSchedule = async (data: any) => {
    console.log(data);
    try {
      const res = await API.put(`schedule/updateSchedule`, data);
      toast.success("Cập nhật lịch thành công");
    } catch (err) {
      console.log(err);
    }

    getAllSchedule();
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
    getAllSchedule();
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
    <div className="py-5 px-10 w-full h-full bg-white dark:bg-card rounded-md">
      <div className="w-full px-2">
        <h2 className="text-2xl uppercase">Quản lý lịch dạy & học</h2>
      </div>
      {/* Content */}
      <div className="p-3 ring ring-gray-100 max-h-[550px] dark:ring-gray-700  rounded-md mt-5">
        <div className="flex justify-between items-center gap-2 my-5">
          <div className="flex gap-2">
            <SearchForm handleSearch={handleSearch} />
            <FilterForm data={data_mock} handleFilter={handleFilter} />
          </div>
        </div>
        {/* table */}
        <div className="w-full h-[350px] overflow-y-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left border-b">
                {headerTableSchedule.map((h) => (
                  <th className="py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataSchedule?.map((t: any, i) => (
                <tr className="border-b text-left">
                  {/* 2  */}
                  <td className="py-3">{i + 1}</td>
                  <td>{t.MaLichDay}</td>
                  <td>{t.MaLop}</td>
                  <td>{t.giangvien}</td>
                  <td>{t.ngay_day}</td>
                  <td>{t.tiet_batdau}</td>
                  <td>{t.tiet_kethuc}</td>
                  <td>
                    <div className="flex">
                      <Dialog
                        trigger={
                          <Button
                            variant="icon"
                            size="ic"
                            icon={<Pencil size={18} />}
                          />
                        }
                      >
                        <FormUpdateSchedule
                          submitUpdateSchedule={submitupdateSchedule}
                          MaLichDay={t.MaLichDay}
                        />
                      </Dialog>

                      <AlertDialogDemo
                        onclick={() => submitDeleteSchedule(t.MaLichDay)}
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

export default ListSchedulePage;
