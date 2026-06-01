package IgniteX_Project1.Mini_Digital_Banking_system.DTO.Pin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ResetPinRequest {
    private String resettoken;
    private String newpin;
    private String confirmnewpin;
}
