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

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/community")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BoardApiController {
	private final BoardService service;
	
	//게시글 목록 조회
	@GetMapping("list")
	public Map<String, Object> list(){
		List<BoardVo> boardVoList = service.list();
		List<BoardVo> BoarBestList = service.best();
		Map<String, Object> map = new HashMap<>();
		map.put("voList", boardVoList);
		map.put("bestList", BoarBestList);
		
		return map;
	}
	
	//게시글 상세 조회
	@PostMapping("detail")
	public BoardDetailVo detail(@RequestBody BoardVo vo)  {
		BoardDetailVo detail = service.detail(vo);
		service.increaseHit(vo.getNo());
		return service.detail(vo);
	
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
}
