package fr.atos.outil_estim.entities;

import fr.atos.outil_estim.deserializer.StateDeserializer;
import fr.atos.outil_estim.serializer.StateSerializer;
import fr.atos.outil_estim.enums.ItemType;
import fr.atos.outil_estim.enums.State;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Getter @Setter @EqualsAndHashCode
public class Sprint {
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
	@Column
	private String description;
	@Column
	@JsonDeserialize(using = StateDeserializer.class)
	@JsonSerialize(using = StateSerializer.class)
	private State state;
	@Column
	protected DateRange effectiveDates;
	@Column
	private ItemType type;
	@OneToMany(mappedBy = "parentSprint", cascade = CascadeType.ALL)
	private List<Task> tasks;

	public Sprint() {
		this.effectiveDates = new DateRange();
		this.setType(ItemType.SPRINT);
		this.tasks = new ArrayList<>();
	}

	public void setDefaultValue(Long id) {
		setName(String.format("Sprint %d", id));
		setDescription(String.format("Description Sprint %d", id));
		setState(State.A_FAIRE);
	}


}
