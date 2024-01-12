package com.kh.questrip.member.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.member.vo.MemberVo;

@Repository
public class MemberDao {

	public int join(SqlSessionTemplate sst, MemberVo vo) {
		return sst.insert("MemberMapper.join", vo);
	}

	public MemberVo login(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectOne("MemberMapper.login", vo);
	}

	public int dupCheck(SqlSessionTemplate sst, MemberVo vo) {
		System.out.println(vo.getId());
		return sst.selectOne("MemberMapper.dupCheck", vo);
	}

}
