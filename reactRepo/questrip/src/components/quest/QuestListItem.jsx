import React from 'react';
import styled from 'styled-components';
const StyledWrqpDiv = styled.div`
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const QuestListItem = ({title, content}) => {

    return (
        <StyledWrqpDiv>
            <span>{title} </span>
            <span>{content}</span>
        </StyledWrqpDiv>
    );
};

export default QuestListItem;