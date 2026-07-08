package IgniteX_Project1.Mini_Digital_Banking_system.Service.Impl;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.TransferRequestDTO;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.TransferResponseDTO;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.TransactionInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.PinService;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.TransferService;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.TransactionRepository;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.UserRepository;
import IgniteX_Project1.Mini_Digital_Banking_system.security.AuthUtil;
import IgniteX_Project1.Mini_Digital_Banking_system.security.JwtUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.TransferRequestDTO;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.TransferResponseDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransferServiceImpl implements TransferService {
//    @Override

    @Autowired
    private PinService pinService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    @Override
    public TransferResponseDTO transferMoney(TransferRequestDTO trequest) {
        UserInfo sender = getCurrentUser();

        pinService.validatePin(trequest.getPin(), sender);

        entityManager
                .createNativeQuery(
                        "CALL transfer_money(:sender, :receiver, :amount, :description)"
                )
                .setParameter("sender", trequest.getSenderAccountNumber())
                .setParameter("receiver", trequest.getReceiverAccountNumber())
                .setParameter("amount", trequest.getAmount())
                .setParameter("description", trequest.getDescription())
                .executeUpdate();

            return new TransferResponseDTO(
                "Transfer Successful",
                "SUCCESS"
        );
    }

    private UserInfo getCurrentUser() {
        String email = AuthUtil.getLoggedInEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
}

//    @Override
//    public String transfer(TransferRequestDTO request) {
//        return "";
//    }
//    public class TransferService {
//
//        @PersistenceContext
//        private EntityManager entityManager;
//
//        @Transactional
//        public TransferResponseDTO transferMoney(@Valid TransferRequestDTO trequest) {
//            entityManager
//                    .createNativeQuery(
//                            "CALL transfer_money(:sender, :receiver, :amount)"
//                    )
//                    .setParameter("sender", trequest.getSenderAccountNumber())
//                    .setParameter("receiver", trequest.getReceiverAccountNumber())
//                    .setParameter("amount", trequest.getAmount())
//                    .executeUpdate();
//
//            return new TransferResponseDTO(
//                    "Transfer Successful",
//                    "SUCCESS"
//            );
//        }
//    }

//}
