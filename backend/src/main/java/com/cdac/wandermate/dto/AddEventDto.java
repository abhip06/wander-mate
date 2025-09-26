package com.cdac.wandermate.dto;

import com.cdac.wandermate.domains.EventTags;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AddEventDto {
    @NotNull(message = "Event name is required")
    private String eventName;

    @NotNull(message = "description is required")
    @Size(max = 500, message = "Description size not exceed 500.")
    private String description;

    @NotNull(message = "Start date is required")
    @JsonProperty("startDate")
    private LocalDateTime startDate;

    @NotNull(message = "Start date is required")
    @JsonProperty("endDate")
    private LocalDateTime endDate;

    @NotNull(message = "Trip tag is required")
    private EventTags tag;

    @NotNull(message = "Destination is required")
    private String destination;

    public AddEventDto(){

    }

    public AddEventDto(String eventName, String description, LocalDateTime startDate, LocalDateTime endDate, EventTags tag, String destination) {
        this.eventName = eventName;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.tag = tag;
        this.destination = destination;
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
}
