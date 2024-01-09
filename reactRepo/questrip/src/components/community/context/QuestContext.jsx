import { useContext , useEffect} from "react";
import { useState } from "react";
import { createContext } from "react";

const QuestMemory = createContext();

const QuestMemoryProvider = ({children}) => {



    const [questVoList, setQuestVoList] = useState([]);

    const [searchInfoVo, setSearchInfoVo] = useState({
        locCateNo : "1",
    });

 
    const loadQuestVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/quest/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body : JSON.stringify(searchInfoVo),
        })
        .then(resp => resp.json())
        .then((questVoList) => {setQuestVoList(questVoList);})
        ;
    }


    useEffect(() => {
        loadQuestVoList();
    },[searchInfoVo]);
    
    const questList = {
        questVoList,
        setSearchInfoVo,
    }
    return (<>
        <QuestMemory.Provider value={questList}>
            {children}
        </QuestMemory.Provider>
    </>);
}

const useQuestMemory = () => {
    const questList = useContext(QuestMemory);
    return questList;
}

export {QuestMemoryProvider, useQuestMemory};