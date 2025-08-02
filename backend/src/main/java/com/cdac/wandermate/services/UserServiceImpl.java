package com.cdac.wandermate.services;

import com.cdac.wandermate.dto.EditUserDto;
import com.cdac.wandermate.dto.UserDto;
import com.cdac.wandermate.entities.User;
import com.cdac.wandermate.exceptions.ResourceNotFoundException;
import com.cdac.wandermate.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepository userRepository;

    @Override
    public List<UserDto> allUsers() {
        List<User> usersList = userRepository.findAll();

        if(usersList.isEmpty()){
            throw new ResourceNotFoundException("No user found.");
        }

        List<UserDto> users = new ArrayList<>();

        usersList.forEach((user) -> {
            UserDto dto = new UserDto();
            BeanUtils.copyProperties(user, dto);

            dto.setPassword(null);
            users.add(dto);
        });

        return users;
    }

    @Override
    public UserDto getUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        UserDto userDto = new UserDto();

        BeanUtils.copyProperties(user, userDto);

        return userDto;
    }

    @Override
    public UserDto editUser(UUID userId, EditUserDto userData) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        if (userData.getName() != null) user.setName(userData.getName());
        if (userData.getEmail() != null) user.setEmail(userData.getEmail());
        if (userData.getPhoneNumber() != null) user.setPhoneNumber(userData.getPhoneNumber());
        if (userData.getAvatarUrl() != null) user.setAvatarUrl(userData.getAvatarUrl());
        if (userData.getGender() != null) user.setGender(userData.getGender());
        if (userData.getDateOfBirth() != null) user.setDateOfBirth(userData.getDateOfBirth());

        User updatedUser = userRepository.save(user);

        UserDto userDto = new UserDto();

        BeanUtils.copyProperties(updatedUser, userDto);

        return userDto;
    }

    @Override
    public boolean delete(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        userRepository.delete(user);

        return true;
    }
}
