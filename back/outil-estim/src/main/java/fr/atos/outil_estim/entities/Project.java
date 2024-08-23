package fr.atos.outil_estim.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.TableGenerator;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@JsonSerialize
@Getter @Setter @NoArgsConstructor @EqualsAndHashCode
public class Project {
	@TableGenerator(name = "Project_Gen", table = "ID_GEN", pkColumnName = "GEN_NAME", valueColumnName = "GEN_VAL", pkColumnValue = "Project_Gen", initialValue = 100, allocationSize = 100)
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "Project_Gen")
	private Long id;
	@Column
	private String name;
	@Column
	private String description;
	@Column
	@OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
	private List<Sprint> sprints;
	@Column
	private int childNumber;

}
