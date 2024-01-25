package com.kh.questrip.comment.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.comment.vo.CommentVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

@Repository
public class CommentDao {
	
	
	//댓글 조회
	public int list(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectOne("commentMapper.list", vo);
	}
	
	//인기 댓글 3개 조회
	public List<CommentVo> best(SqlSessionTemplate sst) {
		return sst.selectList("commentMapper.best");
	}
	
	public List<CommentVo> pageList(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("commentMapper.pageList",vo);
	}
	
	//댓글 작성
	public int write(SqlSessionTemplate sst, CommentVo vo) {
		return sst.insert("commentMapper.write", vo);
	}
	
	//댓글 추천 여부 판단
	public boolean checkIfAlreadyLiked(SqlSessionTemplate sst, Map<String, Object> map) {
		boolean result = sst.selectOne("commentMapper.checkIfAlreadyLiked", map);
		System.out.println("result: "+result);
        return sst.selectOne("commentMapper.checkIfAlreadyLiked", map);
	}
	
	//댓글 추천 증가
	public int increaseBoardLikes(SqlSessionTemplate sst, String memberNo, String no) {
		return sst.insert("commentMapper.increaseLikes", Map.of("memberNo", memberNo, "no", no));
	}
	
	//댓글 추천 취소
	public int decreaseBoardLikes(SqlSessionTemplate sst, String memberNo, String no) {
		System.out.println(memberNo);
		System.out.println(no);
        return sst.delete("commentMapper.decreaseLikes", Map.of("memberNo", memberNo, "no", no));
    }
	
	//댓글 삭제
	public int delete(SqlSessionTemplate sst, CommentVo vo) {
		return sst.delete("commentMapper.delete", vo);
	}
	
	//대댓글 조회
	public List<CommentVo> underCommentList(SqlSessionTemplate sst, CommentVo vo) {
		return sst.selectList("commentMapper.underCommentList", vo);
	}
	
	//대댓글 작성
	public int underCommentWrite(SqlSessionTemplate sst, CommentVo vo) {
		return sst.insert("commentMapper.underCommentWrite", vo);
	}

}
