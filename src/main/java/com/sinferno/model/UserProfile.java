package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "user_profile")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "user_login")
    private String userLogin;

    @Column(name = "user_password")
    private String userPassword;

    @Column(name = "is_encrypted")
    private Boolean isEncrypted;

    @Column(name = "email")
    private String email;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "active_flag")
    private Boolean activeFlag;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "token_expiration_time")
    private LocalDateTime tokenExpirationTime;

}