package IgniteX_Project1.Mini_Digital_Banking_system.Service.impl;

import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.PinService;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.TransferService;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.UserRepository;
import IgniteX_Project1.Mini_Digital_Banking_system.security.AuthUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.TransferRequest;
import org.springframework.stereotype.Service;

@Service
public class TransferServiceImpl implements TransferService {
    @Autowired
    private PinService pinService;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    @Override
    public String transfer(TransferRequest request) {

        UserInfo sender = getCurrentUser();

        pinService.validatePin(
                request.getPin(),
                sender);

        // transfer logic here

        return "Transfer successful";
    }

    private UserInfo getCurrentUser() {
        String email = AuthUtil.getLoggedInEmail();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
}
