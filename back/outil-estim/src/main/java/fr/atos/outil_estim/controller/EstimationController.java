package fr.atos.outil_estim.controller;

import fr.atos.outil_estim.entities.Estimation;
import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.service.EstimationService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projects/{projectId}/sprints/{sprintId}/tasks/{taskId}")
public class EstimationController {
	@Autowired
	private EstimationService estimationService;

	@GetMapping(value = "/estimations")
	public ResponseEntity<List<Estimation>> getTaskEstimations(Long taskId) {
		return estimationService.getEstimations(taskId);
	}

	@GetMapping(value = "/estimations/{estimationId}")
	public ResponseEntity<Estimation> getEstimation(@PathVariable Long estimationId) {
		return estimationService.getEstimation(estimationId);
	}

	@PostMapping(value = "/estimations", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Estimation> addEstimation(@PathVariable Long taskId, @RequestBody  Estimation estimation) {
		return estimationService.addEstimation(taskId, estimation);
	}

	@DeleteMapping(value = "/estimations/{estimationId}")
	public ResponseEntity<Void> deleteEstimation(@PathVariable Long taskId, @PathVariable Long estimationId) {
		return estimationService.deleteEstimation(taskId, estimationId);
	}


}
