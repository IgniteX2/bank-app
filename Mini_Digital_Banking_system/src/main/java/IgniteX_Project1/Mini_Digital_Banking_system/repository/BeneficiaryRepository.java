package IgniteX_Project1.Mini_Digital_Banking_system.repository;

import IgniteX_Project1.Mini_Digital_Banking_system.Model.Beneficiary;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeneficiaryRepository
        extends JpaRepository<Beneficiary, Long> {

    List<Beneficiary> findByUser(UserInfo user);

    List<Beneficiary> findByUserAndFavoriteTrue(UserInfo user);
}