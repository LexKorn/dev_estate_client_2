import React, {useState, useContext, useEffect} from 'react'
import {Dropdown, Button} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'

import RangeTwoValues from '../Range/RangeTwoValues'
import { IFlat } from '../../types/types'
import { Context } from '../..'
import { codeOfRegions, convertRegion } from '../../utils/regions'

import './filterPanel.sass'

interface FilterPanelProps {
    flats: IFlat[]
}


const FilterPanel: React.FC<FilterPanelProps> = observer(({flats}) => {
    const {filter} = useContext(Context);
    const [classMenu, setClassMenu] = useState<string>('open-menu');
    const [toggle, setToggle] = useState<boolean>(false);
    const [checkFirst, setCheckFirst] = useState<boolean>(false);
    const [checkSecond, setCheckSecond] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);
    const [region, setRegion] = useState<number>(0);
    const [checkedValues, setCheckedValues] = useState<number[]>([]);
    const [checkboxes, setCheckboxes] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
    });

    useEffect(() => {
        // @ts-ignore
        filter.setVisibleFlats(filterRooms(filterRanges(filterObjectType(filterRigions(flats)))));
    }, [toggle]);

    const menuHandler = () => {
        classMenu === '' ? setClassMenu('open-menu') : setClassMenu('');
    };

    const filterHandler = () => {
        menuHandler();
        setToggle(prev => !prev);
    };

    const resetFilter = () => {
        setCheckFirst(false);
        setCheckSecond(false);
        setRegion(0);
        // menuHandler();
        setReset(prev => !prev);
        setToggle(prev => !prev);
        setCheckboxes({
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
        });
        setCheckedValues([]);
    };

    function filterObjectType(flats: IFlat[]) {
        if ((checkFirst && checkSecond) || (!checkFirst && !checkSecond) ) {
            return flats;
        } else if (checkFirst && !checkSecond) {
            return flats.filter(flat => flat.object_type !== 1);
        } else if (!checkFirst && checkSecond) {
            return flats.filter(flat => flat.object_type === 1);
        }
    }

    //@ts-ignore
    function handleCheckboxClick(event) {
        const value = +event.target.value;
        const checked = event.target.checked;

        if (value > 0) {
            setCheckboxes({
                ...checkboxes,
                [value + 1]: checked
            });
        } else {
            setCheckboxes({
                ...checkboxes,
                [value + 2]: checked
            });
        }

        if (checked) {
            if (value === 4) {
                setCheckedValues([...checkedValues, value, 5, 6, 7]);
            } else {
                setCheckedValues([...checkedValues, value]);
            }
        } else {
            let newCheckedValues: number[] = [];
            if (value === 4) {
                newCheckedValues = [...checkedValues].filter((currentValue) => currentValue !== value && currentValue !== 5 && currentValue !== 6 && currentValue !== 7);
            } else {
                newCheckedValues = [...checkedValues].filter((currentValue) => currentValue !== value);
            }

            setCheckedValues(newCheckedValues);
        }
    }

    function filterRooms(flats: IFlat[]) {
        if (!checkedValues.length) {
            return flats;
        } else {
            return flats.filter(flat => checkedValues.includes(flat.rooms));
        }
    }

    function filterRanges(flats: IFlat[]) {
        let arr: IFlat[] = [];
        arr = flats.filter(flat => flat.price >= filter.priceMin && flat.price <= filter.priceMax);
        arr = arr.filter(flat => flat.area >= filter.areaMin && flat.area <= filter.areaMax);
        arr = arr.filter(flat => flat.level >= filter.levelMin && flat.level <= filter.levelMax);
        return arr;
    }

    function filterRigions(flats: IFlat[]) {
        if (!region) {
            return flats;
        } else {
            return flats.filter(flat => flat.region === region);
        }
    }

    return (
        <div className='filter-panel'>
            <div className={"filter-panel__burger" + ' ' + classMenu} onClick={() => menuHandler()}>
                <Button 
                    variant='secondary' 
                    className="filter-panel__burger_btn"
                    >
                        {classMenu === '' ? 'Скрыть' : 'Фильтр'}
                </Button>
            </div>

            <div className={"filter-panel__wrapper"  + ' ' + classMenu}>
                <div className="filter-panel__btns">
                    <Button 
                        variant='outline-warning'
                        style={{'display': classMenu === '' ? 'block' : 'none'}}
                        className="filter-panel__burger_btn" 
                        onClick={filterHandler}>
                            Показать
                    </Button>
                    <Button 
                        variant='outline-danger' 
                        style={{'display': classMenu === '' ? 'block' : 'none'}} 
                        className="filter-panel__burger_btn" 
                        onClick={resetFilter}>
                            Сбросить
                    </Button>
                </div>
                <div className="filter-panel__checks">
                    <Dropdown className="filter-panel__checks_region">
                        <Dropdown.Toggle variant={"outline-secondary"}>{Boolean(region) ? convertRegion(region) : 'Регион'}</Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "scroll" }}>
                            {codeOfRegions.map((region, i) =>
                                <Dropdown.Item
                                    onClick={() => setRegion(region)}
                                    key={i}
                                >
                                    {convertRegion(region)}
                                </Dropdown.Item>    
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="filter-panel__checks_type">
                        <input type="checkbox" id="check-first" checked={checkFirst} onChange={() => setCheckFirst(!checkFirst)} />
                        <label htmlFor="check-first">Новостройка</label>
                        <input type="checkbox" id="check-second" checked={checkSecond} onChange={() => setCheckSecond(!checkSecond)} />
                        <label htmlFor="check-second">Вторичка</label>
                    </div>
                    <div className="filter-panel__checks_rooms">
                        <input type="checkbox" id="check-studio" value="-1" onChange={handleCheckboxClick} checked={checkboxes[1]} />
                        <label htmlFor="check-studio">Студия</label>
                        <input type="checkbox" id="check-one" value="1" onChange={handleCheckboxClick} checked={checkboxes[2]} />
                        <label htmlFor="check-one">1к</label>
                        <input type="checkbox" id="check-two" value="2" onChange={handleCheckboxClick} checked={checkboxes[3]} />
                        <label htmlFor="check-two">2к</label>
                        <input type="checkbox" id="check-three" value="3" onChange={handleCheckboxClick} checked={checkboxes[4]} />
                        <label htmlFor="check-three">3к</label>
                        <input type="checkbox" id="check-four" value="4" onChange={handleCheckboxClick} checked={checkboxes[5]} />
                        <label htmlFor="check-four">4к+</label>
                    </div>
                    <Button variant='outline-warning' className="filter-panel__checks_btn" onClick={() => setToggle(prev => !prev)}>Показать</Button>
                    <i 
                        className="bi bi-x-circle filter-panel__checks_reset"
                        style={{'display': classMenu === '' ? 'none' : 'inline'}}
                        onClick={resetFilter} 
                        data-tooltip="Сбросить">
                    </i>
                </div>
                <div className="filter-panel__range">
                    <RangeTwoValues
                        id="price-main"
                        title='Цена, руб.' 
                        min={750000} 
                        max={30000000} 
                        step={10000} 
                        gap={10000}
                        reset={reset}
                    />
                    <RangeTwoValues
                        id="area"
                        title='Площадь, м2' 
                        min={10} 
                        max={200} 
                        step={5} 
                        gap={5}
                        reset={reset}
                    />
                    <RangeTwoValues
                        id="level"
                        title='Этаж' 
                        min={1} 
                        max={25} 
                        step={1} 
                        gap={0}
                        reset={reset}
                    />
                </div>
                {/* <Button variant='outline-warning' className="filter-panel__btn" onClick={filterHandler}>Показать</Button> */}
            </div>
        </div>
    )
})

export default FilterPanel