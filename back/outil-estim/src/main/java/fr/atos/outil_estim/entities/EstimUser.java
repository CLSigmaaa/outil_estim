package fr.atos.outil_estim.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@JsonSerialize
@Getter @Setter @NoArgsConstructor
@EqualsAndHashCode
public class EstimUser {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Long id;
	@Column
	private String firstName;
	@Column
	private String lastName;
	@Column
	private String email;
	@Column
	@OneToMany(mappedBy = "estimUser", cascade = CascadeType.ALL)
	@JsonBackReference(value = "attributedTasks")
	private List<Task> attributedTasks;

}
