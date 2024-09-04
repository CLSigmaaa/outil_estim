package fr.atos.outil_estim.deserializer;

import fr.atos.outil_estim.enums.Priority;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;

public class PriorityDeserializer  extends JsonDeserializer<Priority> {
	@Override
	public Priority deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
		return Priority.fromString(p.getText());
	}
}
