import React from 'react';
import styled from 'styled-components';

const StlyedCommtListItemDiv = styled.div`
    width: 100%;
`;


const CommtListItem = () => {

    return (
        <StlyedCommtListItemDiv>
            <div>
                <div>아이콘</div>
                <div>칭호</div>
                <div>닉네임</div>
                <div>작성일자</div>
            </div>
            <div>내용</div>
        </StlyedCommtListItemDiv>
    );
};

export default CommtListItem;