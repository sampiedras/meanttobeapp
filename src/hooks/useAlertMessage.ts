import { alert, AlertOptions, toast, ToastOptions } from "@baronha/ting";

export const userAlertMessage = () => {
  const showSuccessMessage = (message: string) => {
    const options = {
      title: "Done 😎",
      message: message,
    };
    toast(options);
  };

  const showErrorMessage = (message: string) => {
    const options: ToastOptions = {
      title: "Error 🚨",
      message: message,
      messageColor: "#F87171",
      titleColor: "#F87171",
      backgroundColor: "#FFFFFF",
      preset: "error",
      icon: {
        tintColor: "white",
      },
    };
    toast(options);
  };

  const showErrorAlert = (message: string) => {
    const options: AlertOptions = {
      title: "Error:",
      message: message,
      messageColor: "#000000",
      titleColor: "#000000",
      backgroundColor: "#FECACA",
      preset: "error",
      blurBackdrop: 20,
      backdropOpacity: 0.5,
      icon: {
        tintColor: "white",
      },
    };
    alert(options);
  };

  return { showSuccessMessage, showErrorMessage, showErrorAlert };
};
