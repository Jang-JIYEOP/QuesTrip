package com.kh.questrip.quest.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.quest.vo.LocateCategoryVo;
import com.kh.questrip.quest.vo.QuestVo;
@Repository
public class QuestDao {

	public List<QuestVo> list(SqlSessionTemplate sst, LocateCategoryVo vo) {
		return sst.selectList("QusetMapper.list", vo);
	}

}
