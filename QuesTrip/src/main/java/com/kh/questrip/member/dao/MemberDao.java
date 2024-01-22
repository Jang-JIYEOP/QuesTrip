package com.kh.questrip.member.dao;

import java.util.List;
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
		System.out.println("vo아이디:"+vo.getId());
		System.out.println("vo닉네임"+vo.getNick());
		return sst.selectOne("MemberMapper.dupCheck", vo);
	}

	public List<MemberVo> list(SqlSessionTemplate sst) {
		return sst.selectList("MemberMapper.list");
	}

	public int edit(SqlSessionTemplate sst, MemberVo vo) {
		return sst.update("MemberMapper.edit", vo);
	}
}
