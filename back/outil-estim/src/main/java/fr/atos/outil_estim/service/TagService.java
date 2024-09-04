package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.Estimation;
import fr.atos.outil_estim.entities.Tag;
import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.repository.TagRepo;
import fr.atos.outil_estim.util.Error;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TagService {
	@Autowired
	private TagRepo tagRepository;
	@Autowired
	private TaskService taskService;
	public ResponseEntity<List<Tag>> getTags() {
		try {
			return ResponseEntity.ok(tagRepository.findAll());
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	public ResponseEntity<Tag> getTag(Long tagId) {
		try {
			return ResponseEntity.ok(tagRepository.findById(tagId).orElseThrow(() -> new IllegalArgumentException("Aucun tag trouvé avec l'id : " + tagId)));
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	public ResponseEntity<Tag> createTag(String tagName) {
		try {
			Tag existingTag = tagRepository.findByName(tagName).orElse(null);
			if (existingTag != null) {
				throw new IllegalArgumentException("Un tag existe déjà avec le nom : " +tagName);
			}
			Tag tag = new Tag();
			tag.setName(tagName);
			return ResponseEntity.ok(tagRepository.save(tag));
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	public ResponseEntity<Tag> addTagToTask(Long tagId, Long taskId) {
		try {
			Task task = taskService.getTask(taskId).getBody();
			if (task == null) {
				throw new IllegalArgumentException("Aucune tâche trouvée avec l'id : " + taskId);
			}
			Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new IllegalArgumentException("Aucun tag trouvé avec l'id : " + tagId));
			task.getTags().add(tag);
			taskService.saveTask(task);
			tag.getTasks().add(task);
			return ResponseEntity.ok(tagRepository.save(tag));
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	public ResponseEntity<Void> deleteTag(Long tagId) {
		try {
			Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new IllegalArgumentException("Aucun tag trouvé avec l'id : " + tagId));
			tagRepository.delete(tag);
			return ResponseEntity.noContent().build();
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	public ResponseEntity<Task> addTagsToTask(Long taskId, List<Tag> tags) {
		try {
			Task task = taskService.getTask(taskId).getBody();
			if (task == null) {
				throw new IllegalArgumentException("Aucune tâche trouvée avec l'id : " + taskId);
			}
			for (Tag tag : tags) {
				Tag existingTag = tagRepository.findByName(tag.getName()).orElse(null);
				if (existingTag == null) {
					tagRepository.save(tag);
				} else {
					tag = existingTag;
				}
				task.getTags().add(tag);
				tag.getTasks().add(task);
			}
			taskService.saveTask(task);
			return ResponseEntity.ok(task);
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}

	public ResponseEntity<List<String>> getCausesEcartsByTagId(Long tagId) {
		try {
			List<String> res = new ArrayList<>();
			List<Task> tasks = taskService.getTasksByTagId(tagId).getBody();
			if (tasks == null) {
				throw new IllegalArgumentException("No tasks found with tag id : " + tagId);
			}
			tasks.forEach(task -> {
				for (int i = 0; i < task.getEstimationList().size(); i++) {
					Estimation estimation = task.getEstimationList().get(i);
					if (!estimation.getCauseEcart().isEmpty() && i > 1) {
						double ecart = (estimation.getConsomme() + estimation.getResteAFaire()) - (
								task.getEstimationList().get(i - 1).getConsomme() + task.getEstimationList().get(i - 1).getResteAFaire());
						res.add("Task : " + task.getName() + " / Ecart : " + ecart + " / Cause : " + estimation.getCauseEcart());
					}
				}
			});
			return ResponseEntity.ok(res);
		} catch (IllegalArgumentException e) {
			return Error.errorFromException(e);
		}
	}
}
