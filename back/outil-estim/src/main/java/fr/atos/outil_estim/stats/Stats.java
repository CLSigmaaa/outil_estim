package fr.atos.outil_estim.stats;

import fr.atos.outil_estim.entities.Ensemble;
import fr.atos.outil_estim.entities.EstimItem;
import fr.atos.outil_estim.entities.Sprint;
import fr.atos.outil_estim.entities.UserStory;
import fr.atos.outil_estim.enums.Priority;
import fr.atos.outil_estim.enums.State;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.Period;
import java.util.EnumMap;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Getter @Setter @NoArgsConstructor
public class Stats {
	private int totalPoints;
	private int donePoints;
	private EnumMap<State, Integer> stateStats = new EnumMap<>(State.class);
	private EnumMap<Priority, Integer> priorityStats = new EnumMap<>(Priority.class);
	private Map<LocalDate, Integer> burnUp = new HashMap<>();
	private Map<LocalDate, Integer> burnDown = new HashMap<>();

	public void computeStats(Ensemble ensemble){
		computeChildrenPoints(ensemble.getChildren());
	}

	public void computeStats(Sprint sprint){
		computeChildrenPoints(sprint.getChildren());

		var burnData = computeBurnYAxis(computeBurnXAxis(sprint), sprint.getChildren());
		computeBurnUpAndDown(burnData);
		}
	private void computeChildrenPoints(Set<EstimItem> childrenSet){
		childrenSet.forEach(child -> {
			if (child instanceof UserStory userStory) {
				totalPoints += userStory.getEstimation();
				if (userStory.getState() != null) {
					var usState = userStory.getState();
					var counter = stateStats.getOrDefault(usState, 0);
					stateStats.put(usState, counter + 1) ;
				}

				if (userStory.getPriority() != null) {
					var priority = userStory.getPriority();
					var priorityCounter = priorityStats.getOrDefault(priority, 0);
					priorityStats.put(priority, priorityCounter + 1);
				}
				if (userStory.getState() == State.TERMINEE) {
					donePoints += userStory.getEstimation();
				}
			} else if (child instanceof Ensemble childEnsemble) {
				computeChildrenPoints(childEnsemble.getChildren());
			} else if (child instanceof Sprint childSprint) {
				computeChildrenPoints(childSprint.getChildren());
			} else {
				throw new IllegalArgumentException("Unknown child type "+child.getClass());
			}
		});
	}

	private Map<LocalDate, Integer> computeBurnXAxis(Sprint sprint) {
		HashMap<LocalDate, Integer> burnData = new HashMap<>();
		if (sprint.getEffectiveDates().getFrom() == null || sprint.getEffectiveDates().getTo() == null) {
			throw new IllegalArgumentException("Sprint dates are not set");
		}
		var startDate = sprint.getEffectiveDates().getFrom();
		var sprintDuration = Period.between(startDate, sprint.getEffectiveDates().getTo()).getDays();
		for (int dayNb = 0; dayNb <= sprintDuration + 1; dayNb++) {
			burnData.put(startDate.plusDays(dayNb), 0);
		}
		return burnData;
	}

	private Map<LocalDate, Integer> computeBurnYAxis(Map<LocalDate, Integer> burnData, Set<EstimItem> children){
		children.forEach(child -> {
			if (child instanceof UserStory userStory && userStory.getState() == State.TERMINEE) {
				var endDate = userStory.getEffectiveDates().getTo();
				burnData.put(endDate, burnData.get(endDate) + userStory.getEstimation());
			} else if (child instanceof Ensemble childEnsemble) {
				computeBurnYAxis(burnData, childEnsemble.getChildren());
			} else {
				throw new IllegalArgumentException("Unsupported child type "+child.getClass());
			}
		});
		return burnData;
	}

	private void computeBurnUpAndDown(Map<LocalDate, Integer> burnData){
		var accumulatedPoints = 0;
		for (Map.Entry<LocalDate, Integer> entry : burnData.entrySet()) {
			accumulatedPoints += entry.getValue();
			burnUp.put(entry.getKey(), accumulatedPoints);
			burnDown.put(entry.getKey(), totalPoints - accumulatedPoints);
		}
	}
}
