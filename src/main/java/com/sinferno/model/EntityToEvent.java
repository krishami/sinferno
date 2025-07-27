package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "entity_to_event")
public class EntityToEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "entity_id")
    private Long entityId;

    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "relationship_type")
    private String relationshipType;

    @Column(name = "attributes_json")
    private String attributesJson;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

}