import { Calendar, type EventType } from "@/components/ui/calendar";
import { SearchForm } from "@/components/ui/search-form";
import API from "@/utils/axios";
import { formatterDataEventCalendar } from "@/utils/formatters";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type ParamsGetScheduleType = {
  msgv: string;
  from: string;
  to: string;
};

const dataInitParams: ParamsGetScheduleType = {
  msgv: "",
  from: "2025-10-01",
  to: "2025-10-07",
};

const ScheduleTeacher = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [params, setParams] = useState<ParamsGetScheduleType>(dataInitParams);
  const debounceRef = useRef<any>(null);

  const getSchedule = async () => {
    try {
      const res = await API.get(
        `/teacher/schedule/getSchedule?msgv=${params.msgv}&from=${params.from}&to=${params.to}`
      );
      const event = formatterDataEventCalendar(res.data.data);
      setEvents(event);
    } catch (err: any) {
      toast.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      getSchedule();
    }, 500);

    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [params]);

  const handleSearchSchedule = (msgv: string) => {
    setParams({ ...params, msgv });
  };
  return (
    <div className="py-5 px-10 w-full bg-white rounded-md">
      <div className="w-full px-2">
        <h2 className="text-2xl uppercase">Quản lý giảng viên</h2>
      </div>
      <div className="p-3 shadow-md rounded-md mt-5 flex flex-col gap-5">
        <div className="flex gap-2">
          <SearchForm handleSearch={handleSearchSchedule} />
        </div>
        <Calendar data={events} />
      </div>
    </div>
  );
};

export default ScheduleTeacher;
