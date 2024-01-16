package com.kh.questrip.member.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.member.dao.MemberDao;
import com.kh.questrip.member.vo.MemberVo;

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
	

}
