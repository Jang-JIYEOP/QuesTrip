package com.kh.questrip.member.controller;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

@Component
public class JavaMail {
	
	@Bean
	public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com"); // 이메일 호스트 설정
        mailSender.setPort(587); // 이메일 포트 설정

        // SMTP 계정 정보 설정
        mailSender.setUsername("jangjiyeop24@gmail.com");
        mailSender.setPassword("urkv ozfe oeup kdyn");

        // SMTP 연결을 보안 연결(SSL 또는 TLS)로 설정
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}
