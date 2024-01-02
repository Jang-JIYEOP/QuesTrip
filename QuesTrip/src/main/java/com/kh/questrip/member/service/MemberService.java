package com.kh.questrip.member.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.member.dao.MemberDao;
import com.kh.questrip.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberDao dao;
	private final SqlSessionTemplate sst;
	
	public int join(MemberVo vo) throws Exception {
		
		return dao.join(sst,vo);
		
	}

	public MemberVo login(MemberVo vo) {

		return dao.login(sst,vo);
	}

	

	public int quit(MemberVo vo) {
		return dao.quit(vo, sst);
	}

	public List<MemberVo> list() {

		return dao.list(sst);
	}

	public int edit(MemberVo vo) {

		return dao.edit(vo,sst);
	}

	
	
}