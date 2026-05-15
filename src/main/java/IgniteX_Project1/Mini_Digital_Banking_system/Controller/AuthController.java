package IgniteX_Project1.Mini_Digital_Banking_system.Controller;


import IgniteX_Project1.Mini_Digital_Banking_system.DTO.TokenResponseDTO;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.Request.AccountCreationRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.Request.LogInRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.AuthService;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(
//        origins = {
//                "http://localhost:8083",
//                "http://localhost:5173"
//        },
//        allowedHeaders = "*",
//        methods = {
//                RequestMethod.GET,
//                RequestMethod.POST,
//                RequestMethod.PUT,
//                RequestMethod.DELETE,
//                RequestMethod.OPTIONS
//        },
//        allowCredentials = "true"
//)

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
    public ResponseEntity<TokenResponseDTO> login(@Valid @RequestBody LogInRequest req) {

        TokenResponseDTO responseDTO = authService.login(req);

        return ResponseEntity.ok(responseDTO);

    }
}
