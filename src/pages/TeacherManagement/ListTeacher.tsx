import { Table } from "@/components/ui/table";
import type { TeacherDTO } from "@/types/TeacherType";
import API from "@/utils/axios";

import { useEffect, useState } from "react";

const headerTableTeacher = ["MSGV", "Name", "Birth", "Phone", "Email"];

const ListTeacherPage = () => {
  const [dataTeacher, setDataTeacher] = useState<TeacherDTO>();

  useEffect(() => {
    const getAllTeacher = async () => {
      try {
        const res = await API.get("/teacher/getAllTeacher");
        console.log(res.data);
        setDataTeacher(res.data)
      } catch (err: any) {
        console.log(err.message)
      }
    };

    getAllTeacher()
  }, []);

  return (
    <div className="py-3 px-5 flex-1">
      <div className="w-full">
        <h2 className="text-2xl">Teacher Management</h2>
      </div>
      {/* Filter */}

      <div className="flex my-5">
        <div>Search</div>
      </div>
      {/* table */}
      <Table header={headerTableTeacher} data={dataTeacher ?? []}/>
    </div>
  );
};

export default ListTeacherPage;
