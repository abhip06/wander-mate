package com.cdac.wandermate.services;

import com.cdac.wandermate.dto.CreateUserDto;
import com.cdac.wandermate.dto.LoginRequestDto;
import com.cdac.wandermate.dto.LoginResponseDto;
import com.cdac.wandermate.dto.UserDto;

public interface AuthService {
    UserDto register(CreateUserDto userData);
    LoginResponseDto login(LoginRequestDto credentials);
}
