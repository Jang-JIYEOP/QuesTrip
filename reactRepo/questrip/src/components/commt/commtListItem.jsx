import React from 'react';
import styled from 'styled-components';

const StlyedCommtListItemDiv = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    
    margin-top: 10px;
    #img{
        grid-row: span 2;
    }
    img{
        width: 100%;
        height: 100%;
    }
    #nick{
        grid-column: span 2;
    }
    #content{
        text-align: left;
        margin-left: 10px;
        grid-column: span 3;
        border-bottom: 1px solid lightgray;
        font-size: 25px;
    }
    #divv{
        display: grid;
        grid-template-columns: 0.5fr 1fr 3fr;
        width: 50%;
        gap: 10px;
        text-align: left;
    }
`;


const CommtListItem = ({vo}) => {
    
    return (
        <StlyedCommtListItemDiv>
            <div id='divv'>
                <div id='img'><img src={vo.icon} alt="이미지" /></div>
                <div>{vo.memberTitle}</div>
                <div>{vo.enrollDate}</div>
                <div id='nick'>{vo.nick}</div>
            </div>
            <div id='content'>{vo.content}</div>
        </StlyedCommtListItemDiv>
    );
};

export default CommtListItem;