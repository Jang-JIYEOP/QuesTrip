import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from '../../page/Page';

const StyledListDiv = styled.div`
  display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    & > table {
        width: 100%;
        border-collapse: collapse;

        
        th, td {
            height: 15px;
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }
        tr > th:nth-child(3){
            width: 200px;
        }
        th {
            background-color: #f2f2f2;
        }

        tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tbody tr:hover {
            background-color: #e0e0e0;
        }
    }
    .div{
        text-align: right;
    }

    #pageArea {
        margin-top: auto;
        width: 100%;
        text-align: center;
    }
`;

const MemberList = () => {

    const [voList,setVoList] = useState([]);
    const [pageTotal, setPageTotal] = useState([]);
    const [searchInfoVo , setSearchInfoVo] = useState({

      pageNo : 1,
      limit : 10,
  
  }
  );

  const handlePageChange = (pageNumber) => {
    setSearchInfoVo((prevSearchInfoVo) => ({
      ...prevSearchInfoVo,
      pageNo: pageNumber,
    }));
  };

  
    const loadVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/member/listall",{
          method: "POST",
          headers: {
          "Content-Type": "application/json", 
          },
      body : JSON.stringify(searchInfoVo),
      })
      .then(resp => resp.json())
          .then(data => {
              setVoList(data.voList);
              setPageTotal(data.pageTotal);
              console.log("data", data.pageTotal);
          });
  
    
    }

    useEffect(() => {
        loadVoList();
    },[]);

    return (
      <StyledListDiv>
        <table>
          <thead>
              <tr>
              <th>닉네임</th>
              <th>칭호이름</th>
              <th>아이콘이름</th>
              <th>이메일</th>
              <th>포인트</th>
              <th>가입일자</th>
              <th>삭제여부</th>
              </tr>
          </thead>
          <tbody>
              {voList.map((vo) => (
                  <tr key={vo.no}>
                      <td>{vo.nick}</td>
                      <td>{vo.titleName}</td>
                      <td>{vo.iconName}</td>
                      <td>{vo.email}</td>
                      <td>{vo.point}</td>
                      <td>{vo.enrollDate}</td>
                      <td>{vo.delYn}</td>
                  </tr>
              ))}
          </tbody>
        </table>
          <div id='pageArea'>
            <Page pageTotal={pageTotal} currentPage={searchInfoVo.pageNo} handlePageChange={handlePageChange}/>
          </div>
      </StyledListDiv>
    );
};

export default MemberList;