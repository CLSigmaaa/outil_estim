package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.EstimItem;
import fr.atos.outil_estim.entities.Project;
import fr.atos.outil_estim.enums.ItemType;
import fr.atos.outil_estim.repository.ProjectRepo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectService {
	@Autowired
	private ProjectRepo projectRepository;

	@Autowired
	private EstimItemService estimItemService;
	public Project getProject(String projectId) {
		return projectRepository.findById(Long.parseLong(projectId))
				.orElseThrow(() -> new IllegalArgumentException("Project with id " + projectId + " not found"));
	}

	@Transactional
	public void addEmptyEstimItemToProject(String projectId, ItemType estimItemType) {
		Project project = projectRepository.findById(Long.parseLong(projectId))
				.orElseThrow(() -> new IllegalArgumentException("Project with id " + projectId + " not found"));
		EstimItem newItem = estimItemService.createProjectChild(project, estimItemType);
		project.getChildren().add(newItem);

		projectRepository.save(project);
	}
	@Transactional
	public void addProject() {
		Project project = new Project();
		projectRepository.save(project);
	}

	public List<Project> getProjects() {
		return projectRepository.findAll();
	}
}
