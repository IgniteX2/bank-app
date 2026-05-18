package IgniteX_Project1.Mini_Digital_Banking_system.repository;

import IgniteX_Project1.Mini_Digital_Banking_system.Model.AccountInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

//import java.awt.*;

public interface AccountRepository extends JpaRepository<AccountInfo, Long> {
    Optional<AccountInfo> findByUserId(Long userId);
}
