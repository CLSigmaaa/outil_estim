package fr.atos.outil_estim.entities;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@Entity
@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
		property = "type"
)
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@JsonSubTypes({
		@JsonSubTypes.Type(value = Sprint.class, name = "Sprint"),
		@JsonSubTypes.Type(value = UserStory.class, name = "US")
})
@Getter @Setter
public abstract class DatedEstimItem extends EstimItem{
	@JsonProperty("datesEffectives")
	@Embedded
	private DateRange effectiveDates;

	public DatedEstimItem() {
		this.effectiveDates = new DateRange();
	}
}
