package IgniteX_Project1.Mini_Digital_Banking_system.repository;

import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

//import java.lang.ScopedValue;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findByFullName(String username);
    Optional<UserInfo> findByEmail(String email);
    Optional<UserInfo> findByBvn(String bvn);
    Optional<UserInfo> findByNinNUm(String NinNUm);

//    ScopedValue findByPinResetToken(String resettoken);
    Optional<UserInfo> findByPinResetToken(String resettoken);
}
