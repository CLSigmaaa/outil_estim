package fr.atos.outil_estim.controller;

import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.service.SprintService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projects/{projectId}")
public class SprintController {
	@Autowired
	private SprintService sprintService;

	@GetMapping("/sprints/{sprintId}")
	public ResponseEntity<Sprint> getSprint(@PathVariable Long sprintId) {
		return sprintService.getSprint(sprintId);
	}

	@GetMapping("/sprints/current")
	public ResponseEntity<Sprint> getCurrentSprint(@PathVariable Long projectId) {
		return sprintService.getCurrentSprint(projectId);
	}

	@GetMapping("/sprints/{sprintId}/filterName")
	public ResponseEntity<Sprint> getSprintFilterTaskName(@PathVariable Long sprintId, @RequestParam String filterName) {
		return sprintService.getSprintFilterTaskName(sprintId, filterName);
	}

	@GetMapping("/sprints/{sprintId}/filterUser")
	public ResponseEntity<Sprint> getSprintFilterUser(@PathVariable Long sprintId, @RequestParam String userId) {
		return sprintService.getSprintFilterUser(sprintId, userId);
	}

	@PostMapping(value = "/sprints", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Sprint> addSprint(@PathVariable Long projectId, @RequestBody Sprint sprint) {
		return sprintService.addSprint(projectId, sprint);
	}

	@PutMapping(value = "/sprints/{sprintId}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Sprint> updateSprint(@PathVariable Long sprintId, @RequestBody Sprint sprint) {
		return sprintService.updateSprint(sprintId, sprint);
	}

	@DeleteMapping("/sprints/{sprintId}")
	public ResponseEntity<Void> deleteSprint(@PathVariable Long sprintId) {
		return sprintService.deleteSprint(sprintId);
	}
}
