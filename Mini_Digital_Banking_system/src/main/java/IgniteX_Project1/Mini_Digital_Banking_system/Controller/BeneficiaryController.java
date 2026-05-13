package IgniteX_Project1.Mini_Digital_Banking_system.Controller;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.BeneficiaryRequest;
import IgniteX_Project1.Mini_Digital_Banking_system.DTO.BeneficiaryResponse;
import IgniteX_Project1.Mini_Digital_Banking_system.Service.BeneficiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beneficiaries")
public class BeneficiaryController {

    @Autowired
    private BeneficiaryService beneficiaryService;

    // Add Beneficiary
    @PostMapping
    public ResponseEntity<BeneficiaryResponse> addBeneficiary(
            @RequestBody BeneficiaryRequest request) {

        BeneficiaryResponse response =
                beneficiaryService.addBeneficiary(request);

        return ResponseEntity.ok(response);
    }

    // Get All Beneficiaries
    @GetMapping
    public ResponseEntity<List<BeneficiaryResponse>> getBeneficiaries() {

        List<BeneficiaryResponse> beneficiaries =
                beneficiaryService.getBeneficiaries();

        return ResponseEntity.ok(beneficiaries);
    }

    // Get Favorite Beneficiaries
    @GetMapping("/favorites")
    public ResponseEntity<List<BeneficiaryResponse>> getFavoriteBeneficiaries() {

        List<BeneficiaryResponse> favorites =
                beneficiaryService.getFavoriteBeneficiaries();

        return ResponseEntity.ok(favorites);
    }

    // Mark Beneficiary as Favorite
    @PutMapping("/{id}/favorite")
    public ResponseEntity<String> addToFavorites(
            @PathVariable Long id) {

        beneficiaryService.addToFavorites(id);

        return ResponseEntity.ok(
                "Beneficiary added to favorites");
    }

    // Remove Beneficiary from Favorites
    @PutMapping("/{id}/unfavorite")
    public ResponseEntity<String> removeFromFavorites(
            @PathVariable Long id) {

        beneficiaryService.removeFromFavorites(id);

        return ResponseEntity.ok(
                "Beneficiary removed from favorites");
    }

    // Delete Beneficiary
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBeneficiary(
            @PathVariable Long id) {

        beneficiaryService.deleteBeneficiary(id);

        return ResponseEntity.ok(
                "Beneficiary deleted successfully");
    }
}