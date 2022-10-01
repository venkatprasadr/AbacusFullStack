package com.abacusonlineadmission.abacus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abacusonlineadmission.abacus.entity.StudentModel;



@Repository
public interface StudentRepo extends JpaRepository<StudentModel,Integer>{

}
