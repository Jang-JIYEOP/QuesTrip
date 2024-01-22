import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Quill 스타일 시트

import styled from 'styled-components';
import Write from './ReactQuill';

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

    console.log(content);
    return (
        <StyledCommunityWriteDiv>
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
