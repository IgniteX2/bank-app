package IgniteX_Project1.Mini_Digital_Banking_system.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class TransferResponseDTO {

    private String message;

    private String status;
//    public TransferResponseDTO(String transferSuccessful, String success) {
//    }
}
