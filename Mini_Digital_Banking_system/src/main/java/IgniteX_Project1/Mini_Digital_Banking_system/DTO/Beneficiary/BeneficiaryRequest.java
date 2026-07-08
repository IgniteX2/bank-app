package IgniteX_Project1.Mini_Digital_Banking_system.DTO.Beneficiary;

import lombok.Data;

@Data
public class BeneficiaryRequest {
    private String beneficiaryName;

    private Long accountNumber;
}
