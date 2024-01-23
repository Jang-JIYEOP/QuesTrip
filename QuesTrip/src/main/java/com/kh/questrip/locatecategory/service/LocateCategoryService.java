package com.kh.questrip.locatecategory.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.locatecategory.dao.LocateCategoryDao;
import com.kh.questrip.locatecategory.vo.LocateCategoryVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocateCategoryService {
	private final LocateCategoryDao dao;
	private final SqlSessionTemplate sst;

	public List<LocateCategoryVo> list() {
		return dao.list(sst);
	}

}
