package com.kh.questrip.icon.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.icon.dao.IconDao;
import com.kh.questrip.icon.vo.IconVo;
import com.kh.questrip.icon.vo.buyerVo;
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

	public List<IconVo> myIconAll(SearchInfoVo vo) {
		return dao.myIconAll(sst,vo);
	}


	public List<IconVo> pageMyIcon(SearchInfoVo vo) {
		return dao.pageMyIcon(sst,vo);
	}

	public int update(buyerVo vo) {

		return dao.update(sst,vo);
	}

	public int memberPointUpdate(buyerVo vo) {
		return dao.memberPointUpdate(vo, sst);
	}

	public int pointInsert(buyerVo vo) {
		return dao.pointInsert(vo,sst);
	}

	public int memberIconInsert(buyerVo vo) {
		return dao.memberIconInsert(vo,sst);
	}
	
}
