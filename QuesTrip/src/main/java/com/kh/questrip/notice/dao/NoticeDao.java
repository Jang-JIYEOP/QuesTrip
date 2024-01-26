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
	public List<NoticeVo> listAll(SqlSessionTemplate sst) {
		return sst.selectList("NoticeMapper.listAll");
	}
	public int write(NoticeVo vo, SqlSessionTemplate sst) {
		return sst.insert("NoticeMapper.write",vo);
	}
	public int delete(NoticeVo vo, SqlSessionTemplate sst) {
		return sst.update("NoticeMapper.delete", vo);
	}

}
