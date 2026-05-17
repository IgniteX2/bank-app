package IgniteX_Project1.Mini_Digital_Banking_system.Service;

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
public class TransferService {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public TransferResponseDTO transferMoney(@Valid TransferRequestDTO trequest) {
        entityManager
                .createNativeQuery(
                        "CALL transfer_money(:sender, :receiver, :amount)"
                )
                .setParameter("sender", trequest.getSenderAccountNumber())
                .setParameter("receiver", trequest.getReceiverAccountNumber())
                .setParameter("amount", trequest.getAmount())
                .executeUpdate();

        return new TransferResponseDTO(
                "Transfer Successful",
                "SUCCESS"
        );
    }
}
