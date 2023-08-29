package com.service.daemon.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Timer;
import java.util.TimerTask;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.service.daemon.model.AppDTO;
import com.service.daemon.model.NodeDTO;
import com.service.daemon.model.Source;
import com.service.daemon.repository.AppRepository;
import com.service.daemon.repository.NodeRepository;


@Service
public class ApplicationService {

	private static String url;
	private static String api_key;
	private String statusString = "not started";
	private Timer processTimer = null;
	private TimerTask task = null;
	private long interval = 180000;
	private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationService.class);
	
	static {
		try {
			Properties prop = new Properties();
			ClassLoader loader = Thread.currentThread().getContextClassLoader();           
			InputStream stream = loader.getResourceAsStream("env.properties");
			prop.load(stream);
			System.out.println("initializing env variables");
			url = prop.getProperty("url");
			api_key = prop.getProperty("api_key");
		} catch (Exception e) {
			// TODO: handle exception
			if (LOGGER.isDebugEnabled()) {
				LOGGER.debug(e.getClass().getName() + "env init failed check environment variables");
			}
			url = System.getenv("url");
			api_key = System.getenv("api_key");
			if (url == null || api_key == null) throw new RuntimeException("env variable undefined");
		}
	}
	
	@Autowired
	public AppRepository appRepo;
	
	@Autowired
	public NodeRepository nodeRepo;
	
	public ApplicationService() {
	}
	
	public void SetInterval(long newInt) {
		interval = newInt;
	}
	
	public String Start() {

		if (processTimer != null) {
			System.out.println("Task is cancelled:"+ task.cancel());
			System.out.println(processTimer.purge() + " Task(s) removed.");
			
		}
			processTimer = new Timer("Application Update Check");
			task = new TimerTask(){
				@Override
				public void run() {
					System.out.println(DataProcess());
				}
			};
			processTimer.scheduleAtFixedRate(task,0, interval);
		return "timer started";
	}
	
	public String DataProcess() {
		long starttime = System.currentTimeMillis();
		try {
			String future = fetchApplicationData(url, api_key);
			List<AppDTO> appList = transformApplication(future);
			UpdateAppList(appList);
			
			List<AppDTO> apps = appRepo.findAll();
			Update(apps);
			statusString = "operation executed";
		} catch (Exception e) {
			// TODO: handle exception
			System.err.println(e.getClass().getName() + "Data processing error");
		}
		System.out.println(System.currentTimeMillis() - starttime);
		return statusString;

	}
	
	public List<?> Stop()   {
		if (processTimer != null && task != null ){
			List<Object> resStrings = new ArrayList<Object>();
			resStrings.add(task.cancel());
			resStrings.add(processTimer.purge());
			resStrings.forEach(ele -> {
				System.out.println("Task is cancelled:" + ele);

			});
			return resStrings;
		}else {
			throw new IllegalStateException("processTimer/task is null");
		}
	}
	
	private static String fetchApplicationData(String url, String api_key) {
		
        HttpClient httpClient = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url + "/api/v1/applications"))
                .header("Authorization", "Bearer " + api_key)
                .GET()
                .build();
        System.out.println(request);
        try {
			HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
			if (response.statusCode() == 200) {
				return response.body();
			}else {
				
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "failed";
    }
	
	private static String fetchManifestData(String url, String api_key, String name) {
		
        HttpClient httpClient = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url + "/api/v1/applications/" + name + "/manifests"))
                .header("Authorization", "Bearer " + api_key)
                .GET()
                .build();

        try {
			return httpClient.send(request, HttpResponse.BodyHandlers.ofString()).body();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return "failed";
                
	}
	
	public static List<AppDTO> transformApplication(String future) {
	    List<AppDTO> applications = new ArrayList<>();
	    try {
	        String jsonResponse = future;
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
	/**
	 * 
	 * @param future object from the fetchManifest function with lists of manifest
	 * @return transformed manifest ready to be saved into database;
	 */
	public static NodeDTO transformManifest(String future) {
		
		try {
			String jsonResponse = future;
			Map<?,?> responseObject = new ObjectMapper().readValue(jsonResponse, Map.class);
			
			String manifestString = (String) responseObject.get("manifests").toString();
			String revisionString = (String) responseObject.get("revision");
			String sourceTypeString = (String) responseObject.get("sourceType");
			
			return new NodeDTO(manifestString, revisionString, sourceTypeString);
		} catch (Exception e) {

			throw new RuntimeException("failed to transform Manifest ", e);
		}
		
	}
	
	/**
	 * methods compare and updates when there are new list of updates 
	 * 
	 * @param takes list of application from the transform function
	 * using the lists updates the database with new lists for applications
	 * @return nothing 
	 */
	public void UpdateAppList(List<AppDTO> appList) {
		appList.forEach(app -> {
			if (appRepo.findByUid(app.getUid()) == null) {
				System.out.println(appRepo.save(app));
			}	
		});
	}

	/**
	 * 
	 * @param appList is coming from the MongoDB
	 */
	public void Update(List<AppDTO> appList) {
		
		appList.forEach(app -> {
			/*
			 * things that needs to happen
			 * first get application the manifest object created at mongodb 
			 * set it as head and tail if no manifest has been added
			 */
			String future = fetchManifestData(url, api_key, app.getName());
			
			NodeDTO node = transformManifest(future);
			addNode(app, node);
		});
	}
	
	public String checkstatusString() {
		return statusString;
	}
	
	/**
	 * Method adds new node to the application when there are updates 
	 * @param app = should come from mongodb 
	 * 		  node = should also come from transform or from mongodb NOT from argocd
	 * 
	 * @Return object with AppDTO with updated 
	 */
	public AppDTO addNode(AppDTO app, NodeDTO node) {
		
		if (app.getHead() == null) {
			NodeDTO newNode = nodeRepo.save(node);
			app.setHead(newNode.getId());
			app.setTail(newNode.getId());
		}else {
			NodeDTO prevNode = nodeRepo.findById(app.getTail()).orElse(null);

			if (prevNode == null) {
				throw new RuntimeException("failed find the Node with id: " + app.getTail());
			}
			if (!node.getRevision().equals(prevNode.getRevision())) {
				NodeDTO newNode = nodeRepo.save(node);
				prevNode.setNext(newNode.getId());
				newNode.setPrev(prevNode.getId());
				app.setTail(newNode.getId());
				nodeRepo.save(prevNode);
				nodeRepo.save(newNode);
			}
		}
		return appRepo.save(app);
	}
}
