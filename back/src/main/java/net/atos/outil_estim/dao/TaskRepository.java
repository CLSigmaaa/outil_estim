package net.atos.outil_estim.dao;

import net.atos.outil_estim.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // find all by date asc
    List<Task> findAllByOrderByCreatedAtDesc();
    List<Task> findAllByOrderByIdDesc();
}
