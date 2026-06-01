package IgniteX_Project1.Mini_Digital_Banking_system.Service.Impl;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.Beneficiary.BeneficiaryRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.Beneficiary.BeneficiaryResponse;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.BeneficiaryInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.BeneficiaryService;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.BeneficiaryRepository;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BeneficiaryImpl implements BeneficiaryService{

    @Autowired
    private BeneficiaryRepository beneficiaryRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public BeneficiaryResponse addBeneficiary(BeneficiaryRequest request) {
        UserInfo user = getAuthenticatedUser();

        BeneficiaryInfo beneficiary = new BeneficiaryInfo();

        beneficiary.setBeneficiaryName(
                request.getBeneficiaryName());

        beneficiary.setAccountNumber(
                request.getAccountNumber());

        beneficiary.setFavorite(false);

        beneficiary.setUser(user);

        BeneficiaryInfo savedBeneficiary =
                beneficiaryRepository.save(beneficiary);

        return mapToResponse(savedBeneficiary);
//        return null;
    }

    private BeneficiaryResponse mapToResponse(BeneficiaryInfo beneficiary) {
        BeneficiaryResponse response =
                new BeneficiaryResponse();

        response.setBeneficiaryId(beneficiary.getBeneficiaryId());

        response.setBeneficiaryName(
                beneficiary.getBeneficiaryName());

        response.setAccountNumber(
                beneficiary.getAccountNumber());

        response.setFavorite(
                beneficiary.isFavorite());

        return response;
    }

    private UserInfo getAuthenticatedUser() {
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new RuntimeException("User not authenticated");
        }

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));
    }

    @Override
    public List<BeneficiaryResponse> getBeneficiaries() {
        UserInfo user = getAuthenticatedUser();

        return beneficiaryRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
//        return List.of();
    }

    @Override
    public List<BeneficiaryResponse> getFavoriteBeneficiaries() {
        UserInfo user = getAuthenticatedUser();

        return beneficiaryRepository
                .findByUserAndFavoriteTrue(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
//        return List.of();
    }

    @Override
    public void addToFavorites(Long id) {
        UserInfo user = getAuthenticatedUser();

        BeneficiaryInfo beneficiary =
                beneficiaryRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Beneficiary not found"));

        if (!beneficiary.getUser().getUserId()
                .equals(user.getUserId())) {

            throw new RuntimeException(
                    "Unauthorized");
        }

        beneficiary.setFavorite(true);

        beneficiaryRepository.save(beneficiary);
    }

    @Override
    public void removeFromFavorites(Long id) {
        UserInfo user = getAuthenticatedUser();

        BeneficiaryInfo beneficiary =
                beneficiaryRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Beneficiary not found"));

        if (!beneficiary.getUser().getUserId()
                .equals(user.getUserId())) {

            throw new RuntimeException(
                    "Unauthorized");
        }

        beneficiary.setFavorite(false);

        beneficiaryRepository.save(beneficiary);
    }

    @Override
    public void deleteBeneficiary(Long id) {
        UserInfo user = getAuthenticatedUser();

        BeneficiaryInfo beneficiary =
                beneficiaryRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Beneficiary not found"));

        if (!beneficiary.getUser().getUserId()
                .equals(user.getUserId())) {

            throw new RuntimeException(
                    "Unauthorized");
        }

        beneficiaryRepository.delete(beneficiary);
    }
}
