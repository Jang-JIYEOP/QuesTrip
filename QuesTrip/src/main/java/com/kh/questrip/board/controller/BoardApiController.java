package com.kh.questrip.board.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.board.service.BoardService;
import com.kh.questrip.board.vo.BoardDetailVo;
import com.kh.questrip.board.vo.BoardVo;
import com.kh.questrip.member.vo.MemberVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/community")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BoardApiController {
	private final BoardService service;
	
	//게시글 목록 조회
	@PostMapping("list")
	public Map<String, Object> list(@RequestBody SearchInfoVo vo){
		
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
		
		vo.setPageNo(Integer.toString(start));
		
		int pageTotal = (int)Math.ceil((double)service.list(vo)/Integer.parseInt(vo.getLimit()));
		
		List<BoardVo> boardVoList = service.pageList(vo);
		List<BoardVo> BoarBestList = service.best();
		Map<String, Object> map = new HashMap<>();
		map.put("pageTotal", pageTotal);
		map.put("voList", boardVoList);
		map.put("bestList", BoarBestList);
		
		return map;
	}
	
	//게시글 상세 조회
	@PostMapping("detail")
	public BoardDetailVo detail(@RequestBody BoardVo vo)  {
		BoardDetailVo detail = service.detail(vo);
		service.increaseHit(vo.getNo());
		return service.detail(vo);
	
	}
	
	
	//게시글 추천 판단
	@PostMapping("checkIfAlreadyLiked")
    public boolean checkIfAlreadyLiked(@RequestBody Map<String, Object> map) {
		System.out.println("params: "+map);
        return service.checkIfAlreadyLiked(map);
    }
	
	
	
	//게시글 추천
	@PostMapping("detail/increaseLikes")
    public int increaseLikes(@RequestBody Map<String, String> requestMap) {
        String memberNo = requestMap.get("memberNo");
        String boardNo = requestMap.get("boardNo");
        
        return service.increaseBoardLikes(memberNo, boardNo);
        
        
    }
	
	//게시글 추천 취소
	@PostMapping("detail/decreaseLikes")
    public int decreaseLikes(@RequestBody Map<String, String> requestMap) {
        String memberNo = requestMap.get("memberNo");
        String boardNo = requestMap.get("boardNo");
        
        return service.decreaseBoardLikes(memberNo, boardNo);
        
        
    }
	

   	//게시글 작성
    @PostMapping("write")
    public ResponseEntity<String> write(@RequestBody BoardVo vo, MultipartFile image) {
        try {
            int result = service.write(vo);
            System.out.println("게시글 작성 result: "+ result);
            if (result == 1) {
                return new ResponseEntity<>("Data written successfully", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    //이미지 업로드, 이미지 URL 반환
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("uploadImage")
    public String savFile(MultipartFile image) throws Exception {
        String path = "D:\\dev\\QuesTrip\\QuesTrip\\src\\main\\resources\\static";
        System.out.println("이미지: "+ image);
        String fileName = image.getOriginalFilename();
        System.out.println("파일이름 : " + fileName);
        File target = new File(path+fileName);
        
        image.transferTo(target);
        System.out.println("리턴 값"+ fileName);
        return fileName;
     }
	   
	
	//게시글 삭제
	@PostMapping("detail/delete")
	public int delete(@RequestBody BoardVo vo) {
		return service.delete(vo);
	}
	
	@GetMapping("listall")
	public List<BoardVo> listAll(){
		System.out.println("실행"+service.listAll());
		return service.listAll();
	}
}
