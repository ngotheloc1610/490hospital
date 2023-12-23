import moment from "moment";
import { FORMAT_DATE_MONTH_YEAR, FORMAT_TIME, KEY_LOCAL_STORAGE } from "../../Contants/general.constant";

export const defineConfigGet = (param: any) => {
    const data = {
        headers: { Authorization: `Bearer ${localStorage.getItem(KEY_LOCAL_STORAGE.AUTHEN)}` },
        params: param
    }
    return data;
}

export const defineConfigPost = () => {
    const data = {
        headers: { Authorization: `Bearer ${localStorage.getItem(KEY_LOCAL_STORAGE.AUTHEN)}` }
    }
    return data;
}

export const chunkArraySplice = (array: any, chunkSize: number) => {
    const chunkedArray = [];

    while (array.length) {
        chunkedArray.push(array.splice(0, chunkSize));
    }

    return chunkedArray;
};

export function convertDateToTimeStamp(value: string, time: string) {
    const newDate = `${value} ${time}`
    return Date.parse(newDate);
}

export const convertToDate = (time: string) => {
    const date = moment(time);
    return date.format(FORMAT_DATE_MONTH_YEAR);
}

export const convertToTime = (time: string) => {
    const date = moment(time);
    return date.format(`${FORMAT_TIME} A`);
}

export const styleStatus = (status: string) => {
    switch (status) {
        case "no show":
            return "no-show";
        case "cancel":
            return "canceled";
        case "fulfilled":
            return "fulfilled";
        case "pending":
            return "pending";
        case "proposed":
            return "proposed";
        case "booked":
            return "booked";
        case "arrived":
            return "arrived";
        default:
            return;
    }
}