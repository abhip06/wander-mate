package com.cdac.wandermate.dto;

public class LoginResponseDto {
    private final UserDto user;
    private final String accessToken;

    public LoginResponseDto(UserDto user, String accessToken){
        this.user = user;
        this.accessToken = accessToken;
    }

    public UserDto getUser(){
        return user;
    }

    public String getAccessToken(){
        return accessToken;
    }
}
