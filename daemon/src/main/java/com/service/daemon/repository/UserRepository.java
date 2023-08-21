package com.service.daemon.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.service.daemon.model.UserDTO;

public interface UserRepository extends MongoRepository<UserDTO, String>{

}
