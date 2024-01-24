package com.kh.questrip.comment.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.board.vo.BoardVo;
import com.kh.questrip.comment.service.CommentService;
import com.kh.questrip.comment.vo.CommentVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/comment")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CommentController {
	
	
	private final CommentService service;
	
	//댓글 조회
	@PostMapping("list")
	public Map<String, Object> list(@RequestBody SearchInfoVo vo) {
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
		
		vo.setPageNo(Integer.toString(start));
		int pageTotal = (int)Math.ceil((double)service.list(vo)/Integer.parseInt(vo.getLimit()));
		
		List<CommentVo> CommentVoList = service.pageList(vo);
		List<CommentVo> CommentBestList = service.best();
		Map<String, Object> map = new HashMap<>();
		map.put("pageTotal", pageTotal);
		map.put("voList", CommentVoList);
		map.put("bestList", CommentBestList);
		
		return map;
	}
	
	//대댓글 조회
	@PostMapping("underCommentList")
	public Map<String, Object> underCommentList(@RequestBody CommentVo vo) {
		System.out.println(vo);
		System.out.println("대댓글 실행");
		Map<String, Object> map = new HashMap<>();
		List<CommentVo> underCommentList = service.underCommentList(vo);
		map.put("voList", underCommentList);
		return map;
	}
	
	//댓글 작성
	@PostMapping("write")
	public int write(@RequestBody CommentVo vo) {
		return service.write(vo);
	}
	
	//댓글 삭제
	@PostMapping("delete")
	public int delete(@RequestBody CommentVo vo) {
		return service.delete(vo);
	}
	
	//댓글 추천 여부 판단
	@PostMapping("checkIfAlreadyLiked")
    public boolean checkIfAlreadyLiked(@RequestBody Map<String, Object> map) {
		System.out.println("params: "+map);
        return service.checkIfAlreadyLiked(map);
    }
	
	//댓글 추천 증가
	@PostMapping("increaseLikes")
    public int increaseLikes(@RequestBody Map<String, String> requestMap) {
        String memberNo = requestMap.get("memberNo");
        String no = requestMap.get("no");
        
        return service.increaseBoardLikes(memberNo, no);
    }
	
	//댓글 추천 감소
	@PostMapping("decreaseLikes")
    public int decreaseLikes(@RequestBody Map<String, String> requestMap) {
        String memberNo = requestMap.get("memberNo");
        String no = requestMap.get("no");
        
        return service.decreaseBoardLikes(memberNo, no);
    }

}
