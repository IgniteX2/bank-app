package IgniteX_Project1.Mini_Digital_Banking_system.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="BENEFICIARIES")
@Data
public class Beneficiary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long beneficiaryId;

    @Column(name = "beneficiary_name", insertable = false, updatable = false, length = 101)
    private String beneficiaryName;

    @Column(name = "account_number", nullable = false, updatable = false)
    private String accountNumber;

    @Column(name = "favorite")
    private boolean favorite;

    @ManyToOne
    @JoinColumn(name = "userId")
    private UserInfo user;
}
