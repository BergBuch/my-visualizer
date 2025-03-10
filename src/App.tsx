import React, { FC } from 'react';
import CountButton from './CountButton'
import Slider from './Slider'

const App : FC = () => {
    return (
        <div className="App">
            <h2 style={{ textAlign: 'center' }}>とりあえずボタンを配置してみる</h2>
            <CountButton />
            <h2 style={{ textAlign: 'center' }}>とりあえずスライダーを配置してみる</h2>
            <Slider />
        </div>
    );
}

export default App;