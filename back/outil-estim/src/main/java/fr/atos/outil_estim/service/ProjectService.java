package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.Ensemble;
import fr.atos.outil_estim.entities.EstimItem;
import fr.atos.outil_estim.entities.Project;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.UserStory;
import fr.atos.outil_estim.enums.ItemType;
import fr.atos.outil_estim.repository.ProjectRepo;

import java.util.List;
import java.util.Set;

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

	public void updateProject(Project project) {
		Project projectToUpdate = projectRepository.findById(project.getId())
				.orElseThrow(() -> new IllegalArgumentException("Project with id " +project.getId() + " not found"));
		projectToUpdate.setName(project.getName());
		projectToUpdate.setDescription(project.getDescription());
		projectToUpdate.setChildNumber(project.getChildNumber());
		updateProjectChildren(project, projectToUpdate);
		projectRepository.save(projectToUpdate);
	}

	private void updateProjectChildren(Project newProject, Project projectToUpdate) {
		// Ajoute les nouveaux items a l'ancien projet
		updateItemChildren(newProject.getChildren());

		// Enlève à l'ancien projet les items non présent dans le nouveau
		projectToUpdate.getChildren().forEach(child -> {
			try {
				estimItemService.getItem(child.getId());
			} catch (IllegalArgumentException e) {
				estimItemService.deleteItem(child.getId());
			}
		});
	}

	private void updateItemChildren(Set<EstimItem> children){
		children.forEach(child -> {
			try {
				estimItemService.updateItem(child.getId(), child);
			} catch (IllegalArgumentException e) {
				estimItemService.createProjectChild(child.getProject(), child.getType());
				estimItemService.updateItem(child.getId(), child);
			}
			if (child instanceof UserStory) {
				return;
			} else if (child instanceof Ensemble ensemble) {
				updateItemChildren(ensemble.getChildren());
			} else if (child instanceof Sprint sprint) {
				updateItemChildren(sprint.getChildren());
			} else {
				throw new IllegalArgumentException("Unknown child type "+child.getClass());
			}
		});
	}
}
