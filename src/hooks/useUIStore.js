import { useDispatch, useSelector } from "react-redux";
import { onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { isDateModalOpen } = useSelector((state) => state.ui);
  const toggleDateModal = () => {
    dispatch(onOpenDateModal());
  };

  return {
    isDateModalOpen,
    toggleDateModal
  };
};
