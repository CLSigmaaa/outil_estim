package net.atos.outil_estim.dao;

import net.atos.outil_estim.models.TaskHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskHistoryRepository extends JpaRepository<TaskHistory, Long> {
    @Query("SELECT th FROM TaskHistory th WHERE th.createdAt >= :startDate AND th.createdAt <= :endDate ORDER BY th.createdAt ASC")
    List<TaskHistory> findTaskHistoryBetweenDates(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}
