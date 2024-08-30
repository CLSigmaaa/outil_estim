package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.Project;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.enums.State;
import fr.atos.outil_estim.repository.SprintRepo;
import fr.atos.outil_estim.util.Error;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SprintService {
	private static final String SPRINT_NOT_FOUND = "Aucun sprint trouvé avec l'id : ";
	private static final String CURRENT_SPRINT_NOT_FOUND = "Aucun sprint en cours trouvé";

	@Autowired
	private SprintRepo sprintRepository;
	@Autowired
	private ProjectService projectService;

	public ResponseEntity<Sprint> getSprint( Long sprintId) {
		Sprint sprint;
		try {
			sprint = sprintRepository.findByIdWithTasks(sprintId).orElseThrow(() -> new IllegalArgumentException(SPRINT_NOT_FOUND + sprintId));
			return ResponseEntity.ok(sprint);
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}
	public ResponseEntity<Sprint> getCurrentSprint(Long projectId) {
		try {
			Project project = projectService.getProject(projectId).getBody();
			return ResponseEntity.ok(sprintRepository.findFirstByProjectAndState(project, State.EN_COURS).orElseThrow(() -> new IllegalArgumentException(CURRENT_SPRINT_NOT_FOUND)));
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}
	@Transactional
	public ResponseEntity<Void> deleteSprint(Long sprintId) {
		try {
			Sprint sprint = sprintRepository.findById(sprintId).orElseThrow(() -> new IllegalArgumentException(SPRINT_NOT_FOUND + sprintId));
			sprintRepository.delete(sprint);
			return ResponseEntity.noContent().build();
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}
	@Transactional
	public ResponseEntity<Sprint> updateSprint(Long sprintId, Sprint newSprintData) {
		try {
			Sprint sprint = sprintRepository.findById(sprintId).orElseThrow(() -> new IllegalArgumentException(SPRINT_NOT_FOUND + sprintId));
			sprint.setName(newSprintData.getName());
			sprint.setDescription(newSprintData.getDescription());
			sprint.setState(newSprintData.getState());
			return ResponseEntity.ok(sprintRepository.save(sprint));
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}
	@Transactional
	public ResponseEntity<Sprint> addSprint(Long projectId, Sprint sprint) {
		try {
			Project project = projectService.getProject(projectId).getBody();
			sprint.setProject(project);
			return ResponseEntity.ok(sprintRepository.save(sprint));
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	public ResponseEntity<Sprint> getSprintFilterTaskName(Long sprintId, String filterName) {
		try {
			Sprint sprint = sprintRepository.findByIdWithTasks(sprintId).orElseThrow(() -> new IllegalArgumentException(SPRINT_NOT_FOUND + sprintId));
			sprint.setTasks(sprint.getTasks().stream().filter(task -> task.getName().toLowerCase().contains(filterName.toLowerCase())).toList());
			return ResponseEntity.ok(sprint);
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	public ResponseEntity<Sprint> getSprintFilterUser(Long sprintId, String userId) {
		try {
			Sprint sprint = sprintRepository.findByIdWithTasks(sprintId).orElseThrow(() -> new IllegalArgumentException(SPRINT_NOT_FOUND + sprintId));
			sprint.setTasks(sprint.getTasks().stream().filter(
					task -> {
						if (task.getEstimUser() == null) {
							return false;
						}
						return task.getEstimUser().getId().equals(Long.parseLong(userId));
					}).toList());
			return ResponseEntity.ok(sprint);
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}
}
