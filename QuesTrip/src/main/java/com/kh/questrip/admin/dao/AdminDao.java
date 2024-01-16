package com.kh.questrip.admin.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.questrip.admin.vo.AdminVo;
@Repository
public class AdminDao {

	public AdminVo login(SqlSessionTemplate sst, AdminVo vo) {
		return sst.selectOne("AdminMapper.login",vo);
	}

}
