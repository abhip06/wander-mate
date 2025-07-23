package com.cdac.wandermate.utils;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
	private int statusCode;
	private T data;
	private String message;
	private boolean success;

	public ApiResponse(){
		// Default constructor
	}

	public ApiResponse(int statusCode, T data, String message, boolean success) {
		super();
		this.statusCode = statusCode;
		this.data = data;
		this.message = message;
		this.success = success;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
}
