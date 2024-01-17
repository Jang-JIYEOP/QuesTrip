import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MemberList from './memberList/MemberList';
import QuestList from './quest/QuestList';
import NoticeList from './notice/NoticeList';
import CommunityList from './community/CommunityList';
import DiaryList from './diary/DiaryList';
const StyledListDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

const TabDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ListDiv = styled.div`
  padding: 20px;
`;

const TabItem = styled.div`
  cursor: pointer;
  padding: 10px;
  border-bottom: ${(props) => (props.active ? '2px solid black' : 'none')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? 'black' : 'gray')};
  background-color: ${(props) => (props.active ? '#f0f0f0' : 'white')};
  border-radius: 5px;
  margin: 5px 0;
`;



const tabs = [
  { key: 'member', label: '회원관리' },
  { key: 'quest', label: '퀘스트관리' },
  { key: 'notice', label: '공지사항관리' },
  { key: 'dairy', label: '일기관리' },
  { key: 'community', label: '커뮤니티관리' },
  { key: 'membertitle', label: '칭호관리' },
  { key: 'icon', label: '아이콘관리' },
];

const AdminList = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (tab) => {
    try {
      const response = await fetch(`http://your-backend-api/${tab}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <StyledListDiv>
      <TabDiv id='tab'>
        {tabs.map((tab) => (
          <TabItem
            key={tab.key}
            active={activeTab === tab.key}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
          </TabItem>
        ))}
      </TabDiv>
      <ListDiv id='list'>
        {activeTab === 'member' && <MemberList/>}
        {activeTab === 'quest' && <QuestList/>}
        {activeTab === 'notice' && <NoticeList/>}
        {activeTab === 'community' && <CommunityList/>}
        {activeTab === 'dairy' && <DiaryList/>}

      </ListDiv>

    </StyledListDiv>
  );
};

export default AdminList;
