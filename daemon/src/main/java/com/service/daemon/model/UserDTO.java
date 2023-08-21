package com.service.daemon.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "Users")
public class UserDTO {
	
	@Id
	private String id;
	
	private String githubId;
	
	private String githubToken;
	
	private ApiKeyDTO argo_token;

	
	public String getGithubId() {
		return githubId;
	}
	public void setGithubId(String githubId) {
		this.githubId = githubId;
	}
	public String getGithubToken() {
		return githubToken;
	}
	public void setGithubToken(String githubToken) {
		this.githubToken = githubToken;
	}
	public ApiKeyDTO getArgo_token() {
		return argo_token;
	}
	public void setArgo_token(ApiKeyDTO argo_token) {
		this.argo_token = argo_token;
	}
	
	public UserDTO() {}
}
