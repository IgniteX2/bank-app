package IgniteX_Project1.Mini_Digital_Banking_system.Controller;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.TransferRequestDTO;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.TransferResponseDTO;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.TransferService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transfer")
@RequiredArgsConstructor
public class TransferController {
    private final TransferService transferService;

    @PostMapping
    public TransferResponseDTO transfer(@Valid @RequestBody TransferRequestDTO trequest) {
        return transferService.transferMoney(trequest);
    }
}
