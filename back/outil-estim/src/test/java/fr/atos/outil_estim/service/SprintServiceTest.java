package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.Project;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.enums.State;
import fr.atos.outil_estim.repository.SprintRepo;

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
public class SprintServiceTest {
	@Autowired
	@SpyBean
	private SprintService sprintService;
	@Autowired
	@SpyBean
	private ProjectService projectService;
	@Autowired
	@SpyBean
	private SprintRepo sprintRepo;

	private Long projectId;
	@BeforeEach
	void setUp() {
		Project project = new Project();
		project.setName("ProjectName");
		project.setDescription("ProjectDescription");
		projectService.addProject(project);
		projectId = project.getId();
	}

	@AfterEach
	void tearDown() {
		projectService.deleteProject(projectId);
	}

	private Sprint createSprint(){
		Sprint sprint = new Sprint();
		sprint.setName("SprintName");
		sprint.setDescription("SprintDescription");
		sprint.setState(State.EN_COURS);
		return sprint;
	}

	@Test
	void addSprint() {
		Sprint sprint = createSprint();
		sprintService.addSprint(projectId, sprint);
		assertThat(sprintRepo.findAll()).hasSize(1);
		assertThat(sprintRepo.findAll().get(0).getProject().getId()).isEqualTo(projectId);
		assertThat(sprintRepo.findAll().get(0).getName()).isEqualTo("SprintName");
	}

	@Test
	void getSprint() {
		Sprint sprint = createSprint();
		sprintService.addSprint(projectId, sprint);
		assertThat(sprintService.getSprint(sprint.getId()).getBody()).isEqualTo(sprint);
	}

	@Test
	void getCurrentSprint() {
		Sprint sprint = createSprint();
		sprintService.addSprint(projectId, sprint);

		Sprint sprint2 = new Sprint();
		sprint2.setName("Sprint2Name");
		sprint2.setDescription("Sprint2Description");
		sprint2.setState(State.TERMINEE);
		sprintService.addSprint(projectId, sprint2);
		assertThat(sprintService.getCurrentSprint(projectId).getBody()).isEqualTo(sprint);
	}

	@Test
	void deleteSprint() {
		Sprint sprint = createSprint();
		sprintService.addSprint(projectId, sprint);
		assertThat(sprintRepo.findAll()).hasSize(1);
		sprintService.deleteSprint(sprint.getId());
		assertThat(sprintRepo.findAll()).isEmpty();
	}

	@Test
	void updateSprint() {
		Sprint sprint = createSprint();
		sprintService.addSprint(projectId, sprint);
		assertThat(sprintRepo.findAll().get(0)).isEqualTo(sprint);

		Sprint newSprint = new Sprint();
		newSprint.setName("NewSprintName");
		newSprint.setDescription("NewSprintDescription");
		newSprint.setState(State.TERMINEE);
		sprintService.updateSprint(sprint.getId(), newSprint);
		assertThat(sprintRepo.findAll().get(0).getName()).isEqualTo(newSprint.getName());
		assertThat(sprintRepo.findAll().get(0).getDescription()).isEqualTo(newSprint.getDescription());
		assertThat(sprintRepo.findAll().get(0).getState()).isEqualTo(newSprint.getState());
	}


}
