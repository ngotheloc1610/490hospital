import { KEY_LOCAL_STORAGE } from "../../Contants/general.constant";

export const defineConfigGet = (param: any) => {
    const data = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem(KEY_LOCAL_STORAGE.AUTHEN)}` },
        params: param
    }
    return data;
}

export const defineConfigPost = () => {
    const data = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem(KEY_LOCAL_STORAGE.AUTHEN)}` }
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