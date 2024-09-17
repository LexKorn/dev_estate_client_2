import React, {useState, useEffect} from 'react'
import {Form, Button, ListGroup, Card} from 'react-bootstrap'

import { IMessage } from '../../types/types'
import { LoaderT } from '../LoaderType/LoaderT'
import { createMessage, fetchMessages, deleteMessages } from '../../http/messagesAPI'

import './chatBlock.sass'


const ChatBlock: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [text, setText] = useState<string>('');
    const [typing, setTyping] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(false);

    useEffect(() => {
        fetchMessages().then(data => setMessages(data));
    }, [toggle]);

    const onCreateMessage = () => {
        if (!text.trim()) {               
            return alert('Необходимо ввести текст');
        }
        createMessage(text, 'user').then(() => setToggle(prev => !prev));
        setText('');

        setTimeout(() => {setTyping(true)}, 500);
        setTimeout(() => {setTyping(false)}, 4700);
        setTimeout(() => {setToggle(prev => !prev)}, 4700);
    };

    const onDeleteMessages = () => {
        if (window.confirm('Вы действительно хотите удалить переписку?')) {
            deleteMessages();
            setToggle(prev => !prev);
        };            
    }   

    //@ts-ignore
    const keyPress = (e: React.KeyboardEvent<FormControlElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onCreateMessage();
        }
    };

    return (
        <div className='chat'>
            <Form className="chat__form">
                <Form.Control as='textarea'
                    className="chat__input"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => keyPress(e)}
                    placeholder={"Набирите сообщение"}
                />
                <div className="chat__form_btn">
                    <Button variant={"outline-warning"} className="chat__btn" onClick={onCreateMessage}>Отправить</Button>
                </div>
            </Form>

            <ListGroup className="chat__list">
                {Boolean(messages.length) && 
                    messages.map(item =>
                        <Card 
                            key={item.id}
                            className={item.sender === "user" ? "chat__list_item shadow sender" : "chat__list_item shadow"}
                            >
                            {item.text}
                        </Card>
                )}
                {typing && <LoaderT />}
            </ListGroup>
            {Boolean(messages.length) &&
                <Button variant={"outline-secondary"} className="chat__btn_rmv" onClick={onDeleteMessages}>Очистить переписку</Button>
            }
        </div>
    )
}

export default ChatBlock;