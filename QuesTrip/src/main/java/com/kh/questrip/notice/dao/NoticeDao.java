package com.kh.questrip.notice.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.notice.vo.NoticeVo;
import com.kh.questrip.quest.vo.SearchInfoVo;
@Repository
public class NoticeDao {

	public List<NoticeVo> list(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("NoticeMapper.list", vo);
	}
	public List<NoticeVo> pageList(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("NoticeMapper.pageList", vo);
	}

}