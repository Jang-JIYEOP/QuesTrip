import React, { useState } from 'react';
import styled from 'styled-components';
import AddressInput from './AddressInput';

const StyledWriteDiv = styled.div`
    width: 60%;
    height: 100%;

    & > form {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 4fr 1fr;
        place-items: center center;

        & > div {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;

            select,
            input,
            textarea,
            [type='file'] {
                width: 80%;
                padding: 8px;
                margin: 5px 0;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
            }

            textarea {
                height: 80%
            }
        }

        #queCate,
        #point,
        #headCnt,
        #locCate {
            select {
                width: 90%;
            }
        }

        #upload {
            grid-column: span 2;
            input[type='file'] {
                width: 100%;
            }
        }

        #title {
            grid-column: span 3;
        }

        #content {
            grid-column: span 3;
        }
    }
`;

const QuestWrite = () => {
    const [coordinates, setCoordinates] = useState(null);

    // 좌표값을 받아오는 함수
    const handleCoordinatesChange = (newCoordinates) => {
        setCoordinates(newCoordinates);
    };

    return (
        <StyledWriteDiv>
            <form action="">
                <div id="queCate">
                    <select>
                        {/* queCate의 옵션들 */}
                        <option value="옵션1">옵션 1</option>
                        <option value="옵션2">옵션 2</option>
                    </select>
                </div>
                <div id="point">
                    <select>
                        {/* point의 옵션들 */}
                        <option value="포인트1">포인트 1</option>
                        <option value="포인트2">포인트 2</option>
                    </select>
                </div>
                <div id="headCnt">
                    <select>
                        {/* headCnt의 옵션들 */}
                        <option value="헤드1">헤드 1</option>
                        <option value="헤드2">헤드 2</option>
                    </select>
                </div>
                <div id="locCate">
                    <select>
                        {/* locCate의 옵션들 */}
                        <option value="지역1">지역 1</option>
                        <option value="지역2">지역 2</option>
                    </select>
                </div>
                <div id="adress">
                    <AddressInput onCoordinatesChange={handleCoordinatesChange} />
               
                </div>
                <div id="title">
                    <input type="text" placeholder="제목" />
                </div>
                <div id="content">
                    <textarea placeholder="내용"></textarea>
                </div>
                <div id="upload">
                    <input type="file" />
                </div>
                <div>
                    <input type="submit" value="등록하기" />
                </div>
            </form>
        </StyledWriteDiv>
    );
};

export default QuestWrite;
