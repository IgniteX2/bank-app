package IgniteX_Project1.Mini_Digital_Banking_system.Controller;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.ChangePinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.CreatePinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.ForgotPinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.ResetPinRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.PinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/pin")
public class PinController {

    @Autowired
    private PinService pinService;

    @PostMapping("/create")
    public ResponseEntity<?> createPin(
            @RequestBody CreatePinRequest request) {

        return ResponseEntity.ok(
                pinService.createPin(request));
    }

    @PostMapping("/change")
    public ResponseEntity<?> changePin(
            @RequestBody ChangePinRequest request) {

        return ResponseEntity.ok(
                pinService.changePin(request));
    }

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPin(
            @RequestBody ForgotPinRequest request) {

        return ResponseEntity.ok(
                pinService.forgotPin(request));
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPin(
            @RequestBody ResetPinRequest request) {

        return ResponseEntity.ok(
                pinService.resetPin(request));
    }
}


