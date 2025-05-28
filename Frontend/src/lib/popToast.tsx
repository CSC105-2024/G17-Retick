import { Flip, toast, TypeOptions } from "react-toastify";

// Manually define acceptable theme values as a union type
type ToastTheme = "light" | "dark" | "colored";

const popToast = (
  message: string,
  type: TypeOptions = "default",
  theme: ToastTheme = "light"
): void => {
  toast(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    pauseOnFocusLoss: false,
    theme,
    transition: Flip,
    type,
    className: "toast-custom-font",
  });
};

export default popToast;
