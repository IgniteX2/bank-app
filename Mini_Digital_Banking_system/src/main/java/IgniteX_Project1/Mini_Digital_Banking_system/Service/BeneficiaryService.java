package IgniteX_Project1.Mini_Digital_Banking_system.Service;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.Beneficiary.BeneficiaryRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.Beneficiary.BeneficiaryResponse;

import java.util.List;

public interface BeneficiaryService {
    BeneficiaryResponse addBeneficiary(BeneficiaryRequest request);
    List<BeneficiaryResponse> getBeneficiaries();
    List<BeneficiaryResponse> getFavoriteBeneficiaries();
    void addToFavorites(Long id);
    void removeFromFavorites(Long id);
    void deleteBeneficiary(Long id);


}
