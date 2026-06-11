package IgniteX_Project1.Mini_Digital_Banking_system.DTO.Beneficiary;

import lombok.Data;

@Data
public class BeneficiaryResponse {
    private Long beneficiaryId;

    private String beneficiaryName;

    private Long accountNumber;

    private boolean favorite;
}
