import { $authHost } from "./index";

export const createMessage = async (text: string, sender: string) => {
    const {data} = await $authHost.post('api/messages', {text, sender}); 
    return data;
};

export const fetchMessages = async () => {
    const {data} = await $authHost.get('api/messages');
    return data;
};

export const deleteMessages = async () => {
    const {data} = await $authHost.delete('api/messages/');
    return data;
};