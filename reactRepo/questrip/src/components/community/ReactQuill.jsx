import ReactQuill from "react-quill";
import { useState, useRef } from "react";
function Write() {
  const quillRef = useRef(null);
  const [boarVo, setBoardVo] = useState([]);

  

   //image를 서버로 전달하는 과정
   const ImageHandler = () => {
    //input type= file DOM을 만든다.
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click(); //toolbar 이미지를 누르게 되면 이 부분이 실행된다.
    
    
    /*이미지를 선택하게 될 시*/
    input.onchange = async () => {

      /*이미지 선택에 따른 조건을 다시 한번 하게 된다.*/
      const file = input.files[0];
      
      /*서버에서 FormData형식으로 받기 때문에 이에 맞는 데이터형식으로 만들어준다.*/
      const formData = new FormData();
      formData.append("image", file);
      console.log(file);

      /*에디터 정보를 가져온다.*/
      let quillObj = quillRef.current?.getEditor();
      console.log("quillObj : "+quillObj);
      try {

        /*서버에다가 정보를 보내준 다음 서버에서 보낸 url을 imgUrl로 받는다.*/
        const res = await fetch("http://127.0.0.1:8888/questrip/api/community/uploadImage", {
          method: "POST",
          body: formData,
      })
      const imgUrl = await res.text();
      console.log("imgurl"+imgUrl);
        /*에디터의 커서 위치에 이미지 요소를 넣어준다.*/
        const range = quillObj.getSelection();
        quillObj?.insertEmbed(range.index, "image", `${imgUrl}`);
        console.log("quillObj insert : "+quillObj);
      } catch (error) {
        console.log(error);
      }
    };
  };

  

  const [content, setContent] = useState("");

  console.log(content);

  const [title, setTitle] = useState("");

  

  const handleSubmit = async () => {
  const date = new Date();
  try {
    await setBoardVo({
      title,
      content,
      date,
    }).then((res) => console.log(res));
  } catch (error) {
    console.log(error);
  }
  };

  const modules = {
    toolbar: {
      container: [
        ["image"],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "underline"],
      ],
      handlers: {
        image: ImageHandler,
      },
    },
  };
  
  return (
  <>
    <div>
     
      <ReactQuill
        style={{ width: "800px", height: "600px" }}
        modules={modules}
      />
    </div>
    <button style={{ marginTop: "50px" }} onClick={handleSubmit}>
      제출
    </button>
  </>
  );
  }
  export default Write;