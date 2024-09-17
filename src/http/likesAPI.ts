import { $authHost } from "./index";

export const createLike = async (idOfFlat: number) => {
    const {data} = await $authHost.post('api/likes', {idOfFlat}); 
    return data;
};

export const fetchLikes = async () => {
    const {data} = await $authHost.get('api/likes');
    return data;
};

export const deleteLike = async (id: number) => {
    const {data} = await $authHost.delete('api/likes/' + id);
    return data;
};