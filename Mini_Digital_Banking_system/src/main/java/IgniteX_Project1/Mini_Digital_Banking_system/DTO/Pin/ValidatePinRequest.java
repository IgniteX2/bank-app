package IgniteX_Project1.Mini_Digital_Banking_system.DTO.Pin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class ValidatePinRequest {
    private String pin;
}
