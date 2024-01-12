import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const MemberMemory  = createContext();

const MemberMemoryProvider = ({children}) => {

    const [LoginMemberVo, setLoginMemberVo] = useState([]);

    const [loginInfo, setLoginInfo] = useState([]);

    const navigate = useNavigate();

    const loadLoginMember = () => {

        const MemberVo = loginInfo;
        console.log(MemberVo);
        fetch("http://127.0.0.1:8888/questrip/api/member/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body : JSON.stringify(MemberVo),
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.msg === "good"){
                alert("로그인 성공 !");
                setLoginMemberVo(data.LoginMemberVo);
                navigate("/");
            }else{
                alert("로그인 실패 ...");
            }


            
        })
        ;
    }

    useEffect(() => {
        loadLoginMember();
    },[loginInfo]);
    
    const LoginMember = {
        LoginMemberVo,
        setLoginMemberVo,
        setLoginInfo,
    }

    return (<>
        <MemberMemory.Provider value={LoginMember}>
            {children}
        </MemberMemory.Provider>
    </>);
}

const useLoginMemory = () => {
    const LoginMember = useContext(MemberMemory);
    return LoginMember;
}

export {MemberMemoryProvider, useLoginMemory};