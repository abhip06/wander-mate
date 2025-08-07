package com.cdac.wandermate.entities;

import com.cdac.wandermate.domains.EventStatus;
import com.cdac.wandermate.domains.EventTags;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "eventName")
    @NotNull
    private String eventName;

    @Column(name = "description")
    @NotNull
    private String description;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", referencedColumnName = "id", nullable = false)
    private User createdBy;

    @NotNull
    @Column(name = "startDate")
    private LocalDateTime startDate;

    @NotNull
    @Column(name = "endDate")
    private LocalDateTime endDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tag")
    private EventTags tag;

    @NotNull
    @Column(name = "destination")
    private String destination;
    
    @ManyToMany
    @JoinTable(
        name = "event_members",
        joinColumns = @JoinColumn(name = "event_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> members;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private EventStatus status;

    @CreationTimestamp
    @Column(name = "createdAt", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updatedAt")
    private LocalDateTime updatedAt;

    public Event(){

    }

    public Event(String eventName, String description, User createdBy, LocalDateTime startDate, LocalDateTime endDate, EventTags tag, String destination, EventStatus status) {
        this.eventName = eventName;
        this.description = description;
        this.createdBy = createdBy;
        this.startDate = startDate;
        this.endDate = endDate;
        this.tag = tag;
        this.destination = destination;
        this.status = status;
    }

    public UUID getId() {
        return id;
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

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
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

    public List<User> getMembers() {
		return members;
	}

	public void setMembers(List<User> members) {
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

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
