import { $authHost } from "./index";

export const createCompare = async (idOfFlat: number) => {
    const {data} = await $authHost.post('api/compares', {idOfFlat}); 
    return data;
};

export const fetchCompares = async () => {
    const {data} = await $authHost.get('api/compares');
    return data;
};

export const deleteCompare = async (id: number) => {
    const {data} = await $authHost.delete('api/compares/' + id);
    return data;
};