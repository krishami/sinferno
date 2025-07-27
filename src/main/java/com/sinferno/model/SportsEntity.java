package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sports_entity")
public class SportsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sports_entity_id")
    private Long sportsEntityId;

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "entity_name")
    private String entityName;

    @Column(name = "abbreviation")
    private String abbreviation;

}