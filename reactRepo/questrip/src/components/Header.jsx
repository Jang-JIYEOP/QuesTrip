import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeaderDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
    grid-template-rows: 1fr;
    
    & > .logoArea {
        background-image: url('/resources/img/QuesTrip.png');
        background-repeat: no-repeat;
        background-size: 70%;
        background-position: center center;
    }
    & > div{
        /* border: 1px solid black; */
    }
`;

const StyledSearchDiv = styled.div`
    width: 100%;
    height: 100%;
    

    & > form{
        width: 100%;
        height: 100%;
        margin: 20px;
        & > select{
            height: 30%;
        
        }
        & :nth-child(2) {
            width: 30%;
            height: 30%;
        }
    }
`;

const Header = () => {

    const navigate = useNavigate();

    return (
        <StyledHeaderDiv>
            <div className='logoArea' onClick={ () => { navigate("/home") } }></div>
            <StyledSearchDiv>
                <form action="">
                    <select name="search">
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                        <option value="writer">작성자</option>
                    </select><input type="text" name='searchContent' id='searchInput' />
                     <input type="submit" value="검색"/>
                </form>
                
            </StyledSearchDiv>
            <div>로그인</div>
        </StyledHeaderDiv>
    );
};

export default Header;