import React, { useEffect, useState } from 'react';
import Writing from './writingList/Writing';
import MyInfoList from './myInfo/MyInfoList';
import PointHistoryList from './pointHistory/PointHistoryList';
import MyIconList from './myIcon/MyIconList';
import styled from 'styled-components';
import ComQuestList from './comQuest/ComQuestList';


const StyledMemberSidebarDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 5fr;
`;

const TabDiv = styled.div`
    width: 102%;
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
  { key: 'editMyInfo', label: '개인정보수정' },
  { key: 'writing', label: '내 글 보기' },
  { key: 'comQuest', label: '퀘스트 보기' },
  { key: 'pointHistory', label: '포인트 사용 내역' },
  { key: 'myIcon', label: '내 아이콘' }
];

  

const MemberSidebar = () => {

    const [activeTab, setActiveTab] = useState(tabs[0].key);
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetchData(activeTab);
    // }, [activeTab]);

    // const fetchData = async (tab) => {
    //     try {
    //     const response = await fetch(`http://your-backend-api/${tab}`);
    //     const result = await response.json();
    //     setData(result);
    //     } catch (error) {
    //     console.error('Error fetching data:', error);
    //     }
    // };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    return (
        <StyledMemberSidebarDiv>
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
                {activeTab === 'editMyInfo' && <MyInfoList/>}
                {activeTab === 'writing' && <Writing/>}
                {activeTab === 'comQuest' && <ComQuestList/>}
                {activeTab === 'pointHistory' && <PointHistoryList/>}
                {activeTab === 'myIcon' && <MyIconList/>}
            </ListDiv>
        </StyledMemberSidebarDiv>
    );
};

export default MemberSidebar;