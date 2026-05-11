package IgniteX_Project1.Mini_Digital_Banking_system.Controller;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.UserResponse;
import IgniteX_Project1.Mini_Digital_Banking_system.Exceptions.UserNotFound;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/u")
public class UserController {
    private  final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    private ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        UserInfo user = userRepository.findByUserId(id).orElseThrow(() ->
                new UserNotFound("user not found"));

        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getUserId());
        userResponse.setFullName(user.getFullName());
        userResponse.setEmail(user.getEmail());
        userResponse.setBvn(user.getBvn());
        userResponse.setNinNum(user.getNINum());
        userResponse.setCreatedAt(user.getUserCreatedAt());
        userResponse.setModifiedAt(user.getUserModifiedAt());

        return ResponseEntity.ok(userResponse);
    }

    



}
