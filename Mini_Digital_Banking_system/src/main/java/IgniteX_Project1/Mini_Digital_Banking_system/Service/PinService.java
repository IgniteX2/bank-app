package IgniteX_Project1.Mini_Digital_Banking_system.Service;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.ChangePinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.CreatePinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.ForgotPinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.ResetPinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;

public interface PinService {

    String createPin(CreatePinRequest request);

    void validatePin(String enteredPin, UserInfo user);

    String changePin(ChangePinRequest request);

    String forgotPin(ForgotPinRequest request);

    String resetPin(ResetPinRequest request);

}