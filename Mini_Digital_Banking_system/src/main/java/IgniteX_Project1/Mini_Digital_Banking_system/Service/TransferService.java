package IgniteX_Project1.Mini_Digital_Banking_system.Service;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.TransferRequestDTO;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.TransferResponseDTO;
import jakarta.validation.Valid;

public interface TransferService {
//    String transfer(TransferRequestDTO trequest);

    TransferResponseDTO transferMoney(@Valid TransferRequestDTO trequest);
}

