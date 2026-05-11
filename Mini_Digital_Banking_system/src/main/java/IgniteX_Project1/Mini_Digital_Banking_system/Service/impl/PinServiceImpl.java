package IgniteX_Project1.Mini_Digital_Banking_system.Service.impl;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.ChangePinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.CreatePinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.ForgotPinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.ResetPinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.Exceptions.InvalidPinException;
import IgniteX_Project1.Mini_Digital_Banking_system.Exceptions.PinLockedException;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.PinService;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.UserRepository;
import IgniteX_Project1.Mini_Digital_Banking_system.security.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PinServiceImpl implements PinService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ================= CREATE PIN =================
    @Override
    public String createPin(CreatePinRequest request) {

        validatePinFormat(request.getPin());

        UserInfo user = getCurrentUser();

        String hashedPin =
                passwordEncoder.encode(request.getPin());

        user.setTransactionPin(hashedPin);

        user.setPinAttempts(0);
        user.setPinLockedUntil(null);

        userRepository.save(user);

        return "PIN created successfully";
    }

    // ================= VALIDATE PIN =================
    @Override
    public void validatePin(String enteredPin, UserInfo user) {

        // check lock
        if (user.getPinLockedUntil() != null &&
                user.getPinLockedUntil().isAfter(LocalDateTime.now())) {

            throw new PinLockedException(
                    "PIN locked. Try again later.");
        }

        boolean matches = passwordEncoder.matches(
                enteredPin,
                user.getTransactionPin());

        if (!matches) {

            int attempts = user.getPinAttempts() + 1;
            user.setPinAttempts(attempts);

            if (attempts >= 3) {

                user.setPinLockedUntil(
                        LocalDateTime.now().plusMinutes(5));

                user.setPinAttempts(0);

                userRepository.save(user);

                throw new PinLockedException(
                        "Too many attempts. PIN locked for 5 minutes.");
            }

            userRepository.save(user);

            throw new InvalidPinException(
                    "Invalid transaction PIN");
        }

        // success reset
        user.setPinAttempts(0);
        user.setPinLockedUntil(null);

        userRepository.save(user);
    }
    //So many methods here are not functional yet
    // ================= CHANGE PIN =================
    @Override
    public String changePin(ChangePinRequest request) {

        UserInfo user = getCurrentUser();

        boolean validOldPin = passwordEncoder.matches(
                request.getOldPin(),
                user.getTransactionPin());

        if (!validOldPin) {
            throw new InvalidPinException("Old PIN is incorrect");
        }

        validatePinFormat(request.getNewPin());

        user.setTransactionPin(
                passwordEncoder.encode(request.getNewPin()));

        userRepository.save(user);

        return "PIN changed successfully";
    }

    // ================= FORGOT PIN =================
    @Override
    public String forgotPin(ForgotPinRequest request) {

        UserInfo user = userRepository.findByEmail(
                        request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        String token = UUID.randomUUID().toString();

        user.setPinResetToken(token);

        userRepository.save(user);

        // send email logic here

        return "PIN reset token sent";
    }

    // ================= RESET PIN =================
    @Override
    public String resetPin(ResetPinRequest request) {

        UserInfo user = userRepository
                .findByPinResetToken((String) request.getToken())
                .orElseThrow(() ->
                        new RuntimeException("Invalid token"));

        validatePinFormat(request.getNewPin());

        user.setTransactionPin(
                passwordEncoder.encode(request.getNewPin()));

        user.setPinResetToken(null);

        user.setPinAttempts(0);
        user.setPinLockedUntil(null);

        userRepository.save(user);

        return "PIN reset successful";
    }

    // ================= PIN FORMAT VALIDATION =================
    private void validatePinFormat(String pin) {

        if (pin == null || !pin.matches("\\d{4}")) {
            throw new InvalidPinException(
                    "PIN must be exactly 4 digits");
        }
    }

    // ================= CURRENT USER =================
    private UserInfo getCurrentUser() {

        String email = AuthUtil.getLoggedInEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
}