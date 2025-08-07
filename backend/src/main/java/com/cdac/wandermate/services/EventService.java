package com.cdac.wandermate.services;

import com.cdac.wandermate.dto.AddEventDto;
import com.cdac.wandermate.dto.EditEventDto;
import com.cdac.wandermate.dto.EventResponseDto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface EventService {
    EventResponseDto create(AddEventDto eventData);
    EventResponseDto edit(UUID eventId, EditEventDto eventData);
    Boolean delete(UUID eventId);
    List<EventResponseDto> allEvents();
    EventResponseDto info(UUID eventId);
	List<EventResponseDto> searchEvents(String location, LocalDate date);
	EventResponseDto addMemberToEvent(UUID eventId, UUID userId);
	void removeMemberFromEvent(UUID eventId, UUID userId);
}
