package com.kh.questrip.comment.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kh.questrip.comment.service.CommentService;
import com.kh.questrip.comment.vo.CommentVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("api/comment")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CommentController {
	
	
	private final CommentService service;
	
	//댓글 조회
	@PostMapping("list")
	public Map<String, Object> list(@RequestBody SearchInfoVo vo) {
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
		
		vo.setPageNo(Integer.toString(start));
		
		int pageTotal = (int)Math.ceil((double)service.list(vo)/Integer.parseInt(vo.getLimit()));
		
		List<CommentVo> CommentVoList = service.pageList(vo);
		System.out.println("댓글vo: "+ CommentVoList);
		List<CommentVo> CommentBestList = service.best();
		Map<String, Object> map = new HashMap<>();
		map.put("pageTotal", pageTotal);
		map.put("voList", CommentVoList);
		map.put("bestList", CommentBestList);
		
		return map;
	}
}
