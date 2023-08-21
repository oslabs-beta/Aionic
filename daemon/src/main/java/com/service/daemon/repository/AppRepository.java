package com.service.daemon.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.service.daemon.model.AppDTO;

@Repository
public interface AppRepository extends MongoRepository<AppDTO, String> {

	@Query(value ="{'uid': ?0}")
	AppDTO findByUid(String uid);
}
