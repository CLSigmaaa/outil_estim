package net.atos.outil_estim.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import net.atos.outil_estim.enums.StatusEnum;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class TaskHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long taskId;


//    private float oldInitialEstimation;

    private float oldConsumedTime;
    private float oldRemainingTime;

    private StatusEnum oldStatus;

    private String oldTaskName;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
