package com.cdac.wandermate.services;

import com.cdac.wandermate.domains.EventStatus;
import com.cdac.wandermate.dto.AddEventDto;
import com.cdac.wandermate.dto.EditEventDto;
import com.cdac.wandermate.dto.EventResponseDto;
import com.cdac.wandermate.dto.UserDto;
import com.cdac.wandermate.entities.Event;
import com.cdac.wandermate.entities.User;
import com.cdac.wandermate.exceptions.ResourceNotFoundException;
import com.cdac.wandermate.repositories.EventRepository;
import com.cdac.wandermate.utils.CurrentUserUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class EventServiceImpl implements EventService {
	private final EventRepository eventRepository;
	private final CurrentUserUtils currentUserUtils;

	public EventServiceImpl(EventRepository eventRepository, CurrentUserUtils currentUserUtils) {
		this.eventRepository = eventRepository;
		this.currentUserUtils = currentUserUtils;
	}

	// Create Event Service
	@Override
	@Transactional
	public EventResponseDto create(AddEventDto eventData) {
		// Get current user from context
		User createdBy = currentUserUtils.getCurrentUser();

		Event event = new Event();
		event.setEventName(eventData.getEventName());
		event.setDescription(eventData.getDescription());
		event.setStartDate(eventData.getStartDate());
		event.setEndDate(eventData.getEndDate());
		event.setTag(eventData.getTag());
		event.setDestination(eventData.getDestination());
		event.setStatus(EventStatus.PLANNING);
		event.setCreatedBy(createdBy);

		Event createdEvent = eventRepository.saveAndFlush(event);

		EventResponseDto newEvent = new EventResponseDto();
		BeanUtils.copyProperties(createdEvent, newEvent);

		UserDto createdByDto = new UserDto();
		BeanUtils.copyProperties(createdBy, createdByDto);
		createdByDto.setPassword(null);

		newEvent.setCreatedBy(createdByDto);

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
		for (Event event : events) {
			EventResponseDto dto = new EventResponseDto();
			BeanUtils.copyProperties(event, dto);

			eventsDto.add(dto);
		}
		return eventsDto;
	}

	// Get Event Info
	@Override
	public EventResponseDto info(UUID eventId) {
		System.out.println(eventId);
		
		Event event = eventRepository.findById(eventId)
				.orElseThrow(() -> new ResourceNotFoundException("No event found with Id: " + eventId));

		System.out.println(event.getId());
		
		EventResponseDto eventDto = new EventResponseDto();

		BeanUtils.copyProperties(event, eventDto);
		UserDto createdByDto = new UserDto();
		BeanUtils.copyProperties(event.getCreatedBy(), createdByDto);
		createdByDto.setPassword(null);

		eventDto.setCreatedBy(createdByDto);
		
		return eventDto;
	}

	@Override
	public List<EventResponseDto> searchEvents(String location, LocalDate date) {
		List<Event> events = eventRepository.findByDestinationContainingIgnoreCaseAndStartDate(location, date);
		List<EventResponseDto> dtoList = new ArrayList<>();

		for (Event event : events) {
			EventResponseDto dto = new EventResponseDto();
			BeanUtils.copyProperties(event, dto);

			// Manually copy nested User object to UserDto
			UserDto userDto = new UserDto();
			BeanUtils.copyProperties(event.getCreatedBy(), userDto);
			dto.setCreatedBy(userDto);

			dtoList.add(dto);
		}

		return dtoList;
	}
}
