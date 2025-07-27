package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sports_match_cricket")
public class SportsMatchCricket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sports_match_cricket_id")
    private Long sportsMatchCricketId;

    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "first_team_id")
    private Long firstTeamId;

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

    @Column(name = "toss_status")
    private String tossStatus;

    @Column(name = "result")
    private String result;

    @Column(name = "result_stage")
    private String resultStage;

    @Column(name = "result_description")
    private String resultDescription;

    @Column(name = "inn1_wickets_A")
    private Integer inn1WicketsA;

    @Column(name = "inn1_overs_A")
    private BigDecimal inn1OversA;

    @Column(name = "inn1_eff_overs_A")
    private BigDecimal inn1EffOversA;

    @Column(name = "inn1_wickets_B")
    private Integer inn1WicketsB;

    @Column(name = "inn1_overs_B")
    private BigDecimal inn1OversB;

    @Column(name = "inn1_eff_overs_B")
    private BigDecimal inn1EffOversB;

    @Column(name = "inn2_wickets_A")
    private Integer inn2WicketsA;

    @Column(name = "inn2_overs_A")
    private BigDecimal inn2OversA;

    @Column(name = "inn2_eff_overs_A")
    private BigDecimal inn2EffOversA;

    @Column(name = "inn2_score_B")
    private Integer inn2ScoreB;

    @Column(name = "inn2_wickets_B")
    private Integer inn2WicketsB;

    @Column(name = "inn2_overs_B")
    private BigDecimal inn2OversB;

    @Column(name = "inn2_eff_overs_B")
    private BigDecimal inn2EffOversB;

    @Column(name = "revised_target_overs")
    private BigDecimal revisedTargetOvers;

    @Column(name = "win_innings_margin")
    private Integer winInningsMargin;

    @Column(name = "win_runs_margin")
    private Integer winRunsMargin;

    @Column(name = "win_wkts_margin")
    private Integer winWktsMargin;

}