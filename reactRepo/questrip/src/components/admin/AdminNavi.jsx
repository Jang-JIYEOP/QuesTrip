import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const StyledListDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const TabDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;


const TabItem = styled.div`
  cursor: pointer;
  padding: 10px;
  /* border-bottom: ${(props) => (props.active ? '2px solid black' : 'none')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? 'black' : 'gray')};
  background-color: ${(props) => (props.active ? '#f0f0f0' : 'white')};
  border-radius: 5px;
  margin: 5px 0; */

  a {
    text-decoration: none;
  }
`;



const tabs = [
  { key: 'member', label: '회원관리' },
  { key: 'quest', label: '등록퀘스트관리' },
  { key: 'complete', label: '퀘스트완료요청' },
  { key: 'notice', label: '공지사항관리' },
  { key: 'dairy', label: '일기관리' },
  { key: 'community', label: '커뮤니티관리' },
  { key: 'membertitle', label: '칭호관리' },
  { key: 'icon', label: '아이콘관리' },
];

const AdminNavi = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  
  

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
        <StyledListDiv>
        <TabDiv id='tab'>
        {tabs.map((tab) => (
            <Link key={tab.key} to={`/admin/${tab.key}/list`}>
        <TabItem
        key={tab.key}
        active={activeTab === tab.key}
        onClick={() => handleTabClick(tab.key)}
        >
        {tab.label}
        </TabItem>
    </Link>
    ))}
      </TabDiv>
      
    </StyledListDiv>
  );
};

export default AdminNavi;
