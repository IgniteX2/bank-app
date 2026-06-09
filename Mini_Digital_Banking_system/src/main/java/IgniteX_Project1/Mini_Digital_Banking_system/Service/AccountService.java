package IgniteX_Project1.Mini_Digital_Banking_system.Service;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.AccountResponse;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.AccountInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;

    public AccountResponse getAccountByUserId(Long userId) {
        AccountInfo account = accountRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Account not found for useId: " + userId));

        AccountResponse response = new AccountResponse();
        response.setAccountID(account.getAccountId());
        response.setUserId(account.getUserId());
        response.setAccountName(account.getAccountName());
        response.setAccountNumber(account.getAccountNumber());
        response.setAccountType(account.getAccountType());
        response.setBalance(account.getBalance());
        response.setAccountCreatedAt(account.getAccountCreatedAt());

        return response;

    }

    public @Nullable List<AccountResponse> getAllAccount() {
        List<AccountInfo> accounts = accountRepository.findAll();

        return accounts.stream()
                .map(account -> {
                    AccountResponse response = new AccountResponse();
                    response.setAccountID(account.getAccountId());
                    response.setUserId(account.getUserId());
                    response.setAccountName(account.getAccountName());
                    response.setAccountNumber(account.getAccountNumber());
                    response.setAccountType(account.getAccountType());
                    response.setBalance(account.getBalance());
//                    response.setTier(account.getTier());
                    response.setAccountCreatedAt(account.getAccountCreatedAt());

                    return response;
                })
                .toList();
    }
}
