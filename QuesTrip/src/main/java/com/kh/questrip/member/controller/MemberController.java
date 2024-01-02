package com.kh.questrip.member.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kh.questrip.member.service.MemberService;
import com.kh.questrip.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("member")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService service;
	
	@GetMapping("join")
	public String join() {
		return "member/join";
	}
	
	@PostMapping("join")
	public String join(MemberVo vo) throws Exception{
		int result = service.join(vo);
		
		if(result != 1) {
			throw new Exception();
		}
		return "member/join";
	}
	
	@PostMapping("login")
	public String login(MemberVo vo, HttpSession session) throws Exception {
		
		MemberVo loginMember = service.login(vo);
		
		if(loginMember == null) {
			throw new Exception("로그인 실패");
		}
		System.out.println(loginMember);
		session.setAttribute("loginMember", loginMember);
		session.setAttribute("alertMsg", "로그인 성공 !");
		
		return "redirect:/home";
	}

	@PostMapping("edit")
	public String edit(MemberVo vo) throws Exception {
		int result = service.edit(vo);
		if(result != 1) {
			throw new Exception();
		}
		
		return "redirect:/home";
	}
	
	@GetMapping("quit")
	public String quit(MemberVo vo, HttpSession session) throws Exception{
		int result = service.quit(vo);
		
		if(result != 1) {
			throw new Exception();
		}
		
		session.removeAttribute("loginMember");
		session.setAttribute("alertMsg", "회원 탈퇴 성공");
		
		
		return "redirect:/home";
	}
	
	@GetMapping("list")
	public String list(Model model) {
		List<MemberVo> voList = service.list();
		
		model.addAttribute("memberVoList", voList);
		
		System.out.println(voList);
		return "member/list";
	}
	
	@GetMapping("logout")
	public String logout(HttpSession session) {
		session.removeAttribute("loginMember");
		return "redirect:/home";
	}
	
}