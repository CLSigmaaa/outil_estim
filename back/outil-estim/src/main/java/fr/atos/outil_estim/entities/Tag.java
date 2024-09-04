package fr.atos.outil_estim.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.TableGenerator;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Tag {

	@TableGenerator(name = "Tag_Gen", table = "ID_GEN", pkColumnName = "GEN_NAME", valueColumnName = "GEN_VAL", pkColumnValue = "Tag_Gen", initialValue = 100, allocationSize = 100)
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "Tag_Gen")
	private Long id;
	@Column
	private String name;

	@ManyToMany(mappedBy = "tags")
	@JsonBackReference(value = "tags")
	private List<Task> tasks = new ArrayList<>();
}
