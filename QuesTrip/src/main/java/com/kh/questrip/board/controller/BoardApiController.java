package com.kh.questrip.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.board.service.BoardService;
import com.kh.questrip.board.vo.BoardDetailVo;
import com.kh.questrip.board.vo.BoardVo;
import com.kh.questrip.member.vo.MemberVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/community")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BoardApiController {
	private final BoardService service;
	
	//게시글 목록 조회
	@PostMapping("list")
	public Map<String, Object> list(@RequestBody SearchInfoVo vo){
		
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
		
		vo.setPageNo(Integer.toString(start));
		
		int pageTotal = (int)Math.ceil((double)service.list(vo)/Integer.parseInt(vo.getLimit()));
		
		List<BoardVo> boardVoList = service.pageList(vo);
		List<BoardVo> BoarBestList = service.best();
		Map<String, Object> map = new HashMap<>();
		map.put("pageTotal", pageTotal);
		map.put("voList", boardVoList);
		map.put("bestList", BoarBestList);
		
		return map;
	}
	
	//게시글 상세 조회
	@PostMapping("detail")
	public BoardDetailVo detail(@RequestBody BoardVo vo)  {
		BoardDetailVo detail = service.detail(vo);
		System.out.println("상세조회시 넘버(increase전):"+ vo.getNo());
		service.increaseHit(vo.getNo());
		System.out.println("상세조회시 넘버:"+ vo.getNo());
		return service.detail(vo);
	
	}
	
	
	//게시글 추천 판단
	@PostMapping("checkIfAlreadyLiked")
    public boolean checkIfAlreadyLiked(@RequestBody Map<String, Object> map) {
		System.out.println("params: "+map);
        return service.checkIfAlreadyLiked(map);
    }
	
	
	
	//게시글 추천
	@PostMapping("detail/increaseLikes")
    public int increaseLikes(@RequestBody Map<String, String> requestMap) {
        String memberNo = requestMap.get("memberNo");
        String boardNo = requestMap.get("boardNo");
        
        return service.increaseBoardLikes(memberNo, boardNo);
        
        
    }
	
	//게시글 추천 취소
	@PostMapping("detail/decreaseLikes")
    public int decreaseLikes(@RequestBody Map<String, String> requestMap) {
        String memberNo = requestMap.get("memberNo");
        String boardNo = requestMap.get("boardNo");
        
        return service.decreaseBoardLikes(memberNo, boardNo);
        
        
    }
	

	//게시글 작성하기
	@PostMapping("write")
	public Map<String, String> write(@RequestBody BoardVo vo, HttpSession session){
		Map<String, String> map = new HashMap<String, String>();
		int result = service.write(vo);
		
		if(result == 1) {
			map.put("msg", "good");
		}
		else {
			map.put("msg", "bad");
		}
		
		return map;
	}
	
	//게시글 삭제
	@PostMapping("detail/delete")
	public int delete(@RequestBody BoardVo vo) {
		return service.delete(vo);
	}
	
	
}
