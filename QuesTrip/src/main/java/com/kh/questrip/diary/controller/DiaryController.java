package com.kh.questrip.diary.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.board.vo.BoardDetailVo;
import com.kh.questrip.board.vo.BoardVo;
import com.kh.questrip.diary.service.DiaryService;
import com.kh.questrip.diary.vo.DiaryDetailVo;
import com.kh.questrip.diary.vo.DiaryVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/diary")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DiaryController {
	
	private final DiaryService service;
	
	//일기 목록 조회
	@PostMapping("list")
	public Map<String, Object> list(@RequestBody SearchInfoVo vo){
		
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
		
		vo.setPageNo(Integer.toString(start));
		
		int pageTotal = (int)Math.ceil((double)service.list(vo)/Integer.parseInt(vo.getLimit()));
		
		List<DiaryVo> diaryVoList = service.pageList(vo);
		List<DiaryVo> DiaryBestList = service.best();
		Map<String, Object> map = new HashMap<>();
		map.put("pageTotal", pageTotal);
		map.put("voList", diaryVoList);
		map.put("bestList", DiaryBestList);
		
		return map;
	}
	
	//일기 상세 조회
	@PostMapping("detail")
	public DiaryDetailVo detail(@RequestBody DiaryVo vo)  {
		DiaryDetailVo detail = service.detail(vo);
		service.increaseHit(vo.getNo());
		
		return service.detail(vo);
	
	}
	
	
	//일기 추천 판단
	@PostMapping("checkIfAlreadyLiked")
    public boolean checkIfAlreadyLiked(@RequestBody Map<String, Object> params) {
		System.out.println("params: "+params);
        return service.checkIfAlreadyLiked(params);
    }
	
	
	
	//일기 추천
	@PostMapping("detail/increaseLikes")
    public int increaseLikes(@RequestBody Map<String, String> requestMap) {
        String memberNo = requestMap.get("memberNo");
        String diaryNo = requestMap.get("diaryNo");
        
        return service.increaseBoardLikes(memberNo, diaryNo);
        
        
    }
	
	//일기 추천 취소
	@PostMapping("detail/decreaseLikes")
    public int decreaseLikes(@RequestBody Map<String, String> requestMap) {
        String memberNo = requestMap.get("memberNo");
        String diaryNo = requestMap.get("diaryNo");
        
        return service.decreaseBoardLikes(memberNo, diaryNo);
        
        
    }
	

//	//일기 작성하기
//	@PostMapping("write")
//	public Map<String, String> write(@RequestBody DiaryVo vo, HttpSession session){
//		Map<String, String> map = new HashMap<String, String>();
//		int result = service.write(vo);
//		
//		if(result == 1) {
//			map.put("msg", "good");
//		}
//		else {
//			map.put("msg", "bad");
//		}
//		
//		return map;
//	}
	
	//일기 삭제
	@PostMapping("detail/delete")
	public int delete(@RequestBody DiaryVo vo) {
		return service.delete(vo);
	}
	
	@GetMapping("listall")
	public List<DiaryVo> listAll(){
		System.out.println(service.listAll());
		return service.listAll();
	}

}
