package com.cdac.wandermate.services;

import com.cdac.wandermate.dto.EditUserDto;
import com.cdac.wandermate.dto.UserDto;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserDto> allUsers();
    UserDto editUser(UUID userId, EditUserDto userData);
    UserDto getUser(UUID userId);
    boolean delete(UUID userId);
}
