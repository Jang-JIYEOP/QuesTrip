package com.kh.questrip.locatecategory.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.locatecategory.service.LocateCategoryService;
import com.kh.questrip.locatecategory.vo.LocateCategoryVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/locatecategory")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LocateCategoryController {
	private final LocateCategoryService service;

	@GetMapping("list")
	public List<LocateCategoryVo> list(){
		return service.list();
	}
}
