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
import com.cdac.wandermate.repositories.UserRepository;
import com.cdac.wandermate.utils.CurrentUserUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class EventServiceImpl implements EventService {
	private final EventRepository eventRepository;
	private final CurrentUserUtils currentUserUtils;
	private final UserRepository userRepository;

	public EventServiceImpl(EventRepository eventRepository, CurrentUserUtils currentUserUtils, UserRepository userRepository) {
		this.eventRepository = eventRepository;
		this.currentUserUtils = currentUserUtils;
		this.userRepository = userRepository;
	}

	// Create Event Service
	@Override
	@Transactional
	public EventResponseDto create(AddEventDto eventData) {
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

		// Add creator as first member
		event.setMembers(new ArrayList<>());
		event.getMembers().add(createdBy);

		Event createdEvent = eventRepository.saveAndFlush(event);

		EventResponseDto newEvent = new EventResponseDto();
		BeanUtils.copyProperties(createdEvent, newEvent);

		UserDto createdByDto = new UserDto();
		BeanUtils.copyProperties(createdBy, createdByDto);
		createdByDto.setPassword(null);

		newEvent.setCreatedBy(createdByDto);

		// Convert members to UserDto list
		List<UserDto> memberDtos = new ArrayList<>();
		for (User member : createdEvent.getMembers()) {
			UserDto dto = new UserDto();
			BeanUtils.copyProperties(member, dto);
			dto.setPassword(null);
			dto.setEvents(null);
			memberDtos.add(dto);
		}

		newEvent.setMembers(memberDtos);

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

		// Add members
		List<UserDto> memberDtos = updatedEvent.getMembers().stream().map(member -> {
			UserDto memberDto = new UserDto();
			BeanUtils.copyProperties(member, memberDto);
			memberDto.setPassword(null);
			memberDto.setEvents(null);
			return memberDto;
		}).toList();
		eventDto.setMembers(memberDtos);

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
			
			UserDto userDto = new UserDto();
			BeanUtils.copyProperties(event.getCreatedBy(), userDto);
			userDto.setPassword(null);
			dto.setCreatedBy(userDto);

			// Add members
			List<UserDto> memberDtos = event.getMembers().stream().map(member -> {
				UserDto memberDto = new UserDto();
				BeanUtils.copyProperties(member, memberDto);
				memberDto.setPassword(null);
				memberDto.setEvents(null);
				return memberDto;
			}).toList();
			dto.setMembers(memberDtos);

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

		// Add members
		List<UserDto> memberDtos = event.getMembers().stream().map(member -> {
			UserDto memberDto = new UserDto();
			BeanUtils.copyProperties(member, memberDto);
			memberDto.setPassword(null);
			memberDto.setEvents(null);
			return memberDto;
		}).toList();
		eventDto.setMembers(memberDtos);

		return eventDto;
	}

	// Search events
	@Override
	public List<EventResponseDto> searchEvents(String location, LocalDate date) {
	    // Convert LocalDate to start and end of the day
	    LocalDateTime startOfDay = date.atStartOfDay();           // e.g. 2025-08-12T00:00
	    LocalDateTime endOfDay = date.plusDays(1).atStartOfDay(); // exclusive upper bound

	    List<Event> events = eventRepository.findByDestinationContainingIgnoreCaseAndStartDateBetween(
	            location, startOfDay, endOfDay
	    );

	    List<EventResponseDto> dtoList = new ArrayList<>();

	    for (Event event : events) {
	        EventResponseDto dto = new EventResponseDto();
	        BeanUtils.copyProperties(event, dto);

	        UserDto userDto = new UserDto();
	        BeanUtils.copyProperties(event.getCreatedBy(), userDto);
	        userDto.setPassword(null);
	        dto.setCreatedBy(userDto);

	        List<UserDto> memberDtos = event.getMembers().stream().map(member -> {
	            UserDto memberDto = new UserDto();
	            BeanUtils.copyProperties(member, memberDto);
	            memberDto.setPassword(null);
	            memberDto.setEvents(null);
	            return memberDto;
	        }).toList();
	        dto.setMembers(memberDtos);

	        dtoList.add(dto);
	    }

	    return dtoList;
	}
	
	@Override
	@Transactional
	public EventResponseDto addMemberToEvent(UUID eventId, UUID userId) {
	    Event event = eventRepository.findById(eventId)
	            .orElseThrow(() -> new ResourceNotFoundException("Event not found with provided id."));

	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new ResourceNotFoundException("User not found with provided id."));

	    event.getMembers().add(user);
	    Event savedEvent = eventRepository.save(event);

	    // Convert Event to EventResponseDto
	    EventResponseDto dto = new EventResponseDto();
	    BeanUtils.copyProperties(savedEvent, dto);

	    // Set createdBy manually
	    UserDto createdByDto = new UserDto();
	    BeanUtils.copyProperties(savedEvent.getCreatedBy(), createdByDto);
	    createdByDto.setPassword(null); // Avoid exposing passwords
	    dto.setCreatedBy(createdByDto);

	    // Set members manually
	    List<UserDto> memberDtos = savedEvent.getMembers().stream().map(member -> {
	        UserDto memberDto = new UserDto();
	        BeanUtils.copyProperties(member, memberDto);
	        memberDto.setPassword(null); // Avoid exposing passwords
	        memberDto.setEvents(null);   // Avoid circular reference
	        return memberDto;
	    }).toList();

	    dto.setMembers(memberDtos);

	    return dto;
	}
	
	@Override
	@Transactional
	public void removeMemberFromEvent(UUID eventId, UUID userId) {
	    Event event = eventRepository.findById(eventId)
	            .orElseThrow(() -> new ResourceNotFoundException("Event not found with ID: " + eventId));
	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

	    if (!event.getMembers().contains(user)) {
	        throw new ResourceNotFoundException("User is not a member of the event.");
	    }

	    event.getMembers().remove(user);
	    eventRepository.save(event);
	}

	@Override
	public List<EventResponseDto> getEventsJoinedByUser(UUID userId) {
	    // Step 1: Fetch all events where the user is a member
	    List<Event> events = eventRepository.findByMembers_Id(userId); // You must define this in your repository

	    List<EventResponseDto> dtoList = new ArrayList<>();

	    // Step 2: Convert each Event to EventResponseDto
	    for (Event event : events) {
	        EventResponseDto dto = new EventResponseDto();
	        BeanUtils.copyProperties(event, dto);

	        // Set CreatedBy user (excluding password)
	        UserDto createdByDto = new UserDto();
	        BeanUtils.copyProperties(event.getCreatedBy(), createdByDto);
	        createdByDto.setPassword(null);
	        dto.setCreatedBy(createdByDto);

	        dto.setMembers(null);

	        dtoList.add(dto);
	    }

	    return dtoList;
	}

}
