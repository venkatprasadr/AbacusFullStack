package com.abacusonlineadmission.abacus.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;






@Entity
@Table(name = "User_Table")

public class UserModel {
	
	@Id
	private String email;
	private String password;
	private String username;
	private String mobileNumber;
	private String userRole;
	

	@OneToMany(targetEntity = AdmissionModel.class, cascade = CascadeType.ALL)
	@JoinColumn(name="admissions_key",referencedColumnName="email")
	private List<AdmissionModel> admissions;
	

	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}
	
	public List<AdmissionModel> getAdmissions() {
		return admissions;
	}

	public void setAdmissions(List<AdmissionModel> admissions) {
		this.admissions = admissions;
	}
	

}
