import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './index.css';

const Slider = () => {
    const minValue = 0;
    const maxValue = 600;
    const start_str = "▶"
    const stop_str = "⏸"
    
    const [value, setValue] = useState(0);
    const [isStartedChar, setStartedChar] = useState(start_str);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    
    const incrementValue = () => {
        setValue(prevValue => {
            if (prevValue < maxValue) {
                return prevValue + 1;
            } else {
                return prevValue;
            }
        });
    };

    const startSlider = () => {
        setStartedChar(stop_str);
        if (value >= maxValue) {
            setValue(0);
        }
        intervalId.current = setInterval(() => {
            incrementValue();
        }, 5000/maxValue);
    };
    
    const stopSlider = () => {
        setStartedChar(start_str);
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
    };

    useEffect(() => {
        if (value >= maxValue) {
            stopSlider();
        }
    }, [value]);

    const onClickSliderButton = () => {
        if(isStartedChar === start_str) {
            startSlider();
        }
        else {
            stopSlider();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    };

    return (
        <div className="slider-container">
            <button className="slider-button" onClick={onClickSliderButton}>{isStartedChar}</button>
            <input className="slider" type="range" min={minValue} max={maxValue} value={value} onChange={handleChange} />
            <p>Current value: {value}</p>
        </div>
    )
}

export default Slider;