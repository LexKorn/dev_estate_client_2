import React, {useState, useContext, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import {Spinner} from 'react-bootstrap'
import {Helmet} from "react-helmet"

import FilterPanel from '../../components/FilterPanel/FilterPanel'
import List from '../../components/List/List'
import FlatCard from '../../components/FlatCard/FlatCard'
import Pageup from '../../components/Pageup/Pageup'
import ModalFlatDetail from '../../components/Modals/ModalFlatDetail'
import { IFlat } from '../../types/types'
import { Context } from '../..'
import { fetchPageFlats, fetchAllFlats } from '../../http/flatsAPI'
import { fetchReserve } from '../../http/reservesAPI'
// import { flatsDB } from '../../utils/flatsDB'

import './mainPage.sass'


const MainPage: React.FC = observer(() => {
    const {filter, account, user} = useContext(Context);
    const [flat, setFlat] = useState<IFlat>({} as IFlat);
    const [flats, setFlats] = useState<IFlat[]>([]);
    const [flatsVisible, setFlatsVisible] = useState<IFlat[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const [totalCount, setTotalCount] = useState<number>(11);

    // useEffect(() => {
    //     if (loading) {
    //         console.log('curent page:', currentPage);
    //         console.log('total count', totalCount);
    //         fetchPageFlats(currentPage)
    //             .then(data => {
    //                 setFlats([...flats, ...data.rows]);
    //                 setCurrentPage(prev => prev + 1);
    //                 setTotalCount(data.count);
    //             })
    //             .catch(err => alert(err.message))
    //             .finally(() => setLoading(false))
    //     }
    // }, [loading]);

    useEffect(() => {
        fetchAllFlats()
            .then(data => setFlats(data.rows))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false))
    }, []);

    useEffect(() => {
        setFlatsVisible(filter.visibleFlats);
    }, [filter.visibleFlats]);

    useEffect(() => {
        if (user.isAuth) {
            fetchReserve().then(data => {
                account.setIdOfReserv(data.idOfFlat);
                // console.log(data);
            });
        }
    }, []);

    // useEffect(() => {
    //     console.log(flats);
    // }, [flats]);

    // useEffect(() => {
    //     document.addEventListener('scroll', scrollHandler);

    //     return function () {
    //         document.removeEventListener('scroll', scrollHandler);
    //     }
    // }, []);

    // console.log('БАЗА ДАННЫХ:', flatsDB);
    
    

    const selectFlat = (item: IFlat) => {
        setFlat(item);
        setVisible(true);
    };

    // @ts-ignore
    // const scrollHandler = (e) => {
    //     if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && flats.length < totalCount) {
    //         setLoading(true);
    //     }
        // console.log('scrollHeight', e.target.documentElement.scrollHeight);  // Общая высота страницы с учётом скрола
        // console.log('scrollTop', e.target.documentElement.scrollTop);        // Текущее положение скрола от верха страницы
        // console.log('innerHeight', window.innerHeight);                      // Высота видимой области страницы (высота браузера)
    // }

    if (loading) {
        return (
            <Spinner animation={"border"} variant="light" style={{marginTop: '100px', marginLeft: '200px'}} />
        )
    }

    return (
        <div className='main-page' >
            <Helmet>
                <title>Estate | Квартиры</title>
                <meta name="description" content="Квартиры" />
            </Helmet>
            <FilterPanel flats={flats} />
            <List
                items={flatsVisible}
                renderItem={(flat: IFlat) => 
                    <FlatCard
                        flat={flat}
                        onClick={(flat) => selectFlat(flat)}
                        key={flat.id}
                    />
                } 
            />
            <Pageup />
            <ModalFlatDetail 
                show={visible} 
                onHide={() => setVisible(false)} 
                flat={flat}
            />
        </div>
    )
})

export default MainPage