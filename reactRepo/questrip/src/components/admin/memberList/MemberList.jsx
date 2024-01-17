import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
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
`;

const MemberList = () => {

    const [voList,setVoList] = useState([]);

    const loadVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/member/listall",{
        })
        .then(resp => resp.json())
        .then(data => {
            setVoList(data);
        });
    
    }

    useEffect(() => {
        loadVoList();
    },[]);

    return (
        <StyledTable>
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
        </StyledTable>
    );
};

export default MemberList;