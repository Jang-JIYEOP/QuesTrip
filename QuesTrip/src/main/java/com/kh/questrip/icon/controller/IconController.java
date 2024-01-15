package com.kh.questrip.icon.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.icon.service.IconService;
import com.kh.questrip.icon.vo.IconVo;
import com.kh.questrip.icon.vo.buyerVo;
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
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
			
		vo.setPageNo(Integer.toString(start));
		
		int pageTotal = (int)Math.ceil((double)service.list(vo).size()/Integer.parseInt(vo.getLimit()));

		List<IconVo> voList = service.pageList(vo);
		
		
		Map<String, Object> map = new HashMap<>();
		map.put("pageTotal", pageTotal);
		map.put("voList", voList);
		return map;
	}
	
	@PostMapping("myicon")
	public Map<String, Object> MyIcon(@RequestBody SearchInfoVo vo) {
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
		
		vo.setPageNo(Integer.toString(start));
		
		int pageTotal = (int)Math.ceil((double)service.myIconAll(vo).size()/Integer.parseInt(vo.getLimit()));

		List<IconVo> voList = service.pageMyIcon(vo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pageTotal", pageTotal);
		map.put("voList", voList);
		return map;
	}
	
	@PostMapping("update")
	public Map<String, String> update(@RequestBody buyerVo vo) {
		System.out.println(vo);
		int result = service.update(vo);
		Map<String, String> map = new HashMap<>();
		
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	@PostMapping("buy")
	@Transactional
	public Map<String, String> buy(@RequestBody buyerVo vo) throws Exception {
		System.out.println("바이"+vo);

		Map<String, String> map = new HashMap<>();
		
		map.put("msg", "bad");
		
		int memberPointUpdate = service.memberPointUpdate(vo);
		if(memberPointUpdate == 0) {
			map.put("msg", "lack");
			System.out.println("예외야 외");
			throw new Exception();
		}
		
		int pointInsert	= service.pointInsert(vo);
		if(pointInsert != 1) {
			System.out.println("포인트 테이블에 인서트 오류");
		}
		
		int memberIconInsert = service.memberIconInsert(vo);
		if(memberIconInsert != 1) {
			System.out.println("멤버아이콘 인서트 오류");
		}
		
		
		map.put("msg", "good");
		
		return map;
	}
}
