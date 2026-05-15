package IgniteX_Project1.Mini_Digital_Banking_system.Controller;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.AccountResponse;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/acc")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/accounts/{userId}")
    public ResponseEntity<AccountResponse> getAccountByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(accountService.getAccountByUserId(userId));
    }
}
