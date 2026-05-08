package IgniteX_Project1.Mini_Digital_Banking_system.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponse {
    private Long id;
    private String fullName;
    private String email;
    private Long bvn;
    private String ninNum;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
