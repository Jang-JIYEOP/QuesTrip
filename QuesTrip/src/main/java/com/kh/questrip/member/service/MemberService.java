package com.kh.questrip.member.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.comment.vo.CommentVo;
import com.kh.questrip.member.dao.MemberDao;
import com.kh.questrip.member.vo.MemberVo;
import com.kh.questrip.member.vo.PointVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	
	private final SqlSessionTemplate sst;
	private final MemberDao dao;
	
	public int join(MemberVo vo) {
		return dao.join(sst, vo);
	}

	public MemberVo login(MemberVo vo) {
		return dao.login(sst, vo);
	}

	public int dupCheck(MemberVo vo) {
		return dao.dupCheck(sst, vo);
	}
	public List<MemberVo> list() {
		return dao.list(sst);
	}

	public int edit(MemberVo vo) {
		return dao.edit(sst, vo);
	}

	public List<PointVo> pageList(SearchInfoVo vo) {
		return dao.pageList(sst, vo);
	}

	public int point(SearchInfoVo vo) {
		return dao.point(sst, vo);
	}
	

}
