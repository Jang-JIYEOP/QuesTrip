package com.kh.questrip.comment.vo;

import lombok.Data;

@Data
public class CommentVo {
	private String no;
	private String memberNo;
	private String boardNo;
	private String content;
	private String enrollDate;
	private String delYn;
	private String likesCount;
	private String icon;
	private String memberTitle;
	private String nick;
	private String parentNo;
}
