import { $authHost } from "./index";

export const createReserve = async (idOfFlat: number) => {
    const {data} = await $authHost.post('api/reserves', {idOfFlat}); 
    return data;
};

export const fetchReserve = async () => {
    const {data} = await $authHost.get('api/reserves');
    return data;
};

export const updateReserve = async (idOfFlat: number | null) => {
    const {data} = await $authHost.put('api/reserves', {idOfFlat});
    return data;
};

export const deleteReserve = async (id: number) => {
    const {data} = await $authHost.delete('api/reserves/' + id);
    return data;
};