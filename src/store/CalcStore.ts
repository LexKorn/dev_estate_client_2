import {makeAutoObservable} from 'mobx'

export default class CalcStore {
    _price: number;
    _initial: number;
    _years: number;
    _percent: number;

    constructor() {
        this._price = 15000000;
        this._initial = 5000000;
        this._years = 10;
        this._percent = 10;

        makeAutoObservable(this);
    }

    setPrice(price: number) {
        this._price = price;
    }
    setInitial(initial: number) {
        this._initial = initial;
    }
    setYears(years: number) {
        this._years = years;
    }
    setPercent(percent: number) {
        this._percent = percent;
    }

    get price() {
        return this._price;
    }
    get initial() {
        return this._initial;
    }
    get years() {
        return this._years;
    }
    get percent() {
        return this._percent;
    }
}