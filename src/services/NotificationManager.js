import { toast } from "react-toastify";

export function notifyError(message) {
    toast(message, {
        autoClose: 7000,
        type: toast.TYPE.ERROR,
        position: toast.POSITION.TOP_CENTER
    });
}

export function notifySuccess(message) {
    toast(message, {
        type: toast.TYPE.SUCCESS,
        autoClose: 4000,
        position: toast.POSITION.TOP_CENTER
    });
}