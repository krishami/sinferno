package com.sinferno.repository;

import com.sinferno.model.SportsPerson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SportsPersonRepository extends JpaRepository<SportsPerson, Long> {
}
