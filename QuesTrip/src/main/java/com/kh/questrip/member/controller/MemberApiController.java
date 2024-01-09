package com.kh.questrip.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kh.questrip.member.service.MemberService;
import com.kh.questrip.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Controller
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
		MemberVo loginMember = service.login(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", "good");
		map.put("loginMemberVo", loginMember);
		if(loginMember == null) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	
}
