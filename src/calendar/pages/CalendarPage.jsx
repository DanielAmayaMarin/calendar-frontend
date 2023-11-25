import Navbar from "../components/Navbar";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesEs } from "../../helpers/getMessages";
import CalendarEvent from "../components/CalendarEvent";
import { useState } from "react";
import CalendarModal from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUIStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import FabAddNew from "../components/FabAddNew";
import FabDelete from "../components/FabDelete";
import { useEffect } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";



const CalendarPage = () => {
  const {user} = useAuthStore()
  const {toggleDateModal} = useUiStore()
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'agenda')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
  
    const style = {
      backgroundColor: isMyEvent ?  "#347CF7": "465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    isMyEvent && toggleDateModal()
    
  }

  const onSelect = (event) => {
    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
    isMyEvent && setActiveEvent(event)
    
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  useEffect(() => {
    startLoadingEvents()
  },[])

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "90vh" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabDelete />
      <FabAddNew/>
      
    </>
  );
};

export default CalendarPage;
