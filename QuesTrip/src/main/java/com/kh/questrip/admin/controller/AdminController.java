package com.kh.questrip.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.admin.service.AdminService;
import com.kh.questrip.admin.vo.AdminVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("api/admin")
public class AdminController {
	private final AdminService service;
	
	@PostMapping("login")
	public Map<String, Object> login(@RequestBody AdminVo vo) {
		System.out.println(vo);
		AdminVo loginAdmin = service.login(vo);
		Map<String, Object> map = new HashMap<>();
		map.put("loginAdmin", loginAdmin);
		map.put("msg", "good");
		if(loginAdmin == null) {
			map.put("msg", "bad");
		}
		return map;
	}
}
