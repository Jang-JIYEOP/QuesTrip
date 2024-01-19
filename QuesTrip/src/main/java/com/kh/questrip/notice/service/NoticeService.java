package com.kh.questrip.notice.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.notice.dao.NoticeDao;
import com.kh.questrip.notice.vo.NoticeVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeService {


	private final NoticeDao dao;
	private final SqlSessionTemplate sst;
	
	public List<NoticeVo> list(SearchInfoVo vo) {
			return dao.list(sst, vo);
		
	}
	public List<NoticeVo> pageList(SearchInfoVo vo) {
		return dao.pageList(sst, vo);
}
	public List<NoticeVo> listAll() {
		return dao.listAll(sst);
	}
	public int write(NoticeVo vo) {

		return dao.write(vo,sst);
	}
	
}
