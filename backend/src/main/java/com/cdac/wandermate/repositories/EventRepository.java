package com.cdac.wandermate.repositories;

import com.cdac.wandermate.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {
	List<Event> findByDestinationContainingIgnoreCaseAndStartDate(String destination, LocalDate startDate);
}
