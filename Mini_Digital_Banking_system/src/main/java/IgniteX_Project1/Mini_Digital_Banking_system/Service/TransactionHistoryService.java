package IgniteX_Project1.Mini_Digital_Banking_system.Service;

import IgniteX_Project1.Mini_Digital_Banking_system.Model.TransactionsHistory;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.TransactionHistoryRepository;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
//import java.util.Optional;

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

    public List<TransactionsHistory> getAllTransaction() {
        return transactionHistoryRepository.findAll();
    }

    public TransactionsHistory getTransactionById(Long transactionId) {
        return transactionHistoryRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }


    public List<TransactionsHistory> getSenderTransactions(Long senderId) {
//        if (!userRepository.existsById(senderId)) {
//            throw new RuntimeException("Sender does not exist");
//        }
        return transactionHistoryRepository.findBySenderAccountId(senderId);
    }


    public List<TransactionsHistory> getReceiverTransactions(Long receiverId) {
//        if(!userRepository.existsById(receiverId)) {
//            throw new RuntimeException("Receiver does not exist");
//        }
        return transactionHistoryRepository.findByReceiverId(receiverId);
    }

}
