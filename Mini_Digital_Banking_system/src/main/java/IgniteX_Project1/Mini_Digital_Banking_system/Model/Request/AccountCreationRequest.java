package IgniteX_Project1.Mini_Digital_Banking_system.Model.Request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class AccountCreationRequest {

//    @NotNull(message = "Id required")
//    private Integer id;

    @NotBlank(message = "first_name is required")
    private String firstName;

    @NotBlank(message = "last_name is required")
    private String lastName;

    @NotBlank(message = "email is required")
    @Email(message = "invalid email format")
    private String email;

//    @NotBlank(message = "required")
//    private String username;

    @NotBlank(message = "phone_number is required")
    private String phoneNumber;

    @NotNull(message = "bvn is required")
    private Long bvn;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Minimum 8 characters required")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$",
            message = "Password must contain uppercase, lowercase, number, and special character"
    )
    private String userPassword;

    @NotBlank(message = "NIN is required")
    private String NInNum;

}
