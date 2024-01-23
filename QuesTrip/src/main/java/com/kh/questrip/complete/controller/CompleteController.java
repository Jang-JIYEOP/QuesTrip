package com.kh.questrip.complete.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.comment.service.CommentService;
import com.kh.questrip.complete.service.CompleteService;
import com.kh.questrip.complete.vo.CompleteVo;
import com.kh.questrip.quest.vo.QuestVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/complete")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CompleteController {
	private final CompleteService service;

	@PostMapping("list")
	public Map<String, Object> list(@RequestBody SearchInfoVo vo){
		Map<String, Object> map = new HashMap<String, Object>();
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
		vo.setPageNo(Integer.toString(start));
		
		int pageTotal = (int)Math.ceil((double)service.allList()/Integer.parseInt(vo.getLimit()));
			
		List<CompleteVo> questVoList = new ArrayList<CompleteVo>();

		questVoList = service.pageList(vo);		
		
		map.put("pageTotal", pageTotal);
		
		map.put("voList",questVoList);
		return map;
	}
	@PostMapping("update")
	public Map<String, String> update(@RequestBody CompleteVo vo) {
		System.out.println(vo);
		int result = service.update(vo);
		Map<String, String> map = new HashMap<>();
		
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}

}
