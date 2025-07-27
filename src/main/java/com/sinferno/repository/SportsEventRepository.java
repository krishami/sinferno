package com.sinferno.repository;

import com.sinferno.model.SportsEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SportsEventRepository extends JpaRepository<SportsEvent, Long> {
}
