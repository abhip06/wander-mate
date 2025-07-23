package com.cdac.wandermate.controllers;

import com.cdac.wandermate.dto.CreateUserDto;
import com.cdac.wandermate.dto.UserDto;
import com.cdac.wandermate.services.AuthService;
import com.cdac.wandermate.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserDto>> registerUser(@RequestBody CreateUserDto userData){
        UserDto user = authService.register(userData);

        ApiResponse<UserDto> response = new ApiResponse<>(
                201,
                user,
                "User registered successfully.",
                true
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
