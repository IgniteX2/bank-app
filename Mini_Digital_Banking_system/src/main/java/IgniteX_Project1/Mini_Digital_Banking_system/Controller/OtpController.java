package IgniteX_Project1.Mini_Digital_Banking_system.Controller;

import IgniteX_Project1.Mini_Digital_Banking_system.Model.Request.OtpRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.EmailService;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.OtpService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/otp")
public class OtpController {

    private final OtpService otpService;
    private final EmailService emailService;

    public OtpController(OtpService otpService, EmailService emailService) {
        this.otpService = otpService;
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@Valid @RequestBody OtpRequest request) {
        try{
            String otp = otpService.generateOtp(request.getEmail());

            emailService.sendOtpEmail(request.getEmail(), otp);
            return ResponseEntity.ok("OTP sent successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Failed to send OTP: " + e.getMessage());
        }
    }
}
