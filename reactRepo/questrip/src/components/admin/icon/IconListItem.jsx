import React from 'react';
import styled from 'styled-components';
const StyledWrqpDiv = styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
    margin: 5%;
    #item{
        width: 90%;
        height: 90%;
        display: grid;
        grid-template-columns: 2fr 3fr;
        grid-template-rows: 1fr 1fr;
        & > #img {
      grid-row: span 3;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover; // or contain
      }
    }
    }
`;
const IconListItem = ({vo}) => {
    return (
        <StyledWrqpDiv>
            <div id="item">
                <div id="img">
                    <img src={vo.photo} alt="아이콘 이미지" />
                </div>
                <div id="title">{vo.title}</div>
                <div id="price">{vo.price}</div>
                
            </div>
        </StyledWrqpDiv>
    );
};

export default IconListItem;