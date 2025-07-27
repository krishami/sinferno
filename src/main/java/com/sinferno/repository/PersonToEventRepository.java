package com.sinferno.repository;

import com.sinferno.model.PersonToEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonToEventRepository extends JpaRepository<PersonToEvent, Long> {
}
