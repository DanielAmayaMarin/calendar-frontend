
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUIStore";

const FabDelete = () => {
  const { startDeleteEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    startDeleteEvent()
  };

  return (
    <button style={{display: !hasEventSelected && 'none'}} onClick={handleDelete} className="btn btn-danger fab-dange">
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};

export default FabDelete;
