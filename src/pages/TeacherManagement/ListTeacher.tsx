import { FormCreateTeacher } from "@/components/layout/form-create/form-create-teacher";
import { FormUpdateTeacher } from "@/components/layout/form-update/form-update-teacher";
import AlertDialogDemo from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { FilterForm } from "@/components/ui/filter-form";
import { Pagination } from "@/components/ui/pagination";
import { SearchForm } from "@/components/ui/search-form";

import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";
import { Edit, Plus, Trash } from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const headerTableTeacher = [
  "STT",
  "MSGV",
  "Họ tên",
  "Số điện thoại",
  "Email",
  "Trạng thái",
  "Tác vụ",
];

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

type FilterType = {
  key: string;
  value: string;
};

type ParamsGetTeacherType = {
  page: number;
  limit: number;
  keyword: string;
  filter: FilterType[];
};

const InitParams: ParamsGetTeacherType = {
  page: 1,
  limit: 10,
  keyword: "",
  filter: [],
};

const ListTeacherPage = () => {
  const [dataTeacher, setDataTeacher] = useState<TeacherDTO[]>();
  const [paramsData, setParamsData] =
    useState<ParamsGetTeacherType>(InitParams);
  const [totalPages, setTotalPages] = useState<number>(1);
  console.log("paramsData:", paramsData);

  const getAllTeacher = async () => {
    try {
      const filter = paramsData.filter
        .map((f) => `${f.key}=${f.value}`)
        .join("&");
      console.log("filter:", filter);
      const params = `keyword=${paramsData.keyword}&${filter}&limit=${paramsData.limit}&page=${paramsData.page}`;
      console.log("params:", params);
      const res = await API.get(`/teacher/getAllTeacher?${params}`);
      console.log(res.data);
      setDataTeacher(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const submitCreateTeacher = async (data: any) => {
    console.log("data:", data);
    try {
      const res = await API.post("/teacher/createTeacher", data);
      toast.success("Thêm giảng viên thành công");
    } catch (err: any) {
      console.log(err)
      toast.error(err.response?.data.message)
    }

    getAllTeacher();
  };

  const submitDeleteTeacher = async (msgv: string) => {
    try {
      const res = await API.delete(`teacher/deleteTeacher/${msgv}`);
      toast.success("Xoá giảng viên thành công");
    } catch (err) {
      console.log(err);
    }

    getAllTeacher();
  };

  const submitupdateTeacher = async (data: any) => {
    console.log(data)
    try {
      const res = await API.put(`teacher/updateTeacher`,data);
      toast.success("Update giảng viên thành công");
    } catch (err) {
      console.log(err);
    }

    getAllTeacher();
  }

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
    getAllTeacher();
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
    <div className="py-3 px-10 flex-1">
      <div className="w-full px-2">
        <h2 className="text-2xl uppercase">Quản lý giảng viên</h2>
      </div>
      {/* Content */}
      <div className="p-3 shadow-md rounded-md mt-5">
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
            <FormCreateTeacher submitCreateTeacher={submitCreateTeacher} />
          </Dialog>
        </div>
        {/* table */}
        <div className="w-full">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left border-b">
                {headerTableTeacher.map((h) => (
                  <th className="py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataTeacher?.map((t: any, i) => (
                <tr className="border-b text-left">
                  {/* 2  */}
                  <td className="py-3">{i + 1}</td>
                  <td>{t.MSGV}</td>
                  <td>{t.hoten}</td>
                  <td>{t.sdt}</td>
                  <td>{t.email}</td>
                  <td>{t.trangthai}</td>
                  <td>
                    <div className="flex">
                      <Dialog
                        trigger={
                          <Button
                            variant="icon"
                            size="ic"
                            icon={<Edit size={18} />}
                          />
                        }
                      >
                        <FormUpdateTeacher submitUpdateTeacher={submitupdateTeacher} msgv={t.MSGV}/>
                      </Dialog>

                      <AlertDialogDemo
                        onclick={() => submitDeleteTeacher(t.MSGV)}
                        trigger={
                          <Button
                            variant="icon"
                            size="ic"
                            icon={<Trash size={18} color="red" />}
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
    </div>
  );
};

export default ListTeacherPage;
