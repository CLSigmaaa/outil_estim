package fr.atos.outil_estim.entities;

import fr.atos.outil_estim.utils.EstimItemAddItemVisitor;
import fr.atos.outil_estim.utils.EstimItemUpdateVisitor;
import jakarta.persistence.*;


import java.util.Set;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@JsonSerialize
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
	private Integer childNumber;

	public Project() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<EstimItem> getChildren() {
		return children;
	}

	public void setChildren(Set<EstimItem> children) {
		this.children = children;
	}

	public Integer getChildNumber() {
		return childNumber;
	}

	public void setChildNumber(Integer childNumber) {
		this.childNumber = childNumber;
	}
}
