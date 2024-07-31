package fr.atos.outil_estim.entities;

import fr.atos.outil_estim.enums.State;
import fr.atos.outil_estim.utils.EstimItemAddItemVisitor;
import fr.atos.outil_estim.utils.EstimItemUpdateVisitor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Getter @Setter @NoArgsConstructor
public class Sprint extends EstimItem{
	@Column
	@JsonAlias({ "state" })
	private State state;
	@Column
	@JsonAlias({ "effectiveDateFrom" })
	private Date effectiveDateFrom;
	@Column
	@JsonAlias({ "effectiveDateTo" })
	private Date effectiveDateTo;
	@OneToMany
	@JsonAlias({ "children" })
	private Set<EstimItem> children;

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
