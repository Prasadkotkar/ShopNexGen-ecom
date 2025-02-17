package com.shopnexgen.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    @Autowired
    private JavaMailSender javaMailSender;
    public void sendVerificationOtpEmail(String userEmail, String otp, String subject, String text) {
        try {
            // Validate email format
            if (!isValidEmail(userEmail)) {
                logger.error("Invalid email address: {}", userEmail);
                throw new IllegalArgumentException("Invalid email format: " + userEmail);
            }

            // Create and send email
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setSubject(subject);
            helper.setText(text + otp, true); // 'true' indicates HTML content
            helper.setTo(userEmail);

            javaMailSender.send(mimeMessage);

            logger.info("Email sent successfully to {}", userEmail);
        } catch (MailException e) {
            logger.error("Failed to send email to {}: {}", userEmail, e.getMessage());
            throw new MailSendException("Failed to send email: " + e.getMessage(), e);
        } catch (MessagingException e) {
            logger.error("MessagingException while sending email to {}: {}", userEmail, e.getMessage());
            throw new RuntimeException("Error while constructing email: " + e.getMessage(), e);
        }
    }
      /*
    public void sendVerificationOtpEmail(String userEmail, String otp, String subject, String text) throws MessagingException, MailSendException {


        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");


            helper.setSubject(subject);
            helper.setText(text+otp, true);
            helper.setTo(userEmail);
            javaMailSender.send(mimeMessage);
        } catch (MailException e) {
            throw new MailSendException("Failed to send email");
        }
    } */

    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$";
        return email.matches(emailRegex);
    }

}
