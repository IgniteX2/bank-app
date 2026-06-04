package IgniteX_Project1.Mini_Digital_Banking_system.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "ACCOUNT")
public class AccountInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "account_name", nullable = false)
    private String accountName;

    @Column(name = "account_number", nullable = false, unique = true)
    private Long accountNumber;

    @Column(name = "account_type", nullable = false)
    private String accountType;

    @Column(name = "balance")
    private BigDecimal balance;

    @Column(name = "account_created_at")
    private LocalDateTime accountCreatedAt;


}
