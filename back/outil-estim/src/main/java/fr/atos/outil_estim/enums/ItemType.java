package fr.atos.outil_estim.enums;

public enum ItemType {
	TASK, SPRINT;

	public static ItemType fromString(String type) {
		return switch (type) {
			case "TASK" -> TASK;
			case "SPRINT" -> SPRINT;
			default -> throw new IllegalArgumentException("Unknown item type: " + type);
		};
	}
}


