package com.abacusonlineadmission.abacus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.abacusonlineadmission.abacus.DAOmodel.AdmissionDAO;
import com.abacusonlineadmission.abacus.entity.AdmissionModel;
import com.abacusonlineadmission.abacus.entity.UserModel;
import com.abacusonlineadmission.abacus.repository.AdmissionRepo;
import com.abacusonlineadmission.abacus.repository.CourseRepo;
import com.abacusonlineadmission.abacus.repository.UserRepo;

@RestController
public class UserController {

	@Autowired
	UserRepo userRepo;

	@Autowired
	AdmissionRepo admissionRepo;

	@Autowired
	CourseRepo courseRepo;

	@PostMapping("user/addAdmission")
	String addAdmission(@RequestBody AdmissionDAO admissionDAO) {
		AdmissionModel am = new AdmissionModel();
		am.setAdmissionDate(admissionDAO.getJoiningDate());
		am.setCourseModel(courseRepo.findById(admissionDAO.getCourseId()).get());
//		am.setStatus("Pending");
		UserModel um = userRepo.findById(admissionDAO.getUserEmail()).get();
		List<AdmissionModel> admissionList = um.getAdmissions();
		admissionList.add(am);
		um.setAdmissions(admissionList);
		userRepo.save(um);
		return "Admission added";
	}

	@GetMapping("user/viewAdmission")
	List<AdmissionModel> viewAdmission(@RequestParam String email) {
		return userRepo.findById(email).get().getAdmissions();
	}

	@PutMapping("user/editAdmission/{enrolId}")
	String editAdmission(@RequestParam int enrolId, @RequestBody AdmissionDAO admissionDAO) {

		AdmissionModel am = admissionRepo.findById(enrolId).get();
		am.setAdmissionDate(admissionDAO.getJoiningDate());
		am.setCourseModel(courseRepo.findById(admissionDAO.getCourseId()).get());
		UserModel um = userRepo.findById(admissionDAO.getUserEmail()).get();
		List<AdmissionModel> admissionList = um.getAdmissions();
		admissionList.add(am);
		um.setAdmissions(admissionList);
		userRepo.save(um);
		return "Admission edited";
	}

	@DeleteMapping("user/deleteAdmission/{enrolId}")
	String deleteAdmission(@PathVariable int enrolId) {
		AdmissionModel am = admissionRepo.findById(enrolId).get();
		am.setCourseModel(null);
		admissionRepo.save(am);
		admissionRepo.deleteById(enrolId);
		return "Admission Deleted";

	}

}
