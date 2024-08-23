package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.DateRange;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.enums.State;
import fr.atos.outil_estim.repository.TaskRepo;
import fr.atos.outil_estim.stats.Stats;
import fr.atos.outil_estim.util.Error;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaskService {
	private static final String TASK_NOT_FOUND = "Aucune tâche trouvée avec l'id : ";
	@Autowired
	private TaskRepo taskRepository;
	@Autowired
	private SprintService sprintService;

	public ResponseEntity<Task> getTask(Long taskId) {
		try {
			Task task = taskRepository.findByIdWithEstim(taskId).orElseThrow(() -> new IllegalArgumentException(TASK_NOT_FOUND + taskId));
			return ResponseEntity.ok(task);
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	@Transactional
	public ResponseEntity<Task> addTaskToSprint(Long sprintId, Task newTask) {
		try {
			Sprint parentSprint = sprintService.getSprint(sprintId).getBody();

			newTask.setParentSprint(parentSprint);
			newTask.setProject(parentSprint.getProject());
			return ResponseEntity.ok(taskRepository.save(newTask));
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	@Transactional
	public void saveTask(Task task) {
		taskRepository.save(task);
	}

	@Transactional
	public ResponseEntity<Void> deleteTask(Long taskId) {
		try {
			Task task = taskRepository.findById(taskId).orElseThrow(() -> new IllegalArgumentException(TASK_NOT_FOUND + taskId));
			taskRepository.delete(task);
			return ResponseEntity.noContent().build();
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	@Transactional
	public ResponseEntity<Task> updateTask(Long taskId, Task newTask) {
		try {
			Task taskToEdit = taskRepository.findById(taskId).orElseThrow(() -> new IllegalArgumentException(TASK_NOT_FOUND + taskId));
			taskToEdit.setName(newTask.getName());
			taskToEdit.setDescription(newTask.getDescription());
			taskToEdit.setPriority(newTask.getPriority());
			taskToEdit.setState(newTask.getState());
			return ResponseEntity.ok(taskRepository.save(taskToEdit));
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	@Transactional
	public ResponseEntity<Task> editTaskState(Long taskId, State state) {
		try {
			Task task = taskRepository.findById(taskId).orElseThrow(() -> new IllegalArgumentException(TASK_NOT_FOUND + taskId));
			updateDate(task, state);
			task.setState(state);
			return ResponseEntity.ok(taskRepository.save(task));
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	private void updateDate(Task task, State state) {
		if (task.getEffectiveDates() == null) {
			task.setEffectiveDates(new DateRange());
		}
		LocalDate datesEffectiveFrom = task.getEffectiveDates().getFrom();
		LocalDate datesEffectiveTo = task.getEffectiveDates().getTo();

		switch (state) {
			case A_FAIRE:
				task.getEffectiveDates().setFrom(null);
				task.getEffectiveDates().setTo(null);
				break;

			case EN_COURS:
				task.getEffectiveDates().setTo(null);
				if (datesEffectiveFrom == null) {
					task.getEffectiveDates().setFrom(LocalDate.now());
				}
				break;

			case TERMINEE:
				if (datesEffectiveTo == null) {
					if (datesEffectiveFrom == null) {
						task.getEffectiveDates().setFrom(LocalDate.now());
					}
					task.getEffectiveDates().setTo(LocalDate.now());
				}

				break;
		}
	}

	public Stats getStats(Long taskId) {
		Optional<Task> task = taskRepository.findById(taskId);
		if (task.isEmpty()) {
			throw new IllegalArgumentException(TASK_NOT_FOUND + taskId);
		}
		var stats = new Stats();
		//		stats.computeBurnUp(task);
		return stats;
	}
}
