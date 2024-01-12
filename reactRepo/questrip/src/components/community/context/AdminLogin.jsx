import React, { createContext, useContext, useEffect, useState } from 'react';

const AdminMemory = createContext();

const AdminMemoryProvider = ({children}) => {

    const [LoginAdminVo, setLoginAdminVo] = useState([]);

    const [loginAdminInfo, setLoginAdminInfo] = useState([]);

    const loadLoginAdmin = () => {
        fetch("http://127.0.0.1:8888/questrip/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body : JSON.stringify(loginAdminInfo),
        })
        .then(resp => resp.json())
        .then((data) => {
            setLoginAdminVo(data.LoginAdminVo);
        })
        ;
    }

    useEffect(() => {
        loadLoginAdmin();
    },[loginAdminInfo]);
    
    const LoginAdmin = {
        LoginAdminVo,
        setLoginAdminVo,
        setLoginInfo: setLoginAdminInfo,
    }

    return (<>
        <AdminMemory.Provider value={LoginAdmin}>
            {children}
        </AdminMemory.Provider>
    </>);
}

const useAdminMemory = () => {
    const LoginAdmin = useContext(AdminMemory);
    return LoginAdmin;
}

export {AdminMemoryProvider, useAdminMemory};