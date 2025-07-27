package com.cdac.wandermate.services;

import com.cdac.wandermate.dto.AddEventDto;
import com.cdac.wandermate.dto.EditEventDto;
import com.cdac.wandermate.dto.EventResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface EventService {
    EventResponseDto create(AddEventDto eventData);
    EventResponseDto edit(UUID eventId, EditEventDto eventData);
    Boolean delete(UUID eventId);
    List<EventResponseDto> allEvents();
}
