import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconListItem from './IconListItem';
import Page from '../page/Page';

const StyledIconListDiv = styled.div`
    width: 100% ;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 3fr 12fr 1fr;
    place-items: center center;
    & > div {
        border : 1px solide #gray;
    }

    & #itemArea{
        width: 100%;
        height: 100%;
        grid-column: span 2;
        display: grid;
        grid-template-columns: 1fr  1fr;
        grid-template-rows: 1fr 1fr 1fr;
        place-items: center center;
        & > div {
          width: 80%;
          height: 80%;
          border: 1px solid red;
    
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
`;



const IconShop = () => {
    const [boardVoList , setBoardVoList] = useState([]);
    const [pageTotal, setPageTotal] = useState([]);
    const [searchInfoVo , setSearchInfoVo] = useState({
        pageNo : 1,
        limit : 6,
    }
    );
    
    const handlePageChange = (pageNumber) => {
        setSearchInfoVo((prevSearchInfoVo) => ({
          ...prevSearchInfoVo,
          pageNo: pageNumber,
        }));
      };
    
    
    const loadBoardVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/icon/shop",{
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
        loadBoardVoList();
    }, [searchInfoVo] );

    return (
        <StyledIconListDiv>
            <div id="searchArea"></div>
            <div id="itemArea">

                {boardVoList.map( (vo) => {
                            return <IconListItem key = {vo.no} vo = {vo} />
                        }
                    )
                }
            </div>
            <div id='pageArea'>
                <Page pageTotal={pageTotal} currentPage={searchInfoVo.pageNo} handlePageChange={handlePageChange}/>
            </div>

        </StyledIconListDiv>
    );
};

export default IconShop;