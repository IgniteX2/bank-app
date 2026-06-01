package IgniteX_Project1.Mini_Digital_Banking_system.DTO.Pin;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ChangePinRequest {
    private String oldPin;

    @Size(min = 4, max = 4)
    private String newPin;

    @Size(min = 4, max = 4)
    private String confirmNewPin;
}
