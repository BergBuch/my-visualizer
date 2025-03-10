import React from 'react';
import { useState, useEffect } from 'react';
import './index.css';

const Slider = () => {
    const minValue = 0;
    const maxValue = 600;
    
    const [value, setValue] = useState(0);
    const [isStarted, setStarted] = useState("▶");
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    
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
        setStarted("■");
        if (value >= maxValue) {
            setValue(0);
        }
        const id = setInterval(() => {
            incrementValue();
        }, 5000/maxValue);
        setIntervalId(id);
    };
    
    const stopSlider = () => {
        setStarted("▶");
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    useEffect(() => {
        if (value >= maxValue) {
            stopSlider();
        }
    }, [value]);

    const onClickSliderButton = () => {
        if(isStarted === "▶") {
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
            <button className="slider-button" onClick={onClickSliderButton}>{isStarted}</button>
            <input className="slider" type="range" min={minValue} max={maxValue} value={value} onChange={handleChange} />
            <p>Current value: {value}</p>
        </div>
    )
}

export default Slider;