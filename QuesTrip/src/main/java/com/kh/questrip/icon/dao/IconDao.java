package com.kh.questrip.icon.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.icon.vo.IconVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

@Repository
public class IconDao {

	public List<IconVo> list(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("IconMapper.list", vo);
	}
	
	public List<IconVo> pageList(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("IconMapper.pageList", vo);
	}
}
