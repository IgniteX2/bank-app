package IgniteX_Project1.Mini_Digital_Banking_system.DTO;

import lombok.Data;

@Data
public class ChangePinRequest {


    private String oldPin;

    private String newPin;

}
