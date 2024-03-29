package com.kh.questrip.board.vo;

import lombok.Data;

@Data
public class BoardVo {
	private String no;
	private String memberNo;
	private String title;
	private String content;
	private String enrollDate;
	private String hit;
	private String likes;
	private String delYn;
	private String nick;
	private String likesCount;
	private String imageUrl;
}