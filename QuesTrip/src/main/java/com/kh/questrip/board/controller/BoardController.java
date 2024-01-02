package com.kh.questrip.board.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kh.questrip.board.service.BoardService;
import com.kh.questrip.board.vo.BoardVo;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("board")
@RequiredArgsConstructor
public class BoardController {
	
	private final BoardService service;
	
	//�Խñ� �ۼ�
	@PostMapping("write")
	public String write(BoardVo vo) throws Exception {
		
		int result = service.write(vo);
		
		if(result != 1) {
			throw new Exception();
		}
		System.out.println(vo);
		return "redirect:/board/list";
	}
	
	//�Խñ� ��� ��ȸ
	@GetMapping("list")
	public String list(Model model) {
		List<BoardVo> voList = service.list();
		
		model.addAttribute("boardVoList", voList);
		System.out.println(voList);
		
		return "board/list";
	}
	
	
	//�Խñ� ����
	@GetMapping("delete")
	public String delete(BoardVo vo) throws Exception {
		
		int result = service.delete(vo);
		if(result != 1) {
			throw new Exception();
		}
		
		return "redirect:/board/list";
	}
	
	//�Խñ� ����
	@PostMapping("edit")
	public String edit(BoardVo vo) throws Exception {
		int result = service.edit(vo);
		if(result != 1) {
			throw new Exception();
		}
		return "redirect:/board/detail?no=" + vo.getNo();
	}
}