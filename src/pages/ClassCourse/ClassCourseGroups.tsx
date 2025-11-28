import AvatarDemo from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Popover } from "@/components/ui/popover";
import { SearchForm } from "@/components/ui/search-form";
import { useAuth } from "@/hooks/useAuth";
import { useSubmitLoading } from "@/hooks/useLoading";
import { formatsQuill, modulesQuill } from "@/mock/quill";
import type { GroupType } from "@/types/GroupType";
import API from "@/utils/axios";
import { getTimeDiff } from "@/utils/formatters";
import TextField from "@mui/material/TextField";
import {
  Clock,
  MessageSquareText,
  Minus,
  Paperclip,
  Plus,
  SquareCheckBig,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ClassCourseGroup = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { loading, withLoading } = useSubmitLoading();
  const [groups, setGroups] = useState<GroupType[]>([]);

  const getAllGroup = () => {
    withLoading(async () => {
      try {
        const res = await API.get(`group/get/all/${id}`);
        setGroups(res.data.result.data);
      } catch (err: any) {
        console.log(err?.response?.data?.message);
      }
    });
  };

  const getGroupsByStudent = () => {
    withLoading(async () => {
      try {
        const res = await API.get(`group/get/groups/student/${id}`);
        setGroups(res.data.result.data);
      } catch (err: any) {
        console.log(err?.response?.data?.message);
      }
    });
  };

  const handleSearch = async (keyword: string) => {
    console.log(keyword);
  };

  useEffect(() => {
    if (!user || !id) return;

    if (user?.role === "GV") {
      getAllGroup();
    } else {
      getGroupsByStudent();
    }
  }, [id, user]);

  return (
    <div className="flex-1 overflow-auto max-h-170 px-20 relative">
      {loading && (
        <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto fixed top-1/2 right-1/2 translate-x-20"></div>
      )}
      <div className="flex items-center gap-2 mt-2">
        <SearchForm handleSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        <Popover
          side="right"
          align="start"
          trigger={
            <div className="h-40 bg-black/3 rounded-xl p-3 flex gap-2 justify-center items-center cursor-pointer hover:-translate-y-2 transition-transform">
              <Plus size={20} />
              <span>Add group</span>
            </div>
          }
        >
          <FormCreateGroup MaLop={id!} getGroup={() => getAllGroup()} />
        </Popover>

        {groups.map((g) => (
          <Dialog
            trigger={
              <div
                key={g.MaNhom}
                className="h-40 bg-black/3 rounded-xl p-3 relative cursor-pointer hover:-translate-y-2 transition-transform"
              >
                <h2 className="text-xl font-bold">{g.name}</h2>
                <div
                  className="h-10 overflow-ellipsis"
                  dangerouslySetInnerHTML={{
                    __html: g.description ?? "",
                  }}
                ></div>
                <div className="absolute bottom-3 left-3 flex gap-2 items-center">
                  <Users size={15} />
                  <p className="text-sm">
                    {g.current_member ?? 0} / {g.max_members}
                  </p>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="text-sm">{getTimeDiff(g.update_at)}</span>
                </div>
              </div>
            }
          >
            <Group
              MaNhom={g.MaNhom}
              getGroup={() => getAllGroup()}
              MaLop={id}
            />
          </Dialog>
        ))}
      </div>
    </div>
  );
};

type Props = {
  MaNhom?: string;
  MaLop?: string;
  getGroup: () => void;
};

