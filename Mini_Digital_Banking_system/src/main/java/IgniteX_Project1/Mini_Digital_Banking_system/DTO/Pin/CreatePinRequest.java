package IgniteX_Project1.Mini_Digital_Banking_system.DTO.Pin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class CreatePinRequest {
    @NotBlank
    @Size(min = 4, max = 4)
    private String pin;

    @NotBlank
    @Size(min = 4, max = 4)
    private String confirmpin;
}
