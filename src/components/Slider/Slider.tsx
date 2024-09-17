import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import './slider.sass';

interface SliderProps {
    photos: string[];
};


const Slider: React.FC<SliderProps> = ({photos}) => {

    return (
        <Carousel variant="dark" interval={null}>
            {photos && photos.map((item, i) =>
                <Carousel.Item key={i}>
                    <img
                        className='slider-item'
                        style={{objectFit: "contain"}}
                        src={item}
                        // src={process.env.REACT_APP_API_URL + item}
                        alt={`image ${i}`}
                    />
                </Carousel.Item>
            )}
        </Carousel>
    );
};

export default Slider;