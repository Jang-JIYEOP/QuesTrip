package com.kh.questrip.board.controller;

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

import com.kh.questrip.board.service.BoardService;
import com.kh.questrip.board.vo.BoardVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/board")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BoardApiController {
	private final BoardService service;
	
	//게시글 목록 조회
	@GetMapping("list")
	public List<BoardVo> list(){
		return service.list();
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
