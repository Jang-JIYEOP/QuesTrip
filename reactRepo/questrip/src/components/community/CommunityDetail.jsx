import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CommunityDetail = () => {

    const  {id} = useParams(); // URL에서 게시글의 ID를 가져옵니다.
    const [boardDetailVo, setBoardDetailVo] = useState([]); // 상세 정보를 저장할 상태 변수입니다.
    const [boardVo, setBoardVo] = useState({
        no: id
    });

    useEffect(() => {
        // API를 호출하여 게시글의 상세 정보를 가져옵니다.
        fetch(`http://127.0.0.1:8888/questrip/api/community/detail/?no=${id}`, {
            method: "POST",
            headers : {
                "Content-Type" : "application/json" ,
            },
            body : JSON.stringify(boardVo)
        })
            .then(resp => resp.json())
            .then(boardDetailVo => {
                // 서버로부터 받은 데이터를 boardDetailVo 상태 변수에 저장합니다.
                setBoardDetailVo(boardDetailVo);
                
            })
            .catch(error => {
                console.error("게시글 상세 정보를 가져오는 중 에러 발생:", error);
            });
    }, [id]);

    console.log(bo);
    

    return (
        <table>
            <tbody>
                {/* 받아오는 것 까진 양호. 출력해줘야함. */}
            </tbody>
        </table>
    );
    
};

export default CommunityDetail;
