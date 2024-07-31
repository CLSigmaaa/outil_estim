package fr.atos.outil_estim.controller;

import fr.atos.outil_estim.entities.EstimItem;
import fr.atos.outil_estim.enums.ItemType;
import fr.atos.outil_estim.enums.State;
import fr.atos.outil_estim.service.EstimItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class EstimItemController {
	@Autowired
	private EstimItemService estimItemService;


	@GetMapping("/items/{itemId}")
	public EstimItem getItem(@PathVariable Long itemId) {
		return estimItemService.getItem(itemId);
	}
	@PostMapping(value = "/items")
	public void addItem(Long parentId, String itemType) {
		estimItemService.addEmptyEstimItemToParent(parentId, ItemType.fromString(itemType));
	}
	@PutMapping(value = "/items", consumes = MediaType.APPLICATION_JSON_VALUE)
	public void editItem(Long itemId, @RequestBody EstimItem newEstimItem){
		estimItemService.editItem(itemId, newEstimItem);
	}
	@PutMapping("/items/state")
	public void editItemState(Long itemId, String state){
		estimItemService.editItemState(itemId, State.fromString(state));
	}

	@DeleteMapping("/items")
	public void deleteItem(Long itemId) {
		estimItemService.deleteItem(itemId);
	}
}
