package IgniteX_Project1.Mini_Digital_Banking_system.Service;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.AccountResponse;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.AccountInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.AccountRepository;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public AccountResponse getAccountByUserId(Long userId) {
        AccountInfo account = accountRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Account not found for useId: " + userId));

        AccountResponse response = new AccountResponse();
        response.setUserId(account.getUserId());
        response.setAccountName(account.getAccountName());
        response.setAccountNumber(account.getAccountNumber());
        response.setAccountType(account.getAccountType());
        response.setBalance(account.getBalance());
        response.setAccountCreatedAt(account.getAccountCreatedAt());

        return response;

    }
}
