package com.sinferno.repository;

import com.sinferno.model.SportsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SportsEntityRepository extends JpaRepository<SportsEntity, Long> {
}
