import { useContext , useEffect} from "react";
import { useState } from "react";
import { createContext } from "react";

const QuestMemory = createContext();

const QuestMemoryProvider = ({children}) => {

    const [questVoList, setQuestVoList] = useState([]);

    const [categoryVo, setCategoryVo] = useState({
        no : "1",
    });

    const setCategoryNo = (no) => {
        setCategoryVo({
            no,
        });
        loadQuestVoList();
    }

 
    const loadQuestVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/quest/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body : JSON.stringify(categoryVo),
        })
        .then(resp => resp.json())
        .then((questVoList) => {setQuestVoList(questVoList);})
        ;
    }

    useEffect(() => {
        loadQuestVoList();
    },[]);
    
    const questList = {
        questVoList,
        setCategoryNo,
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