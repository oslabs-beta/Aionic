package com.service.daemon.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "ApiKeys")
public class ApiKeyDTO {

	@Id
	private String id;
	
	private String api_key;

	private String url;
	
	public String getApi_key() {
		return api_key;
	}
	public void setApi_key(String api_key) {
		this.api_key = api_key;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	public ApiKeyDTO() {}
	
	public ApiKeyDTO(String api_key2, String url2) {
		api_key = api_key2;
		url = url2;
	}
}