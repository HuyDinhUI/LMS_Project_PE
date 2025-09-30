import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export type EventType = {
  id: string;
  title: string;
  start: string;
  end: string;
};

type props = {
  data: EventType[];
};

export const Calendar = ({ data }: props) => {
  return (
    <FullCalendar
      eventContent={(arg) => {
        let bgColor = "";
        switch (arg.event.extendedProps.phonghoc) {
          case "Zoom":
            bgColor = "bg-blue-500 text-white";
            break;
          default:
            bgColor = "bg-gray-200 text-black";
        }
        return (
          <div className={`${bgColor} px-1 rounded w-full h-full p-2 overflow-hidden`}>
            {arg.event.title}
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
      height="65vh"
      slotMinTime="07:00:00"
      slotMaxTime="20:00:00"
      locale="vi" // tiếng Việt
      allDaySlot={false}
    />
  );
};
