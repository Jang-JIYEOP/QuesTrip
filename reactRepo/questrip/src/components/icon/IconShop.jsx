import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconListItem from './IconListItem';
import Page from '../page/Page';
import { useLoginMemory } from '../community/context/LoginContext';

const StyledIconListDiv = styled.div`

width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 3fr 12fr 1fr;
    gap: 20px;
    place-items: center center;
    & > div {
    }

    
    #searchArea {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        button {
            width: 40%;
            padding: 10px 0;
            border: none;
            border-radius: 5px;
            background-color: #4682B4;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        button:hover {
            background-color: #357ca5;
        }
    }
    & #itemArea{
        width: 100%;
        height: 100%;
        grid-column: span 2;
        display: grid;
        grid-template-columns: 1fr  1fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 20px;
        place-items: center center;
        & > div {
            width: 80%;
          height: 80%;
          
        }
        
        #searchArea{
            width: 100% ;
            height: 100%;
            grid-column: span 2;
            
        }
        #pageArea{
            width: 100%;
            height: 100%;
            grid-column: span 2;
      }
    }
`;
      
      
      
const IconShop = () => {
    const {setLoginInfo} = useLoginMemory();
    const [boardVoList , setBoardVoList] = useState([]);
    const [pageTotal, setPageTotal] = useState([]);
    let loginNumber = '';
    if(sessionStorage.getItem('loginInfo')){
         loginNumber = sessionStorage.getItem('loginInfo');
    }
    
    const [searchInfoVo , setSearchInfoVo] = useState({
        memberNo : loginNumber,
        pageNo : 1,
        limit : 6,
    }
    );
    const [type, setType] =useState({
        nowType : "shop",
    });
    
    const handlePageChange = (pageNumber) => {
        setSearchInfoVo((prevSearchInfoVo) => ({
          ...prevSearchInfoVo,
          pageNo: pageNumber,
        }));
      };
    
      const changeMyIcon = () => {
        setSearchInfoVo((prevSearchInfoVo) => ({
            ...prevSearchInfoVo,
            pageNo: 1,

          }));
        setType({
            nowType : "myicon",
        })
    };
    const changeShop = () => {
        setSearchInfoVo((prevSearchInfoVo) => ({
            ...prevSearchInfoVo,
            pageNo: 1,

          }));
        setType({
            nowType : "shop",
        })
    };
    const loadBoardVoList = () => {
        fetch(`http://127.0.0.1:8888/questrip/api/icon/${type.nowType}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body : JSON.stringify(searchInfoVo),
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("토탈 페이지",data.pageTotal);
            console.log("리스트",data.voList);
            
            setBoardVoList(data.voList);
            setPageTotal(data.pageTotal);
    
        });
    
    }
    



    useEffect( () => {
        if(loginNumber !== null){
            setLoginInfo({no : loginNumber});
        }
    
        loadBoardVoList();
    }, [searchInfoVo,type] );


    return (
        <StyledIconListDiv>
            <div id="searchArea">
                <button onClick={changeShop}>아이콘 샾</button>
                {loginNumber&& (
                    <button onClick={changeMyIcon}>보유 아이콘</button>
                )}

            </div>
            <div id="itemArea">

                {boardVoList.map( (vo) => {
                            return <IconListItem key = {vo.no} vo = {vo} type = { type } loginNumber= { loginNumber }/>
                        }
                    )
                }
            </div>
            <div id='pageArea'>
                <Page pageTotal={pageTotal} currentPage={searchInfoVo.pageNo} handlePageChange={handlePageChange} />
            </div>

        </StyledIconListDiv>
    );
};

export default IconShop;