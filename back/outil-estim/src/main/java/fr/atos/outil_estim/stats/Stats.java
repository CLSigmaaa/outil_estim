package fr.atos.outil_estim.stats;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class Stats {


	//	public void computeStats(Sprint sprint){
//		computeChildrenPoints(sprint.getChildren());
//
//		var burnData = computeBurnYAxis(computeBurnXAxis(sprint), sprint.getChildren());
//		computeBurnUpAndDown(burnData);
//		}
//	private void computeChildrenPoints(Set<EstimItem> childrenSet){
//		childrenSet.forEach(child -> {
//			if (child instanceof Task task) {
//				totalPoints += task.getEstimation();
//				if (task.getState() != null) {
//					var usState = task.getState();
//					var counter = stateStats.getOrDefault(usState, 0);
//					stateStats.put(usState, counter + 1) ;
//				}
//
//				if (task.getPriority() != null) {
//					var priority = task.getPriority();
//					var priorityCounter = priorityStats.getOrDefault(priority, 0);
//					priorityStats.put(priority, priorityCounter + 1);
//				}
//				if (task.getState() == State.TERMINEE) {
//					donePoints += task.getEstimation();
//				}
//			} else if (child instanceof Sprint childSprint) {
//				computeChildrenPoints(childSprint.getChildren());
//			} else {
//				throw new IllegalArgumentException("Unknown child type "+child.getClass());
//			}
//		});
//	}
//
//	private Map<LocalDate, Integer> computeBurnXAxis(Sprint sprint) {
//		HashMap<LocalDate, Integer> burnData = new HashMap<>();
//		if (sprint.getEffectiveDates().getFrom() == null || sprint.getEffectiveDates().getTo() == null) {
//			throw new IllegalArgumentException("Sprint dates are not set");
//		}
//		var startDate = sprint.getEffectiveDates().getFrom();
//		var sprintDuration = Period.between(startDate, sprint.getEffectiveDates().getTo()).getDays();
//		for (int dayNb = 0; dayNb <= sprintDuration + 1; dayNb++) {
//			burnData.put(startDate.plusDays(dayNb), 0);
//		}
//		return burnData;
//	}
//
//	private Map<LocalDate, Integer> computeBurnYAxis(Map<LocalDate, Integer> burnData, Set<EstimItem> children){
//		children.forEach(child -> {
//			if (child instanceof Task task && task.getState() == State.TERMINEE) {
//				var endDate = task.getEffectiveDates().getTo();
//				burnData.put(endDate, burnData.get(endDate) + task.getEstimation());
//			} else {
//				throw new IllegalArgumentException("Unsupported child type "+child.getClass());
//			}
//		});
//		return burnData;
//	}

//	private void computeBurnUpAndDown(Map<LocalDate, Integer> burnData){
//		var accumulatedPoints = 0;
//		for (Map.Entry<LocalDate, Integer> entry : burnData.entrySet()) {
//			accumulatedPoints += entry.getValue();
//			burnUp.put(entry.getKey(), accumulatedPoints);
//			burnDown.put(entry.getKey(), totalPoints - accumulatedPoints);
//		}
//	}
}
