package com.kh.questrip.diary.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.questrip.board.vo.BoardDetailVo;
import com.kh.questrip.board.vo.BoardVo;
import com.kh.questrip.diary.service.DiaryService;
import com.kh.questrip.diary.vo.DiaryDetailVo;
import com.kh.questrip.diary.vo.DiaryVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/diary")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DiaryController {
	
	private final DiaryService service;
	
	//일기 목록 조회
	@PostMapping("list")
	public Map<String, Object> list(@RequestBody SearchInfoVo vo){
		
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
		
		vo.setPageNo(Integer.toString(start));
		
		int pageTotal = (int)Math.ceil((double)service.list(vo)/Integer.parseInt(vo.getLimit()));
		
		List<DiaryVo> diaryVoList = service.pageList(vo);
		List<DiaryVo> DiaryBestList = service.best();
		Map<String, Object> map = new HashMap<>();
		map.put("pageTotal", pageTotal);
		map.put("voList", diaryVoList);
		map.put("bestList", DiaryBestList);
		
		return map;
	}
	
	//일기 상세 조회
	@PostMapping("detail")
	public DiaryDetailVo detail(@RequestBody DiaryVo vo)  {
		DiaryDetailVo detail = service.detail(vo);
		service.increaseHit(vo.getNo());
		
		return service.detail(vo);
	
	}
	
	
	//일기 추천 판단
	@PostMapping("checkIfAlreadyLiked")
    public boolean checkIfAlreadyLiked(@RequestBody Map<String, Object> params) {
		System.out.println("params: "+params);
        return service.checkIfAlreadyLiked(params);
    }
	
	
	
	//일기 추천
	@PostMapping("detail/increaseLikes")
    public int increaseLikes(@RequestBody Map<String, String> requestMap) {
        String memberNo = requestMap.get("memberNo");
        String diaryNo = requestMap.get("diaryNo");
        
        return service.increaseBoardLikes(memberNo, diaryNo);
        
        
    }
	
	//일기 추천 취소
	@PostMapping("detail/decreaseLikes")
    public int decreaseLikes(@RequestBody Map<String, String> requestMap) {
        String memberNo = requestMap.get("memberNo");
        String diaryNo = requestMap.get("diaryNo");
        
        return service.decreaseBoardLikes(memberNo, diaryNo);
        
        
    }
	
	//일기 작성
    @PostMapping("write")
    public int write(@RequestBody BoardVo vo) {
       
            return service.write(vo);
    }
    
    //이미지 업로드, 이미지 URL 반환
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("uploadImage")
    public String savFile(MultipartFile image) throws Exception {
        String path = "D:\\dev\\QuesTrip\\QuesTrip\\src\\main\\webapp\\resources\\upload\\diary\\img\\";
        System.out.println("이미지: "+ image);
        String fileName = image.getOriginalFilename();
        System.out.println("파일이름 : " + (path + fileName));
        File target = new File(path+fileName);
        
        image.transferTo(target);
        String str = (path + fileName).replace("D:\\dev\\QuesTrip\\QuesTrip\\src\\main\\webapp", "http://127.0.0.1:8888/questrip/");
        
        System.out.println("리턴 값: "+ str);
        return str;
     }
	
	//일기 삭제
	@PostMapping("detail/delete")
	public int delete(@RequestBody DiaryVo vo) {
		return service.delete(vo);
	}
	
	@GetMapping("listall")
	public List<DiaryVo> listAll(){
		System.out.println(service.listAll());
		return service.listAll();
	}
	
	//마이페이지에서 내가 쓴 일기 조회
	@PostMapping("/myDiaryList")
	public Map<String, Object> myDiaryList(@RequestBody SearchInfoVo vo) {
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
		
		vo.setPageNo(Integer.toString(start));
		
		int pageTotal = (int)Math.ceil((double)service.list(vo)/Integer.parseInt(vo.getLimit()));

		List<DiaryVo> voList = service.pageListDiary(vo);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("pageTotal", pageTotal);
		map.put("voList", voList);
		return map;
	}
	
	

}
