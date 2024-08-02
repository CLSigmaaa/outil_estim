package fr.atos.outil_estim.enums;

public enum State {
	A_FAIRE, EN_COURS, TERMINEE;

	public static State fromString(String state) {
		return switch (state) {
			case "A faire" -> A_FAIRE;
			case "En cours" -> EN_COURS;
			case "Terminee" -> TERMINEE;
			default -> throw new IllegalArgumentException("Unknown state: " + state);
		};
	}
}
