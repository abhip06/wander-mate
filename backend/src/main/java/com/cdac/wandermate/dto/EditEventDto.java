package com.cdac.wandermate.dto;

import com.cdac.wandermate.domains.EventStatus;
import com.cdac.wandermate.domains.EventTags;

import java.time.LocalDate;

public class EditEventDto {
    private String eventName;
    private String description;
//    private UserDto createdBy;
    private LocalDate startDate;
    private LocalDate endDate;
    private EventTags tag;
    private String destination;
    private EventStatus status;

    public EditEventDto(){}

    public EditEventDto(String eventName, String description, LocalDate startDate, LocalDate endDate, EventTags tag, String destination, EventStatus status) {
        this.eventName = eventName;
        this.description = description;
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
