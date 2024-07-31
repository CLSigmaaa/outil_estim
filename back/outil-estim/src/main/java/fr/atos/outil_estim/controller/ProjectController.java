package fr.atos.outil_estim.controller;

import fr.atos.outil_estim.entities.Project;
import fr.atos.outil_estim.enums.ItemType;
import fr.atos.outil_estim.service.ProjectService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectController {
	@Autowired
	private ProjectService projectService;

	@GetMapping("/projects/{projectId}")
	public Project getProject(@PathVariable String projectId) {
		return projectService.getProject(projectId);
	}

	@GetMapping("/projects")
	public List<Project> getProjects() {
		return projectService.getProjects();
	}

	@PostMapping("/projects")
	public void addProject() {
		projectService.addProject();
	}

	@PostMapping("/projects/{projectId}/items")
	public void addProjectItem(@PathVariable String projectId, @RequestParam(name = "itemType") String itemType) {
		projectService.addEmptyEstimItemToProject(projectId, ItemType.fromString(itemType));
	}
}
