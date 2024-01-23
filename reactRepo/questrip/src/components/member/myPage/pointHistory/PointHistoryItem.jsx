import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PointHistoryItemDiv = styled.div`
    width: 100%;

    display: grid;
    /* grid-template-rows: repeat(3, 1fr); */
    border-bottom: 1px solid lightgray;

    .eoe {
        display: flex; /* Change from grid to flex */
        flex-direction: row; /* Horizontal arrangement */
        margin-left: 85%;
        
    }

    #color {
        color: ${(props) => (props.eoe === 'C' ? 'blue' : props.eoe === 'E' ? 'red' : 'black')};
        font-weight: bold;
        margin-left: 5%;
    }

    #changes{
        margin-left: 85%;
    }
    #source{
        font-weight: bold;
    }
`;

const PointHistoryItem = ({ vo }) => {
    const [eoe, setEoe] = useState('');

    useEffect(() => {
        if (vo.eoe === 'C') {
            setEoe('수입 : ');
        } else if (vo.eoe === 'E') {
            setEoe('지출 : ');
        }
    }, [vo.eoe]);

    return (
        <PointHistoryItemDiv eoe={vo.eoe}>
            <div>{vo.enrollDate}</div>
            <div id='source'>{vo.source}</div>
            <div className="eoe">
                <div>{eoe}</div>
                <div id="color">{vo.getPoint}</div>
            </div>
            <div className="eoe" id='changes'>잔액 : {vo.changes}</div>
        </PointHistoryItemDiv>
    );
};

export default PointHistoryItem;
