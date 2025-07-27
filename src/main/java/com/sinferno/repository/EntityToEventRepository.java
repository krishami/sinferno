package com.sinferno.repository;

import com.sinferno.model.EntityToEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntityToEventRepository extends JpaRepository<EntityToEvent, Long> {
}
