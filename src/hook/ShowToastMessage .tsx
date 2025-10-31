import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToastMessage = (message: string) => {
  toast.success(message, {
    position: "top-center",
  });
};
