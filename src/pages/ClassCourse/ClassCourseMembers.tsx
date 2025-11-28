import AvatarDemo from "@/components/ui/avatar";
import { SearchForm } from "@/components/ui/search-form";
import API from "@/utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ClassCourseMembers = () => {
  const [members, setMembers] = useState<
    { sinhvien: string; MaSV: string; avatar: string }[]
  >([]);
  const { id } = useParams();
  const getMembers = async () => {
    try {
      const res = await API.get(`classCourse/getMemberById/${id}`);
      setMembers(res.data.result.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleSearch = async (keyword: string) => {
    console.log(keyword);
  };

  useEffect(() => {
    getMembers();
  }, [id]);

  return (
    <div className="flex-1 overflow-auto max-h-165 px-20">
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2 mt-2">
          <SearchForm handleSearch={handleSearch} />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-5">
          {members.map((m) => (
            <div
              key={m.MaSV}
              className="w-full hover:-translate-y-1 transition-transform p-5 bg-black/5 rounded-xl relative flex gap-5 items-center"
            >
              {/* <img src={m.avatar} width={50} className="rounded-full"></img> */}
              <AvatarDemo img={m.avatar} />
              <div className="flex flex-col">
                <span className="font-bold">{m.sinhvien}</span>
                <span>{m.MaSV}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassCourseMembers;
