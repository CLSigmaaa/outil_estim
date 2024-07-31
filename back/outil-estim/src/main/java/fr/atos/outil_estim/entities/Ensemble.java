package fr.atos.outil_estim.entities;

import fr.atos.outil_estim.utils.EstimItemAddItemVisitor;
import fr.atos.outil_estim.utils.EstimItemUpdateVisitor;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@JsonSerialize
public class Ensemble extends EstimItem{
	@OneToMany
	@JsonAlias({ "children" })
	private Set<EstimItem> children;

	public Ensemble() {
	}
	@Override
	public void accept(EstimItemUpdateVisitor visitor, EstimItem newEstimItem) {
		if (!(newEstimItem instanceof Ensemble newEnsemble)) {
			throw new IllegalArgumentException("Ensemble can only be updated with another Ensemble");
		}
		visitor.visit(this, newEnsemble);
	}
	@Override
	public void accept(EstimItemAddItemVisitor visitor, EstimItem estimItemToAdd) {
		visitor.visit(this, estimItemToAdd);
	}

	public Set<EstimItem> getChildren() {
		return children;
	}

	public void setChildren(Set<EstimItem> children) {
		this.children = children;
	}
}
