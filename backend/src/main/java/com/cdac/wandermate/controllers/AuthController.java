package com.cdac.wandermate.controllers;

import com.cdac.wandermate.dto.CreateUserDto;
import com.cdac.wandermate.dto.LoginRequestDto;
import com.cdac.wandermate.dto.LoginResponseDto;
import com.cdac.wandermate.dto.UserDto;
import com.cdac.wandermate.services.AuthService;
import com.cdac.wandermate.utils.ApiResponse;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
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
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserDto>> loginUser(@RequestBody LoginRequestDto credentials, HttpServletResponse httpResponse){
        LoginResponseDto authentication = authService.login(credentials);

        ResponseCookie jwtCookie = ResponseCookie.from("ACCESS_TOKEN", authentication.getAccessToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(24 * 60 * 60)
                .sameSite("Lax")
                .build();

        httpResponse.addHeader("Set-Cookie", jwtCookie.toString());

        ApiResponse<UserDto> response = new ApiResponse<>(
                200,
                authentication.getUser(),
                "User LoggedIn successfully.",
                true
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logoutUser(HttpServletResponse httpResponse) {
        // Create expired cookie to remove token from browser
        ResponseCookie deleteCookie = ResponseCookie.from("ACCESS_TOKEN", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        httpResponse.addHeader("Set-Cookie", deleteCookie.toString());

        ApiResponse<Void> response = new ApiResponse<>(
                200,
                null,
                "User logged out successfully.",
                true
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
 
}
