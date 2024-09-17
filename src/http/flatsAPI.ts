import { $host } from "./index";

export const fetchAllFlats = async () => {
    const {data} = await $host.get('api/flats?limit=2000');
    return data;
};

export const fetchPageFlats = async (page: number) => {
    const {data} = await $host.get(`api/flats?limit=25&page=${page}`);
    return data;
};

export const fetchOneFlat = async (id: number) => {
    const {data} = await $host.get('api/flats/' + id);
    return data;
};