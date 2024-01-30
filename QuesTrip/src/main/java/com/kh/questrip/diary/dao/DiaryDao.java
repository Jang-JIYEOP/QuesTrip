package com.kh.questrip.diary.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.board.vo.BoardDetailVo;
import com.kh.questrip.board.vo.BoardVo;
import com.kh.questrip.board.vo.SearchVo;
import com.kh.questrip.diary.vo.DiaryDetailVo;
import com.kh.questrip.diary.vo.DiaryVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

@Repository
public class DiaryDao {
	//일기 목록 조회
	public int list(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectOne("DiaryMapper.list", vo);
	}
	
	
	//일기 삭제
	public int delete(SqlSessionTemplate sst, DiaryVo vo) {
		return sst.delete("DiaryMapper.delete", vo);
	}
	
	//일기 상세 조회
	public DiaryDetailVo detail(SqlSessionTemplate sst, DiaryVo vo) {
		return sst.selectOne("DiaryMapper.detail", vo);
	}
	
	//인기 일기 3개 조회
	public List<DiaryVo> best(SqlSessionTemplate sst) {
		return sst.selectList("DiaryMapper.best");
	}
	
	//일기 상세 조회 시 조회수 증가
	public int updateDiaryHit(SqlSessionTemplate sst, String no) {
		return sst.update("DiaryMapper.increaseHit", no);
	}
	
	//일기 추천
	public int increaseBoardLikes(SqlSessionTemplate sst, String memberNo, String diaryNo) {
        return sst.insert("DiaryMapper.increaseLikes", Map.of("memberNo", memberNo, "diaryNo", diaryNo));
    }
	
	//일기 추천 취소
	public int decreaseBoardLikes(SqlSessionTemplate sst, String memberNo, String diaryNo) {
		System.out.println(memberNo);
		System.out.println(diaryNo);
        return sst.delete("DiaryMapper.decreaseLikes", Map.of("memberNo", memberNo, "diaryNo", diaryNo));
    }
	
	//일기 추천 여부 판단
	public boolean checkIfAlreadyLiked(SqlSessionTemplate sst, Map<String, Object> params) {
		boolean result = sst.selectOne("DiaryMapper.checkIfAlreadyLiked", params);
		System.out.println("result: "+result);
        return sst.selectOne("DiaryMapper.checkIfAlreadyLiked", params);
    }
	
	//페이지
	public List<DiaryVo> pageList(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("DiaryMapper.pageList",vo);
	}

	public List<DiaryVo> listAll(SqlSessionTemplate sst) {
		return sst.selectList("DiaryMapper.listAll");
	}
	
	//일기 작성
	public int write(SqlSessionTemplate sst, BoardVo vo) {
		return sst.insert("DiaryMapper.write", vo);
	}
	
	//마이페이지 내가 쓴 일기 조회
	public List<DiaryVo> pageListDiary(SqlSessionTemplate sst, SearchInfoVo vo) {
		return sst.selectList("DiaryMapper.pageListDiary",vo);
	}

	public List<DiaryVo> search(SqlSessionTemplate sst, SearchVo vo) {
		return sst.selectList("DiaryMapper.search",vo);
	}
	
	//관리자 일기 삭제
	public int adminDelete(SqlSessionTemplate sst, DiaryVo vo) {
		return sst.update("DiaryMapper.adminDelete", vo);
	}
}
