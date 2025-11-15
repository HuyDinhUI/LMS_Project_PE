import { Calendar, type EventType } from "@/components/ui/calendar";
import API from "@/utils/axios";
import { formatterDataEventCalendar } from "@/utils/formatters";
import { useEffect, useState } from "react";


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
    <div className="py-5 px-10 w-full">
      <div className="p-3 shadow-md rounded-md mt-5 flex flex-col gap-5">
        <Calendar data={events} />
      </div>
    </div>
  );
};

export default StudentSchedule;
