package com.service.daemon.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.service.daemon.model.ApiKeyDTO;

public interface ApiKeyRepository extends MongoRepository<ApiKeyDTO, String>{

}
