import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MemberMemory  = createContext();

const MemberMemoryProvider = ({children}) => {

    const [loginMemberVo, setLoginMemberVo] = useState({
        no:null,
        email:"",
    });

    const [loginInfo, setLoginInfo] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const sessionMemberVo = sessionStorage.getItem(loginMemberVo.no);
    
    const loadLoginMember = () => {
        const MemberVo = loginInfo;
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
                    setLoginMemberVo(data.loginMemberVo);
                    sessionStorage.setItem('loginInfo', JSON.stringify(data.loginMemberVo.no));
                    if (location.pathname === '/member/login') {
                        navigate('/');
                      }
                }else{
                    alert("로그인 실패 ...");
                }
            });
        
        
    }

    useEffect(() => {
        
            loadLoginMember();
        
    },[loginInfo]);
    
    const loginMember = {
        loginMemberVo,
        setLoginMemberVo,
        setLoginInfo,
    }

    return (<>
        <MemberMemory.Provider value={loginMember}>
            {children}
        </MemberMemory.Provider>
    </>);
}

const useLoginMemory = () => {
    const loginMember = useContext(MemberMemory);
    return loginMember;
}

export {MemberMemoryProvider, useLoginMemory};