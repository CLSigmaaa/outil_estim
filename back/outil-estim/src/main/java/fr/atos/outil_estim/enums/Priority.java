package fr.atos.outil_estim.enums;

public enum Priority {
	MINEURE, MAJEURE, CRITIQUE;

	public static Priority fromString(String priority) {
		return switch (priority) {
			case "Mineure" -> MINEURE;
			case "Majeure" -> MAJEURE;
			case "Critique" -> CRITIQUE;
			default -> throw new IllegalArgumentException("Unknown priority: " + priority);
		};
	}

	public static String toString(Priority priority) {
		return switch (priority) {
			case MINEURE -> "Mineure";
			case MAJEURE -> "Majeure";
			case CRITIQUE -> "Critique";
		};
	}
}


