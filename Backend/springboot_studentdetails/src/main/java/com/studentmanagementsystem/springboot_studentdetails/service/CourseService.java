package com.studentmanagementsystem.springboot_studentdetails.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.studentmanagementsystem.springboot_studentdetails.dao.CourseDao;
import com.studentmanagementsystem.springboot_studentdetails.dto.Course;
import com.studentmanagementsystem.springboot_studentdetails.util.ResponseStructureCourse;

@Service
public class CourseService {
	@Autowired
	private CourseDao courseDao;
	
	private ResponseStructureCourse<Course> structure = new ResponseStructureCourse<Course>();
	
	public ResponseEntity<ResponseStructureCourse<Course>> saveCourse(List<Course> course){
		List<Course> listCourse = courseDao.saveCourse(course);
		structure.setMsg("Courses Added Successfully..!!");  
		structure.setData(listCourse);
		structure.setStatusCode(HttpStatus.CREATED.value());
		return new ResponseEntity<ResponseStructureCourse<Course>>(structure,HttpStatus.CREATED);
	}
	
	public ResponseEntity<ResponseStructureCourse<Course>> getAllCourses(){
		List<Course> lisCourses = courseDao.getAllCourses();
		structure.setData(lisCourses);
		structure.setMsg("All courses fetched Successfully..!!");
		structure.setStatusCode(HttpStatus.OK.value());
		return new ResponseEntity<ResponseStructureCourse<Course>>(structure,HttpStatus.OK);
	}
}
