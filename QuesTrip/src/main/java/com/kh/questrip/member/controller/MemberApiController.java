
package com.kh.questrip.member.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.questrip.board.vo.BoardVo;
import com.kh.questrip.comment.vo.CommentVo;
import com.kh.questrip.icon.vo.IconVo;
import com.kh.questrip.member.service.MemberService;
import com.kh.questrip.member.vo.MemberVo;
import com.kh.questrip.member.vo.PointVo;
import com.kh.questrip.quest.vo.SearchInfoVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/member")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberApiController {
	
	private final MemberService service;
	private final JavaMailSender javaMailSender;
	
	//회원가입
	@PostMapping("join")
	public int join(@RequestBody MemberVo vo) throws Exception {
		System.out.println(vo);
		String verificationCode = emailCode();
	    vo.setEmailCode(verificationCode);
		return service.join(vo);
	}
	
	//로그인
	@PostMapping("login")
	public Map<String, Object> login(@RequestBody MemberVo vo) {
		MemberVo loginMember = service.login(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", "good");
		map.put("loginMemberVo", loginMember);
		if(loginMember == null) {
			map.put("msg", "bad");
		}
		return map;
	}
	
	//중복확인
	@PostMapping("join/dupCheck")
	public Map<String, Object> dupCheck(@RequestBody MemberVo vo){
		int dupCheck = service.dupCheck(vo);
		Map<String, Object> map = new HashMap<String, Object>();
		if(dupCheck == 0) {
			map.put("msg", "good");
		}else {
			map.put("msg", "bad");			
		}
		System.out.println(map.get("msg"));
		return map;
	}

	//이메일 인증
	@PostMapping("join/emailCheck")
    public Map<String, Object> sendEmail(@RequestBody MemberVo vo) {
        Map<String, Object> map = new HashMap<>();
        
        // 이메일 인증 코드 생성
        String verificationCode = emailCode();
        vo.setEmailCode(verificationCode);
        // 클라이언트로 인증 코드 전송
        map.put("verificationCode", vo.getEmailCode());
        

        try {
            // JavaMailSender를 사용하여 이메일 전송
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(vo.getEmail());
            helper.setSubject("퀘스트립 회원가입 인증 코드");
            helper.setText("회원가입 이메일 인증 코드: " + verificationCode);

            javaMailSender.send(message);

            System.out.println("이메일이 성공적으로 전송되었습니다.");
            System.out.println("vo 이메일 코드"+vo.getEmailCode());
            map.put("msg", "이메일이 성공적으로 전송되었습니다.");
        } catch (MessagingException e) {
            e.printStackTrace();
            System.err.println("이메일 전송 중 오류가 발생했습니다.");

            map.put("msg", "이메일 전송 중 오류가 발생했습니다.");
        }

        return map;
    }
	
	//이메일 인증 난수 생성
	private String emailCode() {
		Random random = new Random();
		int code = 100000 + random.nextInt(900000);
		return String.valueOf(code);
	}
	
	@GetMapping("listall")
	public List<MemberVo> list() {
		System.out.println("실행완료"+service.list());
		return service.list();
	}
	
	//마이페이지 정보 수정
	@PostMapping("edit")
	public int edit(@RequestBody MemberVo vo) throws Exception{
		System.out.println("정보수정 vo: "+ vo);
		String verificationCode = emailCode();
	    vo.setEmailCode(verificationCode);
		return service.edit(vo);
	}
		
	//마이페이지 포인트 내역 조회
	@PostMapping("point")
	public Map<String, Object> point(@RequestBody SearchInfoVo vo) {
		int start = (Integer.parseInt(vo.getPageNo())-1)*Integer.parseInt(vo.getLimit());
		System.out.println(vo);
		vo.setPageNo(Integer.toString(start));
		
		int pageTotal = (int)Math.ceil((double)service.point(vo)/Integer.parseInt(vo.getLimit()));
		
		List<PointVo> PointVoList = service.pageList(vo);
		System.out.println("포인트vo: "+ PointVoList);
		Map<String, Object> map = new HashMap<>();
		map.put("pageTotal", pageTotal);
		map.put("voList", PointVoList);
		
		return map;
	}
	
	
}
