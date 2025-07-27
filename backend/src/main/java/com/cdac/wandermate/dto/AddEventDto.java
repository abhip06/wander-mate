package com.cdac.wandermate.dto;

import com.cdac.wandermate.domains.EventStatus;
import com.cdac.wandermate.domains.EventTags;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.UUID;

public class AddEventDto {
    @NotNull(message = "Event name is required")
    private String eventName;

    @NotNull(message = "description is required")
    @Size(max = 255, message = "Description size not exceed 255.")
    private String description;

    @NotNull(message = "User ID is required")
    private UUID createdBy;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    @NotNull(message = "Trip tag is required")
    private EventTags tag;

    @NotNull(message = "Destination is required")
    private String destination;

    @NotNull(message = "Trip status is required")
    private EventStatus status;

    public AddEventDto(){

    }

    public AddEventDto(String eventName, String description, UUID createdBy, LocalDate startDate, LocalDate endDate, EventTags tag, String destination, EventStatus status) {
        this.eventName = eventName;
        this.description = description;
        this.createdBy = createdBy;
        this.startDate = startDate;
        this.endDate = endDate;
        this.tag = tag;
        this.destination = destination;
        this.status = status;
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

    public UUID getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UUID createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
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

    public EventStatus getStatus() {
        return status;
    }

    public void setStatus(EventStatus status) {
        this.status = status;
    }
}
