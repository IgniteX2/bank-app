package IgniteX_Project1.Mini_Digital_Banking_system.repository;

import IgniteX_Project1.Mini_Digital_Banking_system.Model.TransactionHistory;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.TransactionInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<TransactionInfo, Long> {
}
