package com.kh.questrip.icon.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.icon.vo.IconVo;
import com.kh.questrip.icon.vo.buyerVo;
import com.kh.questrip.member.vo.MemberVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

@Repository
public class IconDao {

	public List<IconVo> list(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("IconMapper.shopList", vo);
	}
	
	public List<IconVo> pageList(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("IconMapper.shopPageList", vo);
	}

	public List<IconVo> myIconAll(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("IconMapper.myIconAll", vo);
	}

	public List<IconVo> pageMyIcon(SqlSessionTemplate sst, SearchInfoVo vo) {
		
		return sst.selectList("IconMapper.pageMyIcon",vo);
	}

	public int update(SqlSessionTemplate sst, buyerVo vo) {
		return sst.update("IconMapper.update",vo);
	}

	public int memberPointUpdate(buyerVo vo, SqlSessionTemplate sst) {
		return sst.update("IconMapper.memberPointUpdate",vo);
	}

	public int pointInsert(buyerVo vo, SqlSessionTemplate sst) {
		return sst.insert("IconMapper.pointInsert",vo);
	}

	public int memberIconInsert(buyerVo vo, SqlSessionTemplate sst) {
		return sst.insert("IconMapper.memberIconInsert",vo);
	}

	public IconVo getIcon(MemberVo vo, SqlSessionTemplate sst) {
		return sst.selectOne("IconMapper.getIcon", vo);
	}

	public List<IconVo> listAll(SqlSessionTemplate sst) {
		return sst.selectList("IconMapper.listAll");
	}

	public int insert(SqlSessionTemplate sst, IconVo vo) {

		return sst.insert("IconMapper.insert",vo);
	}
}
