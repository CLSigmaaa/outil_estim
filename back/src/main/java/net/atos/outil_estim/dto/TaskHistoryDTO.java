package net.atos.outil_estim.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskHistoryDTO {
    private String day;
    private double sumRemainingTime;

    private double idealRemainingTime;

    public TaskHistoryDTO(String day, double sumRemainingTime, int i) {
        this.day = day;
        this.sumRemainingTime = sumRemainingTime;
        this.idealRemainingTime = i;
    }
}