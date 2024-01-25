import React from 'react';
import { useLocation } from 'react-router-dom';

const Seach = () => {
    const location = useLocation();
    const communityVoList = location.state.a;
    console.log("자게",communityVoList);
    // console.log("일기",diaryVoList);

    return ( <></>
    );
};

export default Seach;