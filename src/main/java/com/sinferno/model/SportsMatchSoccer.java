package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sports_match_soccer")
public class SportsMatchSoccer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sports_match_soccer_id")
    private Long sportsMatchSoccerId;

    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "first_selected_event_id")
    private Long firstSelectedEventId;

    @Column(name = "first_selected_type")
    private String firstSelectedType;

    @Column(name = "second_team_id")
    private Long secondTeamId;

    @Column(name = "second_selected_event_id")
    private Long secondSelectedEventId;

    @Column(name = "second_selected_type")
    private String secondSelectedType;

    @Column(name = "part_of_group_stats")
    private Boolean partOfGroupStats;

    @Column(name = "home_team")
    private String homeTeam;

    @Column(name = "result")
    private String result;

    @Column(name = "result_stage")
    private String resultStage;

    @Column(name = "regular_time_first")
    private Integer regularTimeFirst;

    @Column(name = "regular_time_second")
    private Integer regularTimeSecond;

    @Column(name = "overtime_first")
    private Integer overtimeFirst;

    @Column(name = "overtime_second")
    private Integer overtimeSecond;

    @Column(name = "penalty_first")
    private Integer penaltyFirst;

    @Column(name = "penalty_second")
    private Integer penaltySecond;

    @Column(name = "sudden_death_first")
    private Integer suddenDeathFirst;

    @Column(name = "sudden_death_second")
    private Integer suddenDeathSecond;

}