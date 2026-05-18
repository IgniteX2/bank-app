package IgniteX_Project1.Mini_Digital_Banking_system.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OtpData {
    private String otp;
    private LocalDateTime expiryTime;
}
