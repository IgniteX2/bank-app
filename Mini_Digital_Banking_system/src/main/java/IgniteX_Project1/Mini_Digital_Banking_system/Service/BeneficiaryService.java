package IgniteX_Project1.Mini_Digital_Banking_system.Service;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.BeneficiaryRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.BeneficiaryResponse;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.Beneficiary;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;

import IgniteX_Project1.Mini_Digital_Banking_system.repository.BeneficiaryRepository;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BeneficiaryService {

    private final BeneficiaryRepository beneficiaryRepository;

    private final UserRepository userRepository;

    // ADD BENEFICIARY
    public BeneficiaryResponse addBeneficiary(
            BeneficiaryRequest request) {

        UserInfo user = getAuthenticatedUser();

        Beneficiary beneficiary = new Beneficiary();

        beneficiary.setBeneficiaryName(
                request.getBeneficiaryName());

        beneficiary.setAccountNumber(
                request.getAccountNumber());

        beneficiary.setFavorite(false);

        beneficiary.setUser(user);

        Beneficiary savedBeneficiary =
                beneficiaryRepository.save(beneficiary);

        return mapToResponse(savedBeneficiary);
    }

    // GET ALL BENEFICIARIES
    public List<BeneficiaryResponse> getBeneficiaries() {

        UserInfo user = getAuthenticatedUser();

        return beneficiaryRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // GET FAVORITES
    public List<BeneficiaryResponse> getFavoriteBeneficiaries() {

        UserInfo user = getAuthenticatedUser();

        return beneficiaryRepository
                .findByUserAndFavoriteTrue(user)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ADD TO FAVORITES
    public void addToFavorites(Long id) {

        UserInfo user = getAuthenticatedUser();

        Beneficiary beneficiary =
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

    // REMOVE FROM FAVORITES
    public void removeFromFavorites(Long id) {

        UserInfo user = getAuthenticatedUser();

        Beneficiary beneficiary =
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

    // DELETE BENEFICIARY
    public void deleteBeneficiary(Long id) {

        UserInfo user = getAuthenticatedUser();

        Beneficiary beneficiary =
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

    // GET LOGGED-IN USER
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

    // ENTITY -> DTO
    private BeneficiaryResponse mapToResponse(
            Beneficiary beneficiary) {

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
}