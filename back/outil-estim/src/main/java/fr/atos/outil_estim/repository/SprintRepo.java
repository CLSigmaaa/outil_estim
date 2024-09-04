package fr.atos.outil_estim.repository;

import fr.atos.outil_estim.entities.Project;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.enums.State;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SprintRepo extends JpaRepository<Sprint, Long> {
	List<Sprint> findAllByProject(Project project);
	Optional<Sprint> findFirstByProjectAndState(Project project, State state);

	@Query("SELECT s FROM Sprint s LEFT JOIN FETCH s.tasks WHERE s.id = :sprintId")
	Optional<Sprint> findByIdWithTasks(Long sprintId);
}
