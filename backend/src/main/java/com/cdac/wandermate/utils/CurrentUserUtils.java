package com.cdac.wandermate.utils;

import com.cdac.wandermate.entities.User;
import com.cdac.wandermate.exceptions.ResourceNotFoundException;
import com.cdac.wandermate.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserUtils {

    private final UserRepository userRepository;

    public CurrentUserUtils(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName(); // we stored email as principal in JwtAuthenticationFilter
        }
        return null;
    }

    public User getCurrentUser() {
        String email = getCurrentUserEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
