package IgniteX_Project1.Mini_Digital_Banking_system.Service;

import IgniteX_Project1.Mini_Digital_Banking_system.Model.OtpData;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private final Map<String, OtpData> otpStorage = new ConcurrentHashMap<>();

    private final SecureRandom random = new SecureRandom();

    public String generateOtp(String email) {

//        if (otpStorage.containsKey(email)) {
//            OtpData existingOtp = otpStorage.get(email);
//
//            if (LocalDateTime.now().isBefore(existingOtp.getExpiryTime())) {
//                throw new RuntimeException("OTP already sent please wait");
//            }
//        }

        OtpData existingOtp =otpStorage.get(email);


        if (existingOtp != null && LocalDateTime.now().isBefore(existingOtp.getExpiryTime())) {
            throw new RuntimeException("OTP already sent please wait");
        }

        String otp = String.valueOf(100000 + random.nextInt(900000));
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(5);

        otpStorage.put(email, new OtpData(otp, expiryTime));

        return otp;
    }

    public boolean verifyOtp(String email, String otp) {
        OtpData storedOtp = otpStorage.get(email);

        if (storedOtp == null ) {
            return false;
        }

        if (LocalDateTime.now().isAfter(storedOtp.getExpiryTime())) {
            otpStorage.remove(email);

            return false;
        }

        boolean valid = otp != null &&
                otp.equals(storedOtp.getOtp());

        if (valid) {
            otpStorage.remove(email);
        }
        return valid;
    }

    @Scheduled(fixedRate = 60000)
    public void cleanUpExpiredOtp() {
        otpStorage.entrySet().removeIf(entry -> LocalDateTime.now().isAfter(entry.getValue().getExpiryTime()));

    }
}
