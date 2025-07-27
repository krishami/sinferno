package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sports_match_cricket_rules")
public class SportsMatchCricketRules {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cricket_rules_id")
    private Long cricketRulesId;

    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "innings")
    private Integer innings;

    @Column(name = "overs_per_innings")
    private Integer oversPerInnings;

    @Column(name = "balls_per_over")
    private Integer ballsPerOver;

    @Column(name = "last_result_stage")
    private String lastResultStage;

}