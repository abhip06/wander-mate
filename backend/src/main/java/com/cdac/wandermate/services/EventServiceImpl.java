package com.cdac.wandermate.services;

import com.cdac.wandermate.dto.AddEventDto;
import com.cdac.wandermate.dto.EditEventDto;
import com.cdac.wandermate.dto.EventResponseDto;
import com.cdac.wandermate.entities.Event;
import com.cdac.wandermate.entities.User;
import com.cdac.wandermate.exceptions.ResourceNotFoundException;
import com.cdac.wandermate.repositories.EventRepository;
import com.cdac.wandermate.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class EventServiceImpl implements EventService{
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public EventServiceImpl(UserRepository userRepository, EventRepository eventRepository){
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    // Create Event Service
    @Override
    @Transactional
    public EventResponseDto create(AddEventDto eventData) {
        User createdBy = userRepository.findById(eventData.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + eventData.getCreatedBy()));

        Event event = new Event();
        event.setEventName(eventData.getEventName());
        event.setDescription(eventData.getDescription());
        event.setStartDate(eventData.getStartDate());
        event.setEndDate(eventData.getEndDate());
        event.setTag(eventData.getTag());
        event.setDestination(eventData.getDestination());
        event.setStatus(eventData.getStatus());
        event.setCreatedBy(createdBy);

        Event createdEvent = eventRepository.save(event);

        EventResponseDto newEvent = new EventResponseDto();

        BeanUtils.copyProperties(createdEvent, newEvent);

        return newEvent;
    }

    // Edit Event Service
    @Override
    @Transactional
    public EventResponseDto edit(UUID eventId, EditEventDto eventData) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("No event found with Id: " + eventId));

        if (eventData.getEventName() != null) {
            event.setEventName(eventData.getEventName());
        }
        if (eventData.getDescription() != null) {
            event.setDescription(eventData.getDescription());
        }
        if (eventData.getStartDate() != null) {
            event.setStartDate(eventData.getStartDate());
        }
        if (eventData.getEndDate() != null) {
            event.setEndDate(eventData.getEndDate());
        }
        if (eventData.getDestination() != null) {
            event.setDestination(eventData.getDestination());
        }
        if (eventData.getTag() != null) {
            event.setTag(eventData.getTag());
        }
        if (eventData.getStatus() != null) {
            event.setStatus(eventData.getStatus());
        }

        Event updatedEvent = eventRepository.save(event);

        EventResponseDto eventDto = new EventResponseDto();
        BeanUtils.copyProperties(updatedEvent, eventDto);

        return eventDto;
    }

    // Delete Event Service
    @Override
    public Boolean delete(UUID eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("No event found with Id: " + eventId));

        eventRepository.delete(event);

        return true;
    }

    // Get All Events
    @Override
    public List<EventResponseDto> allEvents() {
        List<Event> events = eventRepository.findAll();

        List<EventResponseDto> eventsDto = new ArrayList<>();
        for(Event event: events){
            EventResponseDto dto = new EventResponseDto();
            BeanUtils.copyProperties(event, dto);

            eventsDto.add(dto);
        }
        return eventsDto;
    }
}
