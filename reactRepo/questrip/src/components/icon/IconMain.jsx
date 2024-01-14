import React from 'react';
import IconShop from './IconShop';
import { Route, Routes } from 'react-router-dom/dist/umd/react-router-dom.development';

const IconMain = () => {
    return (
        <Routes>
            <Route path='shop' element={<IconShop/>}/>
        </Routes>
    );
};

export default IconMain;