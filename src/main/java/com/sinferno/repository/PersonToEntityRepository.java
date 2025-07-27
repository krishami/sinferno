package com.sinferno.repository;

import com.sinferno.model.PersonToEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonToEntityRepository extends JpaRepository<PersonToEntity, Long> {
}
