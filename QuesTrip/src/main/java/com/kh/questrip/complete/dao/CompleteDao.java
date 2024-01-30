package com.kh.questrip.complete.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.complete.vo.CompleteVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

@Repository
public class CompleteDao {

	public int allList(SqlSessionTemplate sst) {
		return sst.selectOne("CompleteMapper.listAll");
	}

	public List<CompleteVo> pageList(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("CompleteMapper.pageList",vo);
	}

	public int update(CompleteVo vo, SqlSessionTemplate sst) {
		return sst.update("CompleteMapper.update",vo);
	}

	public List<CompleteVo> myList(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("CompleteMapper.myList",vo);
	}

	public int updatePoint(SqlSessionTemplate sst, CompleteVo vo) {
		return sst.update("CompleteMapper.updatePoint", vo);
	}

	public int updateTitle(SqlSessionTemplate sst, CompleteVo vo) {
		return sst.update("CompleteMapper.updateTitle", vo);
	}

	public List<CompleteVo> list(SearchInfoVo vo, SqlSessionTemplate sst) {
		return sst.selectList("CompleteMapper.list", vo);
	}

	public int insertPoint(CompleteVo vo, SqlSessionTemplate sst) {
		return sst.insert("CompleteMapper.pointInsert", vo);
	}

}
