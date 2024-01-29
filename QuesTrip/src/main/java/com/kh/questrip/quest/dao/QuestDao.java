package com.kh.questrip.quest.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.quest.vo.SearchInfoVo;
import com.kh.questrip.quest.vo.ComQuestVo;
import com.kh.questrip.quest.vo.QuestVo;
@Repository
public class QuestDao {


	public List<QuestVo> allList(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("QuestMapper.allList", vo);
	}

	public List<QuestVo> pageList(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("QuestMapper.pageList",vo);
	}

	public List<QuestVo> listAll(SqlSessionTemplate sst) {
		return sst.selectList("QuestMapper.listAll");
	}

	public int write(SqlSessionTemplate sst, QuestVo vo) {
		return sst.insert("QuestMapper.write", vo);
	}

	public int complete(SqlSessionTemplate sst, ComQuestVo vo) {
		return sst.insert("QuestMapper.complete", vo);
	}

	public int checkComplete(SqlSessionTemplate sst, ComQuestVo vo) {
		return sst.selectOne("QuestMapper.checkComplete", vo);
	}

}
