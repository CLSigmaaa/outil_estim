package fr.atos.outil_estim.visitors;

import fr.atos.outil_estim.entities.Ensemble;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.UserStory;

public interface EstimItemUpdateVisitor {
	void visit(UserStory userStoryToEdit, UserStory newUserStory);
	void visit(Ensemble ensembleToEdit, Ensemble newEnsemble);
	void visit(Sprint sprintToEdit, Sprint newSprint);

}

