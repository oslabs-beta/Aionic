package com.service.daemon.model;

import lombok.Data;

@Data
public class Source {
	private String repoURL;
	private String path;
	private String targetRevision;
	
	public Source(String repoURL, String path,String targetRevision) {
		this.repoURL =repoURL;
		this.path = path;
		this.targetRevision = targetRevision;
	}
	public String getRepoURL() {
		return this.repoURL;
	}
	public String getPath() {
		return this.path;
	}
	public String getTargetRevision() {
		return this.targetRevision;
	}

}