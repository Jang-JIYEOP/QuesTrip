import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLoginMemory } from '../community/context/LoginContext';

const StyledWrqpDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    #item{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 2fr 3fr;
        grid-template-rows: 1fr 1fr 1fr;
        & > #img {
            grid-row: span 3;

        }
    }
`;

const IconListItem = ({vo}) => {
    

    return (
        <StyledWrqpDiv>
            <div id="item">
                <div id="img">사진</div>
                <div id="title">{vo.title}</div>
                <div id="price">{vo.price}</div>
                <button>구매하기</button>
            </div>
            
        </StyledWrqpDiv>
    );
};

export default IconListItem;