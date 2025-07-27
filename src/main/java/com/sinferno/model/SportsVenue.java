package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sports_venue")
public class SportsVenue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "venue_id")
    private Long venueId;

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "venue_name")
    private String venueName;

    @Column(name = "description")
    private String description;

    @Column(name = "timezone")
    private String timezone;

    @Column(name = "address1")
    private String address1;

    @Column(name = "address2")
    private String address2;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country_code")
    private String countryCode;

}