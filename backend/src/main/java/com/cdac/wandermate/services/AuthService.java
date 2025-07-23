package com.cdac.wandermate.services;

import com.cdac.wandermate.dto.CreateUserDto;
import com.cdac.wandermate.dto.UserDto;

public interface AuthService {
    UserDto register(CreateUserDto userData);
}
