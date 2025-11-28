import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "./button";
import { useAuth } from "@/hooks/useAuth";
import { useSubmitLoading } from "@/hooks/useLoading";
import API from "@/utils/axios";

export type EventType = {
  id: string;
  MaLop: string;
  title: string;
  start: string;
  end: string;
  status: string;
  ngay_day: string
};

type props = {
  data: EventType[];
  height?: string;
};

export const Calendar = ({ data, height = "80vh" }: props) => {
  const { user } = useAuth();
  const { withLoading } = useSubmitLoading();

  const Attendance = async (MaLop: string, ngay_day: string) => {
    const body = {
      MaLop,
      ngay_day
    }
    withLoading(async () => {
      try {
        const res = await API.post("/attendance/start",body);
        console.log(res.data.redirectUrl)
        window.open(res.data.redirectUrl, '_blank')
      } catch (err: any) {
        console.log(err);
      }
    });
  };

  return (
    <FullCalendar
      eventContent={(arg) => {
        let bgColor = "";
        switch (arg.event.extendedProps.status) {
          case "TamNgung":
            bgColor = "bg-red-500 text-white";
            break;
          default:
            bgColor = "bg-black text-white";
        }
        return (
          <div
            className={`${bgColor} rounded w-full h-full p-3 overflow-hidden`}
          >
            {arg.event.title}
            {new Date().toISOString() >=
              new Date(arg.event.start ?? "").toISOString() &&
              new Date().toISOString() <=
                new Date(arg.event.end ?? "").toISOString() &&
              user?.role === "SV" && (
                <Button
                  onClick={() => Attendance(arg.event.extendedProps.MaLop, arg.event.extendedProps.ngay_day)}
                  size="sm"
                  title="Điểm danh"
                  className="mt-2 bg-yellow-brand"
                />
              )}
          </div>
        );
      }}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      events={data}
      height={height}
      slotMinTime="07:00:00"
      slotMaxTime="20:00:00"
      locale="vi" // tiếng Việt
      allDaySlot={false}
    />
  );
};

export const CalendarToday = ({ data, height = "35vh" }: props) => {
  const role = localStorage.getItem("role");
  return (
    <FullCalendar
      eventContent={(arg) => {
        let bgColor = "";
        switch (arg.event.extendedProps.status) {
          case "TamNgung":
            bgColor = "bg-red-500 text-white";
            break;
          default:
            bgColor = "bg-black text-white";
        }
        return (
          <div
            className={`${bgColor} px-1 rounded w-full h-full p-2 overflow-hidden`}
          >
            {arg.event.title}
            {new Date().toISOString() >=
              new Date(arg.event.start ?? "").toISOString() &&
              new Date().toISOString() <=
                new Date(arg.event.end ?? "").toISOString() &&
              role === "SV" && (
                <Button
                  onClick={() =>
                    (location.href = `/student/attendance/${arg.event.extendedProps.MaLop}`)
                  }
                  variant="primary"
                  size="sm"
                  title="Điểm danh"
                  className="mt-2"
                />
              )}
          </div>
        );
      }}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridDay"
      headerToolbar={false}
      events={data}
      height={height}
      slotMinTime="07:00:00"
      slotMaxTime="20:00:00"
      locale="vi" // tiếng Việt
      allDaySlot={false}
    />
  );
};
