package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.Estimation;
import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.enums.State;
import fr.atos.outil_estim.repository.EstimationRepo;
import fr.atos.outil_estim.util.Error;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EstimationService {
	@Autowired
	private EstimationRepo estimationRepository;
	@Autowired
	private TaskService taskService;

	public ResponseEntity<List<Estimation>> getEstimations(Long taskId) {
		try {
			Task task = taskService.getTask(taskId).getBody();
			List<Estimation> estimations = estimationRepository.findAllByTask(task);
			return ResponseEntity.ok(estimations);
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	public ResponseEntity<Estimation> getEstimation(Long estimationId) {
		try {
			Estimation estimation = estimationRepository.findById(estimationId).orElseThrow(
					() -> new IllegalArgumentException("Estimation not found"));
			return ResponseEntity.ok(estimation);
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}
	@Transactional
	public ResponseEntity<Estimation> addEstimation(Long taskId, Estimation estimation) {
		try {
			Task task = taskService.getTask(taskId).getBody();
//			if (estimation.getConsommee() == 0){
//				task = taskService.editTaskState(taskId, State.A_FAIRE).getBody();
//			} else if (estimation.getConsommee() > 0) {
//				if (estimation.getResteAFaire() == 0) {
//					task =  taskService.editTaskState(taskId, State.TERMINEE).getBody();
//				} else {
//					task = taskService.editTaskState(taskId, State.EN_COURS).getBody();
//				}
//			}

			estimation.setTask(task);
			return ResponseEntity.ok(estimationRepository.save(estimation));
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}

	}
	@Transactional
	public ResponseEntity<Void>deleteEstimation(Long taskId, Long estimationId) {
		try {
			estimationRepository.deleteById(estimationId);
			Task task = taskService.getTask(taskId).getBody();
			if (task == null) {
				throw new IllegalArgumentException("Task not found");
			}

//			if (task.getEstimationList().isEmpty()) {
//				taskService.editTaskState(taskId, State.A_FAIRE);
//			} else {
//				Estimation lastEstimation = task.getEstimationList().get(task.getEstimationList().size() - 1);
//				if (lastEstimation.getConsommee() == 0) {
//					taskService.editTaskState(taskId, State.A_FAIRE);
//				} else if (lastEstimation.getConsommee() > 0) {
//					if (lastEstimation.getResteAFaire() == 0) {
//						taskService.editTaskState(taskId, State.TERMINEE);
//					} else {
//						taskService.editTaskState(taskId, State.EN_COURS);
//					}
//				}
//			}
			return ResponseEntity.noContent().build();
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}
}
