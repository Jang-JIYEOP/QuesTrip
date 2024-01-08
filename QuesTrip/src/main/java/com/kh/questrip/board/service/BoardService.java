package com.kh.questrip.board.service;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import com.kh.questrip.board.dao.BoardDao;
import com.kh.questrip.board.vo.BoardDetailVo;
import com.kh.questrip.board.vo.BoardVo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardDao dao;
	private final SqlSessionTemplate sst;
	
	//�Խñ� �ۼ�
	public int write(BoardVo vo) {
		return dao.write(sst, vo);
	}

	//�Խñ� ��� ��ȸ
	public List<BoardVo> list() {
		return dao.list(sst);
	}
	
	
	//�Խñ� ����
	public int delete(BoardVo vo) {
		return dao.delete(sst, vo);
	}
	
	
	//�Խñ� ����
	public int edit(BoardVo vo) {
		return dao.edit(sst, vo);
	}

	public BoardDetailVo detail(BoardVo vo) {
		return dao.detail(sst, vo);
	}



}
