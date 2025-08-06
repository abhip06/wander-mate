package com.cdac.wandermate.exceptions;

import com.cdac.wandermate.utils.ApiErrorResponse;
import com.cdac.wandermate.utils.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiErrorResponse> handleResourceNotFoundException(ResourceNotFoundException e){
		ApiErrorResponse errorResponse = new ApiErrorResponse(
			HttpStatus.NOT_FOUND.value(),
			e.getMessage(),
			false
		);
		
		return new ResponseEntity<ApiErrorResponse>(errorResponse, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(InvalidCredentialsException.class)
	public ResponseEntity<ApiErrorResponse> handleInvalidCredentialsException(InvalidCredentialsException e){
		ApiErrorResponse errorResponse = new ApiErrorResponse(
				HttpStatus.BAD_REQUEST.value(),
				e.getMessage(),
				false
		);

		return new ResponseEntity<ApiErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiErrorResponse> handleGenericException(Exception e) {
		ApiErrorResponse errorResponse = new ApiErrorResponse(
				HttpStatus.INTERNAL_SERVER_ERROR.value(),
				"An unexpected error occurred: " + e.getMessage(),
				false
		);
		return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
