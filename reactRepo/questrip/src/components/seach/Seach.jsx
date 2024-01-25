import React from 'react';
import { useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';

const Seach = () => {
    const location = useLocation();
    const communityVoList = location.state.communityVoList;
    const diaryVoList = location.state.diaryVoList;
    console.log("서치communityVoList",communityVoList);
    console.log("diaryVoList",diaryVoList);

    return ( <></>
    );
};

export default Seach;