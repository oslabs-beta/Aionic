package com.service.daemon.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.service.daemon.model.NodeDTO;

public interface NodeRepository extends MongoRepository<NodeDTO, String>{

}
