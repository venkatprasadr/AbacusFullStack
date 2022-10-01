package com.abacusonlineadmission.abacus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abacusonlineadmission.abacus.entity.UserModel;

@Repository
public interface UserRepo extends JpaRepository<UserModel, String> {

}
