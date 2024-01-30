package com.kh.questrip.diary.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.board.vo.BoardVo;
import com.kh.questrip.board.vo.SearchVo;
import com.kh.questrip.diary.dao.DiaryDao;
import com.kh.questrip.diary.vo.DiaryDetailVo;
import com.kh.questrip.diary.vo.DiaryVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiaryService {
	
	private final DiaryDao dao;
	private final SqlSessionTemplate sst;
	
	
	//일기 목록 조회
	public double list(SearchInfoVo vo) {
		return dao.list(sst, vo);
	}
	
	//일기 삭제
	public int delete(DiaryVo vo) {
		return dao.delete(sst, vo);
	}
	
	//일기 상세 조회
	public DiaryDetailVo detail(DiaryVo vo) {
		
		return dao.detail(sst, vo);
	}
	
	//인기 게시글 3개 조회
	public List<DiaryVo> best() {
		return dao.best(sst);
	}
	
	//게시글 상세 조회 시 조회수 증가
	public int increaseHit(String no) {
		return dao.updateDiaryHit(sst, no);
	}
	
	
	//게시글 추천시 추천 수 증가
	public int increaseBoardLikes(String memberNo, String diaryNo) {
        return dao.increaseBoardLikes(sst, memberNo, diaryNo);
    }
	
	//게시글 추천 취소
	public int decreaseBoardLikes(String memberNo, String diaryNo) {
        return dao.decreaseBoardLikes(sst, memberNo, diaryNo);
    }
	
	
	//게시글 추천 여부 판단
	public boolean checkIfAlreadyLiked(Map<String, Object> params) {
        return dao.checkIfAlreadyLiked(sst, params);
    }
	
	
	//페이지
	public List<DiaryVo> pageList(SearchInfoVo vo) {
		return dao.pageList(sst, vo);
	}

	public List<DiaryVo> listAll() {
		return dao.listAll(sst);
	}
	
	//일기 작성
	public int write(BoardVo vo) {
		return dao.write(sst, vo);
	}
	
	public List<DiaryVo> pageListDiary(SearchInfoVo vo){
		return dao.pageListDiary(sst, vo);
	}

	public List<DiaryVo> search(SearchVo vo) {
		return dao.search(sst,vo);
	}

	public int adminDelete(DiaryVo vo) {
		return dao.adminDelete(sst, vo);
	}
}
