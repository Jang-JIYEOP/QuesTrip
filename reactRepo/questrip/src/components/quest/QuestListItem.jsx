import React from 'react';
import styled from 'styled-components';
import { useNavigate} from 'react-router-dom';
const StyledWrqpDiv = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const QuestListItem = ({vo}) => {

    const navigate = useNavigate();
    const handleClickQuestList = () => {
        navigate('/quest/detail', { state:  {vo}  });
    };

    return (
        <StyledWrqpDiv onClick={handleClickQuestList}>
            <span>{vo.title} </span>
            <span>{vo.content}</span>
        </StyledWrqpDiv>
    );
};

export default QuestListItem;