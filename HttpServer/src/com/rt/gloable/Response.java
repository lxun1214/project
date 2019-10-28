package com.rt.gloable;

import javax.servlet.http.HttpServletResponse;

public class Response {
	
	HttpServletResponse response;
	
	String UUID = null;
	
	private Response(HttpServletResponse response) {
		this.response = response;
	}
	
	public static Response newResponse(HttpServletResponse response){
		return new Response(response);
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}

	public String getUUID() {
		return UUID;
	}

	public void setUUID(String uUID) {
		UUID = uUID;
	}
	
	
}
