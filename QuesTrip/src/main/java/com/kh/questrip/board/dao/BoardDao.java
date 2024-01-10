package com.kh.questrip.board.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.board.vo.BoardDetailVo;
import com.kh.questrip.board.vo.BoardVo;

@Repository
public class BoardDao {

	//게시글 작성
	public int write(SqlSessionTemplate sst, BoardVo vo) {
		return sst.insert("BoardMapper.write", vo);
	}

	//게시글 목록 조회
	public List<BoardVo> list(SqlSessionTemplate sst) {
		return sst.selectList("BoardMapper.list");
	}

	//게시글 삭제
	public int delete(SqlSessionTemplate sst, BoardVo vo) {
		return sst.delete("BoardMapper.delete", vo);
	}
	
	//게시글 수정
	public int edit(SqlSessionTemplate sst, BoardVo vo) {
		return sst.update("BoardMapper.edit", vo);
	}

	//게시글 상세 조회
	public BoardDetailVo detail(SqlSessionTemplate sst, BoardVo vo) {
		return sst.selectOne("BoardMapper.detail", vo);
	}
	
	//인기 게시글 3개 조회
	public List<BoardVo> best(SqlSessionTemplate sst) {
		return sst.selectList("BoardMapper.best");
	}
	
	//게시글 상세 조회 시 조회수 증가
	public int updateBoardHit(SqlSessionTemplate sst, String no) {
		return sst.update("BoardMapper.increaseHit", no);
	}
	
	//게시글 추천
	public int increaseBoardLikes(SqlSessionTemplate sst, String memberNo, String boardNo) {

        return sst.insert("BoardMapper.increaseLikes", Map.of("memberNo", memberNo, "boardNo", boardNo));
    }
	
	//게시글 추천 취소
	public int decreaseBoardLikes(SqlSessionTemplate sst, String memberNo, String boardNo) {
		System.out.println(memberNo);
		System.out.println(boardNo);
        return sst.delete("BoardMapper.decreaseLikes", Map.of("memberNo", memberNo, "boardNo", boardNo));
    }

	
	//게시글 추천 여부 판단
	public boolean checkIfAlreadyLiked(SqlSessionTemplate sst, Map<String, Object> params) {
		
		boolean result = sst.selectOne("BoardMapper.checkIfAlreadyLiked", params);
		System.out.println("result: "+result);
        return sst.selectOne("BoardMapper.checkIfAlreadyLiked", params);
    }

}
