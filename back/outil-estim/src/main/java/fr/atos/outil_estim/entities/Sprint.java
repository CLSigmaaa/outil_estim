package fr.atos.outil_estim.entities;

import fr.atos.outil_estim.enums.State;
import fr.atos.outil_estim.visitors.EstimItemAddItemVisitor;
import fr.atos.outil_estim.visitors.EstimItemUpdateVisitor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonAlias;

@Entity
@Getter @Setter
public class Sprint extends DatedEstimItem{
	@Column
	@JsonAlias({ "state" })
	private State state;
	@OneToMany
	@JsonAlias({ "children" })
	private Set<EstimItem> children;

	public void setDefaultValue(Long id) {
		setName(String.format("Sprint %d", id));
		setDescription(String.format("Description Sprint %d", id));
		setState(State.A_FAIRE);
	}
	@Override
	public void accept(EstimItemUpdateVisitor visitor, EstimItem newEstimItem) {
		if (!(newEstimItem instanceof Sprint newSprint)) {
			throw new IllegalArgumentException("Sprint can only be updated with another Sprint");
		}
		visitor.visit(this, newSprint);
	}

	@Override
	public void accept(EstimItemAddItemVisitor visitor, EstimItem estimItemToAdd) {
		visitor.visit(this, estimItemToAdd);
	}


}
