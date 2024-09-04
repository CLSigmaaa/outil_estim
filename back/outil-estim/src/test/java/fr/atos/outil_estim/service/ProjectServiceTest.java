package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.Project;
import fr.atos.outil_estim.enums.ItemType;
import fr.atos.outil_estim.repository.SprintRepo;
import fr.atos.outil_estim.repository.ProjectRepo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.transaction.annotation.Transactional;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class ProjectServiceTest {

	@Autowired
	@SpyBean
	private ProjectService projectService;

	@Autowired
	@SpyBean
	private ProjectRepo projectRepo;

	@Autowired
	@SpyBean
	private SprintRepo estimItemRepo;


	@Test
	void addProject(){
		Project project = new Project();
		projectService.addProject(project);
		assertThat(projectRepo.findAll()).hasSize(1);
	}


}
