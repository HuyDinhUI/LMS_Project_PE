import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useSubmitLoading } from "@/hooks/useLoading";
import type { GroupType } from "@/types/GroupType";
import type { MenuItem } from "@/types/MenuItemType";
import type { StudentType } from "@/types/StudentType";
import API from "@/utils/axios";
import { getTimeDiff } from "@/utils/formatters";
import { Ellipsis, Pen, Plus, Trash, Users } from "lucide-react";
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
  const [membersClass, setMembersClass] = useState<StudentType[]>([]);
  const [opentFormCreate, setOpenFormCreate] = useState<boolean>(false);

  const getAllGroup = async () => {
    withLoading(async () => {
      try {
        const res = await API.get(`group/get/all/${id}`);
        setGroups(res.data.result.data);
      } catch (err: any) {
        console.log(err?.response?.data?.message);
      }
    });
  };

  const getItemsAction = (MaNhom: string) => {
    const items: MenuItem[] = [
      {
        label: "Edit",
        icon: <Pen size={20} />,
      },
      {
        label: "Delete",
        icon: <Trash size={20} />,
      },
    ];

    return items;
  };

  //   const getMembers = async () => {
  //     try {
  //       const res = await API.get(`classCourse/getMemberById/${id}`);
  //       setMembersClass(res.data.result.data);
  //     } catch (err: any) {
  //       console.log(err?.response?.data?.message);
  //     }
  //   };

  useEffect(() => {
    if (!user || !id) return;

    if (user?.role === "GV") {
      getAllGroup();
    }
  }, [id, user]);

  return (
    <div className="flex-1 overflow-auto max-h-170 px-20 relative">
      {loading && (
        <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto fixed top-1/2 right-1/2 translate-x-20"></div>
      )}
      <div className="flex items-center gap-2 mt-2">
        <div className="flex-1 flex gap-2 items-center"></div>
        {user?.role === "GV" && (
          <div>
            <Button
              variant="primary"
              title="Create"
              className="rounded-md"
              icon={<Plus />}
              onClick={() => setOpenFormCreate(true)}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {groups.map((g) => (
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
            <div className="absolute top-3 right-3">
              <DropdownMenu
                items={getItemsAction(g.MaNhom)}
                trigger={<Button icon={<Ellipsis />} />}
                size="sm"
                side="bottom"
                align="end"
              />
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="text-sm">{getTimeDiff(g.update_at)}</span>
            </div>
          </div>
        ))}
      </div>
      {groups.length === 0 && (
        <span className="block text-center italic w-full">
          No groups have been created yet.
        </span>
      )}
      {opentFormCreate && (
        <FormCreateGroup
          handleClose={() => setOpenFormCreate(false)}
          MaLop={id!}
          getGroup={() => getAllGroup()}
        />
      )}
    </div>
  );
};

type Props = {
  MaLop: string;
  handleClose: () => void;
  getGroup: () => void
};

const FormCreateGroup = ({ handleClose, MaLop, getGroup }: Props) => {
  const { register, handleSubmit } = useForm();
  const { loading, withLoading } = useSubmitLoading();

  const CreateGroup = async (data: any) => {
    const body = {
      name: data.name,
      description: data.description,
      MaLop,
      max_members: data.max_members
    };

    withLoading(async () => {
      try {
        await API.post("/group/create", body);
        toast.success("Thêm thành công", { theme: "light" });
        getGroup()
      } catch (err: any) {
        console.log(err?.response?.data?.message);
      }
    });
  };
  return (
    <div className="right-0 top-0 left-0 z-999 h-[100vh] w-[100-vw] bg-black/20 fixed">
      <div className="bg-white w-100 p-5 h-[100vh] absolute right-0 flex flex-col gap-2 animate-slideInRight overflow-auto">
        <h1 className="uppercase font-bold pb-2 mb-3 border-b sticky top-0 bg-white">
          Create Group
        </h1>
        <form onSubmit={handleSubmit(CreateGroup)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-bold">Name:</label>
              <Input
                {...register("name", { required: "Tên nhóm là bắt buộc" })}
                placeholder="Nhom A"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Limit:</label>
              <Input
                type="number"
                {...register("max_members", {
                  required: "Số lượng thành viên là bắt buộc",
                })}
                placeholder="4"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold">Description:</label>
              <textarea className="ring ring-gray-300 rounded-md p-2" {...register("description")} rows={5} />
            </div>
            <div className="flex gap-2 justify-end fixed top-4 right-5 rounded-md">
              <Button
                type="submit"
                title="Save"
                size="sm"
                variant="dark"
                disabled={loading}
              />
              <Button
                type="button"
                onClick={handleClose}
                size="sm"
                title="Cancel"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassCourseGroup;
