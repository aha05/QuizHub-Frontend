import { Toaster } from "react-hot-toast";
import { toastStyles } from "@/utils/toastStyles";

export const AppToaster = () => {
  return <Toaster position="top-right" reverseOrder={false} toastOptions={toastStyles} />;
};
