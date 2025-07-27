package com.sinferno.repository;

import com.sinferno.model.SportsMatchSoccer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SportsMatchSoccerRepository extends JpaRepository<SportsMatchSoccer, Long> {
}
