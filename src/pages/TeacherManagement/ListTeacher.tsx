import { FilterForm } from "@/components/ui/filter-form";
import { SearchForm } from "@/components/ui/search-form";
import { Table } from "@/components/ui/table";
import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";

import { useEffect, useState } from "react";

const headerTableTeacher = ["MSGV", "Name", "Birth", "Phone", "Email"];

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
  const [dataTeacher, setDataTeacher] = useState<TeacherDTO>();
  const [paramsData, setParamsData] =
    useState<ParamsGetTeacherType>(InitParams);
  console.log("paramsData:", paramsData);
  const getAllTeacher = async () => {
    try {
      const filter = paramsData.filter
        .map((f) => `${f.key}=${f.value}`)
        .join("&");
      console.log("filter:", filter);
      const params = `keyword=${paramsData.keyword}&limit=${paramsData.limit}&page=${paramsData.page}`;
      console.log("params:", params);
      const res = await API.get(`/teacher/getAllTeacher?${params}`);
      console.log(res.data);
      setDataTeacher(res.data.data);
    } catch (err: any) {
      console.log(err.message);
    }
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
    <div className="py-3 px-5 flex-1">
      <div className="w-full">
        <h2 className="text-2xl">Teacher Management</h2>
      </div>
      {/* Filter */}

      <div className="flex items-center gap-2 my-5">
        <div>
          <SearchForm handleSearch={handleSearch} />
        </div>
        <FilterForm data={data_mock} handleFilter={handleFilter} />
      </div>
      {/* table */}
      <Table header={headerTableTeacher} data={dataTeacher ?? []} />
    </div>
  );
};

export default ListTeacherPage;
