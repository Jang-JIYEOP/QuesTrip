package com.kh.questrip.complete.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.complete.dao.CompleteDao;
import com.kh.questrip.complete.vo.CompleteVo;
import com.kh.questrip.quest.dao.QuestDao;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompleteService {

	private final CompleteDao dao;
	private final SqlSessionTemplate sst;
	
	public int allList() {
		return dao.allList(sst);
	}

	public List<CompleteVo> pageList(SearchInfoVo vo) {
		return dao.pageList(sst,vo);
	}

	public int update(CompleteVo vo) {

		return dao.update(vo,sst);
	}

}
