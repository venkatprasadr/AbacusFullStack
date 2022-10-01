package com.abacusonlineadmission.abacus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.abacusonlineadmission.abacus.entity.CourseModel;



@Repository
public interface CourseRepo extends JpaRepository<CourseModel,Integer>{

}
