package IgniteX_Project1.Mini_Digital_Banking_system.repository;

import IgniteX_Project1.Mini_Digital_Banking_system.Model.BeneficiaryInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeneficiaryRepository extends JpaRepository<BeneficiaryInfo, Long> {
    List<BeneficiaryInfo> findByUser(UserInfo user);

    List<BeneficiaryInfo> findByUserAndFavoriteTrue(UserInfo user);
}
