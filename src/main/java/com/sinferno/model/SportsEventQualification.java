package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sports_event_qualification")
public class SportsEventQualification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sports_event_qualification_id")
    private Long sportsEventQualificationId;

    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "points_for_win")
    private Integer pointsForWin;

    @Column(name = "points_for_draw")
    private Integer pointsForDraw;

    @Column(name = "points_for_loss")
    private Integer pointsForLoss;

    @Column(name = "points_for_abandoned")
    private Integer pointsForAbandoned;

    @Column(name = "direct_qualifiers")
    private Integer directQualifiers;

}