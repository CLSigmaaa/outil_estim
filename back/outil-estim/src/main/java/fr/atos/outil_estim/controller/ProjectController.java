package fr.atos.outil_estim.controller;

import fr.atos.outil_estim.entities.Project;
import fr.atos.outil_estim.enums.ItemType;
import fr.atos.outil_estim.service.ProjectService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectController {
	@Autowired
	private ProjectService projectService;

	@GetMapping("/projects/{projectId}")
	public ResponseEntity<Project> getProject(@PathVariable Long projectId) {
		return projectService.getProject(projectId);
	}

	@GetMapping("/projects")
	public ResponseEntity<List<Project>> getProjects() {
		return projectService.getProjects();
	}

	@PostMapping("/projects")
	public ResponseEntity<Project> addProject(@RequestBody Project project) {
		return projectService.addProject(project);
	}

	@PutMapping(value = "/projects/{projectId}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Project> updateProject(@PathVariable Long projectId, @RequestBody Project project) {
		return projectService.updateProject(projectId, project);
	}

	@DeleteMapping("/projects/{projectId}")
	public ResponseEntity<Void> deleteProject(@PathVariable Long projectId) {
		return projectService.deleteProject(projectId);
	}
}
