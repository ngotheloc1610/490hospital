import { toast } from 'react-toastify';

const timeout = 3000;

export const success = (msg: any) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: timeout,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const error = (msg: any) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: timeout,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const warn = (msg: any) => {
    toast.warn(msg, {
        position: "top-right",
        autoClose: timeout,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}