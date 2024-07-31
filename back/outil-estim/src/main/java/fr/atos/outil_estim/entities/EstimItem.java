package fr.atos.outil_estim.entities;

import fr.atos.outil_estim.enums.ItemType;
import fr.atos.outil_estim.utils.EstimItemAddItemVisitor;
import fr.atos.outil_estim.utils.EstimItemUpdateVisitor;
import fr.atos.outil_estim.utils.ItemTypeResolver;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.annotation.JsonTypeIdResolver;

@Entity
@JsonTypeInfo(
		use = JsonTypeInfo.Id.NAME,
		include = JsonTypeInfo.As.PROPERTY,
		property = "type"
)
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@JsonSubTypes({
		@JsonSubTypes.Type(value = Sprint.class, name = "Sprint"),
		@JsonSubTypes.Type(value = UserStory.class, name = "US"),
		@JsonSubTypes.Type(value = Ensemble.class, name = "Ensemble")
})
@Getter @Setter
public abstract class EstimItem {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Long id;
	@Column
	@JsonProperty("nom")
	private String name;
	@ManyToOne
	@JsonBackReference(value = "parentItem")
	private EstimItem parentItem;
	@ManyToOne
	@JsonBackReference(value = "project")
	private Project project;
	@Column
	@JsonProperty("description")
	private String description;
	@Column
	@JsonProperty("commentaires")
	private String commentaires;
	@Column
	private ItemType type;

	public abstract void accept(EstimItemUpdateVisitor visitor, EstimItem newEstimItem);
	public abstract void accept(EstimItemAddItemVisitor visitor, EstimItem newEstimItem);

}
