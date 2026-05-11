package IgniteX_Project1.Mini_Digital_Banking_system.DTO;

import lombok.Data;

@Data
public class ResetPinRequest {

    private String token;

    private String newPin;

    public Object getToken() {
        return null;
    }

    // getters and setters
}
