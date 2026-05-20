package IgniteX_Project1.Mini_Digital_Banking_system.DTO;

import lombok.Data;

@Data
public class BeneficiaryResponse {

    private Long beneficiaryId;

    private String beneficiaryName;

    private String accountNumber;

    private boolean favorite;
}
