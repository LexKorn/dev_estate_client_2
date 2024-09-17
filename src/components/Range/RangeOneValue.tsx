import React, {useState, useEffect, useContext, useRef} from 'react';
import {observer} from 'mobx-react-lite'

import { Context } from '../..';
import { convertNumToStr, convertStrToNum } from '../../utils/calc';

import './range.sass';

interface RangeOneValueProps {
    id: string;
    title: string;
    minValue: number;
    maxValue: number;
    step: number;
    init: number;
    btn1: string;
    btn2: string;
    btn3: string;
    btn4: string;
}


const RangeOneValue: React.FC<RangeOneValueProps> = observer(({id, title, minValue, maxValue, step, init, btn1, btn2, btn3, btn4}) => {
    const [value, setValue] = useState(init);
    const [maxRange, setMaxRange] = useState(init);
    const [right, setRight] = useState(init);
    const {calc} = useContext(Context);
    const inputRef = useRef(null);
    
    const handlerMaxPrice = () => {
        setMaxRange(value);
        setRight(100 - ((value - minValue) * 100 )/ (maxValue - minValue));
    };

    const handlerMaxRange = () => {
        setValue(maxRange);
        setRight(100 - ((maxRange - minValue) * 100 )/ (maxValue - minValue));
    };

    useEffect(() => {
        if (value > maxValue) {
        }
        handlerMaxPrice();

        switch (id) {
            case "price-mortgage":
                calc.setPrice(value);
                break;
            case "initial":
                calc.setInitial(value);
                break;
            case "years":
                calc.setYears(value);
                break;
            case "percent":
                calc.setPercent(value);
                break;
        }
    }, [value]);

    useEffect(() => {
        handlerMaxRange();
    }, [maxRange]);

    // @ts-ignore
    const handlerValue = (e) => {
        if (e.target.outerText.includes('млн')) {
            setValue(parseFloat(e.target.outerText) * 1000000);
        } else {
            setValue(parseFloat(e.target.outerText));
        }
    };
    
    const handleInputClick = () => {
        //@ts-ignore
        inputRef.current.select();
    };


    return (
        <div className="range__wrapper">
            <div className="range__title">{title}</div>
            <div className="range__value">
                <input 
                    type="text" 
                    className="range__value_input range__value_input-max" 
                    ref={inputRef}
                    onClick={handleInputClick}
                    value={convertNumToStr(value)} 
                    onChange={e => {
                        (convertStrToNum(e.target.value) > minValue) ? 
                            (convertStrToNum(e.target.value) > maxValue) ? setValue(maxValue) : setValue(convertStrToNum(e.target.value))
                        : setValue(minValue)
                    }} 
                />
            </div>
            <div className="range__slider">
                <div className="range__slider_progress" style={{left: `0%`, right: `${right}%`}}></div>
            </div>
            <div className="range__range">
                <input 
                    type="range" 
                    className="range__range_input range__range_input-max" 
                    min={minValue} 
                    max={maxValue} 
                    value={maxRange} 
                    step={step} 
                    onChange={e => setMaxRange(+e.target.value)} 
                />
            </div>
            <div className="range__btns">
                <div className="range__btns_btn" onClick={e => handlerValue(e)}>{btn1}</div>
                <div className="range__btns_btn" onClick={e => handlerValue(e)}>{btn2}</div>
                <div className="range__btns_btn" onClick={e => handlerValue(e)}>{btn3}</div>
                <div className="range__btns_btn" onClick={e => handlerValue(e)}>{btn4}</div>
            </div>
        </div>
    );
});

export default RangeOneValue;