package com.service.daemon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


import com.service.daemon.service.ApplicationService;


@RestController
public class UpdateController {
	
	@Autowired
	ApplicationService appService;
	
	@PostMapping("/update")
	public ResponseEntity<?> run() {

		return new ResponseEntity<>(appService.DataProcess(), HttpStatus.OK);
	}
	
	@GetMapping("/update")
	public ResponseEntity<?> check() {
		
		return new ResponseEntity<String>(appService.checkstatusString(), HttpStatus.OK);
	}
	
	@PostMapping("/start")
	public ResponseEntity<?> startTimer() {
		return new ResponseEntity<String>(appService.Start(), HttpStatus.OK);
	}
	@GetMapping("/webhook")
	public void sync() {
		System.out.println("System check");
	}
}
