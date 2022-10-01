package com.abacusonlineadmission.abacus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abacusonlineadmission.abacus.entity.AdminModel;

@Repository
public interface AdminRepo extends JpaRepository<AdminModel, String>{

}
