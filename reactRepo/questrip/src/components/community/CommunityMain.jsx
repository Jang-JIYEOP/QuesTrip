import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CommunityDetail from './CommunityDetail';
import CommunityList from './CommunityList';
import CommunityEdit from './CommunityEdit';
import CommunityWrite from './CommunityWrite';

const CommunityMain = () => {
    return (
        <Routes>
            <Route path='list' element={<CommunityList/>}/>
            <Route path='write' element={<CommunityWrite/>}/>
            <Route path='detail' element={<CommunityDetail />} />
            <Route path='edit' element={<CommunityEdit/>}/>
        </Routes>
    );
};

export default CommunityMain;