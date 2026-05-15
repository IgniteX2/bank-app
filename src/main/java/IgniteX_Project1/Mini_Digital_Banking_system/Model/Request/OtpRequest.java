package IgniteX_Project1.Mini_Digital_Banking_system.Model.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OtpRequest {

    @NotBlank(message = "email is required")
    @Email(message = "invalid email format")
    private String email;

//    public String getEmail() {
//    }
}
