package fr.atos.outil_estim.entities;

import fr.atos.outil_estim.deserializer.PriorityDeserializer;
import fr.atos.outil_estim.deserializer.StateDeserializer;
import fr.atos.outil_estim.serializer.PrioritySerializer;
import fr.atos.outil_estim.serializer.StateSerializer;
import fr.atos.outil_estim.enums.ItemType;
import fr.atos.outil_estim.enums.Priority;
import fr.atos.outil_estim.enums.State;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.TableGenerator;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
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
	private String name;
	@ManyToOne
	@JoinColumn(name = "project_id")
	@JsonBackReference(value = "project")
	private Project project;
	@Column(length = 1000)

	private String description;
	@Column
	@JsonDeserialize(using = StateDeserializer.class)
	@JsonSerialize(using = StateSerializer.class)
	private State state;
	@Column
	protected DateRange effectiveDates;
	@Column
	private ItemType type;
	@Column
	@JsonDeserialize(using = PriorityDeserializer.class)
	@JsonSerialize(using = PrioritySerializer.class)
	private Priority priority;
	@ManyToOne
	@JoinColumn(name = "parent_sprint_id")
	@JsonBackReference(value = "parentItem")
	private Sprint parentSprint;
	@OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
	@JsonManagedReference("relatedTask")
	private List<Estimation> estimationList;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private EstimUser estimUser;
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
			joinColumns = @JoinColumn(name = "task_id"),
			inverseJoinColumns = @JoinColumn(name = "tag_id"))
	private List<Tag> tags;

	public Task() {
		this.effectiveDates = new DateRange();
		this.setType(ItemType.TASK);
		this.estimationList = new ArrayList<>();
	}

}
