package com.abacusonlineadmission.abacus.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abacusonlineadmission.abacus.entity.AdmissionModel;



@Repository
public interface AdmissionRepo extends JpaRepository<AdmissionModel,Integer>{

}