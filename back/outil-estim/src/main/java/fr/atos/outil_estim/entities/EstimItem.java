//package fr.atos.outil_estim.entities;
//
//import fr.atos.outil_estim.enums.ItemType;
//import fr.atos.outil_estim.enums.State;
//import fr.atos.outil_estim.visitors.EstimItemUpdateVisitor;
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Inheritance;
//import jakarta.persistence.InheritanceType;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.TableGenerator;
//import lombok.Getter;
//import lombok.Setter;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.fasterxml.jackson.annotation.JsonProperty;
//import com.fasterxml.jackson.annotation.JsonSubTypes;
//import com.fasterxml.jackson.annotation.JsonTypeInfo;
//
//@Entity
//@JsonTypeInfo(
//		use = JsonTypeInfo.Id.NAME,
//		include = JsonTypeInfo.As.EXISTING_PROPERTY,
//		property = "type"
//)
//@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
//@JsonSubTypes({
//		@JsonSubTypes.Type(value = Task.class, name = "TASK"),
//		@JsonSubTypes.Type(value = Sprint.class, name = "SPRINT")
//})
//@Getter @Setter
//public abstract class EstimItem {
//	@TableGenerator(name = "Item_Gen", table = "ID_GEN", pkColumnName = "GEN_NAME", valueColumnName = "GEN_VAL", pkColumnValue = "Item_Gen", initialValue = 100, allocationSize = 100)
//	@Id
//	@GeneratedValue(strategy = GenerationType.TABLE, generator = "Item_Gen")
//	private Long id;
//	@Column
//	@JsonProperty("name")
//	private String name;
//	@ManyToOne
//	@JsonBackReference(value = "project")
//	private Project project;
//	@Column
//	@JsonProperty("description")
//	private String description;
//	@Column
//	@JsonProperty("state")
//	private State state;
//	@Column
//	@JsonProperty("effectiveDates")
//	protected DateRange effectiveDates;
//	@Column
//	@JsonProperty(value = "type")
//	private ItemType type;
//
//	public void updateEstimItem(EstimItem estimItem, EstimItem newEstimItem) {
//		estimItem.setName(newEstimItem.getName());
//		estimItem.setDescription(newEstimItem.getDescription());
//		estimItem.setState(newEstimItem.getState());
//		estimItem.setEffectiveDates(newEstimItem.getEffectiveDates());
//	}
//
//
//	public abstract void accept(EstimItemUpdateVisitor visitor, EstimItem newEstimItem);
//
//
//}
