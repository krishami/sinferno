package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sports_match_soccer_rules")
public class SportsMatchSoccerRules {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "soccer_rules_id")
    private Long soccerRulesId;

    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "regular_periods")
    private Integer regularPeriods;

    @Column(name = "regular_period_mins")
    private Integer regularPeriodMins;

    @Column(name = "overtime_periods")
    private Integer overtimePeriods;

    @Column(name = "regular_penalties")
    private Integer regularPenalties;

    @Column(name = "sudden_death_penalties")
    private Integer suddenDeathPenalties;

    @Column(name = "last_result_stage")
    private String lastResultStage;

}