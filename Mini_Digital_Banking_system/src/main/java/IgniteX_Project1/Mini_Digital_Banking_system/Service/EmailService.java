package IgniteX_Project1.Mini_Digital_Banking_system.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private  final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String toEmail, String otp) {
        try {
            SimpleMailMessage message =
                    new SimpleMailMessage();

            message.setFrom(fromEmail);

            message.setTo(toEmail);
            message.setSubject("OTP Verification pin");

            message.setText(
                    "Your OTP is: " +
                            otp +
                            "\n\nThis OTP expires in 5 Minutes"
            );

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(
                    "Failed to send OTP email: " + e.getMessage()
            );
        }
    }
}
