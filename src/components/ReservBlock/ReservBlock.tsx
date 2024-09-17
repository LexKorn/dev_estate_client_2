import React, {useContext} from 'react'
import {Button} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import {useNavigate} from 'react-router-dom'

import { IFlat } from '../../types/types'
import { textDate, convertNumToStr, convertBuilding, url } from '../../utils/calc'
import { deleteReserve, updateReserve } from '../../http/reservesAPI'
import { MAIN_ROUTE } from '../../utils/consts'
import { Context } from '../..'
import { convertRegion } from '../../utils/regions'
import Slider from '../Slider/Slider';
import { room_1, room_2, room_3, room_4, room_s, 
    room_1_plan, room_2_plan, room_3_plan, room_4_plan, room_s_plan, 
    arrOfImg1, arrOfImg2, arrOfImg3, arrOfImg4, arrOfImgS } from '../../assets/img';
import './reservBlock.sass'

interface ReservBlockProps {
    flat: IFlat
}


const ReservBlock: React.FC<ReservBlockProps> = observer(({flat}) => {
    const {account} = useContext(Context);
    const navigate = useNavigate();

    const onCancel = () => {
        // deleteReserve(flat.id);
        updateReserve(null);
        account.setIdOfReservRemove();
        navigate(MAIN_ROUTE);
    };

    return (
        <div className='reserve'>
            {Boolean(flat?.id) ?
                <div>
                    <div className="reserve__title">
                        <div className="reserve__title_flat">{flat.rooms === -1 ? 'Студия' : flat.rooms + '-комнатная'} {flat.area} м<sup>2</sup></div>
                        <div className="reserve__title_price">{convertNumToStr(flat.price)} руб.</div>
                        <div className="reserve__title_subprice">(или {convertNumToStr(Math.ceil(flat.price / flat.area))} за м<sup>2</sup>)</div>
                    </div>
                    <div className="reserve__plans">
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
                        {flat.rooms === 1 ?
                            <img src={room_1_plan} alt="1-room-plan" />
                            : flat.rooms === 2 ?
                            <img src={room_2_plan} alt="2-rooms-plan" />
                            : flat.rooms === 3 ?
                                <img src={room_3_plan} alt="3-rooms-plan" />
                            : flat.rooms >= 4 ?
                                <img src={room_4_plan} alt="4-rooms-plan" />
                            :
                            <img src={room_s_plan} alt="studio-plan" />
                        }
                    </div>
                    <div className="reserve__info">
                        <div className="reserve__info_item">Этаж: <span>{flat.level} из {flat.levels}</span></div>
                        <div className="reserve__info_item">Площадь кухни: <span>{flat.kitchen_area} м<sup>2</sup></span></div>
                        <div className="reserve__info_item">Тип здания: <span>{convertBuilding(flat.building_type)}</span></div>
                        <div className="reserve__info_item">{flat.object_type === 1 ? 'Вторичка' : 'Новостройка'}</div>
                        <div className="reserve__info_item">{convertRegion(flat.region)}</div>
                        <a className="reserve__info_link" href={url(flat.geo_lat, flat.geo_lon)} target="_blank" rel="noreferrer" >на карте &rarr;</a>
                        <div className="reserve__info_date">
                            Публикация: {textDate(flat.date)}
                            {flat.time?.substring(0, 5)}
                        </div>
                    </div>
                    <div className="reserve__slider">
                        {flat.rooms === 1 ?
                            <Slider photos={arrOfImg1} />
                            : flat.rooms === 2 ?
                                <Slider photos={arrOfImg2} />
                            : flat.rooms === 3 ?
                                <Slider photos={arrOfImg3} />
                            : flat.rooms >= 4 ?
                                <Slider photos={arrOfImg4} />
                            :
                            <Slider photos={arrOfImgS} />
                        }
                    </div>
                    <Button variant={"outline-secondary"} className="reserve__btn" onClick={onCancel}>Отменить бронирование</Button>
                </div>
                :
                <div>Зарезервированных квартир ещё нет...</div>
            }
        </div>
    )
});

export default ReservBlock