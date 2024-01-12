package com.kh.questrip.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.member.service.MemberService;
import com.kh.questrip.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/member")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberApiController {
	
	private final MemberService service;
	
	//회원가입
	@PostMapping("join")
	public int join(MemberVo vo) throws Exception {
		return service.join(vo);
	}
	
	//로그인
	@PostMapping("login")
	public Map<String, Object> login(@RequestBody MemberVo vo) {
		System.out.println(vo);
		MemberVo loginMember = service.login(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", "good");
		map.put("loginMemberVo", loginMember);
		if(loginMember == null) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//아이디 중복확인
	@PostMapping("join/dupCheck")
	public Map<String, Object> dupCheck(@RequestBody MemberVo vo){
		int dupCheck = service.dupCheck(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		if(dupCheck == 0) {
			map.put("msg", "notDup");
		}else {
			map.put("msg", "dup");			
		}
		System.out.println(map.get("msg"));
		return map;

		
	}

	
	
	
}
