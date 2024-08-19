package fr.atos.outil_estim.repository;

import fr.atos.outil_estim.entities.Estimation;
import fr.atos.outil_estim.entities.Task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstimationRepo extends JpaRepository<Estimation, Long> {
	List<Estimation> findAllByTask(Task task);
}
