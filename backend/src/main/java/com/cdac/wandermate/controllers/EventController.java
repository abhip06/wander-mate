package com.cdac.wandermate.controllers;

import com.cdac.wandermate.dto.AddEventDto;
import com.cdac.wandermate.dto.EditEventDto;
import com.cdac.wandermate.dto.EventResponseDto;
import com.cdac.wandermate.services.EventService;
import com.cdac.wandermate.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PatchMapping("/edit")
    public ResponseEntity<ApiResponse<EventResponseDto>> editEvent(@RequestParam  UUID eventId, @RequestBody EditEventDto eventData){
        EventResponseDto event = eventService.edit(eventId, eventData);

        ApiResponse<EventResponseDto> response = new ApiResponse<>(
                200,
                event,
                "Event updated successfully.",
                true
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse<EventResponseDto>> deleteEvent(@RequestParam UUID eventId){
        eventService.delete(eventId);

        ApiResponse<EventResponseDto> response = new ApiResponse<>(
                200,
                null,
                "Event deleted successfully.",
                true
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
