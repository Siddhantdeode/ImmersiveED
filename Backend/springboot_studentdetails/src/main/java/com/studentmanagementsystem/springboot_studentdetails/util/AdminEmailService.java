package com.studentmanagementsystem.springboot_studentdetails.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Component
public class AdminEmailService {
	@Autowired
	private JavaMailSender mailSender;
	
	public void sendHtmlEmail(String to, String userName) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject("Welcome to Student Management System  ❤️");
            helper.setFrom("sidxdeoda07@gmail.com");

            String htmlContent = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "  <style>" +
                    "    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }" +
                    "    .container { background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); }" +
                    "    h2 { color: #2c3e50; }" +
                    "    p { color: #555; font-size: 16px; }" +
                    "    .footer { margin-top: 30px; font-size: 14px; color: #888; text-align: center; }" +
                    "    .highlight { color: green; font-weight: bold; }" +
                    "    .admin-note { background-color: #e0f7fa; padding: 10px; border-left: 4px solid #00acc1; margin-top: 20px; border-radius: 5px; }" +
                    "  </style>" +
                    "</head>" +
                    "<body>" +
                    "  <div class='container'>" +
                    "    <h2>👋 Hello " + userName + ",</h2>" +
                    "    <p>✅ Your registration to the <strong>Student Management System</strong> was <span class='highlight'>successful</span>!</p>" +
                    "    <p>We’re thrilled to have you on board. Now you can manage student data efficiently and securely.</p>" +
                    "    <div class='admin-note'>" +
                    "      <h3>👨‍💼 Admin Registration Details</h3>" +
                    "      <p>You have been successfully registered as an <strong>Admin</strong>. You now have access to all core functionalities including student management, reports, and user permissions.</p>" +
                    "    </div>" +
                    "    <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>" +
                    "    <div class='footer'>" +
                    "      <hr/>" +
                    "      <p>© 2025 Akhil Infotech. All rights reserved.</p>" +
                    "    </div>" +
                    "  </div>" +
                    "</body>" +
                    "</html>";

                helper.setText(htmlContent, true); // Enable HTML

                mailSender.send(message);
            } catch (MessagingException e) {
                e.printStackTrace();
                // Optionally log or throw a custom exception
            }
	}
}