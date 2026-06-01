package IgniteX_Project1.Mini_Digital_Banking_system.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long transactionId;

    // Sender Account
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_account_id")
    private AccountInfo senderAccount;

    // Receiver Account
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_account_id")
    private AccountInfo receiverAccount;

    @Column(name = "transaction_type", nullable = false)
    private String transactionType;

    @Column(name = "amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(name = "status", nullable = false)
    private String status = "PENDING";

    @Column(name = "description", length = 150)
    private String description;

    @Column(name = "transaction_created_at", insertable = false, updatable = false)
    private LocalDateTime transactionCreatedAt;

}
