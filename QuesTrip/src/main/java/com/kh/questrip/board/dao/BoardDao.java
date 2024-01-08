package com.kh.questrip.board.dao;

import java.util.List;

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

}
