import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from '../../../page/Page';
import PointHistoryItem from './PointHistoryItem';


const StyledPointHisttoryListDiV = styled.div`
    width: 100%;
    display: grid;

`;


const PointHistoryList = () => {

    const [pageTotal, setPageTotal] = useState([]);
    const loginNumber = sessionStorage.getItem('loginInfo');
    const [pointHistoryList, setPointHistoryList] = useState([]);
    const [searchInfoVo , setSearchInfoVo] = useState({

        pageNo : 1,
        limit : 5,
        memberNo : loginNumber
        }   
    );

const handlePageChange = (pageNumber) => {
    setSearchInfoVo((prevSearchInfoVo) => ({
      ...prevSearchInfoVo,
      pageNo: pageNumber,
        }));
    };

const loadPointVoList = () => {
    fetch("http://127.0.0.1:8888/questrip/api/member/point", {
        method: "POST",
        headers: {
        "Content-Type": "application/json", 
        },
    body : JSON.stringify(searchInfoVo),
    })
    .then(resp => resp.json())
        .then(data => {
            console.log("data:"+data);
            setPointHistoryList(data.voList);
            setPageTotal(data.pageTotal);

        });
        console.log(pointHistoryList);
    }

useEffect( () => {
    loadPointVoList();
    
}, [searchInfoVo] );

return (
    <StyledPointHisttoryListDiV>
        <div id='itemArea'>
            {pointHistoryList.map( (vo) => {
                return <PointHistoryItem key = {vo.no} vo = {vo} />
                    }
                )
            }
        </div>
        <div id='pageArea'>
            <Page pageTotal={pageTotal} currentPage={searchInfoVo.pageNo} handlePageChange={handlePageChange}/>
        </div>
    </StyledPointHisttoryListDiV>
    );
};

export default PointHistoryList;