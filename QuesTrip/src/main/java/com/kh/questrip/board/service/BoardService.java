package com.kh.questrip.board.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import com.kh.questrip.board.dao.BoardDao;
import com.kh.questrip.board.vo.BoardDetailVo;
import com.kh.questrip.board.vo.BoardVo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardDao dao;
	private final SqlSessionTemplate sst;
	
	//게시글 작성
	public int write(BoardVo vo) {
		return dao.write(sst, vo);
	}

	//게시글 목록 조회
	public List<BoardVo> list() {
		return dao.list(sst);
	}
	
	
	//게시글 삭제
	public int delete(BoardVo vo) {
		return dao.delete(sst, vo);
	}
	
	
	//게시글 수정
	public int edit(BoardVo vo) {
		return dao.edit(sst, vo);
	}
	
	//게시글 상세 조회
	public BoardDetailVo detail(BoardVo vo) {
		
		return dao.detail(sst, vo);
	}
	
	//인기 게시글 3개 조회
	public List<BoardVo> best() {
		return dao.best(sst);
	}
	
	//게시글 상세 조회 시 조회수 증가
	public int increaseHit(String no) {
		return dao.updateBoardHit(sst, no);
	}
	
	
	//게시글 추천시 추천 수 증가
	public int increaseBoardLikes(String memberNo, String boardNo) {
        return dao.increaseBoardLikes(sst, memberNo, boardNo);
    }
	
	//게시글 추천 취소
	public int decreaseBoardLikes(String memberNo, String boardNo) {
        return dao.decreaseBoardLikes(sst, memberNo, boardNo);
    }
	
	
	//게시글 추천 여부 판단
	public boolean checkIfAlreadyLiked(Map<String, Object> params) {
        return dao.checkIfAlreadyLiked(sst, params);
    }

}
