// import React, { useState } from 'react';
// import styled from 'styled-components';
// import MemberList from './memberList/MemberList';
// import QuestList from './quest/QuestList';
// import NoticeList from './notice/NoticeList';
// import CommunityList from './community/CommunityList';
// import DiaryList from './diary/DiaryList';
// import IconList from './icon/IconList';
// import { Link } from 'react-router-dom';
// import QuestWrite from './quest/QuestWrite';
// const StyledListDiv = styled.div`
//   width: 100%;
//   height: 100%;
//   display: grid;
//   grid-template-columns: 1fr 5fr;
// `;

// const TabDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
// `;

// const ListDiv = styled.div`
//   padding: 20px;
  
// `;

// const TabItem = styled.div`
//   cursor: pointer;
//   padding: 10px;
//   border-bottom: ${(props) => (props.active ? '2px solid black' : 'none')};
//   font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
//   color: ${(props) => (props.active ? 'black' : 'gray')};
//   background-color: ${(props) => (props.active ? '#f0f0f0' : 'white')};
//   border-radius: 5px;
//   margin: 5px 0;
// `;



// const tabs = [
//   { key: 'member', label: '회원관리' },
//   { key: 'quest', label: '퀘스트관리' },
//   { key: 'questWrite', label: '퀘스트등록' },
//   { key: 'notice', label: '공지사항관리' },
//   { key: 'dairy', label: '일기관리' },
//   { key: 'community', label: '커뮤니티관리' },
//   { key: 'membertitle', label: '칭호관리' },
//   { key: 'icon', label: '아이콘관리' },
// ];

// const AdminList = () => {
//   const [activeTab, setActiveTab] = useState(tabs[0].key);
  
  

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <StyledListDiv>
//       <TabDiv id='tab'>
//       {tabs.map((tab) => (
//   <Link key={tab.key} to={`/admin/${tab.key}/list`}>
//     <TabItem
//       key={tab.key}
//       active={activeTab === tab.key}
//       onClick={() => handleTabClick(tab.key)}
//     >
//       {tab.label}
//     </TabItem>
//   </Link>
// ))}
//       </TabDiv>
      
//       <ListDiv id='list'>
//         {activeTab === 'member' && <MemberList/>}
//         {activeTab === 'quest' && <QuestList/>}
//         {activeTab === 'questWrite' && <QuestWrite/>}
//         {activeTab === 'notice' && <NoticeList/>}
//         {activeTab === 'community' && <CommunityList/>}
//         {activeTab === 'dairy' && <DiaryList/>}
//         {activeTab === 'icon' && <IconList/>}

        

//       </ListDiv>

//     </StyledListDiv>
//   );
// };

// export default AdminList;
