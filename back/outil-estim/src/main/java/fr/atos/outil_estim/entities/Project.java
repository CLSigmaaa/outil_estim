package fr.atos.outil_estim.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@JsonSerialize
@Getter @Setter @NoArgsConstructor
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Long id;
	@Column
	private String name;
	@Column
	private String description;
	@Column
	@OneToMany
	@JsonManagedReference(value = "project")
	private Set<EstimItem> children;
	@Column
	private int childNumber;

}
