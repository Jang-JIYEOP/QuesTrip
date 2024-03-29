package com.kh.questrip.quest.service;

import java.nio.channels.IllegalSelectorException;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.quest.dao.QuestDao;
import com.kh.questrip.quest.vo.SearchInfoVo;
import com.kh.questrip.quest.vo.ComQuestVo;
import com.kh.questrip.quest.vo.QuestVo;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class QuestService {

	private final QuestDao dao;
	private final SqlSessionTemplate sst;
	


	public List<QuestVo> allList(SearchInfoVo vo) {
		return dao.allList(sst, vo);
	}

	public List<QuestVo> pageList(SearchInfoVo vo) {
		return dao.pageList(sst, vo);
	}

	public List<QuestVo> listAll() {
		return dao.listAll(sst);
	}

	public int write(QuestVo vo) {
		String str = vo.getImgPath().replace("D:\\dev\\questrip\\QuesTrip\\src\\main\\webapp", "http://127.0.0.1:8888/questrip/");
		vo.setImgPath(str);
		if(vo.getTitle().length() < 1) {
			throw new IllegalSelectorException();
		}
		return dao.write(sst, vo);
	}

	public int complete(ComQuestVo vo) {
		String str = vo.getImgPath().replace("D:\\dev\\questrip\\QuesTrip\\src\\main\\webapp", "http://127.0.0.1:8888/questrip/");
		vo.setImgPath(str);
		System.out.println(vo);
		return dao.complete(sst, vo);
	}

	public int checkComplete(ComQuestVo vo) {
		return dao.checkComplete(sst, vo);
	}

	public int delete(QuestVo vo) {
		return dao.delete(vo,sst);
	}

}
