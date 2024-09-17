import React, {useState, useContext} from 'react'
import {Card} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'

import { IFlat } from '../../types/types';
import { convertNumToStr, textDate } from '../../utils/calc';
import { convertRegion } from '../../utils/regions';
import { room_1, room_2, room_3, room_4, room_s } from '../../assets/img';
import { Context } from '../..';

import './flatCard.sass';

interface FlatCardProps {
    flat: IFlat;
    onClick: (flat: IFlat) => void;
};

function noop() {}

const FlatCard: React.FC<FlatCardProps> = observer(({flat, onClick}) => {
    const [classHover, setClassHover] = useState<string>('');
    const {account} = useContext(Context);

    const hoverHandler = () => {
        flat.object_type === 1 ? setClassHover('hover-second') : setClassHover('hover-first');
    };

    return (
        <Card 
                className={"flat-card" + ' ' + classHover}
                onClick={() => flat.id === account.idOfReserv ? noop() : onClick(flat)}
                style={{
                    border: flat.object_type === 1 ? '2px solid #ffdd2d' : '4px solid #D0F4F2', 
                    opacity: flat.id === account.idOfReserv ? 0.5 : 1, 
                    cursor: flat.id === account.idOfReserv ? 'default' : 'pointer'
                }}
                onMouseOver={() => flat.id === account.idOfReserv ? noop() : hoverHandler()}
                onMouseLeave={() => setClassHover('')}
            >
                <div className="flat-card__date">
                    {textDate(flat.date)}
                </div>
                <div className="flat-card__wrapper">
                    <div className="flat-card__left">
                        {flat.rooms === 1 ?
                            <img src={room_1} alt="1-room" />
                            : flat.rooms === 2 ?
                            <img src={room_2} alt="2-rooms" />
                            : flat.rooms === 3 ?
                                <img src={room_3} alt="3-rooms" />
                            : flat.rooms >= 4 ?
                                <img src={room_4} alt="4-rooms" />
                            :
                            <img src={room_s} alt="studio" />
                        }
                    </div>
                    <div className="flat-card__middle">
                        <div className="flat-card__middle_flat">{flat.rooms === -1 ? 'Студия' : flat.rooms + '-комнатная'} {flat.area} м<sup>2</sup></div>
                        <div>Этаж: {flat.level} из {flat.levels}</div>
                        <div>Тип здания: 
                            {flat.building_type === 1 ? 
                                ' панельное' 
                                : flat.building_type === 2 ? 
                                ' монолитное' 
                                : flat.building_type === 3 ? 
                                ' кирпичное' 
                                : flat.building_type === 4 ? 
                                ' блочное' 
                                : flat.building_type === 5 ? 
                                ' деревянное' 
                                :
                                ' другое'
                            }
                        </div>
                        <div className="flat-card__middle_region">Регион: {convertRegion(flat.region)}</div>
                        <div>{flat.object_type === 1 ? 'Вторичка' : 'Новостройка'}</div>
                    </div>
                    <div className="flat-card__right">
                        <div className="flat-card__right_price">{convertNumToStr(flat.price)} руб.</div>
                        <div className="flat-card__right_subprice">или {convertNumToStr(Math.ceil(flat.price / flat.area))} за м<sup>2</sup></div>
                    </div>
                </div>
            </Card>  
    )
});

export default FlatCard