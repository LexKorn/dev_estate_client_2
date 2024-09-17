import React, { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { MAIN_ROUTE } from '../../utils/consts';

import './list.sass';

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
};


export default function List<T> (props: ListProps<T>) {
    const location = useLocation();
    const isMain = location.pathname === MAIN_ROUTE;
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        //@ts-ignore
        setWidth(ref.current.offsetWidth); 
    }, []);

    return (
        <div ref={ref}
            className="list"
            style={{marginTop: !isMain ? "30px" : width <= 850 ? "30px" : "180px"}}
            >
            {!props.items.length ? 
                <div className="list__empty">Здесь пока ничего нет...</div>
            :
                props.items.map(props.renderItem)
            }           
        </div>
    );
};