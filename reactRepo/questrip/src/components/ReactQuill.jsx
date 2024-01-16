import ReactQuill from "react-quill";
import { useState } from "react";

function Write() {

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["image"],
        ["bold", "underline"],
      ],
    },
  };
  const [content, setContent] = useState("");
  console.log(content);
  const [title, setTitle] = useState("");
  const handleTitleChange = (e) => {
  setTitle(e.currentTarget.value);
  };

  return (
  <>
    <div>
      <label htmlFor="title">제목</label>
      <input id="title" type="text" onChange={handleTitleChange} />
      <ReactQuill
        style={{ width: "800px", height: "600px" }}
        modules={modules}
        onChange={setContent}
      />
    </div>
    <button style={{ marginTop: "50px" }}>
      제출
    </button>
  </>
  );
}
export default Write;