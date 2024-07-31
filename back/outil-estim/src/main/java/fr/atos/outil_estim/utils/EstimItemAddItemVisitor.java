package fr.atos.outil_estim.utils;

import fr.atos.outil_estim.entities.Ensemble;
import fr.atos.outil_estim.entities.EstimItem;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.UserStory;

public interface EstimItemAddItemVisitor {
	void visit(UserStory userStory, EstimItem estimItemToAdd);
	void visit(Ensemble ensemble, EstimItem estimItemToAdd);
	void visit(Sprint sprint, EstimItem estimItemToAdd);
}
