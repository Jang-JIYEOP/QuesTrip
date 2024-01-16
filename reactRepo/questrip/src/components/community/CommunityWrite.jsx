import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill 스타일 시트
import Write from '../ReactQuill';

import styled from 'styled-components';

const StyledCommunityWriteDiv = styled.div`
    width: 100%;
    height: 100%;

    .title {
        margin-top: 20px;
        grid-column: span 3;
    }

    #title {
        width: 100%;
        height: 40%;
    }

    .quill-editor {
        width: 100%;
        height: 60%;
    }
`;

const CommunityWrite = () => {
    const [content, setContent] = useState('');

    const handleQuillChange = (value) => {
        setContent(value);
    };

    return (
        <StyledCommunityWriteDiv>
            <div className="title">
                <label htmlFor="title">제목</label>
                <input id="title" type="text" />
            </div>

            <div className="quill-editor">
                <Write
                    theme="snow"
                    value={content}
                    onChange={handleQuillChange}
                />
            </div>
        </StyledCommunityWriteDiv>
    );
};

export default CommunityWrite;
