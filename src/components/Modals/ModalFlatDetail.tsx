import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {Modal, Tab, Tabs} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'

import { IFlat } from '../../types/types'
import { Context } from '../..'
import { textDate, convertNumToStr, convertBuilding, url } from '../../utils/calc'
import {createLike, deleteLike} from '../../http/likesAPI'
import {createCompare, deleteCompare} from '../../http/comparesAPI'
import { createReserve, updateReserve } from '../../http/reservesAPI'
import { convertRegion } from '../../utils/regions'
import { LOGIN_ROUTE } from '../../utils/consts'
import Slider from '../Slider/Slider';
import { room_1, room_2, room_3, room_4, room_s, 
    room_1_plan, room_2_plan, room_3_plan, room_4_plan, room_s_plan, 
    arrOfImg1, arrOfImg2, arrOfImg3, arrOfImg4, arrOfImgS } from '../../assets/img';

import './modalFlatDetail.sass'

interface ModalFlatDetailProps {
    show: boolean;
    onHide: () => void;
    flat: IFlat;
};


const ModalFlatDetail: React.FC<ModalFlatDetailProps> = observer(({show, onHide, flat}) => {
    const {account, user} = useContext(Context);
    const [arrOfLikeIds, setArrOfLikeIds] = useState<number[]>([]);
    const [arrOfCompareIds, setArrOfCompareIds] = useState<number[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setArrOfLikeIds(account.arrOfLikeIds);
    }, [account.arrOfLikeIds]);

    useEffect(() => {
        setArrOfCompareIds(account.arrOfCompareIds);
    }, [account.arrOfCompareIds]);

    function loginFunc () {
        if (window.confirm('Необходима авторизация! \nПерейти на страницу авторизации?')) {
            navigate(LOGIN_ROUTE);
        }
    }

    const addLike = () => {
        if (user.isAuth) {
            createLike(flat.id);
            account.setArrOfLikeIds(flat.id);
        } else {
            loginFunc();
        }
    }

    const addCompare = () => {
        if (user.isAuth) {
            createCompare(flat.id);
            account.setArrOfCompareIds(flat.id);
        } else {
            loginFunc();
        }
    }

    const addReserve = () => {
        if (user.isAuth) {
            // createReserve(flat.id);
            updateReserve(flat.id);
            account.setIdOfReserv(flat.id);
        } else {
            loginFunc();
        }
    }

    const removeLike = () => {
        deleteLike(flat.id);
        account.setArrOfLikeIdsRemove(flat.id);
    }
    
    const removeCompare = () => {
        deleteCompare(flat.id);
        account.setArrOfCompareIdsRemove(flat.id);
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            >
            <Modal.Body 
                className="flat-detail"
                style={{border: flat.object_type === 1 ? '2px solid #ffdd2d' : '2px solid #D0F4F2', borderRadius: '20px'}}
            >
                <div className="flat-detail__wrapper">
                    <div className="flat-detail__img">
                        <Tabs
                            defaultActiveKey="flat"
                            id="fill-tab-example"
                            className="flat-detail__img_tabs"
                            fill
                        >
                            <Tab eventKey="flat" title="План квартиры" >
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
                            </Tab>
                            <Tab eventKey="plan" title="План этажа" >
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
                            </Tab>
                            <Tab eventKey="photos" title="Фотографии" >
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
                            </Tab>
                        </Tabs>
                    </div>
                    <div className="flat-detail__info">
                        <div className="flat-detail__info_flat">{flat.rooms === -1 ? 'Студия' : flat.rooms + '-комнатная'} {flat.area} м<sup>2</sup></div>
                        <div className="flat-detail__info_price">{convertNumToStr(flat.price)} руб.</div>
                        <div className="flat-detail__info_subprice">или {convertNumToStr(Math.ceil(flat.price / flat.area))} за м<sup>2</sup></div>
                        <div className="flat-detail__info_info">Этаж: {flat.level} из {flat.levels}</div>
                        <div className="flat-detail__info_info">Площадь кухни: {flat.kitchen_area} м<sup>2</sup></div>
                        <div className="flat-detail__info_info">Тип здания: {convertBuilding(flat.building_type)}</div>
                        <div className="flat-detail__info_info">{flat.object_type === 1 ? 'Вторичка' : 'Новостройка'}</div>
                        <div className="flat-detail__info_info">{convertRegion(flat.region)}</div>
                        <div className="flat-detail__info_icons">
                            {arrOfLikeIds.length && arrOfLikeIds.includes(flat.id) ?
                                <i className="bi bi-heart-fill flat-detail__info_icons-item" onClick={removeLike} data-tooltip="удалить из Избранного"></i>
                                :
                                <i className="bi bi-heart flat-detail__info_icons-item" onClick={addLike} data-tooltip="в Избранное"></i>
                            }
                            {arrOfCompareIds.length && arrOfCompareIds.includes(flat.id) ?
                                <i className="bi bi-card-checklist flat-detail__info_icons-item" onClick={removeCompare} data-tooltip="Удалить из сравнения"></i>
                                :
                                <i className="bi bi-list-task flat-detail__info_icons-item" onClick={addCompare} data-tooltip="Сравнить"></i>
                            }
                            <i 
                                className="bi bi-basket2 flat-detail__info_icons-item" 
                                onClick={addReserve} 
                                data-tooltip="Забронировать"
                                style={{visibility: account.idOfReserv ? 'hidden' : 'visible'}}>
                            </i>
                        </div>
                    </div>
                </div>
                <a className="flat-detail__link" href={url(flat.geo_lat, flat.geo_lon)} target="_blank" rel="noreferrer" >на карте</a>
                <div className="flat-detail__date">
                    Публикация: {textDate(flat.date)}
                    {flat.time?.substring(0, 5)}
                </div>
            </Modal.Body>
        </Modal>
    )
})

export default ModalFlatDetail