const FormCreateGroup = ({ MaLop, getGroup }: Props) => {
  const { register, handleSubmit } = useForm();
  const { loading, withLoading } = useSubmitLoading();

  const CreateGroup = async (data: any) => {
    const body = {
      name: data.name,
      description: data.description,
      MaLop,
      max_members: data.max_members,
    };

    withLoading(async () => {
      try {
        await API.post("/group/create", body);
        toast.success("Thêm thành công", { theme: "light" });
        getGroup();
      } catch (err: any) {
        console.log(err?.response?.data?.message);
      }
    });
  };
  return (
    <div className="bg-white dark:bg-card w-100 p-2 flex flex-col gap-2 overflow-auto">
      <h1 className="uppercase font-bold pb-2 mb-3 border-b sticky top-0">
        Create Group
      </h1>
      <form onSubmit={handleSubmit(CreateGroup)}>
        <div className="flex flex-col gap-5">
          <TextField
            label="Name"
            {...register("name", { required: "Tên nhóm là bắt buộc" })}
            placeholder="Nhom A"
            fullWidth
          />

          <TextField
            label="Limit"
            type="number"
            {...register("max_members", {
              required: "Số lượng thành viên là bắt buộc",
            })}
            placeholder="4"
          />

          <TextField
            label="Description"
            multiline
            {...register("description")}
            rows={5}
          />

          <div className="flex gap-2 justify-end rounded-md">
            <Button
              type="submit"
              title="Save"
              size="md"
              variant="dark"
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const Group = ({ MaNhom, getGroup, MaLop }: Props) => {
  const [group, setGroup] = useState<GroupType>();
  const [membersClass, setMembersClass] = useState<
    { sinhvien: string; MaSV: string }[]
  >([]);
  const [membersGroup, setMembersGroup] = useState<
    { hoten: string; MaSV: string; avatar: string; role: string }[]
  >([]);
  const { loading, withLoading } = useSubmitLoading();

  const getOneGroup = async () => {
    withLoading(async () => {
      try {
        const res = await API.get(`group/get/group/${MaNhom}/${MaLop}`);
        setGroup(res.data.result.data[0]);
      } catch (err: any) {
        console.log(err?.response?.data?.message);
      }
    });
  };

  const getMembersClass = async () => {
    try {
      const res = await API.get(`classCourse/getMemberById/${MaLop}`);
      setMembersClass(res.data.result.data);
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  const getMembersGroup = async () => {
    try {
      const res = await API.get(`group/get/members/${MaNhom}`);
      setMembersGroup(res.data.result.data);
    } catch (err: any) {
      console.log(err?.response?.data?.message);
    }
  };

  const handleAddMember = (MaSV: string) => {
    withLoading(async () => {
      try {
        await API.post("group/add/member", { MaNhom, MaSV });
        toast.success("Thêm thành công", { theme: "light" });
        getGroup();
        getMembersGroup();
      } catch (err: any) {
        toast.error(err?.response?.data?.message, { theme: "light" });
        console.log(err?.response?.data?.message);
      }
    });
  };

  useEffect(() => {
    getOneGroup();
    getMembersClass();
    getMembersGroup();
  }, [MaLop, MaNhom]);

  return (
    <div className="h-full">
      <LoadingOverlay show={loading} />
      <header className="px-5 py-7"></header>
      <hr />
      <div className="grid grid-cols-2 gap-2 relative h-full">
        <div className="p-5">
          <h1 className="text-2xl font-bold">{group?.name}</h1>
          <div className="flex gap-2 mt-5">
            <Popover
              side="bottom"
              align="start"
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  title="Add"
                  icon={<Plus size={18} />}
                />
              }
            >
              <div className="w-70 h-80"></div>
            </Popover>
            <Popover
              side="bottom"
              align="start"
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  title="Dates"
                  icon={<Clock size={18} />}
                />
              }
            >
              <div className="w-70 h-80"></div>
            </Popover>
            <Popover
              side="bottom"
              align="start"
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  title="Checklists"
                  icon={<SquareCheckBig size={18} />}
                />
              }
            >
              <div className="w-70 h-80"></div>
            </Popover>
            <Popover
              side="bottom"
              align="start"
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  title="Members"
                  icon={<UserPlus size={18} />}
                />
              }
            >
              <div className="w-70 h-80">
                <header className="text-center py-2">Members</header>
                <div className="flex flex-col gap-2">
                  <div>
                    <SearchForm handleSearch={() => {}} />
                  </div>
                  <div className="flex flex-col gap-2">
                    {membersClass.map((m) => (
                      <div
                        key={m.MaSV}
                        className="bg-black/3 rounded-md p-2 flex items-center justify-between"
                      >
                        {m.sinhvien}
                        <Button
                          onClick={() => handleAddMember(m.MaSV)}
                          variant="transparent"
                          size="ic"
                          icon={<Plus size={18} />}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Popover>
            <Popover
              side="bottom"
              align="start"
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  title="Attachments"
                  icon={<Paperclip size={18} />}
                />
              }
            >
              <div className="w-70 h-80"></div>
            </Popover>
          </div>
          <div>
            <div className="h-70 mt-5">
              <ReactQuill
                theme="snow"
                value={group?.description}
                modules={modulesQuill}
                formats={formatsQuill}
                className="h-full"
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-5 border-l border-gray-200">
          <div className="grid grid-cols-3 gap-2 items-center">
            {membersGroup.map((m) => (
              <div
                key={m.MaSV}
                className="flex gap-2 items-center justify-between bg-black/3 px-2 py-1 rounded-full"
              >
                <div className="flex gap-2 items-center">
                  <AvatarDemo img={m.avatar} />
                  <p className="text-[10px]">{m.hoten}</p>
                </div>
                <Button icon={<Minus size={15}/>} size="ic" variant="transparent"/>
              </div>
            ))}
            {membersGroup.length === 0 && (
              <span className="text-center italic block col-span-3">
                Not member yet
              </span>
            )}
          </div>
          <div className="mt-5">
            <div className="flex gap-2 items-center">
              <MessageSquareText size={20} />
              <h2 className="font-bold">Comment and activities</h2>
            </div>
            <div className="mt-3">
              <ReactQuill
                theme="snow"
                modules={modulesQuill}
                formats={formatsQuill}
                placeholder="Write a comment..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCourseGroup;
