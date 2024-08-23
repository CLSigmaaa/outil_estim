package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.Estimation;
import fr.atos.outil_estim.entities.Project;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.enums.State;
import fr.atos.outil_estim.repository.EstimationRepo;
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
public class EstimationServiceTest {
	@Autowired
	@SpyBean
	private EstimationService estimationService;

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
	private EstimationRepo estimationRepo;

	private Long projectId;
	private Long sprintId;
	private Long taskId;
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

		Task task = new Task();
		task.setName("TaskName");
		task.setDescription("TaskDescription");
		taskService.addTaskToSprint(sprint.getId(), task);
		taskId = task.getId();
	}

	@AfterEach
	void tearDown() {
		projectService.deleteProject(projectId);
	}

	private Estimation createEstimation() {
		Estimation estimation = new Estimation();
		estimation.setConsommee(1);
		estimation.setResteAFaire(4);
		return estimation;
	}

//	@Test
//	void addEstimation() {
//		Estimation estimation = createEstimation();
//		estimationService.addEstimation(taskId, estimation);
//
//		assertThat(estimationRepo.findAll()).hasSize(1);
//		assertThat(estimationRepo.findAll().get(0).getTask().getId()).isEqualTo(taskId);
//		assertThat(estimationRepo.findAll().get(0)).isEqualTo(estimation);
//
//		assertThat(Objects.requireNonNull(taskService.getTask(taskId).getBody()).getEstimationList().get(0).getId()).isEqualTo(estimation.getId());
//	}

	@Test
	void getEstimation() {
		Estimation estimation = createEstimation();
		estimationService.addEstimation(taskId, estimation);

		assertThat(estimationService.getEstimation(estimation.getId()).getBody()).isEqualTo(estimation);
	}

	@Test
	void deleteEstimation() {
		Estimation estimation = createEstimation();
		estimationService.addEstimation(taskId, estimation);

		estimationService.deleteEstimation(taskId, estimation.getId());
		assertThat(estimationRepo.findAll()).isEmpty();

		assertThat(taskService.getTask(taskId).getBody().getEstimationList()).isEmpty();
	}
}
