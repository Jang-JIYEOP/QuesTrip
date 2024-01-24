import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconListItem from '../../../icon/IconListItem';
import Page from '../../../page/Page';
const StyledIconListDiv = styled.div`

    width: 100% ;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 4fr 1fr;
    place-items: center center;
    & > div {
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
const MyIconList = () => {
    const [boardVoList , setBoardVoList] = useState([]);
    const [pageTotal, setPageTotal] = useState([]);
    const [type, setType] =useState({
        nowType : "myicon",
    });
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

    const loadBoardVoList = () => {
        fetch(`http://127.0.0.1:8888/questrip/api/icon/myicon`,{
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
    const handlePageChange = (pageNumber) => {
        setSearchInfoVo((prevSearchInfoVo) => ({
          ...prevSearchInfoVo,
          pageNo: pageNumber,
        }));
      };



    useEffect( () => {
        loadBoardVoList();
    }, [searchInfoVo] );
    return (
        <StyledIconListDiv>
            
            <div id="itemArea">

                {boardVoList.map( (vo) => {
                            return <IconListItem key = {vo.no} vo = {vo} type = { type }/>
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

export default MyIconList;