package IgniteX_Project1.Mini_Digital_Banking_system.Controller;


import IgniteX_Project1.Mini_Digital_Banking_system.Model.Request.AccountCreationRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.Request.LogInRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;

    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody AccountCreationRequest req) {
        return  ResponseEntity.status(201).body(authService.signup(req));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LogInRequest req, HttpServletResponse response) {

        String token = authService.login(req);
        Cookie cookie = new Cookie("jwt", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);

        response.addCookie(cookie);

        return ResponseEntity.ok("Login Successfully");
    }
}
