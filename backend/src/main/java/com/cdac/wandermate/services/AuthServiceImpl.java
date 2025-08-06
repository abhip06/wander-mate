package com.cdac.wandermate.services;

import com.cdac.wandermate.dto.CreateUserDto;
import com.cdac.wandermate.dto.LoginRequestDto;
import com.cdac.wandermate.dto.LoginResponseDto;
import com.cdac.wandermate.dto.UserDto;
import com.cdac.wandermate.entities.User;
import com.cdac.wandermate.exceptions.InvalidCredentialsException;
import com.cdac.wandermate.repositories.UserRepository;
import com.cdac.wandermate.utils.GeneratorUtil;
import com.cdac.wandermate.utils.JwtUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtils jwtUtils;

	public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtils = jwtUtils;
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

		User createdUser = userRepository.saveAndFlush(user);

		UserDto newUser = new UserDto();
		BeanUtils.copyProperties(createdUser, newUser);

		// Remove unwanted fields
		newUser.setPassword(null);

		return newUser;
	}
	
	@Override
	public LoginResponseDto login(LoginRequestDto credentials) {
		User user = userRepository.findByEmail(credentials.getEmail())
				.orElseThrow(() -> new InvalidCredentialsException("Incorrect email or password."));

		boolean isPassCorrect = passwordEncoder.matches(credentials.getPassword(), user.getPassword());
		if (!isPassCorrect) {
			throw new InvalidCredentialsException("Incorrect email or password.");
		}

		// Generate JWT
		String token = jwtUtils.generateJwtToken(user.getId().toString(), user.getEmail(), user.getRole().name());

		// Prepare response
		UserDto userDto = new UserDto();
		BeanUtils.copyProperties(user, userDto);

		return new LoginResponseDto(userDto, token);
	}
}
