package IgniteX_Project1.Mini_Digital_Banking_system.Model.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LogInRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
