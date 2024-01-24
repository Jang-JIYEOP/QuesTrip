package com.kh.questrip.comment.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.board.vo.BoardVo;
import com.kh.questrip.comment.dao.CommentDao;
import com.kh.questrip.comment.vo.CommentVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
	
	private final CommentDao dao;
	private final SqlSessionTemplate sst;

	//댓글 조회
	public int list(SearchInfoVo vo) {
		System.out.println("댓글: "+ dao.list(sst, vo));
		return dao.list(sst, vo);
	}
	
	//인기 댓글 3개 조회
	public List<CommentVo> best() {
		return dao.best(sst);
	}
	
	public List<CommentVo> pageList(SearchInfoVo vo) {
		System.out.println("페이지리스트: "+ dao.pageList(sst, vo));
		return dao.pageList(sst, vo);
	}

	public int write(CommentVo vo) {
		return dao.write(sst, vo);
	}
	
	//댓글 추천 여부 판단
	public boolean checkIfAlreadyLiked(Map<String, Object> map) {
		return dao.checkIfAlreadyLiked(sst, map);
	}
	
	//댓글 추천 증가
	public int increaseBoardLikes(String memberNo, String no) {
		return dao.increaseBoardLikes(sst, memberNo, no);
	}
	
	//댓글 추천 취소
	public int decreaseBoardLikes(String memberNo, String no) {
		return dao.decreaseBoardLikes(sst, memberNo, no);
	}
	
	//댓글 삭제
	public int delete(CommentVo vo) {
		return dao.delete(sst, vo);
	}
	
	//대댓글 조회
	public List<CommentVo> underCommentList(CommentVo vo) {
		return dao.underCommentList(sst, vo);
	}
	
	
}
