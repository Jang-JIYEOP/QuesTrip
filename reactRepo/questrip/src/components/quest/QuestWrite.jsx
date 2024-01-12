import React from 'react';
import styled from 'styled-components';

const StyledQuestWriteDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 5fr 1fr;
    place-items: center center;
    border: 1px solid black;

`;

const QuestWrite = () => {
    return (
        <StyledQuestWriteDiv>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div id='adrr'></div>
            <div id="title"></div>
            <div id="content"></div>
            <div id="img"></div>
            <div id="insert"></div>
        </StyledQuestWriteDiv>
    );
};

export default QuestWrite;