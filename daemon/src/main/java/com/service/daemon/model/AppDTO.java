package com.service.daemon.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="Apps")
public class AppDTO {

		@Id
		private String id;
		
		private String uid;
		
		private String name;
		
		private Source source;
		
		private Date date;
		
		private String head;
		
		private String tail;


		public AppDTO(String uid2, String name2, Source source2, Date date2) {
			// TODO Auto-generated constructor stub
			uid = uid2;
			name = name2;
			source = source2;
			date = date2;
		}
		public AppDTO() {}
		public String getid() {
			return id;
		}
		public String getUid() {
			return uid;
		}
		public void setUid(String uid) {
			this.uid = uid;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public Source getSource() {
			return source;
		}
		public void setSource(Source source) {
			this.source = source;
		}
		public Date getDate() {
			return date;
		}
		public void setDate(Date date) {
			this.date = date;
		}
		public String getHead() {
			return head;
		}
		public void setHead(String head) {
			this.head = head;
		}
		public String getTail() {
			return tail;
		}
		public void setTail(String tail) {
			this.tail = tail;
		}
}
