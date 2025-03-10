import React from 'react';
import { useState } from 'react';
import type { FC } from 'react';
import './index.css';

const CountButton: FC = () => {
    const [count, setCount] = useState(0);
    
    const increment = (x: number) => {
        if (count + x < 0) return;
        setCount(count + x);
        return;
    }

    return (
        <div className="count-container">
            <button className="btn" onClick={() => increment(1)}>Increment</button>
            <button className="btn" onClick={() => increment(-1)}>Decrement</button>
            <p>
                Count:{count}
            </p>
        </div>
    );
}

export default CountButton;