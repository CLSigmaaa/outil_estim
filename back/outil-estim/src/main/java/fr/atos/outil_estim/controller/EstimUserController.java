package fr.atos.outil_estim.controller;

import fr.atos.outil_estim.entities.EstimUser;
import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.service.EstimUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EstimUserController {
	@Autowired
	private EstimUserService estimUserService;

	@PostMapping(value = "/users/{userId}/assign", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<EstimUser> assignTask(@PathVariable Long userId, @RequestBody Long taskId) {
		return estimUserService.assignTask(taskId, userId);
	}

	@DeleteMapping(value = "/users/{userId}/assign", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<EstimUser> unassignTask(@PathVariable Long userId, @RequestBody Long taskId) {
		return estimUserService.unassignTask(taskId, userId);
	}
}
