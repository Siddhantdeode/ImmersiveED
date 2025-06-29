package com.studentmanagementsystem.springboot_studentdetails.util;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.studentmanagementsystem.springboot_studentdetails.dto.Course;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Component
public class StudentEmailService {
	@Autowired
	private JavaMailSender mailSender;
	
	// Sending Email to particular recipients
	public void sendEmail(String to) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject("Login confirmation email, Love you Bache");
		message.setText("Loging Successfully");
		message.setFrom("akhi76875@gmail.com");

		mailSender.send(message);
	}
	
	// Send single HTML email
    public void sendHtmlEmail(String to, String userName) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject("Welcome to Student Management System  ❤️");
            helper.setFrom("akhi76875@gmail.com");

            String htmlContent = "<html>" +
                "<body>" +
                "<h2 style='color:blue;'>Hello " + userName + " 👋</h2>" +
                "<p>✅ Your registration was <strong>successful</strong>!</p>" +
                "<p>We're glad to have you on board.</p>" +
                "<br><hr><p style='color:gray;'>Akhil Infotech © 2025</p>" +
                "</body>" +
                "</html>";

            helper.setText(htmlContent, true); // true = HTML

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
            // Optionally log or throw a custom exception
        }
    }
    
 // Send single HTML email--------------NOt working
//    public void sendHtmlEmailNew(String to, List<Course> list) {
//        MimeMessage message = mailSender.createMimeMessage();
//        try {
//            MimeMessageHelper helper = new MimeMessageHelper(message, true);
//            helper.setTo(to);
//            helper.setSubject("Welcome to Student Management System  ❤️");
//            helper.setFrom("akhi76875@gmail.com");
//
//            String htmlContent = "<html>" +
//                "<body>" +
//                "<h2 style='color:blue;'>Hello " + to + " 👋</h2>" +
//                "<p>✅ You Grabbed Course was <strong>successful</strong>!</p>" + list +
//                "<p>We're glad to have you on board.</p>" +
//                "<br><hr><p style='color:gray;'>Akhil Infotech © 2025</p>" +
//                "</body>" +
//                "</html>";
//
//            helper.setText(htmlContent, true); // true = HTML
//
//            mailSender.send(message);
//        } catch (MessagingException e) {
//            e.printStackTrace();
//            // Optionally log or throw a custom exception
//        }
//    }
    public void sendHtmlEmailNew(String to, List<Course> list) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject("Welcome to Student Management System ❤️");
            helper.setFrom("akhi76875@gmail.com");

            // Build course list as HTML string
            StringBuilder courseListBuilder = new StringBuilder("<ul>");
            for (Course course : list) {
                courseListBuilder.append("<li>").append(course.getName()).append("</li>");
            }
            courseListBuilder.append("</ul>");

            String htmlContent = "<html>" +
                "<body>" +
                "<h2 style='color:blue;'>Hello " + to + " 👋</h2>" +
                "<p>✅ You have successfully enrolled in the following course(s):</p>" +
                courseListBuilder.toString() +
                "<p>We're glad to have you on board.</p>" +
                "<br><hr><p style='color:gray;'>Akhil Infotech © 2025</p>" +
                "</body>" +
                "</html>";

            helper.setText(htmlContent, true); // true = HTML content

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
            // Optionally log or throw a custom exception
        }
    }
    
    
    public void sendLoginEmail(String to, String studentName) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject("Login Notification - Student Management System 🔐");
            helper.setFrom("akhi76875@gmail.com");

            String htmlContent = "<html>" +
                "<body>" +
                "<h2 style='color:green;'>Welcome back, " + studentName + " 👋</h2>" +
                "<p>✅ You have successfully logged into the <strong>Student Management System</strong>.</p>" +
                "<p>If this wasn't you, please reset your password immediately or contact support.</p>" +
                "<br><p>Stay safe and keep learning! 📚</p>" +
                "<br><hr><p style='color:gray;'>Akhil Infotech © 2025</p>" +
                "</body>" +
                "</html>";

            helper.setText(htmlContent, true); // true = HTML content
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
            // You may throw a custom exception here if needed
        }
    }




}
