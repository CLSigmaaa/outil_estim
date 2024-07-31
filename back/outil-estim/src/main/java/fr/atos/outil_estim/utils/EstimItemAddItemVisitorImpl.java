package fr.atos.outil_estim.utils;

import fr.atos.outil_estim.entities.Ensemble;
import fr.atos.outil_estim.entities.EstimItem;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.UserStory;

public class EstimItemAddItemVisitorImpl implements EstimItemAddItemVisitor {
	public void visit(UserStory userStory, EstimItem estimItemToAdd) {
		throw new IllegalArgumentException("UserStory cannot have children");
	}

	public void visit(Ensemble ensemble, EstimItem estimItemToAdd) {
		ensemble.getChildren().add(estimItemToAdd);
	}

	public void visit(Sprint sprint, EstimItem estimItemToAdd) {
		sprint.getChildren().add(estimItemToAdd);
	}
}
