import { useSnackbarStore } from "~/store/snackbar";

const useErrorHandler = (err) => {
  const snackbar = useSnackbarStore();
  if (err?.data) {
    if (err?.data?.non_field_errors) {
      snackbar.displaySnackbar("error", err?.data?.non_field_errors[0]);
    } else if (typeof err?.data[0] === "string") {
      if (+err?.statusCode >= 500 || +err?.status >= 500) {
        snackbar.displaySnackbar(
          "error",
          "Something went wrong. Our team has been notified."
        );
      } else {
        if (Array.isArray(err?.data)) {
          snackbar.displaySnackbar("error", err?.data[0]);
        } else {
          const msg = JSON.stringify(err?.data);
          snackbar.displaySnackbar(
            "error",
            msg.length < 200 ? msg : "Unexpected error"
          );
        }
      }
    } else {
      // Catch all for anything (detail not found, etc.)
      snackbar.displaySnackbar("error", "Something went wrong.");
    }
  } else {
    snackbar.displaySnackbar("error", err.message);
  }
};

export default useErrorHandler;
