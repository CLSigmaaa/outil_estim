package fr.atos.outil_estim.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.TableGenerator;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Getter @Setter @NoArgsConstructor @EqualsAndHashCode
@JsonSerialize
public class Estimation {
	@TableGenerator(name = "Estim_Gen", table = "ID_GEN", pkColumnName = "GEN_NAME", valueColumnName = "GEN_VAL", pkColumnValue = "Estim_Gen", initialValue = 100, allocationSize = 100)
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "Estim_Gen")
	private Long id;
	@ManyToOne
	@JoinColumn(name = "task_id")
	@JsonBackReference("relatedTask")
	private Task task;
	@Column
	private LocalDate date;
	@Column
	private double consommee;
	@Column
	private double resteAFaire;
	@Column
	private String causeEcart;


}
