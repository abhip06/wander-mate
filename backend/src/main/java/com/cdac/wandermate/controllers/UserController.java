package com.cdac.wandermate.controllers;

import com.cdac.wandermate.dto.EditUserDto;
import com.cdac.wandermate.dto.UserDto;
import com.cdac.wandermate.services.UserService;
import com.cdac.wandermate.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("")
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

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> getUserData(@RequestParam UUID userId){
        UserDto user = userService.getUser(userId);

        ApiResponse<UserDto> response = new ApiResponse<>(
                200,
                user,
                "User data fetched successfully.",
                true
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<ApiResponse<UserDto>> editUserData(@RequestParam UUID userId, @RequestBody EditUserDto userData){
        UserDto user = userService.editUser(userId, userData);

        ApiResponse<UserDto> response = new ApiResponse<>(
                200,
                user,
                "User data updated successfully.",
                true
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<UserDto>> deleteUser(@RequestParam UUID userId){
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
