import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLoginMemory } from '../community/context/LoginContext';
import CommtListItem from './commtListItem';

const StyledUnderCommtListItemDiv = styled.div`
    width: 95%;
    margin-left: 50px;
`;

const UnderCommtListItem = ({voList}) => {
    console.log(voList);
    return (
        <StyledUnderCommtListItemDiv>
            
            {voList.map( (vo) => {
                    return <CommtListItem key = {vo.no} vo = {vo}/>
                })
            }
            
        </StyledUnderCommtListItemDiv>
    );
};

export default UnderCommtListItem;