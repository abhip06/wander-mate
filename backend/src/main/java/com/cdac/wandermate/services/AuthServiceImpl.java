package com.cdac.wandermate.services;

import com.cdac.wandermate.dto.CreateUserDto;
import com.cdac.wandermate.dto.LoginRequestDto;
import com.cdac.wandermate.dto.UserDto;
import com.cdac.wandermate.entities.User;
import com.cdac.wandermate.repositories.UserRepository;
import com.cdac.wandermate.utils.GeneratorUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	@Transactional
	public UserDto register(CreateUserDto userData) {

		if (userRepository.existsByPhoneNumber(userData.getPhoneNumber())) {
			throw new RuntimeException("User already exists with this phone number. Please login.");
		}

		if (userRepository.existsByEmail(userData.getEmail())) {
			throw new RuntimeException("User already exists with this email. Please login.");
		}

		// Generating username
		String username = GeneratorUtil.generateUsername(userData.getEmail());
		userData.setUsername(username);

		// Hash Password
		String hashedPassword = passwordEncoder.encode(userData.getPassword());
		userData.setPassword(hashedPassword);

		User user = new User();
		BeanUtils.copyProperties(userData, user);

		User createdUser = userRepository.save(user);

		UserDto newUser = new UserDto();
		BeanUtils.copyProperties(createdUser, newUser);

		// Remove unwanted fields
		newUser.setPassword(null);

		return newUser;
	}
	
	@Override
	public UserDto Login(LoginRequestDto credentials) {
		User user = userRepository.findByEmail(credentials.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found with this email."));
		boolean IsPassCorrect = passwordEncoder.matches(credentials.getPassword(), user.getPassword());
		if (!IsPassCorrect) {
			throw new RuntimeException("Invalid credentials.");
		}
		
		UserDto verifiedUser = new UserDto();
		BeanUtils.copyProperties(user, verifiedUser);


		return verifiedUser;
	}
}
