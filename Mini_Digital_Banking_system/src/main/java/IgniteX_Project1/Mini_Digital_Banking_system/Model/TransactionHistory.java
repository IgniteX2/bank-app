package IgniteX_Project1.Mini_Digital_Banking_system.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table
@Data
public class TransactionHistory {
    @Id
    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "sender_account_id")
    private Long senderAccountId;

    @Column(name = "receiver_account_id")
    private Long receiverAccountId;

    @Column(name = "transaction_type", nullable = false)
    private String transactionType;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "status")
    private String status;

    @Column(name = "description")
    private String description;

    @Column(name = "transaction_created_at")
    private LocalDateTime transactionCreatedAt;
    @PrePersist
    public void create () {
        transactionCreatedAt = LocalDateTime.now();
    }
}
