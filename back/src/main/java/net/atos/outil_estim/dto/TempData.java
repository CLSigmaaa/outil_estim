package net.atos.outil_estim.dto;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class TempData {
    private Integer consumedTime;
    private Integer remainingTime;
    private Integer initialEstimation;
    private String taskName;
}
