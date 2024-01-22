package com.kh.questrip.complete.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.quest.vo.QuestVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

@Repository
public class CompleteDao {

	public int allList(SqlSessionTemplate sst) {
		return sst.selectOne("CompleteMapper.listAll");
	}

	public List<QuestVo> pageList(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("CompleteMapper.pageList",vo);
	}

}
