import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/utils/axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  submitUpdateSchedule: (data: any) => void;
  MaLichDay: string;
};

export const FormUpdateSchedule = ({
  submitUpdateSchedule,
  MaLichDay,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    const getScheduleById = async () => {
      const res = await API.get("/schedule/getScheduleById/" + MaLichDay);
      reset(res.data.result.data[0]);
    };
    getScheduleById();
  }, [reset]);

  return (
    <div className="p-5 h-full relative">
      <div className="border-b py-2">
        <h1 className="text-2xl uppercase">Cập nhật lớp học phần</h1>
      </div>
      <div className="py-4 overflow-auto relative">
        <form className="p-2" onSubmit={handleSubmit(submitUpdateSchedule)}>
          <div>
            <div className="grid grid-cols-3 gap-4 mt-3">
                <div className="grid gap-2">
                <label>Mã lịch</label>
                <Input
                  type="text"
                  readOnly
                  {...register("MaLichDay", {
                    required: "Mã lịch dạy là bắt buộc",
                  })}
                />
              </div>
              <div className="grid gap-2">
                <label>Ngày dạy</label>
                <Input
                  type="date"
                  {...register("ngay_day", {
                    required: "Ngày dạy là bắt buộc",
                  })}
                />
              </div>
              <div className="grid gap-2">
                <label>Ngày bắt đầu</label>
                <Input
                  type="date"
                  {...register("ngay_batdau", {
                    required: "Ngày bắt đầu là bắt buộc",
                  })}
                />
              </div>
              <div className="grid gap-2">
                <label>Ngày kết thúc</label>
                <Input
                  type="date"
                  {...register("ngay_kethuc", {
                    required: "Ngày ngày kết thúc là bắt buộc",
                  })}
                />
              </div>
              <div className="grid gap-2">
                <label>Thứ trong tuần</label>
                <select
                  className="ring ring-gray-200 rounded-sm p-2"
                  {...register("ThuTrongTuan", {
                    required: "Thứ trong tuần là bắt buộc",
                  })}
                >
                  <option value={undefined} selected disabled>
                    Chọn thứ trong tuần
                  </option>
                  {Array.from({ length: 7 }).map((_, k) => (
                    <option value={k + 2}>
                      {k + 1 < 7 ? `Thứ ${k + 2}` : "Chủ nhật"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label>Tiết bắt đầu</label>
                <select
                  className="ring ring-gray-200 rounded-sm p-2"
                  {...register("tiet_batdau", {
                    required: "Tiết bắt đầu là bắt buộc",
                  })}
                >
                  <option value={undefined} selected disabled>
                    Chọn tiết bắt đầu
                  </option>
                  {Array.from({ length: 12 }).map((_, k) => (
                    <option value={k + 1}>{`Tiết ${k + 1}: ${k + 7}h -> ${
                      k + 7
                    }h50`}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label>Tiết kết thúc</label>
                <select
                  className="ring ring-gray-200 rounded-sm p-2"
                  {...register("tiet_kethuc", {
                    required: "Tiết kết thúc là bắt buộc",
                  })}
                >
                  <option value={undefined} selected disabled>
                    Chọn tiết kết thúc
                  </option>
                  {Array.from({ length: 12 }).map((_, k) => (
                    <option value={k + 1}>{`Tiết ${k + 1}: ${k + 7}h -> ${
                      k + 7
                    }h50`}</option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label>Trạng thái</label>
                <select
                  className="ring ring-gray-200 rounded-sm p-2"
                  {...register("TrangThai", {
                    required: "Trạng thái là bắt buộc",
                  })}
                >
                  <option value="BinhThuong">Bình thường</option>
                  <option value="TamNgung">Tạm ngưng</option>
                  <option value="Nghi">Nghỉ</option>
                </select>
              </div>

              <div className="fixed flex gap-2 justify-end left-0 bottom-0 p-4 border-t border-gray-200 w-full">
                <Button variant="dark" title="Lưu và tiếp tục" type="submit" />
                <Button type="submit" title="Lưu và đóng" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
