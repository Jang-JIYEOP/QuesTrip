package com.kh.questrip.notice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.notice.service.NoticeService;
import com.kh.questrip.notice.vo.NoticeVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/notice")
@RequiredArgsConstructor
@CrossOrigin("*")
public class NoticeController {
	private final NoticeService service;
	
	@PostMapping("list")
	public Map<String , Object> list(@RequestBody SearchInfoVo vo){
		System.out.println(vo);
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
		
		vo.setPageNo(Integer.toString(start));
		
		int pageTotal = (int)Math.ceil((double)service.list(vo).size()/Integer.parseInt(vo.getLimit()));
		
		List<NoticeVo> noticeVoList = service.pageList(vo);
		System.out.println("토탈"+pageTotal);
		System.out.println("노티스리스트"+noticeVoList);
	
		Map<String, Object> map = new HashMap<>();
		
		map.put("pageTotal", pageTotal);
		map.put("voList", noticeVoList);
		
		return map;
	}
	@GetMapping("listall")
	public List<NoticeVo> listAll(){
		System.out.println(service.listAll());
		return service.listAll();
	}
	
	//공지사항 작성
	@PostMapping("write")
	public int write(@RequestBody NoticeVo vo) {
		System.out.println("공지 vo"+vo);
		return service.write(vo);
	}
	
	//공지사항 삭제
	@PostMapping("delete")
	public int delete(@RequestBody NoticeVo vo) {
		System.out.println("삭제vo"+ vo);
		return service.delete(vo);
	}
}
