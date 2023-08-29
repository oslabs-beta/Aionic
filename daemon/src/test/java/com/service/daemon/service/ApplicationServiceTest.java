package com.service.daemon.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.service.daemon.model.AppDTO;
import com.service.daemon.model.NodeDTO;
import com.service.daemon.model.Source;
import com.service.daemon.repository.AppRepository;
import com.service.daemon.repository.NodeRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;


public class ApplicationServiceTest {

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    	appRepo.deleteAll();
    	nodeRepo.deleteAll();
    }
    
    @Mock
    private AppRepository appRepo;

    @Mock
    private NodeRepository nodeRepo;

    @InjectMocks
    private ApplicationService applicationService;
    
    @Mock
    private ObjectMapper objectMapper;

    @Test
    public void testTransformApplication() throws Exception {
        String jsonResponse = "{\"items\": [{" +
                "\"metadata\": {\"name\": \"app1\", \"uid\": \"uid1\"}," +
                "\"spec\": {\"source\": {\"repoURL\": \"url1\", \"path\": \"path1\"}}" +
                "}]}";

        List<AppDTO> appList = ApplicationService.transformApplication(jsonResponse);

        assertEquals(1, appList.size());

        AppDTO appDTO = appList.get(0);
        assertEquals("uid1", appDTO.getUid());
        assertEquals("app1", appDTO.getName());
        assertEquals("url1", appDTO.getSource().getRepoURL());
        assertEquals("path1", appDTO.getSource().getPath());
    }

    @Test
    public void testTransformManifest() throws Exception {
        String jsonResponse = "{\"manifests\": \"manifestContent\"," +
                "\"revision\": \"revisionValue\"," +
                "\"sourceType\": \"sourceTypeValue\"}";

        when(objectMapper.readValue(anyString(), eq(Map.class))).thenReturn(
                Map.of(
                        "manifests", "manifestContent",
                        "revision", "revisionValue",
                        "sourceType", "sourceTypeValue"
                )
        );

        NodeDTO nodeDTO = ApplicationService.transformManifest(jsonResponse);

        assertEquals("manifestContent", nodeDTO.getManifest());
        assertEquals("revisionValue", nodeDTO.getRevision());
        assertEquals("sourceTypeValue", nodeDTO.getSourceType());
    }
    
    @Test
    public void testAddNode() {

    	Source source = new Source("repoURL1","paht1", "targetRevision1");
        AppDTO app = new AppDTO("uid1", "name1", source, new Date());
        NodeDTO node = new NodeDTO("manifest1", "targetRevision1", "source1");

        when(nodeRepo.findById(any())).thenReturn(null); 
        when(nodeRepo.save(eq(node))).thenReturn(node);


        applicationService.addNode(app, node);

      
        verify(nodeRepo).save(eq(node)); 
        verify(appRepo).save(eq(app)); 
    }
    
    @Mock
	AppDTO appDTO;
    
    @Test
    public void testUpdateAppList() {

        List<AppDTO> appList = new ArrayList<>();
        appList.add(new AppDTO("uid1", "name1", new Source("repoURL1","paht1", "targetRevision1"), new Date()));
        appList.add(new AppDTO("uid2", "name2", new Source("repoURL2","paht2", "targetRevision2"), new Date()));

        when(appRepo.findByUid(anyString())).thenReturn(null); 
        when(appRepo.save(any())).thenReturn(appDTO); 

        applicationService.UpdateAppList(appList);

        verify(appRepo, times(appList.size())).findByUid(anyString()); 
        verify(appRepo, times(appList.size())).save(any(AppDTO.class)); 
    }
    
}