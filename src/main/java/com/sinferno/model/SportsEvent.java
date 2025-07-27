package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sports_event")
public class SportsEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "sports_type")
    private String sportsType;

}