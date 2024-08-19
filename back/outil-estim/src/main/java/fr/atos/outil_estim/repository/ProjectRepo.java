package fr.atos.outil_estim.repository;

import fr.atos.outil_estim.entities.Project;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProjectRepo extends JpaRepository<Project, Long> {
	@Query("SELECT p FROM Project p LEFT JOIN FETCH p.sprints WHERE p.id = :projectId")
	Optional<Project> findByIdWithSprints(Long projectId);
}
