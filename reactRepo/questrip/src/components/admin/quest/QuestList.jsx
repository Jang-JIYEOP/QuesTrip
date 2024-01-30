import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuestMemory } from '../../community/context/QuestContext';
import Page from '../../page/Page';
import { useNavigate } from 'react-router-dom';

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

const QuestList = () => {

    const { questVoList, searchInfoVo, setSearchInfoVo, pageTotal, handlePageChange } = useQuestMemory();
    const navigate = useNavigate();
    useEffect(() => {
      setSearchInfoVo({
        pageNo: 1,
        limit: 10,
      });
    },[]);
    const handleClickQuestWriter = () => {
        navigate('/admin/quest/write');
    };
    const handleRowClick = (vo) => {
        navigate('/admin/quest/detail', { state:  {vo}  });
    };
    console.log(questVoList);
    return (
        <StyledListDiv>
            <table>
                <thead>
                    <tr>

                    <th>제목</th>
                    
                    <th>평균별점</th>
                    <th>포인트</th>
                    <th>인원수</th>
                    <th>작성일자</th>
                    <th>삭제여부</th>
                    </tr>
                </thead>
                <tbody>
                    {questVoList.map((vo) => (
                        <tr key={vo.no} onClick={() => handleRowClick(vo)}>

                            <td>{vo.title}</td>
                            <td>{vo.rating}</td>
                            <td>{vo.point}</td>
                            <td>{vo.headCnt}</td>
                            <td>{vo.enrollDate}</td>
                            <td>{vo.delYn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='div'><button onClick={handleClickQuestWriter}>등록하기</button></div>
            
            <div id='pageArea'>
                <Page pageTotal={pageTotal} currentPage={searchInfoVo.pageNo} handlePageChange={handlePageChange}/>
            </div>
        </StyledListDiv>
    );
};

export default QuestList;
