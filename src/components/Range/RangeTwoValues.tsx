import React, {useState, useEffect, useContext} from 'react';

import { Context } from '../..';
import { convertNumToStr, convertStrToNum } from '../../utils/calc';

import './range.sass';

interface RangeTwoValuesProps {
    id: string;
    title: string;
    min: number;
    max: number;
    step: number;
    gap: number;
    reset: boolean;
}


const RangeTwoValues: React.FC<RangeTwoValuesProps> = ({id, title, min, max, step, gap, reset}) => {
    const [minRange, setMinRange] = useState<number>(min);
    const [maxRange, setMaxRange] = useState<number>(max);
    const [left, setLeft] = useState<number>(min);
    const [right, setRight] = useState<number>(max);
    const [valueMin, setValueMin] = useState<number>(min);
    const [valueMax, setValueMax] = useState<number>(max);
    const {filter} = useContext(Context);

    const handlerMinPrice = () => {
        if ((valueMax - valueMin >= gap) && valueMax <= max) {
            setMinRange(valueMin);            
            setLeft((valueMin / max) * 100);
        }
    };

    const handlerMaxPrice = () => {
        if ((valueMax - valueMin >= gap) && valueMax <= max) {
            setMaxRange(valueMax);
            setRight(100 - (valueMax / max) * 100);
        }
    };

    const handlerMinRange = () => {
        if (maxRange - minRange < gap) {
            setMinRange(maxRange - gap);
        } else {
            setValueMin(minRange);
            setLeft((minRange / max) * 100);
        }
    };

    const handlerMaxRange = () => {
        if (maxRange - minRange < gap) {
            setMaxRange(minRange + gap);
        } else {
            setValueMax(maxRange);
            setRight(100 - (maxRange / max) * 100);
        }
    };

    useEffect(() => {
        handlerMinPrice();
        handlerMaxPrice();

        switch (id) {
            case "price-main":
                filter.setPriceMin(valueMin);
                filter.setPriceMax(valueMax);
                break;
            case "area":
                filter.setAreaMin(valueMin);
                filter.setAreaMax(valueMax);
                break;
            case "level":
                filter.setLevelMin(valueMin);
                filter.setLevelMax(valueMax);
                break;
        }
    }, [valueMin, valueMax]);

    useEffect(() => {
        handlerMinRange();
        handlerMaxRange();
    }, [minRange, maxRange]);

    useEffect(() => {
        setValueMin(min);
        setValueMax(max);
    }, [reset]);
    

    return (
        <div className="range__wrapper">
            <div className="range__title">{title}</div>
            <div className="range__value">
                <input 
                    type="text" 
                    className="range__value_input range__value_input-min" 
                    value={convertNumToStr(valueMin)} 
                    onChange={e => setValueMin(convertStrToNum(e.target.value))} 
                />
                <input 
                    type="text" 
                    className="range__value_input range__value_input-max" 
                    value={convertNumToStr(valueMax)} 
                    onChange={e => setValueMax(convertStrToNum(e.target.value))} 
                />
            </div>
            <div className="range__slider">
                <div className="range__slider_progress" style={{left: `${left}%`, right: `${right}%`}}></div>
            </div>
            <div className="range__range">
                <input type="range" className="range__range_input range__range_input-min" min={min} max={max} value={minRange} step={step} onChange={e => setMinRange(+e.target.value)} />
                <input type="range" className="range__range_input range__range_input-max" min={min} max={max} value={maxRange} step={step} onChange={e => setMaxRange(+e.target.value)} />
            </div>
        </div>
    );
};

export default RangeTwoValues;