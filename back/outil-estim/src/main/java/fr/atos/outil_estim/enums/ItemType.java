package fr.atos.outil_estim.enums;

public enum ItemType {
	US, ENSEMBLE, SPRINT;

	public static ItemType fromString(String type) {
		return switch (type) {
			case "US" -> US;
			case "Ensemble" -> ENSEMBLE;
			case "Sprint" -> SPRINT;
			default -> throw new IllegalArgumentException("Unknown item type: " + type);
		};
	}
}


