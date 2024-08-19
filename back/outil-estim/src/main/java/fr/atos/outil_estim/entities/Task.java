package fr.atos.outil_estim.entities;

import fr.atos.outil_estim.enums.ItemType;
import fr.atos.outil_estim.enums.Priority;
import fr.atos.outil_estim.enums.State;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.TableGenerator;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@JsonSerialize
@Getter @Setter @EqualsAndHashCode
public class Task {
	@TableGenerator(name = "Item_Gen", table = "ID_GEN", pkColumnName = "GEN_NAME", valueColumnName = "GEN_VAL", pkColumnValue = "Item_Gen", initialValue = 100, allocationSize = 100)
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "Item_Gen")
	private Long id;
	@Column
	@JsonProperty("name")
	private String name;
	@ManyToOne
	@JoinColumn(name = "project_id")
	@JsonBackReference(value = "project")
	private Project project;
	@Column
	@JsonProperty("description")
	private String description;
	@Column
	@JsonProperty("state")
	private State state;
	@Column
	@JsonProperty("effectiveDates")
	protected DateRange effectiveDates;
	@Column
	@JsonProperty(value = "type")
	private ItemType type;
	@Column
	@JsonProperty("priority")
	private Priority priority;
	@ManyToOne
	@JoinColumn(name = "parent_sprint_id")
	@JsonBackReference(value = "parentItem")
	private Sprint parentSprint;
	@OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
//	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonManagedReference("relatedTask")
	@JsonProperty("estimationList")
	private List<Estimation> estimationList;

	public Task() {
		this.effectiveDates = new DateRange();
		this.setType(ItemType.TASK);
		this.estimationList = new ArrayList<>();
	}

}
