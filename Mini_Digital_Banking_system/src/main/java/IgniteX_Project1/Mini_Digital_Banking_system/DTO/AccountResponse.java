package IgniteX_Project1.Mini_Digital_Banking_system.DTO;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class AccountResponse {
    private Long userId;
    private String accountName;
    private Long accountNumber;
    private String accountType;
    private BigDecimal balance;
    private LocalDateTime accountCreatedAt;
}
