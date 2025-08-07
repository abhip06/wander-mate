package com.cdac.wandermate.dto;

import com.cdac.wandermate.domains.EventStatus;
import com.cdac.wandermate.domains.EventTags;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class EventResponseDto {
    private UUID id;
    private String eventName;
    private String description;
    private UserDto createdBy;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private EventTags tag;
    private String destination;
	private List<UserDto> members;
    private EventStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public EventResponseDto(){

    }

    public EventResponseDto(UUID id, String eventName, String description, UserDto createdBy, LocalDateTime startDate, LocalDateTime endDate, EventTags tag, String destination, EventStatus status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.eventName = eventName;
        this.description = description;
        this.createdBy = createdBy;
        this.startDate = startDate;
        this.endDate = endDate;
        this.tag = tag;
        this.destination = destination;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserDto getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserDto createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public EventTags getTag() {
        return tag;
    }

    public void setTag(EventTags tag) {
        this.tag = tag;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
    
    public List<UserDto> getMembers() {
		return members;
	}

	public void setMembers(List<UserDto> members) {
		this.members = members;
	}


    public EventStatus getStatus() {
        return status;
    }

    public void setStatus(EventStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
