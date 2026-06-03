package IgniteX_Project1.Mini_Digital_Banking_system.Controller;

import IgniteX_Project1.Mini_Digital_Banking_system.Model.TransactionsHistory;
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
public class TransactionsHistoryController {

    private final TransactionHistoryService transactionHistoryService;

    @GetMapping
    public List<TransactionsHistory> getAllTransactions() {
        return transactionHistoryService.getAllTransaction();
    }

    @GetMapping("/{transactionId}")
    public TransactionsHistory getTransactionById(@PathVariable Long transactionId) {
        return transactionHistoryService.getTransactionById(transactionId);
    }

    @GetMapping("sender/{senderId}")
    public List<TransactionsHistory> getSenderTransactions(@PathVariable Long senderId) {
        return transactionHistoryService.getSenderTransactions(senderId);
    }

    @GetMapping("receiver/{receiverId}")
    public List<TransactionsHistory> getReceiverTransactions(@PathVariable Long receiverId) {
        return transactionHistoryService.getReceiverTransactions(receiverId);
    }

}
