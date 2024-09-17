import { ILike } from "../types/types";

export const convertNumToStr = (num: number) => {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const convertStrToNum = (str: string) => {
    return Number(str.replace(/\s+/g, ''));
};

export const textDate = (date: string): string => {
    const str = new Date(date).toUTCString().substring(5, 17);
    let ruStr: string;

    ruStr = str.replace(/Jan/g, 'Янв').replace(/Feb/g, 'Фев').replace(/Mar/g, 'Мар').replace(/Apr/g, 'Апр').replace(/May/g, 'Мая').replace(/Jun/g, 'Июн').replace(/Jul/g, 'Июл').replace(/Aug/g, 'Авг').replace(/Sep/g, 'Сен').replace(/Oct/g, 'Окт').replace(/Nov/g, 'Ноя').replace(/Dec/g, 'Дек');

    return ruStr;
};

export const trimString = (str: string): string => {
    let newStr: string = str;

    if (str.length > 30) {
        newStr = str.substring(0, 30) + '...';
    }

    return newStr;
};

export const calcMonthPay = (price: number, initPay: number, months: number, percent: number) => {
    const monthPay = Math.round((price - initPay) * ((percent * Math.pow((1 + percent), months)) / (Math.pow((1 + percent), months) - 1)));
    const totalSum = initPay + months * monthPay;
    const result = {monthPay, totalSum};

    return result;
};

export const convertBuilding = (num: number) => {
    const res = 
        num === 1 ? 
        ' панельное' 
        : num === 2 ? 
        ' монолитное' 
        : num === 3 ? 
        ' кирпичное' 
        : num === 4 ? 
        ' блочное' 
        : num === 5 ? 
        ' деревянное' 
        :
        ' другое'
    return res;
};

export const _transformObjToArr = (arr: ILike[]) => {
    let res: number[] = [];
    let arr2 = arr.map(({idOfFlat}) => ({idOfFlat}));

    for (let i = 0; i < arr2.length; i++) {
        res.push(...Object.values(arr2[i]))
    }
    return res;
}

const rundomNumberInRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const index = (arr: string[]) => rundomNumberInRange(0, arr.length - 1);

export const url = (lat: number, lon: number): string => {
    return `https://geotree.ru/coordinates?lat=${lat}&lon=${lon}&z=10&mlat=${lat}&mlon=${lon}&c=`;
}