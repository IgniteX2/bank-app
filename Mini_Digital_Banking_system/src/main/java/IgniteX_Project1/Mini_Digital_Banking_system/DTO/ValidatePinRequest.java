package IgniteX_Project1.Mini_Digital_Banking_system.DTO;

import lombok.Data;

//Used during transfer
@Data
public class ValidatePinRequest {
    private String pin;

    public String getPin(){
        return pin;
    }
    public void setPin(String pin){
        this.pin = pin;
    }
}
