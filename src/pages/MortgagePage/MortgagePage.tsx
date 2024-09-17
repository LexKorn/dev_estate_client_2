import React, {useContext, useEffect, useState} from 'react'
import { Container } from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import {Helmet} from "react-helmet"

import RangeOneValue from '../../components/Range/RangeOneValue'
import { Context } from '../..'
import { convertNumToStr } from '../../utils/calc' 

import './mortgagePage.sass'


const MortgagePage: React.FC = observer(() => {
    const {calc} = useContext(Context);
    const [income, setIncome] = useState<number>(0);
    const [percentPay, setPercentPay] = useState<number>(0);
    const [credit, setCredit] = useState<number>(0);
    const [monthPay, setMonthPay] = useState<number>(0);

    const calcMonthPay = (price: number, initial: number, years: number, percent: number) => {
        const G: number = percent / (100 * 12);
        const S: number = Math.pow((1 + G), years * 12);
        const cMonthPay = Math.round((price - initial) * (G * S) / (S - 1));
        setMonthPay(cMonthPay);
    };

    useEffect(() => {
        calcMonthPay(calc.price, calc.initial, calc.years, calc.percent);
        setCredit(calc.price - calc.initial);
    }, [calc.price, calc.initial, calc.years, calc.percent]);

    useEffect(() => {
        setPercentPay(monthPay * calc.years * 12 - (calc.price - calc.initial));
        setIncome(Math.round(monthPay * 1.667));
    }, [monthPay]);

    return (
        <Container className='mortgage'>
            <Helmet>
                <title>Estate | Калькулятор</title>
                <meta name="description" content="Ипотечный калькулятор" />
            </Helmet>
            <div className="mortgage__title">Ипотечный калькулятор</div>
            <div className="mortgage__wrapper">
                <div className="mortgage__wrapper_left">
                    <div className="mortgage__range">
                        <RangeOneValue 
                            id="price-mortgage" 
                            title='Стоимость квартиры, руб.' 
                            minValue={750000} 
                            maxValue={30000000} 
                            step={10000} 
                            init={15000000}
                            btn1="3 млн"
                            btn2="6 млн"
                            btn3="10 млн"
                            btn4="15 млн"
                        />
                        <RangeOneValue 
                            id="initial" 
                            title='Первый взнос, руб' 
                            minValue={500000} 
                            maxValue={30000000} 
                            step={10000} 
                            init={5000000}
                            btn1="0.5 млн"
                            btn2="1 млн"
                            btn3="3 млн"
                            btn4="5 млн"
                        />
                        <RangeOneValue 
                            id="years" 
                            title='Срок кредита, лет' 
                            minValue={1} 
                            maxValue={30} 
                            step={1} 
                            init={10}
                            btn1="5 лет"
                            btn2="10 лет"
                            btn3="15 лет"
                            btn4="20 лет"
                        />
                        <RangeOneValue 
                            id="percent" 
                            title='Процентная ставка' 
                            minValue={0.1} 
                            maxValue={30} 
                            step={0.1} 
                            init={10}
                            btn1="0.1%"
                            btn2="4.5%"
                            btn3="6%"
                            btn4="10%"
                        />
                    </div>
                </div>
                <div className="mortgage__wrapper_right">
                    <div className="mortgage__result_title">Ежемесячный платёж: <br/> <span>{convertNumToStr(monthPay)} руб.</span></div>
                    <div className="mortgage__result_text">Кредит: <span>{convertNumToStr(credit)} руб.</span></div>
                    <div className="mortgage__result_text">Проценты: <span>{convertNumToStr(percentPay)} руб.</span></div>
                    <div className="mortgage__result_text">Необходимый доход: <span>{convertNumToStr(income)} руб/мес</span></div>
                </div>
            </div>
        </Container>
    )
})

export default MortgagePage