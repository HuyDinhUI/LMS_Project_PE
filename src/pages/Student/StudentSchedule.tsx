import { Calendar,CalendarToday, type EventType } from "@/components/ui/calendar";
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



const StudentSchedule = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  
  useEffect(() => {
    const getSchedule = async () => {
        const res = await API.get('/student/getSchedule/' + localStorage.getItem('username'))
        console.log(res.data)
        console.log(formatterDataEventCalendar(res.data.result.data))
        setEvents(formatterDataEventCalendar(res.data.result.data))
    }
    getSchedule()
  },[])

  
    
  return (
    <div className="py-5 px-10 w-full bg-white dark:bg-card rounded-md">
      <div className="w-full px-2">
        <h2 className="text-2xl uppercase">Lịch học</h2>
      </div>
      <div className="p-3 shadow-md rounded-md mt-5 flex flex-col gap-5">
        
        <Calendar data={events} />
      </div>
    </div>
  );
};

export default StudentSchedule;
