package com.kh.questrip.comment.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kh.questrip.board.vo.BoardVo;
import com.kh.questrip.comment.vo.CommentVo;
import com.kh.questrip.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("comment")
@RequiredArgsConstructor
public class CommentController {
	
	private final MemberService service;
	
	@GetMapping("list")
	public String list(BoardVo boardVo) {
//		CommentVo vo = service.list(boardVo);
		return "comment/list";
	}
}
