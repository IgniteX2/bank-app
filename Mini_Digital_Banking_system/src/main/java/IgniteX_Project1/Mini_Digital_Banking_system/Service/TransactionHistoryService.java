package IgniteX_Project1.Mini_Digital_Banking_system.Service;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.TransactionHistoryDTO;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.TransactionHistory;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.TransactionHistoryRepository;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionHistoryService {
    private final TransactionHistoryRepository transactionHistoryRepository;
    private final UserRepository userRepository;

//    public TransactionsHistory createTransaction(TransactionsHistory transaction) {
//        Optional<UserInfo> sender = userRepository.findById(transaction.getSenderAccountId());
//
//        if (sender.isEmpty()) {
//            throw new RuntimeException("Sender account does not exist");
//        }
//
//
//        Optional<UserInfo> receiver = userRepository.findById(transaction.getReceiverAccountId());
//
//        if (receiver.isEmpty()) {
//            throw new RuntimeException("Receiver account does not exist");
//        }
//    }

    public List<TransactionHistory> getAllTransaction() {
        return transactionHistoryRepository.findAll();
    }

    public TransactionHistory getTransactionById(Long transactionId) {
        return transactionHistoryRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }


    public List<TransactionHistory> getSenderTransactions(Long senderId) {
//        if (!userRepository.existsById(senderId)) {
//            throw new RuntimeException("Sender does not exist");
//        }
        return transactionHistoryRepository.findBySenderAccountId(senderId);
    }


    public List<TransactionHistory> getReceiverTransactions(Long receiverId) {
//        if(!userRepository.existsById(receiverId)) {
//            throw new RuntimeException("Receiver does not exist");
//        }
        return transactionHistoryRepository.findByReceiverAccountId(receiverId);
    }

    public List<TransactionHistory> getTransactionsBySenderId(Long senderId) {
//        if (!userRepository.existsById(accountId)) {
//            throw new RuntimeException("Account does not exist");
//        }
        return transactionHistoryRepository.findBySenderAccountIdOrReceiverAccountId(senderId, senderId);
    }

}
