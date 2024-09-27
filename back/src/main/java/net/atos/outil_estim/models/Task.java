package net.atos.outil_estim.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import net.atos.outil_estim.enums.StatusEnum;
import net.atos.outil_estim.enums.TaskTypeEnum;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String taskName;
    private TaskTypeEnum taskType;
    private float initialEstimation;
    private float consumedTime;
    private float remainingTime;

    private StatusEnum status;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
