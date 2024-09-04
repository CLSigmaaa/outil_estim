package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.EstimUser;
import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.repository.EstimUserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EstimUserService {
	@Autowired
	private EstimUserRepo estimUserRepository;
	@Autowired
	private TaskService taskService;

	@Transactional
	public ResponseEntity<EstimUser> assignTask(Long taskId, Long userId) {

		Task task = taskService.getTask(taskId).getBody();
		if (task == null) {
			return ResponseEntity.notFound().build();
		}
		EstimUser estimUser = estimUserRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Aucun utilisateur trouvé avec l'id : " + userId));
		task.setEstimUser(estimUser);
		return ResponseEntity.ok(estimUser);

	}

	@Transactional
	public ResponseEntity<EstimUser> unassignTask(Long taskId, Long userId) {
		Task task = taskService.getTask(taskId).getBody();
		if (task == null) {
			return ResponseEntity.notFound().build();
		}
		EstimUser estimUser = estimUserRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Aucun utilisateur trouvé avec l'id : " + userId));
		task.setEstimUser(null);
		return ResponseEntity.ok(estimUser);
	}
}
