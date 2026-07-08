package IgniteX_Project1.Mini_Digital_Banking_system.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "beneficiaries")
@RequiredArgsConstructor
@Data
public class BeneficiaryInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "beneficiaries_id", nullable = false)
    private Long beneficiaryId;

    @Column(name = "beneficiary_name", updatable = false)
    private String beneficiaryName;

    @Column(name = "account_number", nullable = false, updatable = false)
    private Long accountNumber;

    @Column(name = "isfavorite")
    private boolean favorite;

    @ManyToOne
    @JoinColumn(name = "userId")
    private UserInfo user;

    @ManyToOne
    @JoinColumn(name = "accountId")
    private AccountInfo account;
}
