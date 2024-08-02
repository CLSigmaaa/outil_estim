package fr.atos.outil_estim.entities;

import fr.atos.outil_estim.enums.Priority;
import fr.atos.outil_estim.enums.State;
import fr.atos.outil_estim.visitors.EstimItemAddItemVisitor;
import fr.atos.outil_estim.visitors.EstimItemUpdateVisitor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@JsonSerialize
@Getter @Setter @NoArgsConstructor
public class UserStory extends DatedEstimItem{
	@Column
	@JsonProperty("priorite")
	private Priority priority;
	@Column
	@JsonProperty("statut")
	private State state;
	@Column
	@JsonProperty("version")
	private String version;
	@Column
	@JsonProperty("estimation_initiale")
	private int estimation;


	@Override
	public void accept(EstimItemUpdateVisitor visitor, EstimItem newEstimItem) {
		if (!(newEstimItem instanceof UserStory newUserStory)) {
			throw new IllegalArgumentException("UserStory can only be updated with another UserStory");
		}
		visitor.visit(this, newUserStory);
	}

	@Override
	public void accept(EstimItemAddItemVisitor visitor, EstimItem estimItemToAdd) {
		visitor.visit(this, estimItemToAdd);
	}

}
