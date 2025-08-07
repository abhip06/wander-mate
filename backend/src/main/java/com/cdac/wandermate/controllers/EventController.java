package com.cdac.wandermate.controllers;

import com.cdac.wandermate.dto.AddEventDto;
import com.cdac.wandermate.dto.EditEventDto;
import com.cdac.wandermate.dto.EventResponseDto;
import com.cdac.wandermate.services.EventService;
import com.cdac.wandermate.utils.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {
    @Autowired
    EventService eventService;

    @GetMapping("")
    public ResponseEntity<ApiResponse<List<EventResponseDto>>> getAllEvents(){
        List<EventResponseDto> events = eventService.allEvents();

        String message = !events.isEmpty() ? "All Events fetched successfully." : "No events available at this moment.";

        ApiResponse<List<EventResponseDto>> response = new ApiResponse<>(
                200,
                events,
                message,
                true
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<EventResponseDto>> createEvent(@RequestBody AddEventDto eventData){
        EventResponseDto event = eventService.create(eventData);

        ApiResponse<EventResponseDto> response = new ApiResponse<>(
                201,
                event,
                "Event created successfully",
                true
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<ApiResponse<EventResponseDto>> editEvent(@PathVariable("id")  UUID eventId, @RequestBody EditEventDto eventData){
        EventResponseDto event = eventService.edit(eventId, eventData);

        ApiResponse<EventResponseDto> response = new ApiResponse<>(
                200,
                event,
                "Event updated successfully.",
                true
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<EventResponseDto>> deleteEvent(@PathVariable("id") UUID eventId){
        eventService.delete(eventId);

        ApiResponse<EventResponseDto> response = new ApiResponse<>(
                200,
                null,
                "Event deleted successfully.",
                true
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EventResponseDto>> eventInfo(@PathVariable("id") UUID eventId){
        EventResponseDto event = eventService.info(eventId);

        ApiResponse<EventResponseDto> response = new ApiResponse<>(
                200,
                event,
                "Event info fetched successfully.",
                true
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/search")
    public ResponseEntity<List<EventResponseDto>> searchEvents(
            @RequestParam String location,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        List<EventResponseDto> results = eventService.searchEvents(location, date);
        return ResponseEntity.ok(results);
    }
    
    @PostMapping("/{eventId}/add")
    public ResponseEntity<ApiResponse<EventResponseDto>> addMemberToEvent(
            @PathVariable UUID eventId,
            @RequestParam UUID userId) {

        EventResponseDto event = eventService.addMemberToEvent(eventId, userId);
        
        ApiResponse<EventResponseDto> response = new ApiResponse<>(
                200,
                event,
                "Member added successfully to the event.",
                true
        );
        
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{eventId}/remove")
    public ResponseEntity<ApiResponse<EventResponseDto>> removeMemberFromEvent(
            @PathVariable UUID eventId,
            @RequestParam UUID userId
    ) {
        eventService.removeMemberFromEvent(eventId, userId);
        
        ApiResponse<EventResponseDto> response = new ApiResponse<>(
                200,
                null,
                "Member removed successfully from the event.",
                true
        );
        
        return ResponseEntity.ok(response);
    }


}
