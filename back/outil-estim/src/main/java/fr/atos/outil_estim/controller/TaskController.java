package fr.atos.outil_estim.controller;

import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.enums.State;
import fr.atos.outil_estim.service.TaskService;
import fr.atos.outil_estim.stats.Stats;

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
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/projects/{projectId}/sprints/{sprintId}")
public class TaskController {
	@Autowired
	private TaskService taskService;


	@GetMapping("/tasks/{taskId}")
	public ResponseEntity<Task> getTask(@PathVariable Long taskId) {
		return taskService.getTask(taskId);
	}

	@PostMapping(value = "/tasks", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> addTask(@PathVariable Long sprintId, @RequestBody Task task) {
		return taskService.addTaskToSprint(sprintId, task);
	}
	@PutMapping(value = "/tasks/{taskId}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Task> editTask(@PathVariable Long taskId, @RequestBody Task newTask){
		return taskService.updateTask(taskId, newTask);
	}
	@PutMapping("/tasks/state")
	public ResponseEntity<Task> editTaskState(Long taskId, String state){
		return taskService.editTaskState(taskId, State.fromString(state));
	}

	@DeleteMapping("/tasks/{taskId}")
	public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
		 return taskService.deleteTask(taskId);
	}

	@GetMapping("tasks/{taskId}/stats")
	public Stats getStats(@PathVariable Long taskId) {

		return taskService.getStats(taskId);
	}


}
