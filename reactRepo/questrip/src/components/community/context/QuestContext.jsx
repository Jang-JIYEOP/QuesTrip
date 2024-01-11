import { useContext , useEffect} from "react";
import { useState } from "react";
import { createContext } from "react";

const QuestMemory = createContext();

const QuestMemoryProvider = ({children}) => {



    const [questVoList, setQuestVoList] = useState([]);
    const [pageTotal, setpageTotal] = useState([]);
    const [searchInfoVo, setSearchInfoVo] = useState({
        locCateNo : "1",
        pageNo : 1,
        limit : 10,
    });

    const handlePageChange = (pageNumber) => {
        setSearchInfoVo((prevSearchInfoVo) => ({
          ...prevSearchInfoVo,
          pageNo: pageNumber,
        }));
      };
 
    const loadQuestVoList = () => {
        fetch("http://127.0.0.1:8888/questrip/api/quest/list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body : JSON.stringify(searchInfoVo),
        })
        .then(resp => resp.json())
        .then((data) => {
            setQuestVoList(data.questVoList);
            setpageTotal(data.pageTotal);
        })
        ;
    }


    useEffect(() => {
        loadQuestVoList();
    },[searchInfoVo]);
    
    const questList = {
        questVoList,
        setSearchInfoVo,
        pageTotal,
        searchInfoVo,
        handlePageChange,
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