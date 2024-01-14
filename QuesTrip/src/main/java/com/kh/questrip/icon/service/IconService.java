package com.kh.questrip.icon.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.icon.dao.IconDao;
import com.kh.questrip.icon.vo.IconVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IconService {
	private final IconDao dao;
	private final SqlSessionTemplate sst;

	public List<IconVo> list(SearchInfoVo vo) {
		return dao.list(sst, vo);

	}

	public List<IconVo> pageList(SearchInfoVo vo) {
		return dao.pageList(sst, vo);
	}
	
}
