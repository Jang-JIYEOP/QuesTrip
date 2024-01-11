import React from 'react';

const Page = ({ currentPage, pageTotal, handlePageChange }) => {
  const renderPaginationButtons = () => {
    
    const buttons = [];

    // 현재 페이지 범위 계산
    const startIdx = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const endIdx = Math.min(startIdx + 9, pageTotal);

    // 이전 10 페이지로 이동하는 버튼
    if (startIdx > 1) {
      buttons.push(
        <button key="prev" onClick={() => handlePageChange(startIdx - 1)}>
          {'<'}
        </button>
      );
    }

    // 현재 페이지 범위의 페이지 버튼 렌더링
    for (let i = startIdx; i <= endIdx; i++) {
      buttons.push(
        <button key={i} onClick={() => handlePageChange(i)}>
          {i}
        </button>
      );
    }

    // 다음 10 페이지로 이동하는 버튼
    if (endIdx < pageTotal) {
      buttons.push(
        <button key="next" onClick={() => handlePageChange(endIdx + 1)}>
          {'>'}
        </button>
      );
    }

    return buttons;
  };

  return <div>{renderPaginationButtons()}</div>;
};

export default Page;