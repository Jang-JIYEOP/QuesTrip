package com.kh.questrip.diary.vo;

import lombok.Data;

@Data
public class DiaryDetailVo {
	private String no;
	private String memberNo;
	private String title;
	private String content;
	private String enrollDate;
	private String hit;
	private String likes;
	private String delYn;
	private String nick;
	private String commentCount;
	private String likesCount;
}
