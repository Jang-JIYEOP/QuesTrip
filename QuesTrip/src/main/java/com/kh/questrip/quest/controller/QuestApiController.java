package com.kh.questrip.quest.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.questrip.quest.service.QuestService;
import com.kh.questrip.quest.vo.QuestVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/quest")
@RequiredArgsConstructor
@CrossOrigin("*")
public class QuestApiController {
	private final QuestService service;
	
	//지역별 퀘스트 조회
	@PostMapping("list")
	public Map<String, Object> list(@RequestBody SearchInfoVo vo){
		Map<String, Object> map = new HashMap<String, Object>();
		
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
		
		vo.setPageNo(Integer.toString(start));
		
		int pageTotal = (int)Math.ceil((double)service.allList(vo).size()/Integer.parseInt(vo.getLimit()));
			
		List<QuestVo> questVoList = new ArrayList<QuestVo>();

		questVoList = service.pageList(vo);		
		
		map.put("pageTotal", pageTotal);
		
		map.put("questVoList",questVoList);
		
		return map;
	}
	
	@GetMapping("listall")
	public List<QuestVo> listAll(){
		System.out.println("실행"+service.listAll());
		return service.listAll();
	}
	
	@PostMapping
	public Map<String, String> write(QuestVo  vo, MultipartFile f) throws Exception {
		
		String fullPath = savFile(f );
		vo.setImagePath(fullPath);
		
		int result = service.write(vo);
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "good");
		if(result != 1) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	private String savFile(MultipartFile f) throws Exception {
		String path = "D:\\dev\\questrip\\QuesTrip\\src\\main\\webapp\\resources\\upload\\quest\\img\\";
		String fileName = f.getOriginalFilename();
		
		File target = new File(path+fileName);
		
		f.transferTo(target);
				
		return path+fileName;
	}
}
