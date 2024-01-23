package com.kh.questrip.locatecategory.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.locatecategory.vo.LocateCategoryVo;
@Repository
public class LocateCategoryDao {

	public List<LocateCategoryVo> list(SqlSessionTemplate sst) {
		return sst.selectList("LocateCategoryMapper.list");
	}

}
