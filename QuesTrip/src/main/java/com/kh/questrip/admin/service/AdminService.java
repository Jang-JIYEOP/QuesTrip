package com.kh.questrip.admin.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.questrip.admin.dao.AdminDao;
import com.kh.questrip.admin.vo.AdminVo;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class AdminService {
	private final AdminDao dao;
	private final SqlSessionTemplate sst;
	public AdminVo login(AdminVo vo) {
		
		return dao.login(sst,vo);
	}

}
