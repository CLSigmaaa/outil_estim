package net.atos.outil_estim.controllers;

import jakarta.persistence.EntityNotFoundException;
import net.atos.outil_estim.dao.TaskHistoryRepository;
import net.atos.outil_estim.dao.TaskRepository;
import net.atos.outil_estim.dto.TaskHistoryDTO;
import net.atos.outil_estim.enums.StatusEnum;
import net.atos.outil_estim.enums.TaskTypeEnum;
import net.atos.outil_estim.models.Task;
import net.atos.outil_estim.models.TaskHistory;
import net.atos.outil_estim.services.TaskHistoryService;
import net.atos.outil_estim.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@RestController
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskHistoryRepository taskHistoryRepository;

    @Autowired
    private TaskService taskService;

    @Autowired
    private TaskHistoryService taskHistoryService;

    // partial update of a task
    @PatchMapping("/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Task task = taskRepository.findById(id).orElseThrow(EntityNotFoundException::new);

        Task updatedTask = taskService.updateTask(task, updates);

        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getTasks() {
        List<Task> tasks = taskRepository.findAllByOrderByIdDesc();
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/tasks")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        task.setRemainingTime(task.getInitialEstimation());
        task.setTaskType(TaskTypeEnum.BUG);
        task.setStatus(StatusEnum.BACKLOG);
        Task createdTask = taskRepository.save(task);
        return ResponseEntity.ok(createdTask);
    }


    @GetMapping("/tasks/history")
    public ResponseEntity<List<TaskHistoryDTO>> getTaskHistory(@RequestParam(defaultValue = "30") int days) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(days);
        List<TaskHistory> taskHistories = taskHistoryService.getTaskHistoryBetweenDates(startDate, endDate);

        // Generate all dates within the period
        List<LocalDate> allDates = startDate.toLocalDate().datesUntil(endDate.toLocalDate().plusDays(1)).collect(Collectors.toList());

        // Grouper par jour
        Map<String, List<TaskHistory>> groupedByDay = taskHistories.stream()
                .collect(Collectors.groupingBy(history -> history.getCreatedAt().toLocalDate().toString()));

        // Ensure all dates are included
        allDates.forEach(date -> groupedByDay.putIfAbsent(date.toString(), new ArrayList<>()));

        // Transformer en DTO
        List<TaskHistoryDTO> taskHistoryDTOs = groupedByDay.entrySet().stream()
                .map(entry -> {
                    String day = entry.getKey();
                    double sumRemainingTime = entry.getValue().stream().mapToDouble(TaskHistory::getOldRemainingTime).sum();
                    return new TaskHistoryDTO(day, sumRemainingTime, 0);
                }).sorted((o1, o2) -> {
                    LocalDate date1 = LocalDate.parse(o1.getDay(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                    LocalDate date2 = LocalDate.parse(o2.getDay(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                    return date1.compareTo(date2);
                }).collect(Collectors.toList());

        double maxRemainingTime = taskHistoryDTOs.stream().mapToDouble(TaskHistoryDTO::getSumRemainingTime).max().orElse(0);


        double slope = maxRemainingTime / days;

        AtomicInteger index = new AtomicInteger(0);
        taskHistoryDTOs.forEach(dto -> {
            int dayIndex = index.getAndIncrement();
            double idealRemainingTime = maxRemainingTime - (dayIndex * slope);
            dto.setIdealRemainingTime(idealRemainingTime);

            // formatter la date pour affichage
            LocalDate date = LocalDate.parse(dto.getDay(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            dto.setDay(date.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        });

        return ResponseEntity.ok(taskHistoryDTOs);
    }

}
