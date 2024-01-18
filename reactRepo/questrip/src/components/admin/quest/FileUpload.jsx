import React, { useState } from 'react';

const FileUpload = ({ onFileChange }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    onFileChange(e.target.files[0]); // 부모 컴포넌트로 파일 변경 알림
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;