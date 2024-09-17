export interface IFlat {
    id: number;
    date: string;
    time: string;
    geo_lat: number;
    geo_lon: number;
    region: number;
    building_type: number;
    object_type: number;
    level: number;
    levels: number;
    rooms: number;
    area: number;
    kitchen_area: number;
    price: number;
}

export interface ILike {
    id: number;
    idOfFlat: number;
    userId: number;
}

export interface IMessage {
    id: number;
    text: string;
    sender: string;
    userId: number;
};