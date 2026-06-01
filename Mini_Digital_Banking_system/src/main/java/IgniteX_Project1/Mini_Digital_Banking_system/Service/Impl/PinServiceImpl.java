package IgniteX_Project1.Mini_Digital_Banking_system.Service.Impl;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.Pin.ChangePinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.Pin.CreatePinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.Pin.ForgotPinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.Pin.ResetPinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.Exceptions.InvalidPinException;
import IgniteX_Project1.Mini_Digital_Banking_system.Exceptions.PinLockedException;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.PinService;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.UserRepository;
import IgniteX_Project1.Mini_Digital_Banking_system.security.AuthUtil;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
    
    @Override
    public String createPin(CreatePinRequest request) {
        validatePinFormat(request.getPin());
        validateConfirmPinFormat(request.getConfirmpin());

        UserInfo user = getCurrentUser();

        if (!request.getPin().equals(request.getConfirmpin())) {
            throw new InvalidPinException("PIN and Confirm PIN do not match");
        }

//        if (user.getTransactionPin() != null){
//            throw new InvalidPinException("User already created password")
//        }

        String hashedPin =
                passwordEncoder.encode(request.getPin());

        user.setTransactionPin(hashedPin);

        user.setPinAttempts(0);
        user.setPinLockedUntil(null);

        userRepository.save(user);

        return "PIN created successfully";
    }

    private UserInfo getCurrentUser() {

        String email = AuthUtil.getLoggedInEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    private void validatePinFormat(@NotBlank @Size(min = 4, max = 4) String pin) {
        if (pin == null || !pin.matches("\\d{4}")) {
            throw new InvalidPinException("PIN must be exactly 4 digits");
        }
    }

    private void validateConfirmPinFormat(@NotBlank @Size(min = 4, max = 4) String confirmpin) {
        if (confirmpin == null || !confirmpin.matches("\\d{4}")) {
            throw new InvalidPinException("Confirmed PIN must be exactly 4 digits");
        }
    }

    @Override
    public void validatePin(String enteredPin, UserInfo user) {
        // check lock
        if (user.getPinLockedUntil() != null &&
                user.getPinLockedUntil().isAfter(LocalDateTime.now())) {

            throw new PinLockedException("PIN locked. Try again later.");
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
        validateConfirmPinFormat(request.getConfirmNewPin());

        if (!request.getNewPin().equals(request.getConfirmNewPin())) {
            throw new InvalidPinException("New PIN and Confirm PIN do not match");
        }

        user.setTransactionPin(
                passwordEncoder.encode(request.getNewPin()));

        userRepository.save(user);

        return "PIN changed successfully";
    }

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

    @Override
    public String resetPin(ResetPinRequest request) {
        UserInfo user = userRepository
                .findByPinResetToken(request.getResettoken())
                .orElseThrow(() ->
                        new RuntimeException("Invalid token"));

        validatePinFormat(request.getNewpin());

        user.setTransactionPin(
                passwordEncoder.encode(request.getNewpin()));

        user.setPinResetToken(null);

        user.setPinAttempts(0);
        user.setPinLockedUntil(null);

        userRepository.save(user);

        return "PIN reset successful";
    }
}
