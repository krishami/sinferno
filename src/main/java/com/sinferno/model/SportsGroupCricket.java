package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sports_group_cricket")
public class SportsGroupCricket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sports_group_cricket_id")
    private Long sportsGroupCricketId;

    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "team_id")
    private Long teamId;

    @Column(name = "team_selected_event_id")
    private Long teamSelectedEventId;

    @Column(name = "team_selected_type")
    private String teamSelectedType;

    @Column(name = "won")
    private Integer won;

    @Column(name = "drew")
    private Integer drew;

    @Column(name = "abandoned")
    private Integer abandoned;

    @Column(name = "lost")
    private Integer lost;

    @Column(name = "runs_for")
    private Integer runsFor;

    @Column(name = "overs_for")
    private BigDecimal oversFor;

    @Column(name = "runs_against")
    private Integer runsAgainst;

    @Column(name = "overs_against")
    private BigDecimal oversAgainst;

    @Column(name = "points")
    private Integer points;

    @Column(name = "details_override")
    private Boolean detailsOverride;

    @Column(name = "qualified")
    private String qualified;

    @Column(name = "group_rank")
    private Integer groupRank;

    @Column(name = "qualified_override")
    private Boolean qualifiedOverride;

}