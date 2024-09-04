package fr.atos.outil_estim.util;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class Error {
	public Error() {
	}

	public static <T> ResponseEntity<T> errorFromException(IllegalArgumentException e) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.TEXT_PLAIN);
		headers.add("error", e.getMessage());
		return new ResponseEntity<>(headers, HttpStatus.NOT_FOUND);
	}
}
