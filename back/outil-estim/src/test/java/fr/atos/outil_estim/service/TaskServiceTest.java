package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.Project;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.enums.Priority;
import fr.atos.outil_estim.enums.State;
import fr.atos.outil_estim.repository.TaskRepo;

import java.util.Objects;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.transaction.annotation.Transactional;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class TaskServiceTest {
	@Autowired
	@SpyBean
	private TaskService taskService;
	@Autowired
	@SpyBean
	private ProjectService projectService;
	@Autowired
	@SpyBean
	private SprintService sprintService;
	@Autowired
	@SpyBean
	private TaskRepo taskRepo;

	private Long projectId;
	private Long sprintId;
	@BeforeEach
	void setUp() {
		Project project = new Project();
		project.setName("ProjectName");
		project.setDescription("ProjectDescription");
		projectService.addProject(project);
		projectId = project.getId();

		Sprint sprint = new Sprint();
		sprint.setName("SprintName");
		sprint.setDescription("SprintDescription");
		sprint.setState(State.EN_COURS);
		sprintService.addSprint(projectId, sprint);
		sprintId = sprint.getId();
	}

	@AfterEach
	void tearDown() {
		projectService.deleteProject(projectId);
	}

	private Task createTask() {
		Task task = new Task();
		task.setName("TaskName");
		task.setDescription("TaskDescription");
		return task;
	}

//	@Test
//	void addTask() {
//		Task task = createTask();
//		taskService.addTaskToSprint(sprintId, task);
//
//		assertThat(taskRepo.findAll()).hasSize(1);
//		assertThat(taskRepo.findAll().get(0)).isEqualTo(task);
//
//		assertThat(Objects.requireNonNull(sprintService.getSprint(sprintId).getBody()).getTasks()).hasSize(1);
//	}

	@Test
	void getTask() {
		Task task = createTask();
		taskService.addTaskToSprint(sprintId, task);

		assertThat(taskService.getTask(task.getId()).getBody()).isEqualTo(task);
	}

	@Test
	void deleteTask() {
		Task task = createTask();
		taskService.addTaskToSprint(sprintId, task);

		taskService.deleteTask(task.getId());
		assertThat(taskRepo.findAll()).isEmpty();
	}

	@Test
	void updateTask() {
		Task task = createTask();
		taskService.addTaskToSprint(sprintId, task);

		Task newTask = new Task();
		newTask.setName("NewTaskName");
		newTask.setDescription("NewTaskDescription");
		newTask.setPriority(Priority.CRITIQUE);
		newTask.setState(State.TERMINEE);
		taskService.updateTask(task.getId(), newTask);

		assertThat(taskRepo.findAll().get(0).getName()).isEqualTo(newTask.getName());
		assertThat(taskRepo.findAll().get(0).getDescription()).isEqualTo(newTask.getDescription());
		assertThat(taskRepo.findAll().get(0).getPriority()).isEqualTo(newTask.getPriority());
		assertThat(taskRepo.findAll().get(0).getState()).isEqualTo(newTask.getState());
	}

//	@Test
//	void editTaskState() {
//		Task task = createTask();
//		taskService.addTaskToSprint(sprintId, task);
//
//		taskService.editTaskState(task.getId(), State.TERMINEE);
//		assertThat(taskRepo.findAll().get(0).getState()).isEqualTo(State.TERMINEE);
//	}


}
