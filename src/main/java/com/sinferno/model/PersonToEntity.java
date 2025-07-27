package com.sinferno.model;

import jakarta.persistence.*;
import java.time.*;
import java.math.BigDecimal;

@Entity
@Table(name = "person_to_entity")
public class PersonToEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "person_id")
    private Long personId;

    @Column(name = "entity_id")
    private Long entityId;

    @Column(name = "relationship_type")
    private String relationshipType;

    @Column(name = "attributes_json")
    private String attributesJson;

    @Column(name = "end_date")
    private LocalDateTime endDate;

}