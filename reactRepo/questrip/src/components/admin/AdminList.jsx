import React from 'react';
import styled from 'styled-components';

const AdminList = () => {

    const StyledListDiv = styled.div`
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 5fr;
        `;
    return (
        <StyledListDiv>
            <div>탭</div>
            <div>리스트</div>
        </StyledListDiv>
    );
};

export default AdminList;