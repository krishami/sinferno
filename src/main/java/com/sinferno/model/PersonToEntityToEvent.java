package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "person_to_entity_to_event")
public class PersonToEntityToEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "entity_person_id")
    private Long entityPersonId;

    @Column(name = "entity_event_id")
    private Long entityEventId;

    @Column(name = "relationship_type")
    private String relationshipType;

    @Column(name = "attributes_json")
    private String attributesJson;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

}