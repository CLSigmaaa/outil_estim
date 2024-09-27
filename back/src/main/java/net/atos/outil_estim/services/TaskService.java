package net.atos.outil_estim.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import net.atos.outil_estim.dao.TaskHistoryRepository;
import net.atos.outil_estim.dao.TaskRepository;
import net.atos.outil_estim.enums.StatusEnum;
import net.atos.outil_estim.models.Task;
import net.atos.outil_estim.models.TaskHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskHistoryRepository taskHistoryRepository;

    @Transactional
    public Task updateTask(Task task, Map<String, Object> updates) {
        updates.forEach((key, value) -> {
            switch (key) {
                case "taskName":
                    task.setTaskName((String) value);
                    break;
                case "initialEstimation":
                    task.setInitialEstimation(Float.parseFloat(String.valueOf(value)));
                    break;
                case "consumedTime":
                    task.setConsumedTime(task.getConsumedTime() + Float.parseFloat(String.valueOf(value)));
                    break;
                case "remainingTime":
                    task.setRemainingTime(Float.parseFloat(String.valueOf(value)));
                    break;
                case "status":
                    task.setStatus(StatusEnum.valueOf((String) value));
                    break;
                default:
                    break;
            }
        });

        if (task.getRemainingTime() == 0. && task.getConsumedTime() == 0.) {
            task.setStatus(StatusEnum.BACKLOG);
        } else if (task.getRemainingTime() == 0. && task.getConsumedTime() > 0.) {
            task.setStatus(StatusEnum.DONE);

//            TaskHistory taskHistory = new TaskHistory();
//            taskHistory.setTaskId(task.getId());
//            taskHistory.setOldConsumedTime(task.getConsumedTime());
//            taskHistory.setOldRemainingTime(task.getRemainingTime());
//            taskHistory.setOldStatus(task.getStatus());
//            taskHistory.setOldTaskName(task.getTaskName());
//            taskHistoryRepository.save(taskHistory);

        } else if (task.getRemainingTime() > 0. && task.getConsumedTime() > 0.) {
            task.setStatus(StatusEnum.IN_PROGRESS);
        }
        Task updatedTask = taskRepository.save(task);

        TaskHistory taskHistory = new TaskHistory();
        taskHistory.setTaskId(task.getId());
//        taskHistory.setOldInitialEstimation(task.getInitialEstimation());
        taskHistory.setOldConsumedTime(task.getConsumedTime());
        taskHistory.setOldRemainingTime(task.getRemainingTime());
        taskHistory.setOldStatus(task.getStatus());
        taskHistory.setOldTaskName(task.getTaskName());
        taskHistoryRepository.save(taskHistory);

        return updatedTask;
    }


}
