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

import com.abacusonlineadmission.abacus.DAOmodel.CourseDAO;
import com.abacusonlineadmission.abacus.DAOmodel.InstituteDAO;
import com.abacusonlineadmission.abacus.DAOmodel.StudentDAO;
import com.abacusonlineadmission.abacus.entity.CourseModel;
import com.abacusonlineadmission.abacus.entity.InstituteModel;
import com.abacusonlineadmission.abacus.entity.StudentModel;
import com.abacusonlineadmission.abacus.repository.CourseRepo;
import com.abacusonlineadmission.abacus.repository.InstituteRepo;
import com.abacusonlineadmission.abacus.repository.StudentRepo;


@RestController
public class AdminController {


	
	@Autowired
	CourseRepo courseRepo;
	
	@Autowired
	InstituteRepo instituteRepo;
	
	@Autowired
	StudentRepo studentRepo;

	@PostMapping("/admin/addCourse")
	String addCourse(@RequestBody CourseDAO courseDAO) {

		CourseModel coursemodel = new CourseModel();
		coursemodel.setCourseName(courseDAO.getCourseName());
		coursemodel.setCourseDescription(courseDAO.getCourseDescription());
		coursemodel.setCourseDuration(courseDAO.getCourseDuration());
		courseRepo.save(coursemodel);
		return "Course added";
	}
	
	@GetMapping("/admin/viewCourse")
	List<CourseModel> viewCourse() {
		return courseRepo.findAll();
	}
	

	
	@PutMapping("/admin/editCourse/{courseId}")
	String editCourse(@PathVariable int courseId, @RequestBody CourseDAO courseDAO){
		CourseModel existingCourse = courseRepo.findById(courseId).get();
		existingCourse.setCourseName(courseDAO.getCourseName());
		existingCourse.setCourseDescription(courseDAO.getCourseDescription());
		existingCourse.setCourseDuration(courseDAO.getCourseDuration());
		
		courseRepo.save(existingCourse);
		return "Course edited";
	}
	
	@DeleteMapping("/admin/deleteCourse")
	String deleteCourse(@RequestParam int courseId){
		courseRepo.deleteById(courseId);
		return "Course deleted";
	}
	
	@PostMapping("/admin/addInstitute")
	String addInstitute(@RequestBody InstituteDAO instituteDAO) {
		InstituteModel institutemodel = new InstituteModel();
		institutemodel.setInstituteName(instituteDAO.getInstituteName());
		institutemodel.setEmail(instituteDAO.getEmail());
		institutemodel.setInstituteAddress(instituteDAO.getInstituteAddress());
		institutemodel.setInstituteDescription(instituteDAO.getInstituteAddress());
		institutemodel.setMobile(instituteDAO.getMobile());
		
		instituteRepo.save(institutemodel);
		return "Institute added";
	}
	
	@GetMapping("/admin/viewInstitute")
	List<InstituteModel> viewInstitute() {
		return instituteRepo.findAll();
	}
	

	
	@PutMapping("/admin/editInstitute/{instituteId}")
	String editInstitute(@PathVariable int instituteId, @RequestBody InstituteDAO instituteDAO){
		InstituteModel existingInstitute = instituteRepo.findById(instituteId).get();
		existingInstitute.setInstituteName(instituteDAO.getInstituteName());
		existingInstitute.setEmail(instituteDAO.getEmail());
		existingInstitute.setInstituteAddress(instituteDAO.getInstituteAddress());
		existingInstitute.setInstituteDescription(instituteDAO.getInstituteAddress());
		existingInstitute.setMobile(instituteDAO.getMobile());	
		instituteRepo.save(existingInstitute);
		return "Institue edited";
	}
	
	@DeleteMapping("/admin/deleteInstitute")
	String deleteInstitute(@RequestParam int instituteId){
		instituteRepo.deleteById(instituteId);
		return "Institute deleted";
	
	}
	
	@PostMapping("/admin/addStudent")
	String addStudent(@RequestBody StudentDAO studentDAO) {
		StudentModel studentmodel = new StudentModel();
		studentmodel.setAddress(studentDAO.getAddress());
		studentmodel.setAge(studentDAO.getAge());
		studentmodel.setMobile(studentDAO.getMobile());
		studentmodel.setStudentName(studentDAO.getStudentName());
		studentRepo.save(studentmodel);
		return "Student added";
	}
	
	@GetMapping("/admin/viewStudent")
	List<StudentModel> viewStudent() {
		return studentRepo.findAll();
	}
	

	
	@PutMapping("/admin/editStudent/{studentId}")
	String editStudent(@PathVariable int studentId, @RequestBody StudentDAO studentDAO) {
		StudentModel existingStudent = studentRepo.findById(studentId).get();
		existingStudent.setAddress(studentDAO.getAddress());
		existingStudent.setAge(studentDAO.getAge());
		existingStudent.setMobile(studentDAO.getMobile());
		existingStudent.setStudentName(studentDAO.getStudentName());
		studentRepo.save(existingStudent);
		return "Student edited";
	}
	
	@DeleteMapping("/admin/deleteStudent")
	String deleteStudent(@RequestParam int studentId) {
		studentRepo.deleteById(studentId);
		return "Student deleted";
	}
	
}
