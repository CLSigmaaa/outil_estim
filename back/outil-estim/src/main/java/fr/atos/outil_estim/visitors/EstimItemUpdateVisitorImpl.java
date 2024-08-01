package fr.atos.outil_estim.visitors;

import fr.atos.outil_estim.entities.Ensemble;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.UserStory;

public class EstimItemUpdateVisitorImpl implements EstimItemUpdateVisitor {
	@Override
	public void visit(UserStory userStoryToEdit, UserStory newUserStory) {
		userStoryToEdit.setEstimation(newUserStory.getEstimation());
		userStoryToEdit.setPriority(newUserStory.getPriority());
		userStoryToEdit.setState(newUserStory.getState());
		userStoryToEdit.setVersion(newUserStory.getVersion());
		userStoryToEdit.setEffectiveDateFrom(newUserStory.getEffectiveDateFrom());
		userStoryToEdit.setEffectiveDateTo(newUserStory.getEffectiveDateTo());
	}

	@Override
	public void visit(Ensemble ensembleToEdit, Ensemble newEnsemble) {
		ensembleToEdit.setChildren(newEnsemble.getChildren());
	}

	@Override
	public void visit(Sprint sprintToEdit, Sprint newSprint) {
		sprintToEdit.setChildren(newSprint.getChildren());
	}
}
