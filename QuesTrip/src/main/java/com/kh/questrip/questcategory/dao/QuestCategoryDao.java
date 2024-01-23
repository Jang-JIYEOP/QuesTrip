package com.kh.questrip.questcategory.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.questcategory.vo.QuestCategoryVo;

@Repository
public class QuestCategoryDao {

	public List<QuestCategoryVo> list(SqlSessionTemplate sst) {
		return sst.selectList("QuestCategoryMapper.list");
	}
	
	
}
