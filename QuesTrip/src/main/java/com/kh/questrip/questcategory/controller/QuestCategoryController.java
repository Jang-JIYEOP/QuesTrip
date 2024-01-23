package com.kh.questrip.questcategory.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.questcategory.service.QuestCategoryService;
import com.kh.questrip.questcategory.vo.QuestCategoryVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/questcategory")
@RequiredArgsConstructor
@CrossOrigin("*")
public class QuestCategoryController {
	private final QuestCategoryService service;

	@GetMapping("list")
	public List<QuestCategoryVo> list(){
		return service.list();
	}
	
}
