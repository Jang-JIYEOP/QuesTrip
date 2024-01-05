package com.kh.questrip.quest.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.board.dao.BoardDao;
import com.kh.questrip.quest.dao.QuestDao;
import com.kh.questrip.quest.vo.LocateCategoryVo;
import com.kh.questrip.quest.vo.QuestVo;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class QuestService {

	private final QuestDao dao;
	private final SqlSessionTemplate sst;
	
	public List<QuestVo> list(LocateCategoryVo vo) {
		return dao.list(sst, vo);
	}

}
