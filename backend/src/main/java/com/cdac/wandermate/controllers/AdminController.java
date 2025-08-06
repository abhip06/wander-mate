package com.cdac.wandermate.controllers;

import com.cdac.wandermate.dto.UserDto;
import com.cdac.wandermate.services.UserService;
import com.cdac.wandermate.utils.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/users/all")
    public ResponseEntity<ApiResponse<List<UserDto>>> getAllUsers(){
        List<UserDto> users = userService.allUsers();

        ApiResponse<List<UserDto>> response = new ApiResponse<>(
                200,
                users,
                "All users fetched successfully.",
                true
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<ApiResponse<UserDto>> deleteUser(@PathVariable("id") UUID userId){
        boolean isSuccess = userService.delete(userId);

        ApiResponse<UserDto> response = new ApiResponse<>(
                200,
                null,
                "User deleted successfully.",
                isSuccess
        );

        return  new ResponseEntity<>(response, HttpStatus.OK);
    }
}
