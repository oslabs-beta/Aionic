package com.service.daemon.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;


@Data
@Document(collection = "Nodes")
public class NodeDTO {

	@Id
	private String id;
	
	private String manifest;
	
	private String revision;
	
	private String sourceType;
	
	private String prev;
	
	private String next;
	
	
	public String getManifest() {
		return manifest;
	}


	public void setManifest(String manifest) {
		this.manifest = manifest;
	}


	public String getRevision() {
		return revision;
	}


	public void setRevision(String revision) {
		this.revision = revision;
	}


	public String getSourceType() {
		return sourceType;
	}


	public void setSourceType(String sourceType) {
		this.sourceType = sourceType;
	}

	public String getPrev() {
		return prev;
	}


	public void setPrev(String prev) {
		this.prev = prev;
	}
	
	public String getNext() {
		return next;
	}


	public void setNext(String next) {
		this.next = next;
	}


	public NodeDTO() {
		// TODO Auto-generated constructor stub
	}

}
