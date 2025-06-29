package com.studentmanagementsystem.springboot_studentdetails.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.studentmanagementsystem.springboot_studentdetails.dao.AdminDao;
import com.studentmanagementsystem.springboot_studentdetails.dto.Admin;
import com.studentmanagementsystem.springboot_studentdetails.exception.InvalidEmail;
import com.studentmanagementsystem.springboot_studentdetails.exception.InvalidPassword;
import com.studentmanagementsystem.springboot_studentdetails.util.AdminEmailService;
import com.studentmanagementsystem.springboot_studentdetails.util.ResponseStructure;

@Service
public class AdminService {
	@Autowired
	private AdminDao adminDao;
	@Autowired
	private AdminEmailService adminEmailService;
	
	private ResponseStructure<Admin> structure = new ResponseStructure<Admin>();
	
	public ResponseEntity<ResponseStructure<Admin>> saveAdmin(Admin admin) {
		structure.setMsg("Saved Successfully..!!");
		structure.setData(adminDao.saveAdmin(admin));
		structure.setStatusCode(HttpStatus.OK.value());
		adminEmailService.sendHtmlEmail(admin.getEmail(), admin.getFname());
		return new ResponseEntity<ResponseStructure<Admin>>(structure,HttpStatus.OK);
	}
	public ResponseEntity<ResponseStructure<Admin>> login(Admin admin){
		Admin adminDB = adminDao.login(admin.getEmail());
		if(adminDB != null) {
			if(adminDB.getPassword().equals(admin.getPassword())) {
				structure.setMsg("Login Successfully Done..!!");
				structure.setData(adminDB);
				structure.setStatusCode(HttpStatus.FOUND.value());
				return new ResponseEntity<ResponseStructure<Admin>>(structure,HttpStatus.FOUND);
			}else {
				throw new InvalidPassword("Password Wrong. Try Again!!!");
			}
		}else {
			throw new InvalidEmail("Email Wrong. Try Again!!!");
		}
	}
}
