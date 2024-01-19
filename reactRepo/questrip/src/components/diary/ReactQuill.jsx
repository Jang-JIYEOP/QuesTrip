import ReactQuill from "react-quill";
import { useState, useRef, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMemory } from "../community/context/LoginContext";

function Write() {
  const quillRef = useRef(null);
  const [diaryVo, setDiaryVo] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const loginNumber = sessionStorage.getItem('loginInfo');
  const {loginMemberVo, setLoginMemberVo, setLoginInfo} = useLoginMemory();

  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.value);
   };
   console.log(content);

  useEffect(() => {
    fetch("http://127.0.0.1:8888/questrip/api/diary/write", {
                method: "POST",
                headers : {
                  "Content-Type" : "application/json" ,
                },
                body : JSON.stringify(diaryVo),
            })
            .then(resp => resp.json())
            .then((data) => {
                if(data > 0){
                    alert("일기 작성 성공");
                    navigate('/diary/list');
                }else{
                    alert("일기 작성 실패...");
                }
            });
  
  }, [diaryVo]);

  const navigate = useNavigate();
  const ImageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);
      console.log(file);

      let quillObj = quillRef.current?.getEditor();
      console.log("quillObj : " + quillObj);

      try {
        const res = await fetch("http://127.0.0.1:8888/questrip/api/diary/uploadImage", {
          method: "POST",
          body: formData,
        });

        const imgUrl = await res.text();
        console.log("imgurl :" + imgUrl);
        
        const range = quillObj.getSelection();
        quillObj?.insertEmbed(range.index, "image", `${imgUrl}`);
        console.log("quillObj insert : " + quillObj);
        
      } catch (error) {
        console.log(error);
      }
    };
  };

  const handleSubmit = async () => {
    setDiaryVo({
      title: title,
      content: content,
      memberNo: loginNumber,
    });
    
    console.log("타이틀: ",diaryVo.title);
    console.log("콘텐츠: ",diaryVo.content);
    console.log("멤버넘버: ",diaryVo.memberNo);
    
  };

  

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: ImageHandler,
        },
      },
    };
  }, []);
  // 위에서 설정한 모듈들 foramts을 설정한다
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'image',
  ];

  return (
    <>
      <div>
      <label htmlFor="title">제목</label>
      <input id="title" type="text" onChange={handleTitleChange} />  
        <ReactQuill
          style={{ width: "800px", height: "600px" }}
          modules={modules}
          ref={quillRef}
          formats={formats}
          onChange={setContent}
        />
      </div>
      
      <button style={{ marginTop: "50px" }} onClick={handleSubmit}>
        제출
      </button>
    </>
  );
}

export default Write;
