package IgniteX_Project1.Mini_Digital_Banking_system.Model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GeneratedColumn;

import java.time.LocalDateTime;

@Entity
@Table(name = "USERS")
@Data
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;


    @Column(name = "first_name", length = 50, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 50, nullable = false)
    private String lastName;


    @Column(name = "full_name", insertable = false, updatable = false, length = 101)
    @GeneratedColumn("first_name || '  ' || last_name")
    private String fullName;

    @Column(unique = true, name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "phone_number", length = 50, nullable = false)
    private String PhoneNumber;

    @Column(name = "bvn", unique = true, nullable = false, length = 50)
    private Long bvn;

    @Column(name = "user_password", nullable = false)
    private String userPassword;

    @Column(name = "user_created_at", nullable = false)
    private LocalDateTime userCreatedAt;
    @PrePersist
    public void onCreate() {
        userCreatedAt = LocalDateTime.now();
        userModifiedAt = LocalDateTime.now();
    }

    @Column(name = "user_modified_at", nullable = false)
    private LocalDateTime userModifiedAt;
    @PreUpdate
    public void onUpdate() {
        userModifiedAt = LocalDateTime.now();

    }

    @Column(name = "NIN_number", unique = true, nullable = false)
    private String NInNum;



}

