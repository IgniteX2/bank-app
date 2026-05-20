package IgniteX_Project1.Mini_Digital_Banking_system.DTO;

import jakarta.persistence.Column;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TransactionHistory {

    private Long transactionId;
    private Long senderAccountId;
    private Long receiverAccountId;
    private String transactionType;
    private BigDecimal amount;
    private String status;
    private String description;
    private LocalDateTime transactionCreatedAt;
}
