import React, {useState, useContext} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {AxiosError} from 'axios';
import {Helmet} from "react-helmet";

import { LOGIN_ROUTE, REGISTER_ROUTE, ACCOUNT_ROUTE } from '../utils/consts';
import { login, registration } from '../http/usersAPI';
import {Context} from '../index';


const AuthPage: React.FC = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await registration(email, password);
            }
            
            user.setIsAuth(true);
            navigate(ACCOUNT_ROUTE);

        } catch(err: unknown) {
            const error = err as AxiosError;
            alert(JSON.parse(error.request.response).message);
        }        
    };

    return (
        <Container 
            className='d-flex justify-content-center align-items-center'
            style ={{height: window.innerHeight - 54}}
        >
            <Helmet>
                <title>Estate | Авторизация</title>
                <meta name="description" content="Авторизация" />
            </Helmet>
            <div style={{width: '330px'}}>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                        <div className="d-flex justify-content-between mt-3">
                            {isLogin ?
                                <div>
                                    Нет аккаунта? <NavLink to={REGISTER_ROUTE}>Зарегистрируйтесь!</NavLink>
                                </div>
                                :
                                <div>
                                    Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                                </div>
                            }                        
                            <Button 
                                onClick={click}
                                variant={"outline-warning"}
                                >
                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                        </div>               
                    </Form>
            </div>
        </Container>
    );
});

export default AuthPage;