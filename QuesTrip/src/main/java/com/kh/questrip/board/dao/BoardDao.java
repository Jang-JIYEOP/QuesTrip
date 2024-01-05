package com.kh.questrip.board.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.board.vo.BoardVo;

@Repository
public class BoardDao {

	//�Խñ� �ۼ�
	public int write(SqlSessionTemplate sst, BoardVo vo) {
		return sst.insert("BoardMapper.write", vo);
	}

	//�Խñ� ��� ��ȸ
	public List<BoardVo> list(SqlSessionTemplate sst) {
		return sst.selectList("BoardMapper.list");
	}

	//�Խñ� ����
	public int delete(SqlSessionTemplate sst, BoardVo vo) {
		return sst.delete("BoardMapper.delete", vo);
	}
	
	//�Խñ� ����
	public int edit(SqlSessionTemplate sst, BoardVo vo) {
		return sst.update("BoardMapper.edit", vo);
	}

	public BoardVo detail(SqlSessionTemplate sst, BoardVo vo) {
		return sst.selectOne("BoarderMapper.list");
	}
	
	

}
