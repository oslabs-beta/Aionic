package com.service.daemon.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.service.daemon.model.AppDTO;
import com.service.daemon.model.Source;
import com.service.daemon.repository.AppRepository;

@Service
public class ApplicationService {
	
	private String url = System.getenv("url");
	private String api_key = System.getenv("api_key");
	private String statusString = "not started";
	private ArrayList<String> currentOperation = new ArrayList<String>();
	@Autowired
	private AppRepository appRepo;
	
	public String start() {
		url = "https://localhost:1995";
		api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcmdvY2QiLCJzdWIiOiJ0aW06YXBpS2V5IiwibmJmIjoxNjkyNDk0NTM2LCJpYXQiOjE2OTI0OTQ1MzYsImp0aSI6ImVhYjkxZmZlLTg3YzctNGMwZC1hODhhLWI1ZjMyODAxYmNjYyJ9.vjpucwovUUt21OvJyMiippEUkAeV0vSvF14EB3wren8";
		CompletableFuture<String> future = fetchApplicationData(url, api_key);
		List<AppDTO> appList = transformApplication(future);
		UpdateAppList(appList);
		
		List<AppDTO> apps = appRepo.findAll();
		
		statusString = "operation has started";
		return statusString;

	}
	public String checkstatusString() {
		return statusString;
	}
	private static CompletableFuture<String> fetchApplicationData(String url, String api_key) {
		
        HttpClient httpClient = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url + "/api/v1/applications"))
                .header("Authorization", "Bearer " + api_key)
                .GET()
                .build();

        return httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(response -> {
                    if (response.statusCode() == 200) {
                        return response.body();
                    }else {
                        throw new RuntimeException("GET request failed, response code: " + response.statusCode());
                    }
                });
    }
	
	
	private List<AppDTO> transformApplication(CompletableFuture<String> future) {
	    List<AppDTO> applications = new ArrayList<>();
	    try {
	        String jsonResponse = future.join();
	        Map<?, ?> responseObject = new ObjectMapper().readValue(jsonResponse, Map.class);
	        List<?> items = (List<?>) responseObject.get("items");
	        
	        for (Object item : items) {
	            Map<?, ?> app = (Map<?, ?>) item;
	            Map<?, ?> metadata = (Map<?, ?>) app.get("metadata");
	            Map<?, ?> spec = (Map<?, ?>) app.get("spec");
	            Map<?, ?> source = (Map<?, ?>) spec.get("source");
	            
	            String name = (String) metadata.get("name");
	            String uid = (String) metadata.get("uid");

	            
	            
	            Source srcSource = new Source((String) source.get("repoURL"), (String) source.get("path"), null);
	            AppDTO application = new AppDTO(uid, name, srcSource, new Date());
	            
	            applications.add(application);
	        }
	        
	        return applications;
	    } catch (Exception e) {
	        throw new RuntimeException("Failed to transform applications", e);
	    }
	}
	
	
	private List<AppDTO> UpdateAppList(List<AppDTO> appList) {
		List<AppDTO> appList2 = new ArrayList<AppDTO>();
		for (AppDTO app : appList) {
			if (appRepo.findByUid(app.getUid()) == null) {
				AppDTO savedApp = appRepo.save(app);
				appList2.add(savedApp);
			}	
		}
		return appList2;
	}
	
	private void Update(List<AppDTO> appList) {
		
	}
}
