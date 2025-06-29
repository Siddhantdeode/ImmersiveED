package com.studentmanagementsystem.springboot_studentdetails.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.studentmanagementsystem.springboot_studentdetails.dto.Course;
import com.studentmanagementsystem.springboot_studentdetails.service.CourseService;
import com.studentmanagementsystem.springboot_studentdetails.util.ResponseStructureCourse;

@RestController
@CrossOrigin
public class CourseController {
	@Autowired
	private CourseService courseService;
	
	@PostMapping("/savecourse")
	public ResponseEntity<ResponseStructureCourse<Course>> savCourse(@RequestBody List<Course> course){
		return courseService.saveCourse(course);
	}
	
	@PostMapping("/allcourses")
	public ResponseEntity<ResponseStructureCourse<Course>> getAllCourses(){
		return courseService.getAllCourses();
	}
}
