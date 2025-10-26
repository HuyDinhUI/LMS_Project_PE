import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from "react-router-dom";
import { Button } from "./button";

export type EventType = {
  id: string;
  MaLop: string;
  title: string;
  start: string;
  end: string;
  status: string;
};

type props = {
  data: EventType[];
};

export const Calendar = ({ data }: props) => {
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
            bgColor = "bg-green-brand text-white";
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
      initialView="timeGridWeek"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      events={data}
      height="80vh"
      slotMinTime="07:00:00"
      slotMaxTime="20:00:00"
      locale="vi" // tiếng Việt
      allDaySlot={false}
    />
  );
};

export const CalendarToday = ({ data }: props) => {
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
      height="35vh"
      slotMinTime="07:00:00"
      slotMaxTime="20:00:00"
      locale="vi" // tiếng Việt
      allDaySlot={false}
    />
  );
};
