import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useLoginMemory } from '../community/context/LoginContext';

const Seach = () => {
    let loginNumber ='';
    if(sessionStorage.getItem('loginInfo')){
        loginNumber = sessionStorage.getItem('loginInfo');
    }
    const {loginMemberVo, setLoginInfo} = useLoginMemory();
    const [communityVoList, setCommunityVoList]= useState([]);
    const [diaryVoList, setDiaryVoList]= useState([]);
    const navigate = useNavigate();
    
    const location = useLocation();
    const search = location.state.search;
    const searchContent = location.state.searchContent;
    const [searchVo, setSearchVo]= useState({
        search,
        searchContent,
    });

    
    const loadCommunityVoList = () => {
        
        fetch("http://127.0.0.1:8888/questrip/api/community/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body : JSON.stringify(searchVo),  
        })
        .then(resp => resp.json())
        .then((data) => {
            setCommunityVoList(data.voList);
            console.log("??? : " , data.voList);

        })
        ;
    } 
    const loadDiaryVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/diary/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body : JSON.stringify(searchVo),
        })
        .then(resp => resp.json())
        .then((data) => {        
            setDiaryVoList(data.voList);
            console.log("??? : " , data.voList);
        })
        ;
    }
    
    useEffect( ()=>{
        loadCommunityVoList();
        loadDiaryVoList();
        setSearchVo({
            search,
            searchContent, 
        });
        setLoginInfo({no : loginNumber});
        
    }, [] )
    
    useEffect( ()=>{
    }, [searchVo] )
    
    return ( 
        <p>
            
        </p>
    );
};

export default Seach;