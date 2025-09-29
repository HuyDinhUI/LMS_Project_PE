

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export type EventType = {
    id: string,
    title: string,
    start: string,
    end: string
}

type props = {
    data: EventType[]
}

export const Calendar = ({data}:props) => {
    return (
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar = {{left: "prev,next today",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay"}}
        events={data}
        height="65vh"
        slotMinTime="07:00:00"
        slotMaxTime="20:00:00"
        locale="vi" // tiếng Việt
        allDaySlot={false}
        eventBackgroundColor=""
         />
        
    )
}