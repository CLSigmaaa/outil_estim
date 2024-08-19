package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.Estimation;
import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.repository.EstimationRepo;
import fr.atos.outil_estim.util.Error;

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
			estimation.setTask(task);
			return ResponseEntity.ok(estimationRepository.save(estimation));
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}

	}
	@Transactional
	public ResponseEntity<Void>deleteEstimation(Long estimationId) {
		try {
			estimationRepository.deleteById(estimationId);
			return ResponseEntity.noContent().build();
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}
}
