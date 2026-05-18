package IgniteX_Project1.Mini_Digital_Banking_system.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponse {
    private Long userId;
    private String fullName;
    private String email;
    private Long bvn;
    private String NInNum;
    private LocalDateTime UserCreatedAt;
    private LocalDateTime UserModifiedAt;
}
