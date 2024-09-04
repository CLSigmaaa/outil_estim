package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.Project;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.enums.ItemType;
import fr.atos.outil_estim.repository.ProjectRepo;
import fr.atos.outil_estim.repository.SprintRepo;
import fr.atos.outil_estim.util.Error;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectService {
	@Autowired
	private ProjectRepo projectRepository;

	public ResponseEntity<Project> getProject(Long projectId) {
		try {
			Project project = projectRepository.findByIdWithSprints(projectId).
					orElseThrow(() -> new IllegalArgumentException("Project with id " + projectId + " not found"));
			return ResponseEntity.ok(project);
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	@Transactional
	public ResponseEntity<Project> addProject(Project project) {
		try {
			return ResponseEntity.ok(projectRepository.save(project));
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	public ResponseEntity<List<Project>> getProjects() {
		try {
			return ResponseEntity.ok(projectRepository.findAll());
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	@Transactional
	public ResponseEntity<Project> updateProject(Long projectId, Project newProject) {

		try {
			Project projectToUpdate = projectRepository.findById(projectId)
					.orElseThrow(() -> new IllegalArgumentException("Project with id " + projectId + " not found"));
			projectToUpdate.setName(newProject.getName());
			projectToUpdate.setDescription(newProject.getDescription());
			projectToUpdate.setChildNumber(newProject.getChildNumber());
			updateProjectChildren(newProject, projectToUpdate);
			return ResponseEntity.ok(projectRepository.save(projectToUpdate));
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	@Transactional
	public ResponseEntity<Void> deleteProject(Long projectId) {
		try {
			Project project = projectRepository.findById(projectId)
					.orElseThrow(() -> new IllegalArgumentException("Project with id " + projectId + " not found"));
			projectRepository.delete(project);
			return ResponseEntity.noContent().build();
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	private void updateProjectChildren(Project newProject, Project projectToUpdate) {
		//		// Ajoute les nouveaux items a l'ancien projet
		//		newProject.getChildren().forEach(sprint -> {
		//			try {
		//				sprintService.updateItem(sprint.getId(), sprint);
		//			} catch (IllegalArgumentException e) {
		//				taskService.addSprintT(sprint.getProject(), sprint.getType());
		//				taskService.updateItem(sprint.getId(), sprint);
		//			}
		//			if (sprint instanceof Sprint sprint) {
		//				updateSprintChildren(sprint.getId(), sprint.getChildren());
		//			} else {
		//				throw new IllegalArgumentException("Unknown child type "+sprint.getClass());
		//			}
		//		});
		//
		//		// Enlève à l'ancien projet les items non présent dans le nouveau
		//		projectToUpdate.getChildren().forEach(child -> {
		//			try {
		//				taskService.getItem(child.getId());
		//			} catch (IllegalArgumentException e) {
		//				taskService.deleteItem(child.getId());
		//			}
		//		});
	}

	private void updateSprintChildren(Long parentId, Set<Task> children) {
		//		children.forEach(child -> {
		//			try {
		//				taskService.updateItem(parentId, child);
		//			} catch (IllegalArgumentException e) {
		//				taskService.addTaskToSprint(child.getId(), child);
		//			}
		//		});
	}
}
