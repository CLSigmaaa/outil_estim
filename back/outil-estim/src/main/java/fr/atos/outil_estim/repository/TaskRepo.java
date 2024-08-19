package fr.atos.outil_estim.repository;

import fr.atos.outil_estim.entities.Task;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends JpaRepository<Task, Long> {
	@Query("SELECT t FROM Task t LEFT JOIN FETCH t.estimationList WHERE t.id = :taskId")
	Optional<Task> findByIdWithEstim(Long taskId);
}
