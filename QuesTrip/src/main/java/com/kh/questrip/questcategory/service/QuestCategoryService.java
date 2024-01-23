package com.kh.questrip.questcategory.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.questcategory.dao.QuestCategoryDao;
import com.kh.questrip.questcategory.vo.QuestCategoryVo;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class QuestCategoryService {
		private final QuestCategoryDao dao;
		private final SqlSessionTemplate sst;
	
	public List<QuestCategoryVo> list() {
		return dao.list(sst);
	}

}
