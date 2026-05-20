package IgniteX_Project1.Mini_Digital_Banking_system.repository;

import IgniteX_Project1.Mini_Digital_Banking_system.Model.TransactionsHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionHistoryRepository extends JpaRepository<TransactionsHistory, Long> {
    List<TransactionsHistory> findBySenderAccountId(Long senderId);
    List<TransactionsHistory> findByReceiverId(Long receiverId);
}
