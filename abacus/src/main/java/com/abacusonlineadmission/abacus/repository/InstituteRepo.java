package com.abacusonlineadmission.abacus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abacusonlineadmission.abacus.entity.InstituteModel;



@Repository
public interface InstituteRepo extends JpaRepository<InstituteModel,Integer>{

}
