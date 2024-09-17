import React, {useState, useContext, useEffect} from 'react'
import {Spinner, Tab, Tabs, Button} from 'react-bootstrap'
import {Helmet} from "react-helmet"
import {observer} from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import List from '../../components/List/List'
import FlatCard from '../../components/FlatCard/FlatCard'
import Pageup from '../../components/Pageup/Pageup'
import ModalFlatDetail from '../../components/Modals/ModalFlatDetail'
import TableFlats from '../../components/TableFlats/TableFlats'
import ChatBlock from '../../components/ChatBlock/ChatBlock'
import ReservBlock from '../../components/ReservBlock/ReservBlock'
// import { flatsDB } from '../../utils/flatsDB'
import {_transformObjToArr} from '../../utils/calc'
import {MAIN_ROUTE} from '../../utils/consts';
import { IFlat, ILike } from '../../types/types'
import { Context } from '../..'
import {fetchLikes} from '../../http/likesAPI'
import {fetchCompares} from '../../http/comparesAPI'
import {fetchAllFlats} from '../../http/flatsAPI'
import {fetchReserve} from '../../http/reservesAPI'

import './accountPage.sass'


const AccountPage: React.FC = observer(() => {
    const [flat, setFlat] = useState<IFlat>({} as IFlat);
    const [flats, setFlats] = useState<IFlat[]>([]);
    const [likedFlats, setLikedFlats] = useState<IFlat[]>([]);
    const [comparedFlats, setComparedFlats] = useState<IFlat[]>([]);
    const [reservedFlat, setReservedFlat] = useState<IFlat>({} as IFlat);
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [arrOfLikeIds, setArrOfLikeIds] = useState<ILike[]>([]);
    const [arrOfCompareIds, setArrOfCompareIds] = useState<ILike[]>([]);
    const [idOfReserv, setIdOfReserv] = useState<ILike | null>(null);
    const {account, user} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllFlats()
            .then(data => setFlats(data.rows))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false))
    }, []);

    useEffect(() => {
        fetchLikes().then(data => setArrOfLikeIds(data));
    }, [visible, flats]);

    useEffect(() => {
        fetchCompares().then(data => setArrOfCompareIds(data));
    }, [account.visible, flats]);

    useEffect(() => {
        fetchReserve().then(data => setIdOfReserv(data));
    }, [account.idOfReserv, flats]);

    useEffect(() => {
        setLikedFlats(flats.filter(flat => _transformObjToArr(arrOfLikeIds).includes(flat.id)));
        _transformObjToArr(arrOfLikeIds).forEach(item => account.setArrOfLikeIds(item));
    }, [arrOfLikeIds]);

    useEffect(() => {
        setComparedFlats(flats.filter(flat => _transformObjToArr(arrOfCompareIds).includes(flat.id)));
        _transformObjToArr(arrOfCompareIds).forEach(item => account.setArrOfCompareIds(item));
    }, [arrOfCompareIds]);

    useEffect(() => {
        if (idOfReserv?.idOfFlat) {
            setReservedFlat(flats.filter(flat => flat.id === idOfReserv.idOfFlat)[0]);
            account.setIdOfReserv(idOfReserv.idOfFlat);
        }
    }, [idOfReserv]);


    const selectFlat = (item: IFlat) => {
        setFlat(item);
        setVisible(true);
    };

    const logOut = () => {
        user.setIsAuth(false);
        account.setIdOfReservRemove();
        localStorage.clear();
        navigate(MAIN_ROUTE);
    };

    if (loading) {
        return (
            <Spinner animation={"border"} variant="warning" style={{marginTop: '100px', marginLeft: '200px'}} />
        )
    }

    return (
        <div className='account'>
            <Helmet>
                <title>Estate | Личный кабинет</title>
                <meta name="description" content="Личный кабинет" />
            </Helmet>
            <Tabs
                defaultActiveKey="like"
                id="fill-tab-example"
                className="account__tabs"
                fill
            >
                <Tab eventKey="like" title="Избранное" >
                    <List
                        items={likedFlats}
                        renderItem={(flat: IFlat) => 
                            <FlatCard
                                flat={flat}
                                onClick={(flat) => selectFlat(flat)}
                                key={flat.id}
                            />
                        } 
                    />
                </Tab>
                <Tab eventKey="compare" title="Сравнить" >
                    <TableFlats items={comparedFlats} />
                </Tab>
                <Tab eventKey="reserved" title="Бронь" >
                    <ReservBlock flat={reservedFlat} />
                </Tab>
                <Tab eventKey="write" title="Написать" >
                    <ChatBlock />
                </Tab>
            </Tabs>

            <Button 
                variant={"outline-secondary"} 
                onClick={() => logOut()} 
                className="nav-btn account__btn"
                >Выйти
            </Button>
            
            <Pageup />
            <ModalFlatDetail 
                show={visible} 
                onHide={() => setVisible(false)} 
                flat={flat}
            />
        </div>
    )
})

export default AccountPage