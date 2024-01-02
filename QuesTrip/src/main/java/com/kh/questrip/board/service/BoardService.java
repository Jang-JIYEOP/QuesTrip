package com.kh.questrip.board.service;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import com.kh.questrip.board.dao.BoardDao;
import com.kh.questrip.board.vo.BoardVo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardDao dao;
	private final SqlSessionTemplate sst;
	
	//게시글 작성
	public int write(BoardVo vo) {
		return dao.write(sst, vo);
	}

	//게시글 목록 조회
	public List<BoardVo> list() {
		return dao.list(sst);
	}
	
	
	//게시글 삭제
	public int delete(BoardVo vo) {
		return dao.delete(sst, vo);
	}
	
	
	//게시글 수정
	public int edit(BoardVo vo) {
		return dao.edit(sst, vo);
	}	

}
