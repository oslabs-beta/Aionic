package com.service.daemon.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.daemon.model.AppDTO;
import com.service.daemon.model.Source;
import com.service.daemon.repository.AppRepository;

@RestController
public class AppController {
	
	
	@Autowired
	private AppRepository appRepo;
	
	
	@GetMapping("/apps")
	public ResponseEntity<?> getAllApps(){
		List<AppDTO> apps = appRepo.findAll();
		if (apps.size() > 0) {
			return new ResponseEntity<List<AppDTO>>(apps, HttpStatus.OK);
		}else {
			return new ResponseEntity<>("No Apps available",HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/apps")
	public ResponseEntity<?> createApp() {
		try {
			Source source = new Source("http://what", "path", "targetRevision");
			AppDTO app = new AppDTO("uid", "name", source, new Date(System.currentTimeMillis()));
			appRepo.save(app);
			return new ResponseEntity<AppDTO>(app, HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
