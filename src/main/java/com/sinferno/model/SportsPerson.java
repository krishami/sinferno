package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sports_person")
public class SportsPerson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sports_person_id")
    private Long sportsPersonId;

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "login_id")
    private Long loginId;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "gender")
    private String gender;

}