package fr.atos.outil_estim.controller;

import fr.atos.outil_estim.entities.Tag;
import fr.atos.outil_estim.entities.Task;
import fr.atos.outil_estim.service.TagService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TagController {
	@Autowired
	private TagService tagService;

	@GetMapping("/tags")
	public ResponseEntity<List<Tag>> getTags() {
		return tagService.getTags();
	}

	@GetMapping("/tags/{tagId}")
	public ResponseEntity<Tag> getTag(@PathVariable Long tagId) {
		return tagService.getTag(tagId);
	}

	@PostMapping("/tags")
	public ResponseEntity<Tag> createTag(@RequestParam String tagName) {
		return tagService.createTag(tagName);
	}

	@PostMapping("/tags/assignTags/{taskId}")
	public ResponseEntity<Task> addTagsToTask(@PathVariable Long taskId, @RequestBody List<Tag> tags) {
		return tagService.addTagsToTask(taskId, tags);
	}

	@DeleteMapping("/tags/{tagId}")
	public ResponseEntity<Void> deleteTag(@PathVariable Long tagId) {
		return tagService.deleteTag(tagId);
	}

	@GetMapping(value = "/causesEcarts/{tagId}")
	public ResponseEntity<List<String>> getCausesEcartsByTagId(@PathVariable Long tagId) {
		return tagService.getCausesEcartsByTagId(tagId);
	}

}
