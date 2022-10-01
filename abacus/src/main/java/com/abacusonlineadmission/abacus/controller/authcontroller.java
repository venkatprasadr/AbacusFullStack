package com.abacusonlineadmission.abacus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.abacusonlineadmission.abacus.entity.AdminModel;
import com.abacusonlineadmission.abacus.entity.LoginModel;
import com.abacusonlineadmission.abacus.entity.UserModel;
import com.abacusonlineadmission.abacus.repository.AdminRepo;
import com.abacusonlineadmission.abacus.repository.LoginRepo;
import com.abacusonlineadmission.abacus.repository.UserRepo;





@RestController
public class authcontroller {
	
	
	@Autowired
	UserRepo userRepo;
	
	@Autowired
	AdminRepo adminRepo;
	
	@Autowired
	LoginRepo loginRepo;

	@PostMapping("/user/login")
	Boolean isUserPresent(@RequestBody LoginModel loginmodel) {
		

		if(loginRepo.findById(loginmodel.getEmail()).isPresent()) {
			if(loginmodel.getPassword().equals(loginRepo.findById(loginmodel.getEmail()).get().getPassword()))
				return true;
		}
		
		return false;
	}
	
	
	@PostMapping("/admin/login")
	Boolean isAdminPresent(@RequestBody LoginModel loginmodel) {
		

		if(loginRepo.findById(loginmodel.getEmail()).isPresent()) {
			if(loginmodel.getPassword().equals(loginRepo.findById(loginmodel.getEmail()).get().getPassword()))
				return true;
		}
		
		return false;
	}
	
	
	@PostMapping("/admin/signup")
	String saveAdmin(@RequestBody AdminModel adminmodel) {

		adminRepo.save(adminmodel);
		LoginModel loginmodel = new LoginModel();
		loginmodel.setEmail(adminmodel.getEmail());
		loginmodel.setPassword(loginmodel.getPassword());
		loginRepo.save(loginmodel);
		return "Admin added";
	}

	@PostMapping("/user/signup")
	String saveUser(@RequestBody UserModel usermodel) {
		userRepo.save(usermodel);
		LoginModel loginmodel = new LoginModel();
		loginmodel.setEmail(usermodel.getEmail());
		loginmodel.setPassword(usermodel.getPassword());
		loginRepo.save(loginmodel);
		return "User added";
	}
}
