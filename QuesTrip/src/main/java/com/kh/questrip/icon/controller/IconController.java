package com.kh.questrip.icon.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.icon.service.IconService;
import com.kh.questrip.icon.vo.IconVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/icon")
@RequiredArgsConstructor
@CrossOrigin("*")
public class IconController {
	private final IconService service;
	
	@PostMapping("shop")
	public Map<String , Object> list(@RequestBody SearchInfoVo vo){

		System.out.println(vo);
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
			
		vo.setPageNo(Integer.toString(start));
		
		int pageTotal = (int)Math.ceil((double)service.list(vo).size()/Integer.parseInt(vo.getLimit()));

		List<IconVo> voList = service.pageList(vo);
		
		System.out.println("토탈"+pageTotal);
		System.out.println("노티스리스트"+voList);
		
		Map<String, Object> map = new HashMap<>();
		map.put("pageTotal", pageTotal);
		map.put("voList", voList);
		return map;
	}
}
