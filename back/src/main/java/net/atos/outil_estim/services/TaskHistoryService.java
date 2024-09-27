package net.atos.outil_estim.services;

import net.atos.outil_estim.dao.TaskHistoryRepository;
import net.atos.outil_estim.models.TaskHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskHistoryService {

    @Autowired
    private TaskHistoryRepository taskHistoryRepository;

    public List<TaskHistory> getTaskHistoryBetweenDates(LocalDateTime startDate, LocalDateTime endDate) {
        return taskHistoryRepository.findTaskHistoryBetweenDates(startDate, endDate);
    }
}
