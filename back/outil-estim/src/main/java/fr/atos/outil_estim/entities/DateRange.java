package fr.atos.outil_estim.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
@Embeddable
@Getter @Setter @NoArgsConstructor
public class DateRange {
	@Column(name = "effective_date_from")
	@JsonProperty("from")
	private LocalDate from;
	@Column(name = "effective_date_to")
	@JsonProperty("to")
	private LocalDate to;


}
