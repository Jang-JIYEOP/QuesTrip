import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledWrqpDiv = styled.div`
    width: 100%;
    height: 1000%;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    #item {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 2fr 3fr;
        grid-template-rows: 1fr 1fr 1fr;
        gap: 10px;
    }

    #item #img {
        grid-row: span 3;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }
    }

    #item #title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
    }

    #item #price {
        color: #4682B4;
        font-weight: bold;
    }

    #item button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        background-color: #4682B4;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    #item button:hover {
        background-color: #357ca5;
    }
`;

const IconListItem = ({ vo, type}) => {
    console.log("타입",type.nowType);
    let loginNumber = '';
    if(sessionStorage.getItem('loginInfo')){
         loginNumber = sessionStorage.getItem('loginInfo');
    }
    const [buyerVo , setBuyerVo ] = useState({
        memberNo : loginNumber,
    });

    const [func, setFunc] = useState({
        func : 'update',
    });

    const handleButtonClick = (vo) => {
        if (type.nowType === "myicon") {
            setBuyerVo((prevBuyerVo) => ({
                ...prevBuyerVo,
                iconNo: vo.no,
            }));
            setFunc({
                func : 'update',
            });
        }
        else if (type.nowType === "shop") {
            setBuyerVo((prevBuyerVo) => ({
                
                ...prevBuyerVo,
                iconNo: vo.no,
                price : vo.price,
            }));
            
            setFunc({
                func : 'buy',
            });
        }
    };
    
    
    const updateVo = () => {
            console.log("업데이트:buyVo ", buyerVo);
            fetch(`http://127.0.0.1:8888/questrip/api/icon/${func.func}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body : JSON.stringify(buyerVo),
            })
            .then(resp => 
                resp.json())
            .then(data => {
                console.log("토탈 페이지",data.msg);
                if(func.func==='buy'){
                    if(data.msg==="lack"){
                        alert("보유금액이 부족합니다. ");

                    }else if(data.msg === "good"){
                        alert("아이콘 구매 성공!");
                        window.location.reload();
                    }
                }
                else if(func.func==='update'){
                    console.log("update 실행");
                    if(data.msg === "good"){
                        alert("대표아이콘 변경 성공!");
                        window.location.reload();
                    }
                }
                
            })
            .catch((e) => {
                console.log(e);
            })
            ;
        }
        
    useEffect( () => {
        updateVo();
    }, [buyerVo] );

    
    return (
        <StyledWrqpDiv>
            <div id="item">
                <div id="img">
                    <img src={vo.photo} alt="아이콘 이미지" />
                </div>
                <div id="title">{vo.title}</div>
                <div id="price">{vo.price}</div>
    
                {loginNumber && (
                    <button onClick={() => handleButtonClick(vo)}>
                        {type.nowType === "shop" ? "구매하기" : "대표아이콘으로지정"}
                    </button>
                )}
            </div>
        </StyledWrqpDiv>
    );
};

export default IconListItem;