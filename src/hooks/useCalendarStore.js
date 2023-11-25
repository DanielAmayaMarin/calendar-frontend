import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`/event/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      const { data } = await calendarApi.post("/event", calendarEvent);
      dispatch(
        onAddNewEvent({ ...calendarEvent, id: data.data.evento.id, user })
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data?.msg, "error");
    }
  };

  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`/event/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", "Se presento un error inesperado", "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/event");
      const events = convertEventsToDateEvents(data.data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {}
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    startDeleteEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents,
  };
};
