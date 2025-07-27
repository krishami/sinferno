package com.sinferno.repository;

import com.sinferno.model.PersonToEntityToEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonToEntityToEventRepository extends JpaRepository<PersonToEntityToEvent, Long> {
}
