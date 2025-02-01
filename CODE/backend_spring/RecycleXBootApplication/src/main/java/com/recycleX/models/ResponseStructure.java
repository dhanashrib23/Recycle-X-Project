package com.recycleX.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class ResponseStructure {

	private int statusCode;
	private String status;
	private Object data;
	private Object error;
	private String message;

	public ResponseStructure(int statusCode, String status, Object data, Object error, String message) {
		this.statusCode = statusCode;
		this.status = status;
		this.data = data;
		this.error = error;
		this.message = message;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public String getStatus() {
		return status;
	}

	public Object getData() {
		return data;
	}

	public Object getError() {
		return error;
	}

	public String getMessage() {
		return message;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public void setError(Object error) {
		this.error = error;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public static ResponseStructure onSuccess(int statusCode, Object data, String message) {
		return new ResponseStructure(statusCode, "success", data, null, message);
	}

	public static ResponseStructure onLoginSuccess(int statusCode, Object token, String message) {
		return new ResponseStructure(statusCode, "success", token, null, message);
	}

	public static ResponseStructure onError(int statusCode, Object error, String message) {
		return new ResponseStructure(statusCode, "error", null, error, message);
	}
}
