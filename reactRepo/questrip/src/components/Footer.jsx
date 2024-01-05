import React from 'react';
import styled from 'styled-components';


const StyledFooterDiv = styled.div`
    width: 100%;
    height: 100%;
    border-top: 1px solid lightgray;
`;

const Footer = () => {
    return (
        <StyledFooterDiv>
            <h6>유선 상담 : 010-4266-6024</h6>
        </StyledFooterDiv>
    );
};

export default Footer;