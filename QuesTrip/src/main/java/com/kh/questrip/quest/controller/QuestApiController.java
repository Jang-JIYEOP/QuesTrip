package com.kh.questrip.quest.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.quest.service.QuestService;
import com.kh.questrip.quest.vo.SearchInfoVo;
import com.kh.questrip.quest.vo.QuestVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/quest")
@RequiredArgsConstructor
@CrossOrigin("*")
public class QuestApiController {
	private final QuestService service;
	
	//지역별 퀘스트 조회
	@PostMapping("list")
	public List<QuestVo> list(@RequestBody SearchInfoVo vo){
		System.out.println(vo);
		System.out.println(service.list(vo));
		return service.list(vo);
	}
}
