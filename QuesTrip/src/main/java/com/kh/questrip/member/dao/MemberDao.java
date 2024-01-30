package com.kh.questrip.member.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.comment.vo.CommentVo;
import com.kh.questrip.member.vo.MemberVo;
import com.kh.questrip.member.vo.PointVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

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

	public List<MemberVo> memberPageList(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("MemberMapper.memberPageList", vo);
	}

	public int edit(SqlSessionTemplate sst, MemberVo vo) {
		return sst.update("MemberMapper.edit", vo);
	}

	public int point(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectOne("MemberMapper.point", vo);
	}

	public List<PointVo> pageList(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("MemberMapper.pageList", vo);
	}

	public int findMaxNo(SqlSessionTemplate sst) {
		return sst.selectOne("MemberMapper.findMaxNo");
	}

	public int insertIcon(SqlSessionTemplate sst, int memberNo) {
		return sst.insert("MemberMapper.insertIcon", memberNo);
	}

	public int list(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectOne("MemberMapper.list", vo);
	}
}
