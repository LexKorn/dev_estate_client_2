import React, {useState, useEffect, useContext} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { observer } from "mobx-react-lite";

import { MAIN_ROUTE, MORTGAGE_ROUTE, LOGIN_ROUTE, ACCOUNT_ROUTE } from "../../utils/consts";
import { Context } from '../../index';

import './header.sass';


const Header: React.FC = observer(() => {
    const location = useLocation();
    const [classMenu, setClassMenu] = useState<string>('');
    const {user} = useContext(Context);

    useEffect(() => {
        setClassMenu('');
    }, [location.pathname]);

    const menuHandler = () => {
        classMenu === '' ? setClassMenu('open-menu') : setClassMenu('');
    };

    return (
        <>
            <div className='header'>
                <div className={"header__menu-burger" + ' ' + classMenu} onClick={() => menuHandler()}>
                    <span></span>
                </div>

                <nav className={'header__nav' + ' ' + classMenu}>
                    <ul className="header__menu">
                        <li className="header__menu_item">
                            <NavLink to={MAIN_ROUTE} className={location.pathname === MAIN_ROUTE ? "active" : ''} >
                                КВАРТИРЫ
                            </NavLink>
                        </li>
                        <li className="header__menu_item">
                            <NavLink to={MORTGAGE_ROUTE} className={location.pathname === MORTGAGE_ROUTE ? "active" : ''} >
                                ИПОТЕКА
                            </NavLink>
                        </li>

                        {!user.isAuth ?
                            <li className="header__menu_item">
                                <NavLink to={LOGIN_ROUTE} className={location.pathname === LOGIN_ROUTE ? "active" : ''} >
                                    АВТОРИЗАЦИЯ
                                </NavLink>
                            </li>
                            :
                            <li className="header__menu_item">
                                <NavLink to={ACCOUNT_ROUTE} className={location.pathname === ACCOUNT_ROUTE ? "active" : ''} >
                                    ЛИЧНЫЙ КАБИНЕТ
                                </NavLink>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        </>
    );
});

export default Header;