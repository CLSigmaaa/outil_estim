package fr.atos.outil_estim.entities;

import fr.atos.outil_estim.enums.Priority;
import fr.atos.outil_estim.enums.State;
import fr.atos.outil_estim.utils.EstimItemAddItemVisitor;
import fr.atos.outil_estim.utils.EstimItemUpdateVisitor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import java.util.Date;

import org.hibernate.annotations.Type;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@JsonSerialize
public class UserStory extends EstimItem{
	@Column
	private Priority priority;
	@Column
	private State state;
	@Column
	private String version;
	@Column
	private Integer estimation;
	@Column
	private Date effectiveDateFrom;
	@Column
	private Date effectiveDateTo;

	public UserStory() {
	}
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
	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public Integer getEstimation() {
		return estimation;
	}

	public void setEstimation(Integer estimation) {
		this.estimation = estimation;
	}

	public Date getEffectiveDateFrom() {
		return effectiveDateFrom;
	}

	public void setEffectiveDateFrom(Date effectiveDateFrom) {
		this.effectiveDateFrom = effectiveDateFrom;
	}

	public Date getEffectiveDateTo() {
		return effectiveDateTo;
	}

	public void setEffectiveDateTo(Date effectiveDateTo) {
		this.effectiveDateTo = effectiveDateTo;
	}

}
