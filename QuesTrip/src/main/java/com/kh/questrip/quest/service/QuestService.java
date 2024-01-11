package com.kh.questrip.quest.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.quest.dao.QuestDao;
import com.kh.questrip.quest.vo.SearchInfoVo;
import com.kh.questrip.quest.vo.QuestVo;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class QuestService {

	private final QuestDao dao;
	private final SqlSessionTemplate sst;
	


	public List<QuestVo> allList(SearchInfoVo vo) {
		return dao.allList(sst, vo);
	}

	public List<QuestVo> pageList(SearchInfoVo vo) {
		return dao.pageList(sst, vo);
	}

}
