package com.kh.questrip.comment.dao;

import java.util.List;

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

}
