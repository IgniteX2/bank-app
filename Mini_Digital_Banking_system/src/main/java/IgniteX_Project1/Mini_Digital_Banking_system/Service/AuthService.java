package IgniteX_Project1.Mini_Digital_Banking_system.Service;

import IgniteX_Project1.Mini_Digital_Banking_system.Exceptions.InvalidCredentialException;
import IgniteX_Project1.Mini_Digital_Banking_system.Exceptions.UserAlreadyExistsException;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.Request.AccountCreationRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.Request.LogInRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.UserRepository;
import IgniteX_Project1.Mini_Digital_Banking_system.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder;
    private  final JwtUtil jwtUtil;
    private final OtpService otpService;

    public AuthService(UserRepository repo,
                       BCryptPasswordEncoder encoder,
                       JwtUtil jwtUtil,
                       OtpService otpService) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
        this.otpService = otpService;
    }



    @Transactional
    public String signup(AccountCreationRequest req) {

        if (repo.findByEmail(req.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("user already exist");
        }

        boolean isOtpValid =
                otpService.verifyOtp(
                        req.getEmail(),
                        req.getOtp()
                );

        if (!isOtpValid) {
            throw new RuntimeException(
                    "Invalid or expired OTP"
            );
        }

        UserInfo userInfo = new UserInfo();
        userInfo.setFirstName(req.getFirstName());
        userInfo.setLastName(req.getLastName());
//        userInfo.setUsername(req.getUsername());
        userInfo.setEmail(req.getEmail());
        userInfo.setPhoneNumber(req.getPhoneNumber());
        userInfo.setBvn(req.getBvn());
        userInfo.setUserPassword(encoder.encode(req.getUserPassword()));
        userInfo.setNInNum(req.getNInNum());

        repo.save(userInfo);

        return "User registered Successfully";
    }

    public String login(LogInRequest req) {

        UserInfo user = repo.findByEmail(req.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialException("invalid username or password"));
        if (!encoder.matches(req.getPassword(), user.getUserPassword())) {
             throw new InvalidCredentialException("invalid username or password");
        }
        return  jwtUtil.generateToken(user.getEmail());
    }

}
