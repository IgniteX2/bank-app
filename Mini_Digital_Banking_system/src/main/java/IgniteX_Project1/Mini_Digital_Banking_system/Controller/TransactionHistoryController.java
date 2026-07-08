package IgniteX_Project1.Mini_Digital_Banking_system.Controller;


import IgniteX_Project1.Mini_Digital_Banking_system.DTO.TransactionHistoryDTO;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.TransactionHistory;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.TransactionHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionHistoryController {
    private final TransactionHistoryService transactionHistoryService;

    @GetMapping
    public List<TransactionHistory> getAllTransactions() {
        return transactionHistoryService.getAllTransaction();
    }

    @GetMapping("/{transactionId}")
    public TransactionHistory getTransactionById(@PathVariable Long transactionId) {
        return transactionHistoryService.getTransactionById(transactionId);
    }

    @GetMapping("sender/{senderId}")
    public List<TransactionHistory> getSenderTransactions(@PathVariable Long senderId) {
        return transactionHistoryService.getSenderTransactions(senderId);
    }

    @GetMapping("receiver/{receiverId}")
    public List<TransactionHistory> getReceiverTransactions(@PathVariable Long receiverId) {
        return transactionHistoryService.getReceiverTransactions(receiverId);
    }

    // New API Endpoint matching by senderId
    @GetMapping("/history/{senderId}")
    public List<TransactionHistory> getFullHistoryBySenderId(@PathVariable Long senderId) {
        return transactionHistoryService.getTransactionsBySenderId(senderId);
    }
}
