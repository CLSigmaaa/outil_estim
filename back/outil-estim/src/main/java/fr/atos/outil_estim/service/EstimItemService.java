package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.Ensemble;
import fr.atos.outil_estim.entities.EstimItem;
import fr.atos.outil_estim.entities.Project;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.UserStory;
import fr.atos.outil_estim.enums.ItemType;
import fr.atos.outil_estim.enums.State;
import fr.atos.outil_estim.repository.EstimItemRepo;
import fr.atos.outil_estim.stats.Stats;
import fr.atos.outil_estim.visitors.EstimItemAddItemVisitorImpl;
import fr.atos.outil_estim.visitors.EstimItemUpdateVisitorImpl;
import fr.atos.outil_estim.visitors.EstimItemUpdateVisitor;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EstimItemService {
	@Autowired
	private EstimItemRepo estimItemRepository;
	@Transactional
	public EstimItem createProjectChild(Project project, ItemType itemType) {
		EstimItem newItem = switch (itemType) {
			case US -> new UserStory();
			case SPRINT -> new Sprint();
			case ENSEMBLE -> new Ensemble();
		};
		newItem.setProject(project);
		estimItemRepository.saveAndFlush(newItem);
		return newItem;

	}
	public EstimItem getItem(Long itemId) {
		Optional<EstimItem> item = estimItemRepository.findById(itemId);
		if (item.isEmpty()) {
			throw new IllegalArgumentException("Item not found");
		}
		return item.get();
	}
	@Transactional
	public void addEmptyEstimItemToParent(Long parentId, ItemType itemType) {
		Optional<EstimItem> parent = estimItemRepository.findById(parentId);
		if (parent.isEmpty()) {
			throw new IllegalArgumentException("Parent not found");
		}
		EstimItem parentItem = parent.get();
		// Add item according to EstimItem Type
		EstimItem newItem = switch (itemType) {
			case US -> new UserStory();
			case SPRINT -> throw new IllegalArgumentException("Sprint may only be added at the root of the project");
			case ENSEMBLE -> new Ensemble();
		};
		newItem.setParentItem(parentItem);
		estimItemRepository.save(newItem);
		EstimItemAddItemVisitorImpl addItemVisitor = new EstimItemAddItemVisitorImpl();
		parentItem.accept(addItemVisitor, newItem);

		estimItemRepository.save(parentItem);
	}
	@Transactional
	public void deleteItem(Long itemId) {
		estimItemRepository.deleteById(itemId);
	}

	@Transactional
	public void editItem(Long itemId, EstimItem newEstimItem) {
		Optional<EstimItem> item = estimItemRepository.findById(itemId);
		if (item.isEmpty()) {
			throw new IllegalArgumentException("Item not found");
		}
		EstimItem itemToEdit = item.get();
		itemToEdit.setName(newEstimItem.getName());
		itemToEdit.setDescription(newEstimItem.getDescription());
		itemToEdit.setCommentaires(newEstimItem.getCommentaires());

		EstimItemUpdateVisitor updateVisitor = new EstimItemUpdateVisitorImpl();
		itemToEdit.accept(updateVisitor, newEstimItem); // Update the item with the new item according to the type
		estimItemRepository.save(itemToEdit);
	}

	@Transactional
	public void editItemState(Long itemId, State state) {
		Optional<EstimItem> item = estimItemRepository.findById(itemId);
		if (item.isEmpty()) {
			throw new IllegalArgumentException("Item not found");
		}
		EstimItem itemToEdit = item.get();
		if (itemToEdit instanceof UserStory userStoryToEdit) {
			userStoryToEdit.setState(state);
		} else if (itemToEdit instanceof Sprint sprintToEdit) {
			sprintToEdit.setState(state);
		} else {
			throw new IllegalArgumentException("Item isn't a UserStory or Sprint");
		}
		estimItemRepository.save(itemToEdit);
	}

	public Stats getStats(Long itemId) {
		Optional<EstimItem> item = estimItemRepository.findById(itemId);
		if (item.isEmpty()) {
			throw new IllegalArgumentException("Item not found");
		}
		if (item.get() instanceof UserStory) {
			throw new IllegalArgumentException("Can't compute stats for UserStory");
		}
		var stats = new Stats();
		if (item.get() instanceof Sprint sprint) {
			stats.computeStats(sprint);
		} else if (item.get() instanceof Ensemble ensemble) {
			stats.computeStats(ensemble);
		}
		return stats;
	}
}
