package fr.atos.outil_estim.service;

import fr.atos.outil_estim.entities.DateRange;
import fr.atos.outil_estim.entities.DatedEstimItem;
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

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EstimItemService {
	private final String ITEM_NOT_FOUND = "Item not found";
	private final String PARENT_NOT_FOUND = "Parent not found";
	@Autowired
	private EstimItemRepo estimItemRepository;
	public List<EstimItem> getItems() {
		return estimItemRepository.findAll();
	}
	public EstimItem getItem(Long itemId) {
		Optional<EstimItem> item = estimItemRepository.findById(itemId);
		if (item.isEmpty()) {
			throw new IllegalArgumentException(ITEM_NOT_FOUND);
		}
		return item.get();
	}
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
	@Transactional
	public void addEmptyEstimItemToParent(Long parentId, ItemType itemType) {
		Optional<EstimItem> parent = estimItemRepository.findById(parentId);
		if (parent.isEmpty()) {
			throw new IllegalArgumentException(PARENT_NOT_FOUND);
		}
		EstimItem parentItem = parent.get();
		// Add item according to EstimItem Type
		EstimItem newItem = switch (itemType) {
			case US -> new UserStory();
			case SPRINT -> throw new IllegalArgumentException("Sprint may only be added at the root of the project");
			case ENSEMBLE -> new Ensemble();
		};
		newItem.setParentItem(parentItem);
		if (parentItem.getProject() == null) {
			throw new IllegalArgumentException("Parent item has no project");
		}
		newItem.setProject(parentItem.getProject());
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
	public void updateItem(Long itemId, EstimItem newEstimItem) {
		Optional<EstimItem> item = estimItemRepository.findById(itemId);
		if (item.isEmpty()) {
			throw new IllegalArgumentException(ITEM_NOT_FOUND);
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
			throw new IllegalArgumentException(ITEM_NOT_FOUND);
		}
		EstimItem itemToEdit = item.get();

		if (itemToEdit instanceof UserStory userStoryToEdit) {
			userStoryToEdit.setState(state);
			updateDate(userStoryToEdit, state);
		} else if (itemToEdit instanceof Sprint sprintToEdit) {
			sprintToEdit.setState(state);
			updateDate(sprintToEdit, state);
		} else {
			throw new IllegalArgumentException("Item isn't a UserStory or Sprint");
		}
		estimItemRepository.save(itemToEdit);
	}

	private void updateDate(DatedEstimItem datedEstimItem, State state) {
		if (datedEstimItem.getEffectiveDates() == null) {
			datedEstimItem.setEffectiveDates(new DateRange());
		}
		LocalDate datesEffectiveFrom = datedEstimItem.getEffectiveDates().getFrom();
		LocalDate datesEffectiveTo = datedEstimItem.getEffectiveDates().getTo();

		switch (state) {
			case A_FAIRE:
				datedEstimItem.getEffectiveDates().setFrom(null);
				datedEstimItem.getEffectiveDates().setTo(null);
				break;

			case EN_COURS:
				datedEstimItem.getEffectiveDates().setTo(null);
				if (datesEffectiveFrom == null) {
					datedEstimItem.getEffectiveDates().setFrom(LocalDate.now());
				}
				break;

			case TERMINEE:
				if (datesEffectiveTo == null) {
					if (datesEffectiveFrom == null) {
						datedEstimItem.getEffectiveDates().setFrom(LocalDate.now());
					}
					datedEstimItem.getEffectiveDates().setTo(LocalDate.now());
				}

				break;
		}
	}

	public Stats getStats(Long itemId) {
		Optional<EstimItem> item = estimItemRepository.findById(itemId);
		if (item.isEmpty()) {
			throw new IllegalArgumentException(ITEM_NOT_FOUND);
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
